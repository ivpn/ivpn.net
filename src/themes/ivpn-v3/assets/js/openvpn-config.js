import { createApp } from 'vue'
import OpenvpnConfig from './components/OpenvpnConfig'
import { createI18n } from 'vue-i18n'
import en from '../../locales/en.json'
import es from '../../locales/es.json'

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
      en: en,
      es: es
    }
})
const app = createApp(OpenvpnConfig)
app.use(i18n)
app.mount('#openvpn-config')
