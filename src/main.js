import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VfanUI from "@/components/";
import "./theme/index.scss";
Vue.config.productionTip = false;
Vue.use(VfanUI);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
