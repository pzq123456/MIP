<template>
    <div id="demo-toolbar">
        <el-row class="mb-4">
            <el-button>Default</el-button>
             <el-tooltip
                effect="light"
                content="长度测量">
            <el-button class="Measurement-tool" type="primary" @Click="add_Tool(LengthTool.toolName)">长度测量 |
                <el-dropdown>
                            <el-button class="dropdown-btn" type="primary" circle style="margin-left: 16px;background: rgb(156,206,249);" >
                            <el-icon><MoreFilled style="width: 1em; height: 1em; color: black; " size="small"/></el-icon>
                          </el-button>
                          <template #dropdown>
                            <el-dropdown-menu>
                              <el-dropdown-item>
                                <el-tooltip
                                effect="light"
                                content="双向长度">
                                <el-button type="primary" @Click="add_Tool(BidirectionalTool.toolName)">双向长度</el-button>
                            </el-tooltip>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <el-button type="primary" @Click="add_Tool(CircleROITool.toolName)">圆</el-button>
                              </el-dropdown-item>
                              <el-dropdown-item>Action 3</el-dropdown-item>
                              <el-dropdown-item>Action 4</el-dropdown-item>
                              <el-dropdown-item>Action 5</el-dropdown-item>
                            </el-dropdown-menu>
                          </template>
                        </el-dropdown>
                </el-button>
            </el-tooltip>
            <!-- <el-button class="Measurement-tool" type="primary" @Click="add_Tool(LengthTool.toolName)">长度测量 |
            <el-dropdown>
                        <el-button class="dropdown-btn" type="primary" circle style="margin-left: 16px;background: rgb(156,206,249);" >
                        <el-icon><MoreFilled style="width: 1em; height: 1em; color: black; " size="small"/></el-icon>
                      </el-button>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item>
                            <el-button type="primary" @Click="add_Tool(BidirectionalTool.toolName)">双向长度</el-button>
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <el-button type="primary" @Click="add_Tool(CircleROITool.toolName)">圆</el-button>
                          </el-dropdown-item>
                          <el-dropdown-item>Action 3</el-dropdown-item>
                          <el-dropdown-item>Action 4</el-dropdown-item>
                          <el-dropdown-item>Action 5</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
            </el-button> -->

             <!-- <el-tooltip
                effect="light"
                content="放大镜">
            
            </el-tooltip> -->
            <el-button type="success" @Click="add_Tool(ZoomTool.toolName)" >放大</el-button>
            <el-button type="success" @Click="clear_Tool()" >恢复鼠标</el-button>
            <!-- <el-button type="primary" @Click="add_Tool(BidirectionalTool.toolName)">双向长度</el-button> -->
            <!-- <el-button type="primary" @Click="add_Tool(CircleROITool.toolName)">圆</el-button> -->
            <el-button type="primary" @Click="add_Tool(CircleScissorsTool.toolName)">圆分割</el-button>
            <el-tooltip
            effect="light"
            content="放大镜">
            <el-button type="primary" @Click="add_Tool(MagnifyTool.toolName)">放大镜</el-button>
        </el-tooltip>
        
            <el-tooltip
                    effect="light"
                    content="箭头注释">
            <el-button type="primary" @Click="add_Tool(ArrowAnnotateTool.toolName)">箭头注释</el-button>
                </el-tooltip>
                <el-button type="primary" @Click="add_Tool(PanTool.toolName)">平移</el-button>
                <el-button type="primary" @Click="add_Tool(WindowLevelTool.toolName)"> WindowLevelTool</el-button>
            
            
        </el-row>
    </div>
    <!-- <div id="content"></div> -->
    <!-- content内容部分放在了D3Ver页面上 -->
