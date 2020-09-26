import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
  path: "/",
  name: "base",
  component: () => import("./../views/base")
}, {
  path: "/picker",
  name: "picker",
  component: () => import("./../views/picker")
}, {
  path: "/dataTime",
  name: "dataTime",
  component: () => import("./../views/dataTime")
}, {
  path: "/demo",
  name: "demo",
  component: () => import("./../views/demo")
},{
  path: "/data",
  name: "data",
  component: () => import("./../views/data")
}];


const router = new VueRouter({
  routes
});

export default router;
