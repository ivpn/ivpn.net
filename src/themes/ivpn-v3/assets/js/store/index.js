
import Vue from "vue"
import Vuex from "vuex";


import auth from "./module_auth.js"
import popup from "./module_popup.js"
import wireguard from "./module_wireguard.js"
import portForwarding from "./module_port_forwarding.js"
import payments from "./module_payments.js"
import product from "./module_product.js"
import deleteAccount from "./module_delete_account.js"
import braintree from "./module_braintree.js"
import account from "./module_account.js"
import general from "./module_general.js"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        popup,
        payments,
        wireguard,
        portForwarding,
        deleteAccount,        
        product,
        braintree,
        account,
        general,
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
});