
import Wave from "./src/wave";

Wave.install = function(Vue) {
  Vue.component(Wave.name, Wave);
};

export default Wave;