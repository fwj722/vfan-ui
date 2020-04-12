import VButton from "./src/button";

/* istanbul ignore next */
VButton.install = function(Vue) {
  Vue.component(VButton.name, VButton);
};

export default VButton;
