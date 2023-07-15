<template>
  <el-config-provider namespace="ep">
    <BaseHeader />
    <el-button type="primary" siza="small" plain @click="$router.push('/')">Go to Home</el-button>
    <el-button type="primary" siza="small" plain @click="$router.push('/d2ver');">Go to D2Ver</el-button>
    <el-button type="primary" siza="small" plain @click="$router.push('/d3ver');">Go to D3Ver</el-button>
    <el-button type="primary" siza="small" plain @click="$router.push('/segment');">Go to Segment</el-button>
    <el-button type="primary" siza="small" plain @click="$router.push('/utils');">Go to utils</el-button>
    <el-button type="primary" siza="small" plain @click="$router.push('/d3ver_demo');">Go to d3ver_demo</el-button>
    <el-button type="primary" siza="small" plain @click="$router.push('/table');">Go to Table<Table></Table></el-button>
    <div class="flex main-container">
      <BaseSide />

      <div w="full" py="4">
        <router-view />
        
      </div>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import 'element-plus/theme-chalk/dark/css-vars.css'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
<style >
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
} 
 .main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 3px);
}
</style>
