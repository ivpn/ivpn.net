
import BraintreeApi from "@/api/braintree";
import Api from "@/api/api"

export default {

    namespaced: true,

    state: () => ({
        inProgress: false,
        error: null,
        instance: null,
    }),

    mutations: {
        resetInstance(state) {
            state.instance = null
        },

        clear(state) {
            state.inProgress = false;
            state.error = null;
        },

        started(state) {
            state.inProgress = true;
            state.error = null;
        },

        initialized(state, payload) {
            state.inProgress = false
            state.error = null
            state.instance = payload.braintree
        },

        failed(state, payload) {
            state.inProgress = false;
            state.error = payload.error;
        },

        done(state) {
            state.inProgress = false;
        },

        setAll(state, { products }) {
            state.all = products;
        },
    },

    actions: {
        async init(context) {
            context.commit('resetInstance')
            context.commit('started')
            try {
                let token = await Api.getBraintreeToken();
                let braintree = await BraintreeApi.init(token);
                context.commit('initialized', { braintree })
            } catch (error) {
                console.error("Error initializing BrainTree", error);                
                context.commit('failed', { error })
            }
        },

        async tokenizeCC(context, braintreeCC) {
            
            let nonce

            context.commit('started')
            try {
                nonce = await braintreeCC.tokenize();
                context.commit('done')
            } catch (error) {
                context.commit('failed', { error })
            }

            return nonce
        },

        async addFunds(context, data) {
            context.commit('started')
            try {
                let account = await Api.addBraintreeFunds(
                    data.priceId,
                    data.price,
                    data.paymentMethod,
                    context.state.instance.fraudData,
                    data.nonce,
                    data.isRecurring,
                    data.captchaID,
                    data.captchaValue,
                );
                
                context.commit('auth/updateAccount', { account }, { root: true })
                context.commit('done')
                
            } catch (error) {
                context.commit('failed', { error })
            }
        },

        async savePaymentMethod(context, nonce) {

            context.commit('started')
            try {
                let account = await Api.saveBraintreePaymentMethod(                    
                    context.state.instance.fraudData,
                    nonce,                    
                );
                
                context.commit('auth/updateAccount', { account }, { root: true })
                context.commit('done')
                
            } catch (error) {                
                context.commit('failed', { error })
            }
        },

        async clear(context) {
            context.commit('clear', { })
        },

    },
    getters: {

    }
}