/* eslint-disable */
// This file is auto gererated by build/build-entry.js
import VButton from "./button";
import VCard from "./card";
import messageBox from "./message"
import Poptip from "./poptip"
import PanelSplit from "./panelsplit"
import Region from "./region"
import Wave from "./wave"
const version = '0.0.49'
const components = [ VButton, VCard, Poptip, PanelSplit ,Region,Wave]
const install = (Vue, options = {}) => {
  if (Object.keys(options).length) {
    if (typeof options.i18n === 'string') Region.props.i18n.default = options.i18n
    if (typeof options.blank === 'boolean') Region.props.blank.default = options.blank
    if (typeof options.town === 'boolean') Region.props.town.default = options.town
    if (typeof options.search === 'boolean') Region.props.search.default = options.search
  }

  components.forEach(component => {
    Vue.component(component.name, component);
  });
  // 指令
  Vue.prototype.$msg = messageBox.message;



};
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
// export {
//   install,
//   version,
//   VButton,
//   VCard,
//   Poptip,
//   PanelSplit
// }
export default {
  install,
  version,
  VButton,
  VCard,
  Poptip,
  PanelSplit,
  Region
}
