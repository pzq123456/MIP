<script lang="ts" setup>
import { toggleDark } from "~/composables";
</script>

<template>



   <el-button type="primary" siza="small" plain @click="$router.push('/')">Go to Home</el-button>
    <el-button type="primary" siza="small" plain @click="$router.push('/d2ver');">Go to D2Ver</el-button>
    <el-button type="primary" siza="small" plain @click="$router.push('/d3ver');">Go to D3Ver</el-button>
    <el-button type="primary" siza="small" plain @click="$router.push('/segment');">Go to Segment</el-button>
    <el-button type="primary" siza="small" plain @click="$router.push('/utils');">Go to utils</el-button>
  








</template>
