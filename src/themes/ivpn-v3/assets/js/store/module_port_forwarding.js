import Api from "@/api/api"

const StatusErrNotLoggedIn = 11003

export default {

  namespaced: true,

  state: () => ({
    inProgress: true,
    isLoaded: false,
    error: null,

    isEnabled: false,
    ports: [],
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

    done(state, payload) {
      state.inProgress = false;
      state.isLoaded = true;

      if (payload.is_enabled != undefined) {
        state.isEnabled = payload.is_enabled;
      }

      if (payload.ports != undefined) {
        state.ports = payload.ports;
      }
    },
  },
  actions: {
    async load(context) {

      context.commit('started')
      
      try {
          let response = await Api.getPortForwardingStatus()

          context.commit('done', response)

      } catch (error) {

          if (error.status == StatusErrNotLoggedIn) {
              context.commit('done', {})
              console.log("error", error)
              return;
          }

          context.commit('failed', { error })
      }
    },
    async enable(context) {

      context.commit('started')
      
      try {
          let response = await Api.enablePortForwarding()

          context.commit('done', response)

      } catch (error) {

          if (error.status == StatusErrNotLoggedIn) {
              context.commit('done', {})
              console.log("error", error)
              return;
          }

          context.commit('failed', { error })
      }
    },
    async disable(context) {

      context.commit('started')
      
      try {
          let response = await Api.disablePortForwarding()

          response.ports = [];

          context.commit('done', response)

      } catch (error) {

          if (error.status == StatusErrNotLoggedIn) {
              context.commit('done', {})
              console.log("error", error)
              return;
          }

          context.commit('failed', { error })
      }
    },
  },
  getters: {

  }
}