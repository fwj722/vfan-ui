import VSelect from "./src/main.vue";

VSelect.install = function(Vue) {
  Vue.component(VSelect.name, VSelect);
};

export default VSelect;
