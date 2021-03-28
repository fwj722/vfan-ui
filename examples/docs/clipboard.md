## clipboard 复制至剪切板

### 基础用法

基础用法:

调用this.$copy方法，该方法的参数是一个对象，text是复制的文本内容，showSuccessTip和showFailureTip分别是成功和失败的提示语，默认是“复制成功”和“复制失败”。successCallback和failureCallback分别是成功和失败的回调函数。

::: demo

```html
<template>
  <div>
    <p><v-button type="primary" @click="copy">直接复制</v-button></p>

    <div class="wrap">
      <input type="text" v-model="text" placeholder="手动在此输入内容" />
      <v-button @click="copyText" type="primary">复制</v-button>
    </div>
    <div>
      <textarea placeholder="这里会自动粘贴点击‘复制’按钮后的内容，也可以点击复制按钮后，手动ctrl+v粘贴" v-model="textarea" rows="2" cols="20"></textarea>
      <v-button type="info" @click="textarea=''">清空</v-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        text: '',
        textarea: ''
      };
    },
    methods: {
      copyText() {
        this.$copy({
          text: this.text,
          showSuccessTip: '输入的内容复制成功了',
          successCallback:()=>{
            this.textarea = this.text
          }
        });
      },
      copy() {
        this.$copy({
          text: 'vfan-ui,一个更关注于业务层的通用组件',
          showSuccessTip: '静态内容复制成功了'
        });
      }
    }
  };
</script>
<style>
  .wrap{
    padding:10px 0;
  }
</style>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| text | 复制的文本 | string  |   —          |        |
| showSuccessTip | 设置复制成功文案 |  | String | 复制成功  |
| showFailureTip | 设置复制失败文案 |  | String | 复制失败 |
| successCallback | 执行成功后调用 |  | - |  |
| failureCallback | 执行失败后调用 |  | - |  |
