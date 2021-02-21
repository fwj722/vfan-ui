import VFilePreview from "./src/filePreview";

/* istanbul ignore next */
VFilePreview.install = function(Vue) {
  Vue.component(VFilePreview.name, VFilePreview);
};

export default VFilePreview;