<script lang="ts" setup>
import { toggleDark } from "~/composables";
</script>

<template>



    <el-button type="primary" siza="small" plain @click="$router.push('/')">Go to Home</el-button>
    <el-button type="primary" siza="small" plain @click="$router.push('/d2ver');">Go to D2Ver</el-button>
    <el-button type="primary" siza="small" plain @click="$router.push('/d3ver');">Go to D3Ver</el-button>
    <el-button type="primary" siza="small" plain @click="$router.push('/segment');">Go to Segment</el-button>
    <el-button type="primary" siza="small" plain @click="$router.push('/utils');">Go to utils</el-button>
    <el-button type="primary" siza="small" plain @click="$router.push('/d3ver_demo');">Go to d3ver_demo</el-button>
    <el-button type="primary" siza="small" plain @click="$router.push('/table');">Go to Table</el-button>
    <el-menu class="el-menu-demo" mode="horizontal">

    <el-menu-item index="1">
        <img src="logo2.svg" alt="" style="height: 60px;">
        智能医疗影像处理系统</el-menu-item>
    <el-sub-menu index="2">
      <template #title>功能视图</template>
      <el-menu-item index="2-1">二维地图编辑视图</el-menu-item>
      <el-menu-item index="2-2">三维地图查看</el-menu-item>
      <el-menu-item index="2-3">数据图标视图</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>分析视图</template>
        <el-menu-item index="2-4-1">一般矢量分析</el-menu-item>
        <el-menu-item index="2-4-2">DEM 底形分析</el-menu-item>
        <el-menu-item index="2-4-3">统计信息可视化与分析</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="3" disabled>Info</el-menu-item>

    <el-menu-item h="full" @click="toggleDark()">
      <button
        class="border-none w-full bg-transparent cursor-pointer"
        style="height: var(--ep-menu-item-height)"
      >
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
    </el-menu-item>
  </el-menu>








</template>
