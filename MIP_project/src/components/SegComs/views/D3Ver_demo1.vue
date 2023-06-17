
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
                    <el-button type="primary" siza="small" plain @click="$router.push('/table');">Go to table</el-button>
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
                                <ToolBar :renderingEngineId="renderingEngineId" :viewportId="viewportId"
                                :toolGroupId="toolGroupId" :viewport="viewport"
                                ></ToolBar> 
                            </div>
                            <div class="Menu-tools-item">
                                    <el-button type="primary" style="margin-left: 16px" @click="isOpenDrawerR" id="button-drawerR">
                                                打开右侧抽屉
                                            </el-button>
                                </div >
                                <div class="Menu-tools-item">
                                    <el-dropdown>
                                <el-button type="primary" circle style="margin-left: 16px;background: rgb(156,206,249);" >
            
            <el-icon><MoreFilled style="width: 1em; height: 1em; color: black; " size="small"/></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item>Action 4</el-dropdown-item>
              <el-dropdown-item>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
// 引入cornerstoneTools
import * as cornerstoneTools from '@cornerstonejs/tools';
// 引入 cornerstonejs_core
import {
    RenderingEngine,
    Enums,
    volumeLoader,
    getRenderingEngine,
    cache,
} from '@cornerstonejs/core';
// 引入工具栏组件
import ToolBar from '../components/D3VerComs/ToolBar.vue';
import {
    initDemo,
    createImageIdsAndCacheMetaData,
    setTitleAndDescription,
    addButtonToToolbar,
    addDropdownToToolbar,
    setCtTransferFunctionForVolumeActor,
    setPetColorMapTransferFunctionForVolumeActor,
} from '../helpers'

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
            drawer_width.value = "200px";
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
        drawer_width.value = "200px";
        el_drawerR.style.width = drawer_width.value;
        // myElement.style.background = " seagreen"
        drawerR.value = true;
    }
}


// 定义数据
// 定义一些公共变量

const viewportId = 'CT_STACK';
const renderingEngineId = '2D';
const toolGroupId = 'STACK_TOOL_GROUP_ID';
const { ViewportType } = Enums;
const { MouseBindings } = csToolsEnums;
// 定义一些工具
const {
    LengthTool,
    ProbeTool,
    RectangleROITool,
    EllipticalROITool,
    CircleROITool,
    BidirectionalTool,
    AngleTool,
    CobbAngleTool,
    ToolGroupManager,
    ArrowAnnotateTool,
    ZoomTool,
    StackScrollMouseWheelTool,
    Enums: csToolsEnums,
} = cornerstoneTools;
onMounted(() => {
    // using ref to get 'content' element
    const content = ref(document.getElementById('content'));
    const element = document.createElement('div');
    // Disable the default context menu
    element.oncontextmenu = (e) => e.preventDefault();
    element.id = 'cornerstone-element';
    element.style.width = '500px';
    element.style.height = '500px';
    // and then append the element to 'content'
    const container = ref(document.getElementById('demo-toolbar')); // 获取toolbar元素
    content.value.appendChild(element);

    run(element);
});

onUnmounted(() => {
    // Get the rendering engine
    const renderingEngine = getRenderingEngine(renderingEngineId);

    // Get the stack viewport
    const viewport = (
        renderingEngine.getViewport(viewportId)
    );
    // console.log(viewport);
    cache.purgeCache(); // 清除缓存
    // distory the tool group
    cornerstoneTools.destroy();
    renderingEngine.disableElement(viewportId);

    // Remove the viewport from the DOM
    viewport.element.remove();
    renderingEngine.destroy();

});

/**
 * Runs the demo
 */
async function run(element) {
    // Init Cornerstone and related libraries
    await initDemo();
    // selectedToolName = newSelectedToolName;
    // Get Cornerstone imageIds and fetch metadata into RAM
    const imageIds = await createImageIdsAndCacheMetaData({
        StudyInstanceUID:
            '1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463',
        SeriesInstanceUID:
            '1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561',
        wadoRsRoot: 'https://d3t6nz73ql33tx.cloudfront.net/dicomweb',
    });

    // Instantiate a rendering engine

    const renderingEngine = new RenderingEngine(renderingEngineId);
    // Create a stack viewport
    const viewportInput = {
        viewportId,
        type: ViewportType.STACK,
        element,
        defaultOptions: {
            background: [0.2, 0, 0.2],
        },
    };
    renderingEngine.enableElement(viewportInput);
    // Get the stack viewport that was created
    const viewport = (
        renderingEngine.getViewport(viewportId)
    );


    // Define a stack containing a single image

    // 不同的imageIds[10]对应不同的影像，就跟stack一样叠放上去
    const stack = [imageIds[10]];
    console.log(imageIds[15]);
    // Set the stack on the viewport
    await viewport.setStack(stack);
    // Set the VOI of the stack
    viewport.setProperties({ voiRange: ctVoiRange });
    // Render the image
    viewport.render();
    renderingEngine.render();
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
transition: width 1s ease-in-out;
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
     flex-direction: column; /* 垂直排布 */
     justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */

}
.el-header{
    /* display: flex; */
    /* margin-bottom: 50px; */
    align-items: center;
    height: 150px;

}

</style>