</template>
<script setup>
import * as cornerstoneTools from '@cornerstonejs/tools';
// 定义一些工具
const {
    WindowLevelTool,
    PanTool,
    MagnifyTool,
    CircleScissorsTool,
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

import {
    RenderingEngine,
    Enums,
    volumeLoader,
    getRenderingEngine,
    cache,
} from '@cornerstonejs/core';
import {
    initDemo,
    createImageIdsAndCacheMetaData,
    setTitleAndDescription,
    addButtonToToolbar,
    addDropdownToToolbar,
    setCtTransferFunctionForVolumeActor,
    setPetColorMapTransferFunctionForVolumeActor,
} from '../../helpers'

import {
    onMounted,
    ref,
    onUnmounted,
} from 'vue';



// 定义数据
// 定义一些公共变量

const viewportId = 'CT_STACK';
const renderingEngineId = '2D';
const toolGroupId = 'STACK_TOOL_GROUP_ID';

const { ViewportType } = Enums;
const { MouseBindings } = csToolsEnums;
// 默认工具
const toolsNames = [
    WindowLevelTool.toolName,
    PanTool.toolName,
    MagnifyTool.toolName,
    CircleScissorsTool.toolName,
    ZoomTool.toolName,
    LengthTool.toolName,
    ProbeTool.toolName,
    RectangleROITool.toolName,
    EllipticalROITool.toolName,
    CircleROITool.toolName,
    BidirectionalTool.toolName,
    AngleTool.toolName,
    CobbAngleTool.toolName,
    ArrowAnnotateTool.toolName,
];
let selectedToolName = toolsNames[0];

const tools = [
    WindowLevelTool,
    PanTool,
    MagnifyTool,
    CircleScissorsTool,
    LengthTool,
    ProbeTool,
    RectangleROITool,
    EllipticalROITool,
    CircleROITool,
    BidirectionalTool,
    AngleTool,
    CobbAngleTool,
    ArrowAnnotateTool,
    ZoomTool,
    StackScrollMouseWheelTool,
]
onMounted(() => {
    // using ref to get 'content' element
    const content = ref(document.getElementById('content'));
    // const drawer-left=ref(document.getElementById('drawer-left'))
    const element = document.createElement('div');
    // Disable the default context menu
    element.oncontextmenu = (e) => e.preventDefault();
    element.id = 'cornerstone-element';
    element.style.width = '500px';
    element.style.height = '500px';
    // and then append the element to 'content'
    const container = ref(document.getElementById('demo-toolbar')); // 获取toolbar元素
    content.value.appendChild(element);
    // drawer-left.value.appendChild(element;)
    run(element);
});
const add_Tool = (newSelectedTool) => {
    // var isToolGroup=
    // if(toolGroup){
    //  ToolGroupManager.destroyToolGroup(toolGroupId)   
    //
    // // 创建一个工具组并添加我们要使用的工具。
    // const toolGroup = ToolGroupManager.createToolGroup(toolGroupId);

    // // 把工具组添加到选定的视口中
    // // 使之成为公共变量
    // toolGroup.addViewport(viewportId, renderingEngineId);
     var get_toolGroup = ToolGroupManager.getToolGroup(toolGroupId);
     console.log(toolsNames)
     
     get_toolGroup.addTool(newSelectedTool);
        // 工具绑定鼠标事件
        get_toolGroup.setToolActive(newSelectedTool, {
            bindings: [
                {
                    mouseButton: MouseBindings.Primary, // Left Click
                },
            ],
        });
        get_toolGroup.setToolPassive(selectedToolName);
        selectedToolName = newSelectedTool;
    }
    
const clear_Tool=()=>{

}

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
    // 注册工具
    tools.forEach(tool => cornerstoneTools.addTool(tool));
    // create a ToolGroup and add the tools we want to use. 
    // ToolGroups makes it possible to share tools between multiple viewports, 
    // so we also need to let the ToolGroup know which viewports it should act on.

    // 创建一个工具组并添加我们要使用的工具。
    const toolGroup = ToolGroupManager.createToolGroup(toolGroupId);

    // 把工具组添加到选定的视口中
    // 使之成为公共变量
    toolGroup.addViewport(viewportId, renderingEngineId);
    // We set all the other tools passive here, this means that any state is rendered, and editable
    // But aren't actively being drawn (see the toolModes example for information)
    // 使某些功能失效变被动
    toolGroup.setToolPassive(ProbeTool.toolName);
    toolGroup.setToolPassive(RectangleROITool.toolName);
    toolGroup.setToolPassive(EllipticalROITool.toolName);
    toolGroup.setToolPassive(CircleROITool.toolName);
    toolGroup.setToolPassive(BidirectionalTool.toolName);
    toolGroup.setToolPassive(AngleTool.toolName);
    toolGroup.setToolPassive(CobbAngleTool.toolName);
    toolGroup.setToolPassive(ArrowAnnotateTool.toolName);

    toolGroup.setToolActive(StackScrollMouseWheelTool.toolName);
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
.Measurement-tool {
    background: black;
}

</style>