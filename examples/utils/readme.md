# vue-dragging 

  vue-dragging，可以给任意标签添加拖拽的功能。
  
## 说明

  拖拽目前只能用于pc端，有什么新的需求可以issure
  
### How to use

普通html，可以将vue-drag模块抽离出来使用：
```javascript
<script src="./vue.js"></script>
<script src="./vue-drag.js"></script>
```

如果只想使用拖拽模块，也可以将该模块直接移植到你的项目中。
```

在html当中添加标签，然后添加一个'v-drag'，假设为：
```html
<div class="demo">
  <div class="drag" v-drag></div>
</div>
```

这样绑定的dom就可以拖拽


### 1.0.1

加入了一个可拖拽区域和不可拖区域的方法，示例如下:

```html
        <div class="demo2" v-drag="'#dragable'">
            <div id="dragable"><span>这里可以拖动</span></div>
            <div class="content"><span>这里不可以</span></div>
        </div>
```

value传的是一个选择器，会让当前dom下第一个找到的seletor允许拖拽

如果你想让鼠标指针变成move，那么这样：

```html
        <div class="demo2" v-drag.cursor="'#dragable'">
            <div id="dragable"><span>这里可以拖动</span></div>
            <div class="content"><span>这里不可以</span></div>
        </div>
```
当然你也可以自己写样式去替换
