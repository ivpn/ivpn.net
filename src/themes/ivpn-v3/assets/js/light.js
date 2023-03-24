import { createApp } from 'vue'
import store from './store'
import Light from './components/OnePageCheckout'

const app = createApp(Light)
app.use(store)
app.mount('#light')