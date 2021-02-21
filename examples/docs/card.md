## Card 卡片

### 基础用法

基础的按钮用法:

:::Card 组件包括header和body两部分，header部分使用slot具名插槽header，该部分也是可选的。

:::demo

```html
<ul class="list-float w2">
    <li>
      <v-card shadow class="box-card">
        <div slot="header" class="clearfix">
          <span>vfan-ui卡片名称</span>
          <v-button style="float: right; padding: 3px 0" type="text">操作按钮</v-button>
        </div>
        <div v-for="v in 4" :key="v" class="text item" style="line-height:40px">
          {{ "展示内容列表信息 " + v }}
        </div>
      </v-card>
    </li>
    <li>
      <v-card shadow>
        <div v-for="v in 4" :key="v" class="text item" style="line-height:40px">
          {{ "展示内容列表信息 " + v }}
        </div>
      </v-card>
    </li>
  </ul>
```
:::

### 自定义展示

按钮不可用状态：

:::demo 可以自定义card的body部分，实现丰富的效果,配置body-style属性来自定义body部分的style，自由实现更多布局。

```html
    <ul class="list-float w4">
        <li>
            <v-card :body-style="{ padding: '0px' }">
                <img src="//pic.qqtn.com/up/2017-3/2017032015031831844.jpg" style="width: 100%;"/>
                <div style="padding: 14px;">
                    <span>超可爱狗狗萌宠</span>
                    <div class="bottom clearfix">
                        <span class="time">免费领养</span>
                        <v-button type="text" class="button">操作按钮</v-button>
                    </div>
                </div>
            </v-card>
        </li>
        <li>
            <v-card :body-style="{ padding: '0px' }">
                <img src="//pic.qqtn.com/up/2017-3/2017032015031831844.jpg"  style="width: 100%;"/>
                <div style="padding: 14px;">
                    <span>超可爱狗狗萌宠</span>
                    <div class="bottom clearfix">
                        <span class="time">免费领养</span>
                        <v-button type="text" class="button">操作按钮</v-button>
                    </div>
                </div>
            </v-card>
        </li>
        <li>
            <v-card :body-style="{ padding: '0px' }">
                <img src="//pic.qqtn.com/up/2017-3/2017032015031831844.jpg"  style="width: 100%;" />
                <div style="padding: 14px;">
                    <span>超可爱狗狗萌宠</span>
                    <div class="bottom clearfix">
                        <span class="time">免费领养</span>
                        <v-button type="text" class="button">操作按钮</v-button>
                    </div>
                </div>
            </v-card>
        </li>
        <li>
            <v-card :body-style="{ padding: '0px' }">
                <img src="//pic.qqtn.com/up/2017-3/2017032015031831844.jpg"  style="width: 100%;" />
                <div style="padding: 14px;">
                    <span>超可爱狗狗萌宠</span>
                    <div class="bottom clearfix">
                        <span class="time">免费领养</span>
                        <v-button type="text" class="button">操作按钮</v-button>
                    </div>
                </div>
            </v-card>
        </li>
    </ul>
    <style lang="scss" scoped>
        .bottom button {
            float: right;
        }
    </style>
```
:::
### 阴影效果

可对阴影的显示进行配置：

:::demo 通过设置shadow属性来控制卡片阴影出现的时机：always、hover或never
```html
<ul class="list-float w3">
    <li>
      <v-card shadow="always"> 总是显示 </v-card>
    </li>
    <li>
      <v-card shadow="hover"> 鼠标悬浮时显示 </v-card>
    </li>
    <li>
      <v-card shadow="never"> 从不显示 </v-card>
    </li>
  </ul>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| header | 设置 header，也可以通过 <code>slot#header</code> 传入 DOM | string  |   —          |    —     |
| body-style | 设置 body 的样式 | object |  — | { padding: '20px' }  |
| shadow | 设置阴影显示时机 | string | always / hover / never | always |
