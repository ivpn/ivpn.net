
import Api from "@/api/api"
import JSCookie from "js-cookie"

const StatusErrNotLoggedIn = 11003

export default {

  namespaced: true,

  state: () => ({
    inProgress: true,
    isLoaded: false,
    error: null,

    keys: {},
    configs: {},
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

        if (payload.keys) {
          state.keys = payload.keys;
        }

        if (payload.key) {
          state.keys.push(payload.key);
        }

        if(payload.configs){
            state.configs = payload.configs;
        }
    },

    delete(state, payload) {
        state.keys = state.keys.filter(function( obj ) {
          return obj.public_key !== payload.public_key;
      });
    },

  },
  actions: {

    async load(context) {

        context.commit('started')
        
        try {
            let keys = await Api.getWireguardKeys()

            context.commit('done', {
                keys: keys,
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

    async loadConfigs(context) {

        context.commit('started')
        
        try {

            let multihop = JSCookie.get('lmh');
            multihop = (multihop == "true") ? 1:0;
            let configs = Api.getWireguardConfigs({
                "key":context.state.keys,
                "multihop": multihop,
            })
            context.commit('done', {
                configs: configs,
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

    async add(context, payload) {

        context.commit('started')
        
        try {
            let key = await Api.addWireguardKey(payload)

            context.commit('done', {
                key: key,
            })

        } catch (error) {

            if (error.status == StatusErrNotLoggedIn) {
                context.commit('done', {})
                return;
            }

            context.commit('failed', { error })
        }
    },

    async deleteKey(context, payload) {

        context.commit('started')
        
        try {
            let key = await Api.deleteWireguardKey(payload)

            context.commit('done', {})
            context.commit('delete', {public_key: key.public_key})

        } catch (error) {

            if (error.status == StatusErrNotLoggedIn) {
                context.commit('done', {})
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