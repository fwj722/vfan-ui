import Vue from 'vue';
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
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})
export default router
