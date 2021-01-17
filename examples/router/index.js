import Vue from 'vue';
import home from "./../components/home";
import comtent from "./../components/comtent";
import methods from "./../components/methods";
import Installation from '../docs/Installation.md';
import Button from '../docs/button.md'
import Card from '../docs/card.md'
import Message from '../docs/message.md'
import PanelSplit from '../docs/panelSplit.md'
import Region from '../docs/region.md'
import Wave from '../docs/wave.md'
import VueRouter from 'vue-router';
const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/component',
    name: 'component',
    component: comtent,
    redirect:"/installation",
    children: [
      {
        path: '/installation',
        name: 'Installation',
        component: Installation
      },
      {
        path: '/button',
        name: 'Button',
        component: Button
      },
      {
        path: '/card',
        name: 'Card',
        component: Card
      },
      {
        path: '/message',
        name: 'Message',
        component: Message
      },
      {
        path: '/panelSplit',
        name: 'PanelSplit',
        component: PanelSplit
      },
      {
        path: '/wave',
        name: 'Wave',
        component: Wave
      },
      {
        path: '/region',
        name: 'region',
        component: Region
      }
    ]
  },
  {
    path: '/methods',
    name: 'methods',
    component: methods
  }
]
Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  linkExactActiveClass: 'active'
})
export default router