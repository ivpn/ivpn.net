
import Api from "@/api/api"

export default {

  namespaced: true,

  state: () => ({
    inProgress: false,
    error: null,
    confirmation: null,
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

    confirmationDone(state, payload) {
        state.confirmation = payload.confirmation;
        state.inProgress = false;
    },

    deleted(state) {
        state.inProgress = false;      
    },

  },
  actions: {

    async updateConfirmation(context) {
        context.commit('started')
        try {
            let confirmation = await Api.deleteAccountGetConfirmation()
            context.commit('confirmationDone', {
                confirmation
            })
        } catch (error) {
            context.commit('failed', { error })
        }
    },

    async delete(context, payload) {
        context.commit('started')
        try {
            await Api.deleteAccount(payload.confirmation)
            context.commit('deleted')

        } catch (error) {
            context.commit('failed', { error })
        }
    },

  },
  getters: {

  }
}