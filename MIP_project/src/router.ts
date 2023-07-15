import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import D2Ver from './views/D2Ver.vue'
import D3Ver from './views/D3Ver.vue'
import Segment from './views/Segment.vue'
import Utils from './views/utils.vue'
import D3Ver_demo2Vue from './views/D3Ver_demo2.vue'




const routes = [
    { path: '/', component: HelloWorld },
    { path: '/about', component: HelloWorld },
    { path: '/d2ver', component: D2Ver },
    { path: '/d3ver', component: D3Ver },
    { path: '/segment', component: Segment },
    { path: '/utils', component: Utils },
    { path: '/table', component: D3Ver_demo2Vue },

    ]
  
  // 3. 创建路由实例并传递 `routes` 配置
  // 你可以在这里输入更多的配置，但我们在这里
  // 暂时保持简单

export const router = createRouter({
  history: createWebHistory(),
  routes,
})