import { createSSRApp as createApp, h } from 'vue'
import App from './App.vue'

import router from './router/index.js'
import store from './store/index.js'

import { format } from 'date-fns'
import { mapState } from 'vuex'
import { createI18n } from 'vue-i18n'
import en from '../../locales/en.json'
import es from '../../locales/es.json'


let products = {
    tier1: {
        name: 'Tier 1',
        capabilities: {
            hasWireGuard: true,
            hasPortForwarding: false,
        },
        prices: [
            { id: 'standard-1week', name: en.pricing.oneWeek, price: 2 },
            { id: 'standard-1month', name: en.pricing.oneMonth, price: 6 },
            { id: 'standard-1year', name: en.pricing.oneYear, price: 60},
            { id: 'standard-2year', name: en.pricing.twoYears, price: 100},
            { id: 'standard-3year', name: en.pricing.threeYears, price: 140},
        ],
        pricesEs: [
            { id: 'standard-1week', name: es.pricing.oneWeek, price: 2 },
            { id: 'standard-1month', name: es.pricing.oneMonth, price: 6 },
            { id: 'standard-1year', name: es.pricing.oneYear, price: 60},
            { id: 'standard-2year', name: es.pricing.twoYears, price: 100},
            { id: 'standard-3year', name: es.pricing.threeYears, price: 140},
        ]
    },
    tier2: {
        name: 'Tier 2',
        capabilities: {
            hasWireGuard: true,
            hasPortForwarding: false,
        },
        prices: [
            { id: 'plus-1week', name: en.pricing.oneWeek, price: 3 },
            { id: 'plus-1month', name: en.pricing.oneMonth, price: 8 },
            { id: 'plus-1year', name: en.pricing.oneYear, price: 80},
            { id: 'plus-2year', name: en.pricing.twoYears, price: 140},
            { id: 'plus-3year', name: en.pricing.threeYears, price: 180},
        ],
        pricesEs: [
            { id: 'plus-1week', name: es.pricing.oneWeek, price: 3 },
            { id: 'plus-1month', name: es.pricing.oneMonth, price: 8 },
            { id: 'plus-1year', name: es.pricing.oneYear, price: 80},
            { id: 'plus-2year', name: es.pricing.twoYears, price: 140},
            { id: 'plus-3year', name: es.pricing.threeYears, price: 180},
        ]
    },
    tier3: {
        name: 'Tier 3',
        capabilities: {
            hasWireGuard: true,
            hasPortForwarding: false,
        },
        prices: [
            { id: 'pro-1week', name: en.pricing.oneWeek, price: 4 },
            { id: 'pro-1month', name: en.pricing.oneMonth, price: 10 },
            { id: 'pro-1year', name: en.pricing.oneYear, price: 100},
            { id: 'pro-2year', name: en.pricing.twoYears, price: 160},
            { id: 'pro-3year', name: en.pricing.threeYears, price: 220},

        ],
        pricesEs: [
            { id: 'pro-1week', name: es.pricing.oneWeek, price: 4 },
            { id: 'pro-1month', name: es.pricing.oneMonth, price: 10 },
            { id: 'pro-1year', name: es.pricing.oneYear, price: 100},
            { id: 'pro-2year', name: es.pricing.twoYears, price: 160},
            { id: 'pro-3year', name: es.pricing.threeYears, price: 220},
        ]
    }
}

store.commit('product/setAll', { products })

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

// auth/init reads the loggedIn cookie synchronously. It must run before
// router.isReady() so that router.beforeEach sees the correct isAuthenticated
// state during the initial navigation (e.g. a page refresh on /account).
store.dispatch('auth/init')

// Await router resolution before mounting so $route is correct during SSR hydration.
router.isReady().then(() => {
    app.mount('#application')
})
