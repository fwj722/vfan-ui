## Region 地区选择

### 基础用法

基础的用法:

对type属性进行设置来实现不同的组件场景，type取值有：`group`,`column`,`select`,`city`。

:::demo
```html
<ul class="list">
	<li>
      <v-region @change="handleChange"></v-region>
      <div>  {{regionObject}} </div>
    </li>
    <li>
      <v-region type="group"></v-region>
    </li>
    <li>
      <v-region type="column"></v-region>
    </li>
    <li>
      <v-region type="select"></v-region>
    </li>
    <li>
      <v-region type="city"></v-region>
    </li>
</ul>
<script>
export default {
    data(){
        return{
            regionObject:null
        }
    },
    methods:{
        handleChange(val){
            console.log(val)
            this.regionObject = val
        }
    }
}
</script>
```
:::

### 通栏显示

:::demo 可以使用`fullWidth`属性来设置是否通栏展示，它接受一个`Boolean`值。

```html
<ul class="list">
	<li>
    	 <v-region :fullWidth="true" type="group"></v-region>
    </li>
</ul>
```
:::
### 禁用状态

:::demo 可以使用`disabled`属性来定义是否可用，它接受一个`Boolean`值。

```html
<ul class="list">
	<li>
    	 <v-region :disabled="true" type="group"></v-region>
    </li>
</ul>
```
:::

### 竖排排列

:::demo 设置type为`column`来实现竖排排列

```html
<v-region type="column" :town="true"></v-region>
```
:::

### 下拉联动选择

:::demo 设置type为`select`来实现竖排排列

```html
<v-region type="select" :town="true"></v-region>
```

:::

### 自定义表单对象

在插槽中进行自定义展示布局

:::demo 在组件中插入插槽`<template slot-scope="props"></template>`来进行布局。

```html
<v-region>
    <template slot-scope="props">
    	<v-button type="primary">
        {{ props.region.area || '选择省市区' }}
        </v-button>
    </template>
</v-region>
```
:::

### 不同尺寸

额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。

:::demo 

```html
<v-region size="medium"></v-region>
<v-region size="small"></v-region>
<v-region size="mini"></v-region>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   medium / small / mini            |    —     |
| type     | 类型   | string    | group/ column / select/ city | group  |
| v-model/value | 默认选中值 | object\|array | — | — |
| fullWidth | 是否通栏展示 | array | — | false |
| disabled | 禁用选择元素 | boolean    | false/true | false   |
| city | 展示 `城市` 级别 | boolean    | false/true | true |
| area | 展示 区/县 级别 | boolean    | false/true | true |
| town | 展示 乡/镇/街道 级别 | boolean   | false/true | true |
| search | 是否展示搜索框 | boolean | false/true | true |
### Events

| 事件   | 说明             | 回调参数   |
| ------ | ---------------- | ---------- |
| change | 选中值改变时触发 | 选中的对象 |