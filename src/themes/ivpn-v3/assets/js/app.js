import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import { format } from "date-fns"
import { mapState } from "vuex";

Vue.config.productionTip = false

let products = {
    standard: {
        name: "IVPN Standard",
        capabilities: {
            hasWireGuard: true,
            hasPortForwarding: false,
        },
        prices: [
            { id: "standard-1week", name: "1 Week", price: 2 },
            { id: "standard-1month", name: "1 Month", price: 6 },
            { id: "standard-1year", name: "12 Months", price: 60, discount: 20 },
        ]
    },
    pro: {
        name: "IVPN Pro",
        capabilities: {
            hasWireGuard: true,
            hasPortForwarding: true,
        },
        prices: [
            { id: "pro-1week", name: "1 Week", price: 4 },
            { id: "pro-1month", name: "1 Month", price: 10 },
            { id: "pro-1year", name: "12 Months", price: 100, discount: 20 },
        ]
    }
};

store.commit('product/setAll', { products })

Vue.mixin({
    methods: {
        emptyObject(obj) {
            if (obj == null || obj == undefined) {
                return true
            }

            return Object.keys(obj).length === 0
        }
    }
})

Vue.filter('formatActiveUntil', function (value) {

    if (typeof value == "string") {
        value = new Date(value)
    }
    
    return format(value, "MMM d, yyyy HH:mm");
        
});

Vue.filter('formatDate', function (value) {

    if (typeof value == "string") {
        value = new Date(value)
    }

    return format(value, "MMM d, yyyy");
});


Vue.filter('formatPaymentDate', function (value) {

    if (typeof value == "string") {
        value = new Date(value)
    }

    return format(value, "MMM d, yyyy");
});

// Initialize the authentication from cookies
store.dispatch("auth/init");
new Vue({
    render: h => h(App),
    store,
    router,
    computed: {
        ...mapState({
            isAuthenticated: state => state.auth.isAuthenticated,
            isLegacy: state => state.auth.isLegacy
        })
    },    
}).$mount('#app')
