
import Api from "@/api/api"

export default {

    namespaced: true,

    state: () => ({
        inProgress: false,
        error: null,
        all: [],
    }),

    mutations: {
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

        setAll(state, { products }) {
            state.all = products;
        },
    },

    actions: {
        async change(context, newProductName) {
            context.commit('started')
            try {
                let account = await Api.changeProduct(newProductName);

                context.commit('done', { account })
                context.commit('auth/updateAccount', { account }, { root: true })                
            } catch (error) {
                context.commit('failed', { error })
            }
        },
    },
    getters: {

    }
}