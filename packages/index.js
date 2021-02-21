/* eslint-disable */
// This file is auto gererated by build/build-entry.js
import VButton from './button'
import VCard from './card'
import VImage from './image'
import VImageviewer from './imageviewer'
import VMessage from './message'
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
const version = '0.2.22'
const components = [
  VButton,
  VCard,
  VImage,
  VImageviewer,
  VMessage,
  VPanelsplit,
  VPlayer,
  VPoptip,
  VRegion,
  VWave,
  VRangePicker, VSelect, VRecycleScroller, VResizeObserver, VFilePreview,VOverlay
]
const install = Vue => {
  components.forEach(Component => {
    Vue.use(Component)
  })
  Vue.prototype.$msg = VMessage.message;

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
  VMessage,
  VPanelsplit,
  VPlayer,
  VPoptip,
  VRegion,
  VWave,
  VRangePicker, VSelect, VRecycleScroller, VResizeObserver, VFilePreview,VOverlay
}
export default {
  install,
  version
}
