<script setup>

</script> 

<template>

  <!-- 路由链接 -->
  <!-- wrapper links with button in element plus -->
  <el-button type="primary" @click="$router.push('/')">Go to Home</el-button>
  <el-button type="primary" @click="$router.push('/d2ver')">Go to D2Ver</el-button>
  <el-button type="primary" @click="$router.push('/d3ver')">Go to D3Ver</el-button>
  <el-button type="primary" @click="$router.push('/segment')">Go to Segment</el-button>
  <el-button type="primary" @click="$router.push('/table')">Go to table</el-button>
  

  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>

  <main>
    <TheWelcome />
  </main>
</template>
