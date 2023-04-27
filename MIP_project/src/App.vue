<script setup>
import { useDark, useToggle } from '@vueuse/core'
import 'element-plus/theme-chalk/dark/css-vars.css'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script> 

<template>


  <!-- 路由链接 -->
  <!-- wrapper links with button in element plus -->
  <el-button type="primary" siza="small" plain @click="$router.push('/')">Go to Home</el-button>
  <el-button type="primary" siza="small" plain @click="$router.push('/d2ver')">Go to D2Ver</el-button>
  <el-button type="primary" siza="small" plain @click="$router.push('/d3ver')">Go to D3Ver</el-button>
  <el-button type="primary" siza="small" plain @click="$router.push('/segment')">Go to Segment</el-button>
  <el-button type="primary" siza="small" plain @click="$router.push('/table')">Go to table</el-button>
  <el-button type="primary" siza="small" plain @click="toggleDark()">暗黑模式</el-button>

  

  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>

  <main>
    <TheWelcome />
  </main>
</template>
