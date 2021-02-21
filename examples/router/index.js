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
import RangePicker from '../docs/rangePicker.md'
import Word from '../docs/word.md'
import Excel from '../docs/excel.md'
import Ppt from '../docs/ppt.md'
import Wave from '../docs/wave.md'
import Upload from '../docs/upload.md'
//方法
import Strings from '../docs/library/string.md'
import Arrays from '../docs/library/array.md'
import Dates from '../docs/library/date.md'
import Datas from '../docs/library/data.md'
import Tools from '../docs/library/tools.md'



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
        path: '/upload',
        name: 'upload',
        component: Upload
      },
      {
        path: '/region',
        name: 'region',
        component: Region
      },
      {
        path: '/rangePicker',
        name: 'rangePicker',
        component: RangePicker
      },
      {
        path: '/word',
        name: 'word',
        component: Word
      },
      {
        path: '/excel',
        name: 'excel',
        component: Excel
      },
      {
        path: '/ppt',
        name: 'ppt',
        component: Ppt
      }
    ]
  },
  {
    path: '/methods',
    name: 'methods',
    component: methods,
    redirect:"/string",
    children:[
      {
        path: '/string',
        name: 'string',
        component: Strings
      },
      {
        path: '/array',
        name: 'array',
        component: Arrays
      },
      {
        path: '/date',
        name: 'date',
        component: Dates
      },
      {
        path: '/data',
        name: 'data',
        component: Datas
      },
      {
        path: '/tool',
        name: 'tool',
        component: Tools
      },
    ]
  }
]
Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  linkExactActiveClass: 'active'
})
export default router