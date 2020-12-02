// 整个包的入口
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
// 统一导出
// 导入颜色选择器组件
import VButton from "./button";
import VCard from "./card";
import Message from "./message/src/message.js"
import "./theme/index.scss";
import "./guide/style/guide.scss";
import "./utils/guide";

import vueDrag from "./utils/vue-drag";
// import Dialog from './dialog'
// import Input from './input'
// import Checkbox from './checkbox'
// import Radio from './radio'
// import RadioGroup from './radio-group'
// import Switch from './switch'
// import CheckboxGroup from './checkbox-group'
// import Form from './form'
// import FormItem from './form-item'
// import './fonts/font.scss'

// 存储组件列表
const components = [VButton, VCard];
const install = function(Vue) {
  // 全局注册所有的组件
  components.forEach((item) => {
    Vue.component(item.name, item);
  });
  // 指令
  Vue.use(vueDrag);
  Vue.prototype.$message = Message;
};
// 判断是否是直接引入文件,如果是，就不用调用 Vue.use()
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install
};