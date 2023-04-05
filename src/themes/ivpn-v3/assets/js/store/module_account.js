import Api from "@/api/api"

function validateEmail(email) {
    let re = /\S+@\S+\.\S+/
    if (!re.test(email)) {
        return { message: "Email address is not valid" }
    }

    return null
}

function validatePassword(password, password2) {
    if (password.length < 8) {
        return { message: "Passwords should be at least 8 characters long" }
    }

    if (!/\d/.test(password)) {
        return { message: "Passwords must contain at least one digit" }
    }

    if (password != password2) {
        return { message: "Passwords doesn't match" }
    }

    return null
}

export default {
    namespaced: true,

    state: () => ({
        inProgress: false,
        error: null,
    }),

    mutations: {
        clear(state) {
            state.inProgress = false;
            state.error = null;
        },

        started(state) {
            state.inProgress = true;
            state.error = null;
        },

        failed(state, payload) {
            state.inProgress = false;
            state.error = payload.error;
        },

        done(state) {
            state.inProgress = false;
        },
    },

    actions: {

        async setAuthEmail(context, { email, password, password2 }) {

            let error = validateEmail(email)
            if (error) {
                context.commit('failed', { error })
                return
            }

            error = validatePassword(password, password2);
            if (error) {
                context.commit('failed', { error })
                return
            }

            context.commit('started')
            try {
                await Api.setEmailAuth(email, password)

                await context.dispatch('auth/reload', null, { root: true })

                if (context.rootState.auth.error)
                    throw context.rootState.auth.error

                context.commit('done')

            } catch (error) {
                context.commit('failed', { error })
            }
        },

        async setAuthAccountID(context) {

            context.commit('started')
            try {
                await Api.setAccountIDAuth()

                await context.dispatch('auth/reload', null, { root: true })

                if (context.rootState.auth.error)
                    throw context.rootState.auth.error

                context.commit('done')

            } catch (error) {
                context.commit('failed', { error })
            }
        },

        async changeEmail(context, { email }) {

            let error = validateEmail(email)
            if (error) {
                context.commit('failed', { error })
                return
            }

            context.commit('started')
            try {
                await Api.changeEmail(email)

                await context.dispatch('auth/reload', null, { root: true })

                if (context.rootState.auth.error)
                    throw context.rootState.auth.error

                context.commit('done')

            } catch (error) {
                context.commit('failed', { error })
            }
        },

        async changePassword(context, { password, password2 }) {

            let error = validatePassword(password, password2);
            if (error) {
                context.commit('failed', { error })
                return
            }

            context.commit('started')
            try {
                await Api.changePassword(password)

                await context.dispatch('auth/reload', null, { root: true })

                if (context.rootState.auth.error)
                    throw context.rootState.auth.error

                context.commit('done')

            } catch (error) {
                context.commit('failed', { error })
            }
        },

        async totpInit(context) {
            context.commit('started')
            try {
                let resp = await Api.totpInit()
                context.commit('done')
                return resp
            } catch (error) {
                context.commit('failed', { error })
            }
        },

        async totpEnable(context, { confirmation }) {
            context.commit('started')
            try {
                let response = await Api.totpEnable(confirmation)

                await context.dispatch('auth/reload', null, { root: true })

                if (context.rootState.auth.error)
                    throw context.rootState.auth.error

                context.commit('done')
                return response.backup
            } catch (error) {
                context.commit('failed', { error })
            }
        },

        async totpDisable(context, { confirmation }) {
            context.commit('started')
            try {
                await Api.totpDisable(confirmation)

                await context.dispatch('auth/reload', null, { root: true })

                if (context.rootState.auth.error)
                    throw context.rootState.auth.error

                context.commit('done')
            } catch (error) {
                context.commit('failed', { error })
            }
        },

        async createBitcoinInvoice(context, { priceID, paymentMethodId }) {
            
            context.commit('started')
            try {
                let resp= await Api.createBitcoinInvoice(priceID, paymentMethodId)

                context.commit('done')
                return resp.invoice
            } catch (error) {
                context.commit('failed', { error })
            }
        },

        async createLightInvoice(context, { priceID, exitServer, entryServer, privateKey, publicKey  }) {
            context.commit('started')
            try {
                let resp= await Api.createLightInvoice(priceID, exitServer, entryServer, privateKey, publicKey)

                context.commit('done')
                return resp.invoice
            } catch (error) {
                context.commit('failed', { error })
            }
        },

        async resetPassword(context, { email }) {
            context.commit('started')
            try {
                await Promise.all([Api.resetPasswordRequest(email), Api.resetPasswordRequestLegacy(email)])

                context.commit('done')
            } catch (error) {
                context.commit('failed', { error })
            }
        },

        async resetPasswordCommit(context, { token, password, password2 }) {

            let error = validatePassword(password, password2);
            if (error) {
                context.commit('failed', { error })
                return
            }

            context.commit('started')
            try {
                await Api.resetPasswordCommit(token, password)

                context.commit('done')
            } catch (error) {
                context.commit('failed', { error })
            }
        },

        clear(context) {
            context.commit('clear')
        },

    },
    getters: {}

}