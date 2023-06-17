<script setup>
import {ref} from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import 'element-plus/theme-chalk/dark/css-vars.css'

const isDark = useDark()
const toggleDark = useToggle(isDark)

</script> 

<template>


  <!-- 路由链接 -->

<!-- add update function to d2ver and d3ver button -->

  <el-button color="#626aef" :dark="isDark" type="primary" siza="small" plain @click="$router.push('/')">Go to Home</el-button>
  <el-button color="#626aef" :dark="isDark" type="primary" siza="small" plain @click="$router.push('/d2ver');">Go to D2Ver</el-button>
  <el-button color="#626aef" :dark="isDark" type="primary" siza="small" plain @click="$router.push('/d3ver');">Go to D3Ver</el-button>
  <el-button color="#626aef" :dark="isDark" type="primary" siza="small" plain @click="$router.push('/segment');">Go to Segment</el-button>
  <el-button color="#626aef" :dark="isDark" type="primary" siza="small" plain @click="$router.push('/table');">Go to table</el-button>
  <el-button color="#626aef" :dark="isDark" type="primary" siza="small" plain @click="$router.push('/utils');">Go to utils</el-button>
  <el-button color="#626aef" :dark="isDark" type="primary" siza="small" plain @click="$router.push('/d3ver_demo');">Go to D3Ver_demo</el-button>
  <el-button color="#626aef" :dark="isDark" type="primary" siza="small" plain @click="$router.push('/segpanel');">Go to SegPanel</el-button>
  <el-button color="#626aef" :dark="isDark" type="primary" siza="small" plain @click="toggleDark()">暗黑模式</el-button>

  

  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->

      <router-view />

</template>
<style scoped>

</style>
