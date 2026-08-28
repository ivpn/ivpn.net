/**
 * SSR entry – Server Status page
 * Pre-renders ServerList.vue structural shell (empty server list).
 * Server data is fetched client-side from the API after hydration.
 */

if (typeof globalThis.window === 'undefined') {
  globalThis.window = {
    location: { href: 'http://localhost/en/status/' },
    getLanguage: () => 'en',
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  }
  globalThis.document = {
    cookie: '',
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
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
import { renderToString } from '@vue/server-renderer'
import ServerList from '@/components/ServerList.vue'
import en from '@/../../locales/en.json'
import es from '@/../../locales/es.json'

export async function render(lang = 'en', baseURL = 'http://localhost') {
  globalThis.window.location.href = `${baseURL}/${lang}/status/`

  const i18n = createI18n({
    legacy: false,
    locale: lang,
    fallbackLocale: 'en',
    messages: { en, es },
  })

  const app = createSSRApp(ServerList)
  app.use(i18n)

  return renderToString(app)
}
