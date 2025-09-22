
import Api from "@/api/api"

const StatusErrNotLoggedIn = 11003

export default {

  namespaced: true,

  state: () => ({
    inProgress: true,
    isLoaded: false,
    error: null,

    services: [],
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

    done(state, payload) {
        state.inProgress = false;
        state.isLoaded = true;

        if (payload.services) {
          state.services = payload.services;
        }
    },


  },
  actions: {

    async load(context) {

        context.commit('started')
        
        try {
            let services = await Api.getServices(context)
            context.commit('done', {
                services: services.services,
            })


        } catch (error) {

            if (error.status == StatusErrNotLoggedIn) {
                context.commit('done', {})
                console.log("error", error)
                return;
            }

            context.commit('failed', { error })
        }
    },

    clear(context) {
        context.commit('clear')
    },

  },
  getters: {

  }
}