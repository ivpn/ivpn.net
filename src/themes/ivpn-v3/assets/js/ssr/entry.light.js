/**
 * SSR entry – IVPN Light page (OnePageCheckout)
 * Pre-renders the static HTML shell of the checkout form.
 */

if (typeof globalThis.window === 'undefined') {
  globalThis.window = {
    location: { href: 'http://localhost/light/' },
    updateLoginMenu: () => {},
    getLanguage: () => 'en',
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
    crypto: {
      getRandomValues: (arr) => { arr.fill(0); return arr },
      subtle: {},
    },
  }
  globalThis.document = {
    cookie: '',
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
  }
}


import { createSSRApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createStore } from 'vuex'
import { createRouter, createMemoryHistory } from 'vue-router'
import { renderToString } from '@vue/server-renderer'
import OnePageCheckout from '@/views/OnePageCheckout.vue'
import en from '@/../../locales/en.json'
import es from '@/../../locales/es.json'

const lightModule = {
  namespaced: true,
  state: () => ({}),
  mutations: {},
  actions: {},
  getters: {},
}

export async function render(lang = 'en', baseURL = 'http://localhost') {
  globalThis.window.location.href = `${baseURL}/light/`
  const store = createStore({ modules: { light: lightModule } })

  const i18n = createI18n({
    legacy: false,
    locale: lang,
    fallbackLocale: 'en',
    messages: { en, es },
  })

  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/light', component: OnePageCheckout }],
  })

  const app = createSSRApp(OnePageCheckout)
  app.use(store)
  app.use(i18n)
  app.use(router)

  await router.push('/light')
  await router.isReady()

  return renderToString(app)
}
