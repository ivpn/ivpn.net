
import Api from "@/api/api"
import JSCookie from "js-cookie"

const LoggedInCookieName = 'logged_in'

export default {

    namespaced: true,

    state: () => ({

        // the folloding two fiels are taken from the cookies initially
        // and later can be updated when the actual data is being loaded
        isAuthenticated: false,
        isLegacy: false,

        // isLoaded means that the contents of account was loaded
        isLoaded: false,

        inProgress: false,
        account: null,

        error: null,
    }),

    mutations: {

        setState(state, { isAuthenticated, isLegacy }) {
            state.isAuthenticated = isAuthenticated
            state.isLegacy = isLegacy

            if (window.updateLoginMenu) {
                window.updateLoginMenu(isAuthenticated, isLegacy);
            }
        },

        started(state) {
            state.inProgress = true;
            state.error = null;
        },

        failed(state, payload) {
            state.inProgress = false;
            state.error = payload.error;
        },

        done(state, payload) {
            state.inProgress = false;
            state.isLoaded = payload.account != null;
            state.account = payload.account;
        },

        updateAccount(state, payload) {
            if (state.isLegacy && payload.account != null) {
                throw { message: "cannot update legacy account. Refresh page and try again" }
            }
            state.account = payload.account;
        },

        // Other mutations

        resetErrors(state) {
            state.error = null;
        },
    },

    actions: {

        updateState(context) {
            let loggedInCookie = JSCookie.get(LoggedInCookieName)

            context.commit('setState', {
                isAuthenticated: loggedInCookie == "1" || loggedInCookie == "l",
                isLegacy: loggedInCookie == "l"
            })
        },

        init(context) {
            context.dispatch("updateState")
        },

        async load(context) {

            // return true if acocunt is already loaded
            if (context.state.account != null) {
                return;
            }

            await context.dispatch('reload')
        },

        async reload(context) {
            context.commit('started')

            try {
                let account = await Api.getAccount()
                context.commit('done', { account })
            } catch (error) {
                context.commit('failed', { error })
            }

            context.dispatch('updateState')
        },

        resetErrors(context) {
            context.commit('resetErrors')
        },

        async login(context, payload) {
            context.commit('started')
            try {
                let response;

                if (payload.accountID) {
                    response = await Api.login(
                        payload.accountID,
                        payload.totpValue,
                        payload.captchaID,
                        payload.captchaValue,
                    );
                } else {
                    response = await Api.loginEmail(
                        payload.email,
                        payload.password,
                        payload.totpValue,
                        payload.captchaID,
                        payload.captchaValue
                    );
                }

                if (!response.account && !response.is_legacy) {
                    throw { message: "Response received without account or required data. Refresh page and try again." }
                }

                context.commit('done', { account: response.account })

            } catch (error) {

                context.commit('failed', { error })
                throw error

            } finally {
                context.dispatch('updateState')
            }
        },

        async createAccount(context, payload) {
            context.commit('started')

            try {
                let account = await Api.createNewAccount(payload.product);

                if (account == null) {
                    throw { message: "Invalid result returned from API" }
                }

                context.commit("done", { account });

            } catch (error) {

                context.commit('failed', { error })
                throw error

            } finally {
                context.dispatch('updateState')
            }

        },

        async logout(context) {
            await Api.logout()
            context.commit('updateAccount', { account: null })
            context.commit('setState', {
                isAuthenticated: false,
                isLegacy: false,
            })
        },


    },
    getters: {

    }
}