## vfan-ui

### 起源

vfan-ui 是一套基于Vue开发UI 组件库。开发这个组件库的目的在于：
1. 扩展`Element-UI`中没有的组件，和扩展`Element-UI`组件中的一些组件功能。
2. 对工作中的常用的基于业务场景的组件的开发，方便在业务中使用。

### 说明

- 组件库的依赖情况：
1. 一部分是基于`Element-UI`中的组件进行开发，减少没必要的组件封装，如单选、复选、表单等，减少没必要的代码冗余。
2. 还有一部分是不依赖于`Element-UI`，可以独立出来的组件。

###  优点
1. 代码精简，组件的复用性和扩展性强。
2. 直接引入和按需引入，可以根据需要灵活选择。
2. 组件的延伸性强，不强依赖于某个组件库，可以根据项目中不同的组件库(如：`Element-UI`、`iView`、`ant-design`等)轻松植入。

### npm 安装
```
npm i vfan-ui
```

### 使用说明

你可以引入整个 vfan-ui，也可进行按需加载组件
1. 完整引入
在 main.js 中写入以下内容：

```js
import Vue from 'vue';
import  vfanUi from 'vfan-ui';
import "vfan-ui/dist/vfan-ui.css";
import App from './App.vue';

Vue.use(vfanUi);

new Vue({
  el: '#app',
  render: h => h(App)
});
```
2. 按需引入
借助 `babel-plugin-component`，我们可以只引入需要的组件，以达到减小项目体积的目的。

&nbsp;&nbsp;&nbsp;&nbsp;然后，将 .babelrc 修改为：

```json
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "vfan-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```
在 main.js 中写入以下内容：

```js
import Vue from 'vue';
import {Button} from 'vfan-ui';
import App from './App.vue';

Vue.use(Button);

new Vue({
  el: '#app',
  render: h => h(App)
});
```




