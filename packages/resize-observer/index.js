import ResizeObserver from "./src/main.vue";

ResizeObserver.install = function(Vue) {
  Vue.component(ResizeObserver.name, ResizeObserver);
};

export default ResizeObserver;
