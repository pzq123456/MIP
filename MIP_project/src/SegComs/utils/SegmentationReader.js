import nrrd from 'nrrd-js';
import pako from 'pako';
//从CDN使用ITK
import readImageArrayBuffer from 'https://unpkg.com/browse/itk@14.1.1//readImageArrayBuffer.js';
import writeArrayBuffer from 'https://unpkg.com/browse/itk@14.1.1/writeArrayBuffer.js';

// import config from 'itk/itkConfig';
// const pkgJSON = require('../../package.json'); // "itk": "^14.1.1",
// const itkVersion = pkgJSON.dependencies.itk.substring(1); // "14.1.1"
// config.itkModulesPath = 'https://unpkg.com/itk@' + itkVersion; // HACK to use ITK from CDN 


export default class SegmentationReader {
  /**
   * Parse NRRD data
   * @param {*} data
   * @returns {header, image}
   */
  static parseNrrdData(data) {

    let nrrdfile = nrrd.parse(data);

    // Currently gzip is not supported in nrrd.js
    if (nrrdfile.encoding === 'gzip') {
      const buffer = pako.inflate(nrrdfile.buffer).buffer;

      nrrdfile.encoding = 'raw';
      nrrdfile.data = new Uint16Array(buffer);
      nrrdfile.buffer = buffer;
    }

    const image = nrrdfile.buffer;
    const header = nrrdfile;
    delete header.data;
    delete header.buffer;

    return {
      header,
      image,
    };
  }

  /**
   * 保存文件
   * @param {*} blob  
   * @param {*} filename
   * @returns
   */
  static saveFile(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
      // 如果是IE浏览器
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // 考虑兼容问题，使用a标签下载
      const a = document.createElement('a');
      document.body.appendChild(a);
      // 创建blob地址
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = filename;
      // 触发点击事件，然后移除
      a.click();

      setTimeout(() => {
        // 延时释放
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 0);
    }
  }

  // GZIP write not supported by nrrd-js (so use ITK save with compressed = true)
  /**
   * 保存压缩文件
   * @param {*} header 
   * @param {*} image 
   * @param {*} filename 
   */
  static serializeNrrdCompressed(header, image, filename) {
    const nrrdBuffer = SegmentationReader.serializeNrrd(header, image);

    const reader = readImageArrayBuffer(null, nrrdBuffer, 'temp.nrrd');
    reader.then(function(response) {
      const writer = writeArrayBuffer(
        response.webWorker,
        true,
        response.image,
        filename
      );
      writer.then(function(response) {
        SegmentationReader.saveFile(new Blob([response.arrayBuffer]), filename);
        console.debug('File downloaded: ' + filename);
      });
    });
  }

  /**
   * serialize nrrd
   * @param {*} header 
   * @param {*} image 
   * @param {*} filename 
   * @returns 
   */
  static serializeNrrd(header, image, filename) {
    let nrrdOrg = Object.assign({}, header);
    nrrdOrg.buffer = image;
    nrrdOrg.data = new Uint16Array(image);

    const nrrdBuffer = nrrd.serialize(nrrdOrg);
    if (filename) {
      SegmentationReader.saveFile(new Blob([nrrdBuffer]), filename);
      console.debug('File downloaded: ' + filename);
    }
    return nrrdBuffer;
  }
}
