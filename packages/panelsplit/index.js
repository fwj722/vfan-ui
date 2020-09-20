import PanelSplit from "./src/panelSplit";

/* istanbul ignore next */
PanelSplit.install = function(Vue) {
  Vue.component(PanelSplit.name, PanelSplit);
};

export default PanelSplit;