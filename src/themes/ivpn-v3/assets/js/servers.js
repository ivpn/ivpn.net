import { createApp } from 'vue'
import ServerList from './components/ServerList'
import { createI18n } from 'vue-i18n'
import en from '../../locales/en.json'
import es from '../../locales/es.json'

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
      en: en,
      es: es
    }
  })

const app = createApp(ServerList)
app.use(i18n)
app.mount('#servers')
