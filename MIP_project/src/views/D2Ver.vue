<template>
<h5> 2D 视图 开发中</h5>
<a href="https://www.cornerstonejs.org/docs/category/getting-started">库访问连接</a>
<a href="https://cn.vuejs.org/api/composition-api-lifecycle"> Vue 文档</a>
<a href="https://juejin.cn/post/7132361845796503566">教程</a>

<div id="demo-toolbar"></div>
<div id="content"></div>
</template>

<script setup>

import { 
  onMounted,
  ref,
  onUnmounted,
} from 'vue';

import {
  RenderingEngine,
  Enums,
  volumeLoader,
  getRenderingEngine,
} from '@cornerstonejs/core';

import {
  initDemo,
  createImageIdsAndCacheMetaData,
  setTitleAndDescription,
  addButtonToToolbar,
  addDropdownToToolbar,
  setCtTransferFunctionForVolumeActor,
  setPetColorMapTransferFunctionForVolumeActor,
} from '../helpers';



import * as cornerstoneTools from '@cornerstonejs/tools';

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

// 定义一些公共变量
const { ViewportType, Events } = Enums;
const { MouseBindings } = csToolsEnums;
const renderingEngineId = 'myRenderingEngine';
const viewportId = 'CT_SAGITTAL_STACK';

// Define unique ids for the volumes
const volumeLoaderScheme = 'cornerstoneStreamingImageVolume'; // Loader id which defines which volume loader to use
const ctVolumeName = 'CT_VOLUME_ID'; // Id of the volume less loader prefix
const ctVolumeId = `${volumeLoaderScheme}:${ctVolumeName}`; // VolumeId with loader id + volume id

// Define a unique id for the volume
const ptVolumeName = 'PT_VOLUME_ID';
const ptVolumeId = `${volumeLoaderScheme}:${ptVolumeName}`;

const toolGroupId = 'STACK_TOOL_GROUP_ID';

