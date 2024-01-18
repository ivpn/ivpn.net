
import Api from "@/api/api"
import JSCookie from "js-cookie"

const StatusErrNotLoggedIn = 11003

export default {

  namespaced: true,

  state: () => ({
    inProgress: true,
    isLoaded: false,
    error: null,

    sessions: {},
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

        if (payload.sessions) {
          state.sessions = payload.sessions;
        }

        if (payload.session) {
          state.sessions.push(payload.session);
        }
    },

    delete(state, payload) {
        state.sessions = state.sessions.filter(function( obj ) {
          return obj.session !== payload.session;
      });
    },

  },
  actions: {

    async load(context) {

        context.commit('started')
        
        try {
            let sessions = await Api.getSessions(context)
            context.commit('done', {
                sessions: sessions,
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

    async deleteSession(context,token) {

      context.commit('started')
      
      try {
          await Api.deleteSession(token);
          let sessions = await Api.getSessions(context)
          context.commit('done', {
              sessions: sessions,
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

    async deleteSessions(context) {

      context.commit('started')
      
      try {
          await Api.deleteSessions();
          let sessions = await Api.getSessions(context)
          context.commit('done', {
              sessions: sessions,
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