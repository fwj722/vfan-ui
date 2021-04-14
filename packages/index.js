/* eslint-disable */
// This file is auto gererated by build/build-entry.js
import VButton from './button'
import VCard from './card'
import VImage from './image'
import VImageviewer from './imageviewer'
import VPanelsplit from './panelsplit'
import VPlayer from './player'
import VPoptip from './poptip'
import VRegion from './region'
import VWave from './wave'
import VRangePicker from './rangePicker'
import VSelect from './select'
import VRecycleScroller from './recycle-scroller';
import VResizeObserver from './resize-observer';
import VFilePreview from './filePreview';
import VOverlay from './overlay';
import $msg from './message'
import $copy from './plugins/clipboard/clipboard';

import directive from './directive/index';

const version = '0.2.22'
const components = [
  VButton,
  VCard,
  VImage,
  VImageviewer,
  VPanelsplit,
  VPlayer,
  VPoptip,
  VRegion,
  VWave,
  VRangePicker, VSelect, VRecycleScroller, VResizeObserver, VFilePreview,VOverlay
]
const prototypes = {
  $copy,
  $msg
};
const install = Vue => {
  // 组件
  components.forEach(Component => {
    Vue.use(Component)
  })
  //绑定到原型的全局方法
  Object.keys(prototypes).forEach(key => {
    Vue.prototype[key] = prototypes[key];
  });
  // 指令
  Vue.use(directive.directive);

};
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export {
  install,
  version,
  VButton,
  VCard,
  VImage,
  VImageviewer,
  VPanelsplit,
  VPlayer,
  VPoptip,
  VRegion,
  VWave,
  VRangePicker, 
  VSelect, 
  VRecycleScroller, 
  VResizeObserver, 
  VFilePreview,
  VOverlay,
  directive
}
export default {
  install,
  version
}
