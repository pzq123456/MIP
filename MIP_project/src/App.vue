<template>
  <el-config-provider namespace="ep">
    <BaseHeader />

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
/* #app {
  text-align: center;
  color: var(--ep-text-color-primary);
} 
 .main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 3px);
} */
</style>
