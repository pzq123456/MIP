<template>
  <el-config-provider namespace="ep">
    <BaseHeader />
    <el-button type="primary" siza="small" plain @click="$router.push('/')">Go to Home</el-button>
    <el-button type="primary" siza="small" plain @click="$router.push('/d2ver');">Go to D2Ver</el-button>
    <el-button type="primary" siza="small" plain @click="$router.push('/d3ver');">Go to D3Ver</el-button>
    <el-button type="primary" siza="small" plain @click="$router.push('/segment');">Go to Segment</el-button>
    <el-button type="primary" siza="small" plain @click="$router.push('/utils');">Go to utils</el-button>
    <div class="flex main-container">
      <BaseSide />

      <div w="full" py="4">
        <router-view />
        <!-- <Logos my="4" /> -->
        <!-- <HelloWorld msg="Hello Vue 3 + Element Plus + Vite" /> -->
        
      </div>
    </div>
  </el-config-provider>
</template>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}

.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 3px);
}
</style>
