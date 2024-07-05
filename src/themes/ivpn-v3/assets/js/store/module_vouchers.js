
import Api from "@/api/api"
import JSCookie from "js-cookie"

const StatusErrNotLoggedIn = 11003

export default {

  namespaced: true,

  state: () => ({
    inProgress: true,
    isLoaded: false,
    error: null,

    vouchers: {},
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

        if (payload.vouchers) {
          state.vouchers = payload.vouchers;
        }
    },

    delete(state, payload) {
        state.vouchers = state.vouchers.filter(function( obj ) {
          return obj.voucher !== payload.voucher;
      });
    },

  },
  actions: {

    async load(context) {

        context.commit('started')
        
        try {
            let vouchers = await Api.getVouchers(context)
            context.commit('done', {
                vouchers: vouchers.vouchers,
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

    async deleteVoucher(context,token) {

      context.commit('started')
      
      try {
          await Api.deleteVoucher(token);
          let response= await Api.deleteVoucher(context)
          context.commit('done', {
              vouchers: response.vouchers,
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

    async deleteVouchers(context) {

      context.commit('started')
      
      try {
          await Api.deleteVouchers();
          let response = await Api.getVouchers(context)
          context.commit('done', {
              vouchers: response.vouchers,
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