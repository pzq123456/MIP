<template>
    <div>
        <h1>3D 视图 开发模板</h1>
    </div>
    <div id="demo-toolbar"></div>
    <div id="content" ></div>
</template>

<script setup>


import { 
  onMounted,
  ref,
  onUnmounted
} from 'vue';
import {
  CONSTANTS,
  Enums,
  RenderingEngine,
  setVolumesForViewports,
  utilities,
  volumeLoader,
  getRenderingEngine,
  cache
} from '@cornerstonejs/core';
import * as cornerstoneTools from '@cornerstonejs/tools';


import {
  addDropdownToToolbar,
  createImageIdsAndCacheMetaData,
  initDemo,
  setTitleAndDescription,
} from '../helpers';

import * as cornerstoneNIFTIImageLoader from 'cornerstone-nifti-image-loader'

cornerstoneNIFTIImageLoader.external.cornerstone = cornerstone;
const ImageId = cornerstoneNIFTIImageLoader.nifti.ImageId;

// console.log(ImageId)

let loaded = false;

const {
  ToolGroupManager,
  TrackballRotateTool,
  ZoomTool,
  Enums: csToolsEnums,
} = cornerstoneTools;

const { ViewportType } = Enums;
const { MouseBindings } = csToolsEnums;

// Define a unique id for the volume
let renderingEngine;
const volumeName = 'CT_VOLUME_ID'; // Id of the volume less loader prefix
const volumeLoaderScheme = 'cornerstoneStreamingImageVolume'; // Loader id which defines which volume loader to use
const volumeId = `${volumeLoaderScheme}:${volumeName}`; // VolumeId with loader id + volume id
const renderingEngineId = 'myRenderingEngine';
const viewportId = '3D_VIEWPORT';


onMounted(() => {
  const size = '800px';

  // using ref to get 'content' element
  const content = ref(document.getElementById('content')); // 获取content元素
  const viewportGrid = document.createElement('div');

  viewportGrid.style.display = 'flex';
  viewportGrid.style.display = 'flex';
  viewportGrid.style.flexDirection = 'row';

  const element1 = document.createElement('div');
  element1.oncontextmenu = () => false;

  element1.style.width = size;
  element1.style.height = size;

  viewportGrid.appendChild(element1);
  content.value.appendChild(viewportGrid);
  const instructions = document.createElement('p');
  instructions.innerText = 'Click the image to rotate it.';
  content.value.append(instructions);

  const container = ref(document.getElementById('demo-toolbar')); // 获取toolbar元素

  addDropdownToToolbar({
    container : container.value, // 容器
    options: {
      values: CONSTANTS.VIEWPORT_PRESETS.map((preset) => preset.name),
      defaultValue: 'CT-Bone',
    },
    onSelectedValueChange: (presetName) => {
      const volumeActor = renderingEngine
        .getViewport(viewportId)
        .getDefaultActor().actor;

      utilities.applyPreset(
        volumeActor,
        CONSTANTS.VIEWPORT_PRESETS.find((preset) => preset.name === presetName)
      );

      renderingEngine.render();
    },
  });

  run(element1);
})

onUnmounted(() => {
  // Get the rendering engine
  const renderingEngine = getRenderingEngine(renderingEngineId);

  // Get the stack viewport
  const viewport = (
    renderingEngine.getViewport(viewportId)
  );
  cache.purgeCache(); // 清除缓存
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
async function run(element1) {
  // Init Cornerstone and related libraries
  await initDemo();

  const toolGroupId = 'TOOL_GROUP_ID';

  // Add tools to Cornerstone3D
  cornerstoneTools.addTool(TrackballRotateTool);
  cornerstoneTools.addTool(ZoomTool);

  // Define a tool group, which defines how mouse events map to tool commands for
  // Any viewport using the group
  const toolGroup = ToolGroupManager.createToolGroup(toolGroupId);

  // Add the tools to the tool group and specify which volume they are pointing at
  toolGroup.addTool(TrackballRotateTool.toolName, {
    configuration: { volumeId },
  });
  toolGroup.addTool(ZoomTool.toolName, {
    configuration: { volumeId },
  });

  // Set the initial state of the tools, here we set one tool active on left click.
  // This means left click will draw that tool.
  toolGroup.setToolActive(TrackballRotateTool.toolName, {
    bindings: [
      {
        mouseButton: MouseBindings.Primary, // Left Click
      },
    ],
  });


  toolGroup.setToolActive(ZoomTool.toolName, {
    bindings: [
      {
        mouseButton: MouseBindings.Secondary, // Right Click
      },
    ],
  });

  // // Get Cornerstone imageIds and fetch metadata into RAM
  // const imageIds = await createImageIdsAndCacheMetaData({
  //   StudyInstanceUID:
  //     '1.2.826.0.1.3680043.2.1125.1.77328468845035884579163747272541108',
  //   SeriesInstanceUID:
  //     '1.2.826.0.1.3680043.2.1125.1.19726334934540262961720391497248124',
  //   wadoRsRoot: 'api/',
  // });

  // Get Cornerstone imageIds and fetch metadata into RAM
const imageIds = await createImageIdsAndCacheMetaData({
  StudyInstanceUID:
    '1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463',
  SeriesInstanceUID:
    '1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561',
  wadoRsRoot: 'https://d3t6nz73ql33tx.cloudfront.net/dicomweb',
});

  // // http://127.0.0.1:5500/data/input.nii
  // let imageId = 'nifti:http://127.0.0.1:5500/data/input.nii';
  // console.log('imageId', imageId)
  // const imageIds = ImageId.fromURL(imageId);
  // console.log('imageIds', imageIds)

  // Instantiate a rendering engine
  renderingEngine = new RenderingEngine(renderingEngineId);

  // Create the viewports

  const viewportInputArray = [
    {
      viewportId: viewportId,
      type: ViewportType.VOLUME_3D,
      element: element1,
      defaultOptions: {
        orientation: Enums.OrientationAxis.CORONAL,
        background: [0, 0, 0.03],
      },
    },
  ];

  renderingEngine.setViewports(viewportInputArray);

  // Set the tool group on the viewports
  toolGroup.addViewport(viewportId, renderingEngineId);

  // Define a volume in memory
  const volume = await volumeLoader.createAndCacheVolume(volumeId, {
    imageIds,
  });

  // Set the volume to load
  volume.load();

  setVolumesForViewports(renderingEngine, [{ volumeId }], [viewportId]).then(
    () => {
      const volumeActor = renderingEngine
        .getViewport(viewportId)
        .getDefaultActor().actor;

      utilities.applyPreset(
        volumeActor,
        CONSTANTS.VIEWPORT_PRESETS.find((preset) => preset.name === 'CT-Bone')
      );

      viewport.render();
    }
  );

  const viewport = renderingEngine.getViewport(viewportId);
  renderingEngine.render();
}

</script>

<style scoped>

</style>