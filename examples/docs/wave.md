## Wave 水波容器

### 基本使用

:::v-wave组件非常灵活，可以在任何组件上使用！

:::demo
```html
<ul>
    <li> 
        <v-wave>
            <v-button type="primary">主要按钮</v-button>
        </v-wave>
    </li>
    <li>
        <v-wave>
            <v-card :body-style="{ padding: '0px' }">
                <img src="//pic.qqtn.com/up/2017-3/2017032015031831844.jpg" class="image" />
                <div style="padding: 14px;">
                    <span>超可爱狗狗萌宠</span>
                    <div class="bottom clearfix">
                        <span class="time">免费领养</span>
                        <v-button type="text" class="button">操作按钮</v-button>
                    </div>
                </div>
            </v-card>
        </v-wave>
    </li>
</ul>
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
