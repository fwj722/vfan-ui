import ImageViewer from './src/imageViewer';

/* istanbul ignore next */
ImageViewer.install = function(Vue) {
  Vue.component(ImageViewer.name, ImageViewer);
};

export default ImageViewer;