/* eslint-disable */
// This file is auto gererated by build/build-entry.js
    import FeButton from './button'
import FeCard from './card'
import FeMessage from './message'
import FePanelsplit from './panelsplit'
import FePlayer from './player'
import FePoptip from './poptip'
import FeRegion from './region'
import FeWave from './wave'
    const version = '0.2.22'
    const components = [
      FeButton,
  FeCard,
  FeMessage,
  FePanelsplit,
  FePlayer,
  FePoptip,
  FeRegion,
  FeWave
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
      FeButton,
  FeCard,
  FeMessage,
  FePanelsplit,
  FePlayer,
  FePoptip,
  FeRegion,
  FeWave
    }
    export default {
      install,
      version
    }
  