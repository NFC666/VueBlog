/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// Components
import App from './App.vue'
import api from './utils/request'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
registerPlugins(app)

app.config.globalProperties.$api = api;

app.use(pinia)
app.mount('#app')
