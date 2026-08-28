/**
 * SSR entry – Pricing page
 * Pre-renders Prices.vue (unauthenticated state) at build time.
 * The exported `render(lang)` is called by scripts/ssr-render.mjs.
 */

// Polyfill browser globals before any module that touches them is imported.
// window.location.href is updated per-render call using the baseURL argument.
if (typeof globalThis.window === 'undefined') {
  globalThis.window = {
    location: { href: 'http://localhost/en/pricing/' },
    updateLoginMenu: () => {},
    getLanguage: () => 'en',
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  }
  globalThis.document = {
    cookie: '',
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
  }
}

import { createSSRApp, h } from 'vue'
import { createI18n } from 'vue-i18n'
import { createStore } from 'vuex'
import { createRouter, createMemoryHistory } from 'vue-router'
import { renderToString } from '@vue/server-renderer'
import App from '@/App.vue'
import Prices from '@/views/Prices.vue'
import en from '@/../../locales/en.json'
import es from '@/../../locales/es.json'

// ── Product data (mirrors app.js) ────────────────────────────────────────────
const products = {
  tier1: {
    name: 'Tier 1',
    capabilities: { hasWireGuard: true, hasPortForwarding: false },
    prices: [
      { id: 'standard-1week',  name: en.pricing.oneWeek,    price: 2   },
      { id: 'standard-1month', name: en.pricing.oneMonth,   price: 6   },
      { id: 'standard-1year',  name: en.pricing.oneYear,    price: 60  },
      { id: 'standard-2year',  name: en.pricing.twoYears,   price: 100 },
      { id: 'standard-3year',  name: en.pricing.threeYears, price: 140 },
    ],
    pricesEs: [
      { id: 'standard-1week',  name: es.pricing.oneWeek,    price: 2   },
      { id: 'standard-1month', name: es.pricing.oneMonth,   price: 6   },
      { id: 'standard-1year',  name: es.pricing.oneYear,    price: 60  },
      { id: 'standard-2year',  name: es.pricing.twoYears,   price: 100 },
      { id: 'standard-3year',  name: es.pricing.threeYears, price: 140 },
    ],
  },
  tier2: {
    name: 'Tier 2',
    capabilities: { hasWireGuard: true, hasPortForwarding: false },
    prices: [
      { id: 'plus-1week',  name: en.pricing.oneWeek,    price: 3   },
      { id: 'plus-1month', name: en.pricing.oneMonth,   price: 8   },
      { id: 'plus-1year',  name: en.pricing.oneYear,    price: 80  },
      { id: 'plus-2year',  name: en.pricing.twoYears,   price: 140 },
      { id: 'plus-3year',  name: en.pricing.threeYears, price: 180 },
    ],
    pricesEs: [
      { id: 'plus-1week',  name: es.pricing.oneWeek,    price: 3   },
      { id: 'plus-1month', name: es.pricing.oneMonth,   price: 8   },
      { id: 'plus-1year',  name: es.pricing.oneYear,    price: 80  },
      { id: 'plus-2year',  name: es.pricing.twoYears,   price: 140 },
      { id: 'plus-3year',  name: es.pricing.threeYears, price: 180 },
    ],
  },
  tier3: {
    name: 'Tier 3',
    capabilities: { hasWireGuard: true, hasPortForwarding: false },
    prices: [
      { id: 'pro-1week',  name: en.pricing.oneWeek,    price: 4   },
      { id: 'pro-1month', name: en.pricing.oneMonth,   price: 10  },
      { id: 'pro-1year',  name: en.pricing.oneYear,    price: 100 },
      { id: 'pro-2year',  name: en.pricing.twoYears,   price: 160 },
      { id: 'pro-3year',  name: en.pricing.threeYears, price: 220 },
    ],
    pricesEs: [
      { id: 'pro-1week',  name: es.pricing.oneWeek,    price: 4   },
      { id: 'pro-1month', name: es.pricing.oneMonth,   price: 10  },
      { id: 'pro-1year',  name: es.pricing.oneYear,    price: 100 },
      { id: 'pro-2year',  name: es.pricing.twoYears,   price: 160 },
      { id: 'pro-3year',  name: es.pricing.threeYears, price: 220 },
    ],
  },
}

// ── Minimal Vuex modules for SSR (no browser APIs, unauthenticated state) ────
const authModule = {
  namespaced: true,
  state: () => ({
    isAuthenticated: false,
    isLegacy: false,
    isLoaded: false,
    inProgress: false,
    account: null,
    error: null,
  }),
  mutations: {
    setState() {},
    setAccount() {},
    updateAccount() {},
    started() {},
    failed() {},
    done() {},
  },
  actions: {
    init() {},
    load() {},
    createAccount() {},
  },
  getters: {},
}

const productModule = {
  namespaced: true,
  state: () => ({ inProgress: false, error: null, all: [] }),
  mutations: {
    started(state) { state.inProgress = true; state.error = null },
    failed(state, { error }) { state.inProgress = false; state.error = error },
    done(state) { state.inProgress = false },
    setAll(state, { products }) { state.all = products },
  },
  actions: {},
}

const popupModule = {
  namespaced: true,
  state: () => ({}),
  mutations: { show() {} },
  actions: {},
}

// ── render() – creates a fresh app instance per call ─────────────────────────
export async function render(lang = 'en', baseURL = 'http://localhost') {
  globalThis.window.location.href = `${baseURL}/${lang}/pricing/`

  const store = createStore({
    modules: { auth: authModule, product: productModule, popup: popupModule },
  })
  store.commit('product/setAll', { products })

  const i18n = createI18n({
    legacy: false,
    locale: lang,
    fallbackLocale: 'en',
    messages: { en, es },
  })

  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/pricing', component: Prices },
      { path: '/en/pricing', component: Prices },
      { path: '/es/pricing', component: Prices },
    ],
  })

  // Render App.vue (same root component as the client) so that the SSR HTML
  // has the exact same DOM structure — including Vue fragment markers — that
  // createSSRApp(App) expects to find during hydration.
  const app = createSSRApp({ render: () => h(App) })
  app.use(store)
  app.use(i18n)
  app.use(router)
  app.mixin({
    methods: {
      emptyObject(obj) {
        return obj == null || obj === undefined || Object.keys(obj).length === 0
      },
    },
  })

  await router.push(`/${lang}/pricing`)
  await router.isReady()

  return renderToString(app)
}
