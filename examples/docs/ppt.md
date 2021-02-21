## Ppt 文档预览

### 简单实用

:::demo 可以在页面中使用，也可以在弹框中使用，组件v-file-preview，给组件指定线上的url地址。

```html
    <div>
        <v-button type="primary" @click="showOverlay">预览ppt</v-button>
        <v-overlay :show="show" :showBtn="true"  @click="showOverlay">
          <v-file-preview class="preview-wrap" url="https://image.ms200.cn/file/%E6%B8%85%E7%88%BD%E8%93%9D%E7%BB%BF%E8%BF%B0%E8%81%8C%E6%8A%A5%E5%91%8A.pptx"/>
        </v-overlay>
    </div>
    <script>
    export default {
      data(){
          return {
            show:false  
          }
      },
      
      methods:{
        showOverlay(){
          this.show=!this.show
        }
      }
    }
    </script>
    <style>
      .preview-wrap{
        width: 80%;
      }
    </style>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| url | 设置 预览文件的地址，必须是线上可访问的公共路径，必填 | string  |   —          |    —     |
