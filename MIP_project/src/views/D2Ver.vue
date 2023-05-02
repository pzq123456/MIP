<template>
<h5> 2D 视图 开发中</h5>
<a href="https://www.cornerstonejs.org/docs/category/getting-started">库访问连接</a>
<a href="https://cn.vuejs.org/api/composition-api-lifecycle"> Vue 文档</a>
<a href="https://juejin.cn/post/7132361845796503566">教程</a>


<div id="content"></div>
</template>

<script setup>

import { RenderingEngine, Enums } from '@cornerstonejs/core';
import {
  initDemo,
  createImageIdsAndCacheMetaData,
  ctVoiRange,
} from '../helpers';

import { 
  onMounted,
  nextTick,
  ref,
} from 'vue';

const { ViewportType } = Enums;

onMounted(() => {
  // using ref to get 'content' element
  const content = ref(document.getElementById('content'));
  const element = document.createElement('div');
  element.id = 'cornerstone-element';
  element.style.width = '500px';
  element.style.height = '500px';
  // and then append the element to 'content'
  content.value.appendChild(element);
  run(element);
});


/**
 * Runs the demo
 */
async function run(element) {
  // Init Cornerstone and related libraries
  await initDemo();

  // Get Cornerstone imageIds and fetch metadata into RAM
  const imageIds = await createImageIdsAndCacheMetaData({
    StudyInstanceUID:
      '1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463',
    SeriesInstanceUID:
      '1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561',
    wadoRsRoot: 'https://d3t6nz73ql33tx.cloudfront.net/dicomweb',
  });

  // Instantiate a rendering engine
  const renderingEngineId = 'myRenderingEngine';
  const renderingEngine = new RenderingEngine(renderingEngineId);
  // Create a stack viewport
  const viewportId = 'CT_STACK';
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
  const stack = [imageIds[0]];
  // Set the stack on the viewport
  await viewport.setStack(stack);
  // Set the VOI of the stack
  viewport.setProperties({ voiRange: ctVoiRange });
  // Render the image
  viewport.render();
}




</script>

<style scoped>

</style>