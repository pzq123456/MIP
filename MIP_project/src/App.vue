<script setup>
import {ref} from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import 'element-plus/theme-chalk/dark/css-vars.css'

const isDark = useDark()
const toggleDark = useToggle(isDark)

// key is used to force update the component
const comcount = ref(0)
function update() {
  comcount.value++
  console.log('update')
}

</script> 

<template>


  <!-- 路由链接 -->

<!-- add update function to d2ver and d3ver button -->
  <el-button type="primary" siza="small" plain @click="$router.push('/')">Go to Home</el-button>
  <el-button type="primary" siza="small" plain @click="$router.push('/d2ver');update()">Go to D2Ver</el-button>
  <el-button type="primary" siza="small" plain @click="$router.push('/d3ver');update()">Go to D3Ver</el-button>
  <el-button type="primary" siza="small" plain @click="$router.push('/segment');update()">Go to Segment</el-button>
  <el-button type="primary" siza="small" plain @click="$router.push('/table');update()">Go to table</el-button>
  <el-button type="primary" siza="small" plain @click="toggleDark()">暗黑模式</el-button>
  

  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view :key="comcount"></router-view>

  <main>
    <TheWelcome />
  </main>
</template>
