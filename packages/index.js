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
  VWave
]
const install = Vue => {
  components.forEach(Component => {
    Vue.use(Component)
  })
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
  VWave
}
export default {
  install,
  version
}
