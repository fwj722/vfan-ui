## Upload 文件上传

### 基本使用

:::v-wave组件非常灵活，可以在任何组件上使用！

:::demo
```html
<ul>
    <li> 
       <div class="demo-image__preview">
          <v-image 
            style="width: 100px; height: 100px"
            :src="url" 
            :preview-src-list="srcList">
          </v-image >
        </div>
    </li>
</ul>
<script>
  export default {
    data() {
      return {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ]
      }
    }
  }
</script>
```
:::

### 设置水波颜色

wave组件默认的水波颜色为透明度为0.3的白色，可以添加waveColor属性来自定义水波的颜色。

:::demo

```html
 <v-wave waveColor="rgba(255,0,0,0.6)">
     <v-button type="primary">主要按钮</v-button>
</v-wave>
```
:::
### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| waveColor | 自定义水波的颜色值 | String |  | rgba(255,255,255,0.3) |
