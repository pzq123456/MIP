- Sorry, I am not sure if this is the right place to ask questions. **I have successfully installed the package.**
- I am trying to run the examples in the `cornerstone-3d` repository, so I downloaded the files from the `helpers` folder and put them in my project folder. 
- But the medical image was not displayed (just the background). I think the problem is that I **did not clone the whole repository**. I am not sure if this is the right way to run the examples. Could you please tell me how to run the examples correctly? Thank you very much.

- Here is my code. 
```vue
<template>
  <div id="content"></div>
</template>

<script setup>
import { RenderingEngine, Enums } from '@cornerstonejs/core';
import {
  initDemo,
  createImageIdsAndCacheMetaData,
  ctVoiRange,
} from '../helpers'; // I just downloaded the files from the `helpers` folder and put them in my project folder

import { 
  onMounted,
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
  const stack = [imageIds[10]];
  console.log(imageIds[10]);
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
```
- I simply run the code using vite (`npm run dev`), but the medical image was not displayed (just the background), and the console showed the following error message:
![](https://user-images.githubusercontent.com/82391775/235963261-506846fb-d138-4e49-9f23-147d7fc7de34.jpg)
