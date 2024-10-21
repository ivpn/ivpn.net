import Vuex from "vuex"

import auth from "./module_auth.js"
import popup from "./module_popup.js"
import wireguard from "./module_wireguard.js"
import payments from "./module_payments.js"
import product from "./module_product.js"
import deleteAccount from "./module_delete_account.js"
import braintree from "./module_braintree.js"
import account from "./module_account.js"
import light from "./module_light.js"
import sessions from "./module_sessions.js"

export default new Vuex.Store({
    modules: {
        auth,
        popup,
        payments,
        wireguard,
        deleteAccount,        
        product,
        braintree,
        account,
        light,
        sessions,
    },

    state: {        
        errors: null,        
        flashMessage: null,
    },

    getters: {
    
        flashMessage(state) {
            return state.flashMessage;
        }
    },
    actions: {},
    mutations: {
        setError(state, payload) {
            state.errors = payload.errors
        },
    
        setFlashMessage(state, flashMessage) {
            state.flashMessage = flashMessage;
        },
    
        clearFlashMessage(state) {
            state.flashMessage = null
        }
    
    }
})
