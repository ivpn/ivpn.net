import { createApp } from 'vue'
import store from './store'
import SupportUa from './components/SupportUA'

const app = createApp(SupportUa)
app.use(store)
app.mount('#supportua')
