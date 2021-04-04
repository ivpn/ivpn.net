
import Api from "@/api/api"

async function doWithProgress(context, fn) {
    context.commit('started')
    try {
        let resp = await fn()
        context.commit('done')
        return resp
    } catch (error) {
        context.commit('failed', { error })
        throw error
    }
}

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
        },

        clear(state) {
            state.error = null;
        },
    },
    
    actions: {
        async genOpenVPNConfig(context, params) {
            return doWithProgress(context, async () => {
                return Api.genOpenVPNConfig(params);
            })
        },
    },
    getters: {

    }
}