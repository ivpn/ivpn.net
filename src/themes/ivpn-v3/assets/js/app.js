import { createApp, h } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import { format } from 'date-fns'
import { mapState } from 'vuex'
import { createI18n } from 'vue-i18n'
import en from '../../locales/en.json'
import es from '../../locales/es.json'


let products = {
    standard: {
        name: 'IVPN Standard',
        capabilities: {
            hasWireGuard: true,
            hasPortForwarding: false,
        },
        prices: [
            { id: 'standard-1week', name: en.pricing.oneWeek, price: 2 },
            { id: 'standard-1month', name: en.pricing.oneMonth, price: 6 },
            { id: 'standard-1year', name: en.pricing.oneYear, price: 60, ref: 72 },
            { id: 'standard-2year', name: en.pricing.twoYears, price: 100, ref: 144 },
            { id: 'standard-3year', name: en.pricing.threeYears, price: 140, ref: 216 },
        ],
        pricesEs: [
            { id: 'standard-1week', name: es.pricing.oneWeek, price: 2 },
            { id: 'standard-1month', name: es.pricing.oneMonth, price: 6 },
            { id: 'standard-1year', name: es.pricing.oneYear, price: 60, ref: 72 },
            { id: 'standard-2year', name: es.pricing.twoYears, price: 100, ref: 144 },
            { id: 'standard-3year', name: es.pricing.threeYears, price: 140, ref: 216 },
        ]
    },
    pro: {
        name: 'IVPN Pro',
        capabilities: {
            hasWireGuard: true,
            hasPortForwarding: false,
        },
        prices: [
            { id: 'pro-1week', name: en.pricing.oneWeek, price: 4 },
            { id: 'pro-1month', name: en.pricing.oneMonth, price: 10 },
            { id: 'pro-1year', name: en.pricing.oneYear, price: 100, ref: 120 },
            { id: 'pro-2year', name: en.pricing.twoYears, price: 160, ref: 240 },
            { id: 'pro-3year', name: en.pricing.threeYears, price: 220, ref: 360 },

        ],
        pricesEs: [
            { id: 'pro-1week', name: es.pricing.oneWeek, price: 4 },
            { id: 'pro-1month', name: es.pricing.oneMonth, price: 10 },
            { id: 'pro-1year', name: es.pricing.oneYear, price: 100, ref: 120 },
            { id: 'pro-2year', name: es.pricing.twoYears, price: 160, ref: 240 },
            { id: 'pro-3year', name: es.pricing.threeYears, price: 220, ref: 360 },

        ]
    }
}

store.commit('product/setAll', { products })
store.dispatch('auth/init')

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
      en: en,
      es: es
    }
})

const app = createApp({
    render: () => h(App),
    computed: {
        ...mapState({
            isAuthenticated: state => state.auth.isAuthenticated,
            isLegacy: state => state.auth.isLegacy,
        })
    }
})

app.use(i18n)

app.mixin({
    methods: {
        emptyObject(obj) {
            if (obj == null || obj == undefined) {
                return true
            }

            return Object.keys(obj).length === 0
        }
    }
})

app.config.globalProperties.$filters = {
    formatActiveUntil(value) {
        if (typeof value == 'string') {
            value = new Date(value)
        }

        return format(value, 'MMM d, yyyy HH:mm')
    },
    formatDate(value) {
        if (typeof value == 'string') {
            value = new Date(value)
        }

        return format(value, 'MMM d, yyyy')
    },
    formatPaymentDate(value) {
        if (typeof value == 'string') {
            value = new Date(value)
        }

        return format(value, 'MMM d, yyyy')
    },
    formatDeviceDate(value) {
        if (typeof value == 'string') {
            value = new Date(value)
        }

        return format(value, 'yyy-MM-d-HH-mm')
    }
}

app.config.productionTip = false
app.use(store)
app.use(router)
app.use(i18n)
app.mount('#application')
