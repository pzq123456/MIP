
<template>
    <div class="common-layout">
        <el-container>
            <el-container class="container2">
                <el-header>
                    <div class="header-header1">
                        <p>
                            <el-icon :size="40">
                            <ChromeFilled   style="width: 1e··m; height: 1em; " size="large" />
                            </el-icon>
                    Open Health Imaging Foundation
                    <el-divider direction="vertical" style="background: rgb(32,165,214);"/>
                    
                    <el-button type="primary" siza="small" plain @click="$router.push('/table');">
                    <el-icon><ArrowLeftBold /></el-icon>
                </el-button>
                    <span>Go to table</span>
                        </p>
                        
                        <div class="toolbar">
                <el-dropdown>
                  <el-icon  :size="30" style="margin-right: 8px; margin-top: 1px" 
                    ><setting
                  /></el-icon>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>关于</el-dropdown-item>
                      <el-dropdown-item>偏好</el-dropdown-item>
                      <!-- <el-dropdown-item>Delete</el-dropdown-item> -->
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
                <span>研究用途</span>
              </div>
                    </div>
                    <div class="Menu-tools">
                        
                            <div class="Menu-tools-item">
                                <el-button type="primary"   round style="margin-left: 16px;width: 70px;height: 30px;background: rgb(32,165,214);" @click="isOpenDrawerL" id="button-drawerL">
                                <el-icon :size="20">
                                    
            <Menu   style="width: 1em; height: 1em; color: black; " size="large" /> </el-icon>    
                                </el-button>
                                    <span style="font-size: 13px; color: rgb(145, 185, 205);">序列</span>
                            </div>
                            <div class="Menu-tool-item">
                                <D3Coms></D3Coms>
                            </div>
                            <!-- <div class="Menu-tools-item">
                                    <el-button type="primary" style="margin-left: 16px" @click="isOpenDrawerR" id="button-drawerR">
                                                打开右侧抽屉
                                            </el-button>
                                </div > -->
                                <div class="Menu-tools-item">

                                    </div >
                                <div class="Menu-tools-item">
                                    <el-button type="primary" round style="margin-left: 16px;width: 70px;height: 30px;"  @click="isOpenDrawerR" id="button-drawerR">
                                    <el-icon :size="20">
                                        <Expand  style="width: 1em; height: 1em; color: black; " size="large"/>
                                    </el-icon>
                                    </el-button>
                                    <span style="font-size: 13px; color: rgb(145, 185, 205);">Measurements</span>
                                </div >
                            
                        
                    </div>
                </el-header>
                <!-- 左侧信息 -->
                <el-main class="container2-main">
                    <div id="drawer-left">
                        <el-aside v-model="drawerL" v-if="drawerL"  >
                            <span>左侧信息</span>
                             <!-- <div id="content"></div> -->
                            <!-- <slot name="content"></slot> -->
                        </el-aside>
                    </div>
                    <!-- 中间内容 -->
                    <div class="container2-main-main">
                        <div id="content"></div>
                    </div>
                    <!-- 右侧信息 -->
                    <div id="drawer-right">
                        <el-aside v-model="drawerR" v-if="drawerR" >
                                <span>右侧信息</span>
                            </el-aside>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup >
import {
    onMounted,
    ref,
    onUnmounted,
} from 'vue';
// 引入element-plus
import { DocumentCopy, Search, ChromeFilled, Memo, CircleCloseFilled, ArrowDownBold, Menu } from '@element-plus/icons-vue';

// 引入D3Ver组件
import D3Coms from '../components/D3VerComs/D3ToolComs.vue';

import D2Coms from './D2Ver.vue'

const drawerL = ref(false)
const drawerR = ref(false)
const drawer_type=ref("el_drawerL")
const drawer_width=ref("");

const isOpenDrawerL=()=>{
var el_drawerL = document.getElementById("drawer-left");
if(drawer_type.value=="el_drawerL"){
    if (drawerL.value) {
            // drawerL.value = true;
            drawer_width.value = "0px";
            el_drawerL.style.width = drawer_width.value;
            // myElement.style.background=null;
            drawerL.value = false;

        }
        else {
            drawer_width.value = "300px";
            el_drawerL.style.width = drawer_width.value;
            // myElement.style.background = " seagreen"
            drawerL.value = true;
        }
}
}
    const isOpenDrawerR = () => {
        var el_drawerR = document.getElementById("drawer-right");
        if (drawerR.value) {
        // drawerL.value = true;
        drawer_width.value = "0px";
        el_drawerR.style.width = drawer_width.value;
        // myElement.style.background=null;
        drawerR.value = false;

    }
    else {
        drawer_width.value = "300px";
        el_drawerR.style.width = drawer_width.value;
        // myElement.style.background = " seagreen"
        drawerR.value = true;
    }
}



</script>
<style scoped>
.container2-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
}

.container2-main #drawer-left,#drawer-right {
    /* width: 200px; */
    width: 0px;
    height: 500px;
    background: seagreen;
transition: width 0.3s ease-in-out;
}

.container2-main-main {
    width: 100%;
    height: 500px;
    background: black;
    border-top: solid 0.05em rgb(68,98,111);
    
}
.header-header1{
    display: flex;
   /* align-items: center; */
  height: 50px;
  border-bottom: solid 0.05em rgb(68,98,111);
  justify-content: space-between;
}
.header-header1 p{
font-size: 15px;
display: flex;
align-items: center;
}
.Menu-tools{
    display: flex;
    /* height: 100vh; */
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
}
.Menu-tools-item{
    display: flex;
     /* flex-direction: column;  */
     justify-content:space-between; /* 水平居中 */
  align-items: center; /* 垂直居中 */

}
.el-header{
    /* display: flex; */
    /* margin-bottom: 50px; */
    align-items: center;
    height: 150px;

}

</style>