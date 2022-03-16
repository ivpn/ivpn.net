import Api from "@/api/api"

export default {
    namespaced: true,
    state: () => ({
        inProgress: false,
        error: null,
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
            state.error = null;
        },
    },
    actions: {
        async contactSupportUA(context, payload) {
            context.commit('started')
            try {
                await Api.contactSupportUA(payload)
                context.commit('done')
            } catch (error) {
                context.commit('failed', { error })
                throw error
            }
        },
    },
    getters: {

    }
}