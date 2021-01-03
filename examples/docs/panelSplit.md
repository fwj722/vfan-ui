## PanelSplit 面板分割

### 左右分割

:::使用该分割面板，可通过拖拽调整宽高，将区域分割成多个区域。当左右分割时，mode="horizontal"或省略！

:::demo
```html
<div class="demo-panel-split">
    <panelSplit v-model="split1">
        <div slot="left" class="demo-split-pane">
            左边面板
        </div>
        <div slot="right" class="demo-split-pane">
            右边边面板
        </div>
    </panelSplit>
</div>
<style lang="scss">
	.demo-panel-split {
      height: 200px;
      border: 1px solid #dcdee2;
    }
    .demo-split-pane {
      padding: 20px;
    }
</style>
<script>
export default {
  data () {
    return {
      split1: 0.5
    }
  }
}
</script>
```
:::

### 上下分割

对slot插槽进行设置

:::demo 只需要设置slot为top|bottom，就可以实现上下分割，用法和左右分割一样。当上下分割时，mode="vertical"。

```html
<div class="demo-panel-split">
    <panelSplit v-model="split2" mode="vertical" min="0.9">
        <div slot="top" class="demo-split-pane">
            上边面板
        </div>
        <div slot="bottom" class="demo-split-pane">
            下边面板
        </div>
    </panelSplit>
</div>
<style lang="scss">
    .demo-panel-split {
      height: 200px;
      border: 1px solid #dcdee2;
    }
    .demo-split-pane {
      padding: 20px;
    }
</style>
<script>
export default {
  data () {
    return {
      split2: 0.5
    }
  }
}
</script>
```
:::
### 嵌套分割

可以使用该组件进行多层的嵌套分割，灵活控制

:::demo 可以使用panelSplit组件进行多层嵌套，当左右分割时mode可以省略，当上下分割时，mode必须指定值vertical！
```html
<div class="demo-panel-split">
    <panelSplit v-model="split1">
        <div slot="left" class="demo-split-pane no-padding">
            <panelSplit
                        v-model="split3"
                        mode="vertical"
                        @on-move-start="startHandler"
                        @on-moving="movingHandler"
                        @on-move-end="endHandler"
                        >
                <div slot="top" class="demo-split-pane">
                    上边面板
                </div>
                <div slot="bottom" class="demo-split-pane">
                    下边面板
                </div>
            </panelSplit>
        </div>
        <div slot="right" class="demo-split-pane">
            右边面板
        </div>
    </panelSplit>
</div>
<style lang="scss">
    .demo-panel-split {
      height: 200px;
      border: 1px solid #dcdee2;
    }
    .demo-split-pane {
      padding: 20px;
    }
    .demo-split-pane.no-padding {
      height: 200px;
      padding: 0;
    }
</style>
<script>
export default {
  data () {
    return {
      split1:0.5,
      split3: 0.5
    }
  },
  methods: {
    startHandler () {
      console.log(1);
    },
    movingHandler (event) {
      console.log(event);
    },
    endHandler () {
      console.log(2);
    }
  }
}
</script>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| v-model/value | 面板分割大小位置，可用 v-model 双向绑定 | Number\|String | 0-1的占比，或具体像素值 |    0.5  |
| mode | 排列模式 | string    | horizontal(横向) 或 vertical(纵向) | horizontal  |
| min  | 最小阈值 | Number\|String | 具体像素值或者数字 | 40px |
| max  | 最大阈值 | Number\|String | 具体像素值或者数字 | 40px |
| circle     | 是否圆形按钮   | boolean    | — | false   |
| loading     | 是否加载中状态   | boolean    | — | false   |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
:::
### Events
| 事件    | 说明  | 回调参数  |
|---------- |-------- |---------- |
| on-move-start | 开始拖拽时执行的回调 | - |
| on-moving | 拖拽过程中执行的回调 | 执行事件event |
| on-move-end | 拖拽节结束时执行的回调 | -              |
:::
### Slot
| splot名称    | 说明 |
|---------- |---------- |
| left | mode 为 horizontal 时可用，左边面板 |
| right| mode 为 horizontal 时可用，右边面板 |
| top | mode 为 vertical 时可用，上边面板 |
| bottom | mode 为 vertical 时可用，下边面板 |
| trigger | 自定义分割拖拽节点     |
:::