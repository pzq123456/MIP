import { createApp } from 'vue' 
import App from './App.vue'
import { router } from './router'

// 导入ICON图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// const app = createApp(App).use(router)
const app = createApp(App);
app.use(router);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')