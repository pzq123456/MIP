<template>
  <el-config-provider namespace="ep">
    <BaseHeader />
    <div class="flex main-container">
      <BaseSide />

      <div >
        <router-view />        
      </div>
    </div>
  </el-config-provider>
</template>

<style>
</style>