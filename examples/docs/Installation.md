## 安装

### npm 安装
```shell
npm install vfan-ui -S
```

### 使用说明

你可以引入整个vfan-ui，也可进行按需加载组件
1. 完整引入
在 main.js 中写入以下内容：

```js
  import Vue from 'vue';
  import vfanUi from 'vfan-ui';
  import App from './App.vue';
  import "vfan-ui/dist/vfan-ui.css";

  Vue.use(vfanUi);

  new Vue({
    el: '#app',
    render: h => h(App)
  });
```
2. 按需引入

在 main.js 中写入以下内容：

```js
  import Vue from 'vue';
  import {VButton} from 'vfan-ui';
  import App from './App.vue';
  import 'vfan-ui/dist/theme-chalk/src/button.scss';

  Vue.use(VButton);

  new Vue({
    el: '#app',
    render: h => h(App)
  });
```