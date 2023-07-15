import * as cornerstone from '@cornerstonejs/core';
import * as cornerstoneNIFTIImageLoader from 'cornerstone-nifti-image-loader';
const { ViewportType } = cornerstone.Enums;

function createElement( size = '400px') {
  let element = document.createElement('div');
  element.style.width = size;
  element.style.height = size;
  element.style.border = '1px solid red';
  element.style.margin = '10px';
  // Disable default context menu
  element.oncontextmenu = (e) => e.preventDefault();
  return element;
}

/**
 * Hardcoded metadata provider for NIFTI images, as they don't exist in the old cornerstone module
 * @param type The type of metadata to retrieve
 * @param imageId The imageId of the image to retrieve metadata for. Must start with 'nifti:'
 * @returns {Object} The metadata object
 */
function additionalMetaDataProvider(type, imageId) {
  const colonIndex = imageId.indexOf(':');
  const scheme = imageId.substring(0, colonIndex);
  if (scheme !== 'nifti') return;
  if (type === 'generalSeriesModule') {
    return {
      modality: 'Unknown',
    };
  }
}

/**
 * Uses the NIFTI image loader to fetch metadata of a NIFTI, cache it in cornerstone,
 * and return a list of imageIds for the frames.
 *
 * @returns {string[]} An array of imageIds for instances in the study.
 */
async function createImageIdsAndCacheMetaData(imageId) {
  const colonIndex = imageId.indexOf(':');
  const scheme = imageId.substring(0, colonIndex);
  if (scheme !== 'nifti') {
    console.warn('createImageIdsAndCacheMetaData: imageId must have scheme "nifti". imageId: ', imageId);
    return;
  }

  // Load the image (it will be stored in the cache, and the metadata also)
  const imageIdObject = cornerstoneNIFTIImageLoader.nifti.ImageId.fromURL(imageId);
  const image = await cornerstone.imageLoader.loadAndCacheImage(imageIdObject.url);

  // Get the number of frames from the metadata the image loader provides
  const numberOfFrames = cornerstone.metaData.get('multiFrame', image.imageId).numberOfFrames;
  const imageIds = Array.from(Array(numberOfFrames),
    (_, i) => `nifti:${imageIdObject.filePath}#${imageIdObject.slice.dimension}-${i},t-0`)
  console.log('imageIds', imageIds);

  return imageIds;
}

async function run() {
  // Create elements to render into
  const content = document.getElementById('content');

  content.style.display = 'flex';
  content.style.flexDirection = 'row';

  const element1 = createElement();
  content.appendChild(element1);
  const element2 = createElement();
  content.appendChild(element2);
  const element3 = createElement();
  content.appendChild(element3);

  // Initialize cornerstone and tools
  await cornerstone.init();

  // Create a rendering engine
  const renderingEngineId = 'myRenderingEngine';
  const renderingEngine = new cornerstone.RenderingEngine(renderingEngineId);

  // Create the viewports (of type STACK)
  const viewportInputArray = [
    {
      viewportId: 'X_VIEWPORT',
      type: ViewportType.STACK,
      element: element1,
    },
    {
      viewportId: 'Y_VIEWPORT',
      type: ViewportType.STACK,
      element: element2,
    },
    {
      viewportId: 'Z_VIEWPORT',
      type: ViewportType.STACK,
      element: element3,
    }
  ];
  renderingEngine.setViewports(viewportInputArray);
  const viewportX = renderingEngine.getViewport('X_VIEWPORT');
  const viewportY = renderingEngine.getViewport('Y_VIEWPORT');
  const viewportZ = renderingEngine.getViewport('Z_VIEWPORT');

  // Register the nifti image loader
  cornerstoneNIFTIImageLoader.external.cornerstone = cornerstone;
  // NOTE: This is a hack to get around the fact that the nifti image loader
  // uses the old cornerstone module, and we need to provide it with the
  // new cornerstone module (events = eventTarget).
  cornerstoneNIFTIImageLoader.external.cornerstone.events = cornerstone.eventTarget;
  // cornerstoneNIFTIImageLoader.nifti.streamingMode = true;

  // Register an additional metadata provider for Nifti images (for the generalSeriesModule, not provided by the package)
  cornerstone.metaData.addProvider(
    (type, imageId) => additionalMetaDataProvider(type, imageId),
    1000 // Priority of the NIFTI metadata provider is 10000, so this one is called after
  );

  // Example of a Nifti image, from the web.
  // The number after # is the frame index
  // const imageUrl = 'https://raw.githubusercontent.com/muschellij2/Neurohacking_data/master/BRAINIX/NIfTI/Output_3D_File.nii.gz#10'

  // Will load a local image
  const imageUrl = `data/mni152_2009_256.nii.gz`;

  // Load the image and assign it to the viewport, for each orientation
  const imageIdsZ = await createImageIdsAndCacheMetaData(`nifti:${imageUrl}#z`);
  viewportZ.setStack(imageIdsZ, Math.floor(imageIdsZ.length / 2));
  viewportZ.render();

  const imageIdsY = await createImageIdsAndCacheMetaData(`nifti:${imageUrl}#y`);
  viewportY.setStack(imageIdsY, Math.floor(imageIdsY.length / 2));
  viewportY.render();

  const imageIdsX = await createImageIdsAndCacheMetaData(`nifti:${imageUrl}#x`);
  viewportX.setStack(imageIdsX, Math.floor(imageIdsX.length / 2));
  viewportX.render();
}

run();