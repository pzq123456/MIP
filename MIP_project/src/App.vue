<script setup>
import HelloWorld from './components/HelloWorld.vue'
import D2Ver from './views/D2Ver.vue'
</script> 

<template>
  <h1>App.vue</h1>
  <!-- 路由链接 -->
  <!-- wrapper links with button in element plus -->
  <el-button type="primary" @click="$router.push('/')">Go to Home</el-button>
  <el-button type="primary" @click="$router.push('/d2ver')">Go to D2Ver</el-button>
  <el-button type="primary" @click="$router.push('/d3ver')">Go to D3Ver</el-button>
  <el-button type="primary" @click="$router.push('/segment')">Go to Segment</el-button>
  <!-- <p>
    <RouterLink to="/">Go to Home|</RouterLink>
    <router-link to="/d2ver">Go to D2Ver|</router-link>
    <router-link to="/d3ver">Go to D3Ver|</router-link>
    <router-link to="/segment">Go to Segment|</router-link>
  </p> -->
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>

  <main>
    <TheWelcome />
  </main>
</template>
