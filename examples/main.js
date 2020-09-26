import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VfanUI from "./../packages/";
import "./../packages/theme/index.scss";
Vue.config.productionTip = false;
// import "./assets/font.css"
Vue.use(VfanUI);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