const toolsNames = [
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

onMounted(() => {
  // using ref to get 'content' element
  const content = ref(document.getElementById('content')); // 获取content元素
  const element = document.createElement('div');
  element.id = 'cornerstone-element';
  element.style.width = '800px';
  element.style.height = '800px';
  // Disable right click context menu so we can have right click tools
  element.oncontextmenu = (e) => e.preventDefault();

  const container = ref(document.getElementById('demo-toolbar')); // 获取toolbar元素

  content.value.appendChild(element);

  addButtonToToolbar({
  title: 'Set CT VOI Range',
  onClick: () => {
    // Get the rendering engine
    // 通过id获取渲染引擎
    const renderingEngine = getRenderingEngine(renderingEngineId);

    // Get the stack viewport
    // 通过id获取视图
    const viewport = (
      renderingEngine.getViewport(viewportId)
    );

    viewport.setProperties({ voiRange: { lower: -1500, upper: 2500 } }); // 设置属性
    viewport.render(); // 渲染
  },
  container : container.value, // 容器
});

addButtonToToolbar({
  container : container.value,
  title: 'Reset Viewport',
  onClick: () => {
    // Get the rendering engine
    const renderingEngine = getRenderingEngine(renderingEngineId);

    // Get the volume viewport
    const viewport = (
      renderingEngine.getViewport(viewportId) // 通过id获取视图
    );

    // Resets the viewport's camera
    viewport.resetCamera(); // 重置相机

    viewport.render(); // 渲染
  },
});

let fused = false; // 定义一个变量

addButtonToToolbar({
  container : container.value,
  title: 'toggle PET',
  onClick: () => {
    // Get the rendering engine
    const renderingEngine = getRenderingEngine(renderingEngineId);

    // Get the volume viewport
    const viewport = (
      renderingEngine.getViewport(viewportId)
    );
    if (fused) {
      // Removes the PT actor from the scene
      // 移除 PT actor
      viewport.removeVolumeActors([ptVolumeId], true);

      fused = false;
    } else {
      // Add the PET volume to the viewport. It is in the same DICOM Frame Of Reference/worldspace
      // If it was in a different frame of reference, you would need to register it first.
      // 添加 PET volume 到视图 与CT在同一坐标系 如果不是同一坐标系，需要先注册
      viewport.addVolumes(
        [
          {
            volumeId: ptVolumeId,
            callback: setPetColorMapTransferFunctionForVolumeActor,
          },
        ],
        true
      );

      fused = true;
    }
  },
});
const orientationOptions = {
  axial: 'axial',
  sagittal: 'sagittal',
  coronal: 'coronal',
  oblique: 'oblique',
};

addDropdownToToolbar({
  options: {
    values: ['axial', 'sagittal', 'coronal', 'oblique'],
    defaultValue: 'sagittal',
  },
  onSelectedValueChange: (selectedValue) => {
    // Get the rendering engine
    const renderingEngine = getRenderingEngine(renderingEngineId);

    // Get the volume viewport
    const viewport = (
      renderingEngine.getViewport(viewportId)
    );

    let viewUp;
    let viewPlaneNormal;

    switch (selectedValue) {
      case orientationOptions.axial:
        viewport.setOrientation(Enums.OrientationAxis.AXIAL);

        break;
      case orientationOptions.sagittal:
        viewport.setOrientation(Enums.OrientationAxis.SAGITTAL);

        break;
      case orientationOptions.coronal:
        viewport.setOrientation(Enums.OrientationAxis.CORONAL);

        break;
      case orientationOptions.oblique:
        // Some random oblique value for this dataset
        viewUp = [-0.5962687530844388, 0.5453181550345819, -0.5891448751239446];
        viewPlaneNormal = [
          -0.5962687530844388, 0.5453181550345819, -0.5891448751239446,
        ];

        viewport.setCamera({ viewUp, viewPlaneNormal });
        viewport.resetCamera();
        break;
    }

    viewport.render();
  },
});

    const info = document.createElement('div');
    content.value.appendChild(info);

    const instructions = document.createElement('p');
    instructions.innerText = 'Left Click to use selected tool';
    info.appendChild(instructions);

    const rotationInfo = document.createElement('div');
    info.appendChild(rotationInfo);

    const flipHorizontalInfo = document.createElement('div');
    info.appendChild(flipHorizontalInfo);

    const flipVerticalInfo = document.createElement('div');
    info.appendChild(flipVerticalInfo);

    element.addEventListener(Events.CAMERA_MODIFIED, (_) => {
    // Get the rendering engine
    const renderingEngine = getRenderingEngine(renderingEngineId);

    // Get the stack viewport
    const viewport = (
        renderingEngine.getViewport(viewportId)
    );

    if (!viewport) {
        return;
    }

    const { flipHorizontal, flipVertical } = viewport.getCamera();
    const { rotation } = viewport.getProperties();

    rotationInfo.innerText = `Rotation: ${Math.round(rotation)}`;
    flipHorizontalInfo.innerText = `Flip horizontal: ${flipHorizontal}`;
    flipVerticalInfo.innerText = `Flip vertical: ${flipVertical}`;
    });

    addDropdownToToolbar({
    options: { values: toolsNames, defaultValue: selectedToolName },
    onSelectedValueChange: (newSelectedToolNameAsStringOrNumber) => {
        const newSelectedToolName = String(newSelectedToolNameAsStringOrNumber);
        const toolGroup = ToolGroupManager.getToolGroup(toolGroupId);

        // Set the new tool active
        toolGroup.setToolActive(newSelectedToolName, {
        bindings: [
            {
            mouseButton: MouseBindings.Primary, // Left Click
            },
        ],
        });

        // Set the old tool passive
        toolGroup.setToolPassive(selectedToolName);

        selectedToolName = newSelectedToolName;
    },
    });

    addButtonToToolbar({
    container : container.value, // 容器
    title: 'Flip H',
    onClick: () => {
        // Get the rendering engine
        const renderingEngine = getRenderingEngine(renderingEngineId);

        // Get the stack viewport
        const viewport = (
        renderingEngine.getViewport(viewportId)
        );

        const { flipHorizontal } = viewport.getCamera();
        viewport.setCamera({ flipHorizontal: !flipHorizontal });

        viewport.render();
    },
    });

    addButtonToToolbar({
    container : container.value, // 容器
    title: 'Flip V',
    onClick: () => {
        // Get the rendering engine
        const renderingEngine = getRenderingEngine(renderingEngineId);

        // Get the stack viewport
        const viewport = (
        renderingEngine.getViewport(viewportId)
        );

        const { flipVertical } = viewport.getCamera();

        viewport.setCamera({ flipVertical: !flipVertical });

        viewport.render();
    },
    });

run(element);
})
  
onUnmounted(() => {
  // Get the rendering engine
  const renderingEngine = getRenderingEngine(renderingEngineId);

  // Get the stack viewport
  const viewport = (
    renderingEngine.getViewport(viewportId)
  );

  // distory the tool group
  cornerstoneTools.destroy();

  // distory the rendering engine
  renderingEngine.destroy();
  // Remove the viewport from the DOM
  viewport.element.remove();

});

/**
 * Runs the demo
 */
 async function run(element) {
    // Init Cornerstone and related libraries
    await initDemo();

    // Add tools to Cornerstone3D
    cornerstoneTools.addTool(LengthTool);
    cornerstoneTools.addTool(ProbeTool);
    cornerstoneTools.addTool(RectangleROITool);
    cornerstoneTools.addTool(EllipticalROITool);
    cornerstoneTools.addTool(CircleROITool);
    cornerstoneTools.addTool(BidirectionalTool);
    cornerstoneTools.addTool(AngleTool);
    cornerstoneTools.addTool(CobbAngleTool);
    cornerstoneTools.addTool(ArrowAnnotateTool);
    cornerstoneTools.addTool(ZoomTool);
    cornerstoneTools.addTool(StackScrollMouseWheelTool);

  // Define a tool group, which defines how mouse events map to tool commands for
  // Any viewport using the group
  const toolGroup = ToolGroupManager.createToolGroup(toolGroupId);

  // Add the tools to the tool group
  toolGroup.addTool(LengthTool.toolName);
  toolGroup.addTool(ProbeTool.toolName);
  toolGroup.addTool(RectangleROITool.toolName);
  toolGroup.addTool(EllipticalROITool.toolName);
  toolGroup.addTool(CircleROITool.toolName);
  toolGroup.addTool(BidirectionalTool.toolName);
  toolGroup.addTool(AngleTool.toolName);
  toolGroup.addTool(CobbAngleTool.toolName);
  toolGroup.addTool(ArrowAnnotateTool.toolName);
  toolGroup.addTool(ZoomTool.toolName);
  toolGroup.addTool(StackScrollMouseWheelTool.toolName);

  // Set the initial state of the tools, here we set one tool active on left click.
  // This means left click will draw that tool.
  toolGroup.setToolActive(LengthTool.toolName, {
    bindings: [
      {
        mouseButton: MouseBindings.Primary, // Left Click
      },
    ],
  });
  // We set all the other tools passive here, this means that any state is rendered, and editable
  // But aren't actively being drawn (see the toolModes example for information)
  toolGroup.setToolPassive(ProbeTool.toolName);
  toolGroup.setToolPassive(RectangleROITool.toolName);
  toolGroup.setToolPassive(EllipticalROITool.toolName);
  toolGroup.setToolPassive(CircleROITool.toolName);
  toolGroup.setToolPassive(BidirectionalTool.toolName);
  toolGroup.setToolPassive(AngleTool.toolName);
  toolGroup.setToolPassive(CobbAngleTool.toolName);
  toolGroup.setToolPassive(ArrowAnnotateTool.toolName);

  toolGroup.setToolActive(StackScrollMouseWheelTool.toolName);

  const wadoRsRoot = 'https://d3t6nz73ql33tx.cloudfront.net/dicomweb';
  const StudyInstanceUID =
    '1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463';

  // Get Cornerstone imageIds and fetch metadata into RAM
  const ctImageIds = await createImageIdsAndCacheMetaData({
    StudyInstanceUID,
    SeriesInstanceUID:
      '1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561',
    wadoRsRoot,
  });

  const ptImageIds = await createImageIdsAndCacheMetaData({
    StudyInstanceUID,
    SeriesInstanceUID:
      '1.3.6.1.4.1.14519.5.2.1.7009.2403.879445243400782656317561081015',
    wadoRsRoot,
  });

  // Instantiate a rendering engine
  const renderingEngine = new RenderingEngine(renderingEngineId);

  // Create a stack viewport
  const viewportInput = {
    viewportId,
    type: ViewportType.ORTHOGRAPHIC,
    element,
    defaultOptions: {
      orientation: Enums.OrientationAxis.SAGITTAL,
      background: [0, 0, 0.03],
    },
  };

  renderingEngine.enableElement(viewportInput);

  // Get the stack viewport that was created
  const viewport = (
    renderingEngine.getViewport(viewportId)
  );
  // Set the tool group on the viewport
  toolGroup.addViewport(viewportId, renderingEngineId);

  // Define a volume in memory
  const ctVolume = await volumeLoader.createAndCacheVolume(ctVolumeId, {
    imageIds: ctImageIds,
  });

  // Set the volume to load
  ctVolume.load();

  // Set the volume on the viewport
  viewport.setVolumes([
    { volumeId: ctVolumeId, callback: setCtTransferFunctionForVolumeActor },
  ]);

  // Render the image
  renderingEngine.render();

  // Load the PT in the background as we know we'll need it

  // Define a volume in memory
  const ptVolume = await volumeLoader.createAndCacheVolume(ptVolumeId, {
    imageIds: ptImageIds,
  });

  // Set the volume to load
  ptVolume.load();

}




</script>

<style scoped>

</style>