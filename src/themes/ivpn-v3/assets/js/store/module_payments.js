import Api from "@/api/api"

export default {
    namespaced: true,

    state: () => ({
        inProgress: false,
        selectedPrice: null,
        error: null,
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
    
        done(state) {
            state.inProgress = false;      
        },

        setSelectedPrice(state, payload) {
            state.selectedPrice = payload
        }
    },
    
    actions: {
        async disableRecurring(context) {
            context.commit('started')
            try {
                await Api.disableRecurringPayments()

                await context.dispatch('auth/reload', null, {root:true})

                if (context.rootState.auth.error)
                    throw context.rootState.auth.error

                context.commit('done')
    
            } catch (error) {
                context.commit('failed', { error })
            }
        },

        clear(context) {            
            context.commit('clear')
        },

        async setBillingCycle(context, newBillingCycle) {
            context.commit('started')
            try {
                await Api.setBillingCycle(newBillingCycle)
                
                await context.dispatch('auth/reload', null, {root:true})

                if (context.rootState.auth.error)
                    throw context.rootState.auth.error

                context.commit('done')
    
            } catch (error) {
                context.commit('failed', { error })
            }
        },

        async retrySubscriptionPayment(context) {
            context.commit('started')
            try {
                let account = await Api.retrySubscriptionPayment()

                context.commit('auth/updateAccount', { account }, { root: true })
                context.commit('done')
                return true
    
            } catch (error) {
                context.commit('failed', { error })
            }
            
            return false
        },

    },
    getters: {}

}