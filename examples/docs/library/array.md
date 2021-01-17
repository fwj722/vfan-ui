## 数组Array

------
#### unique方法

数组去重-语法：

```javascript
array.unique(arr)
```

> ##### 参数：
>
> ​	`arr：(array)`需要去重的数组。
>
> ##### 返回值：
>
> ​	`(Array):` 返回一个去重后的新数组（不影响原数组）
>
> ##### 描述：
>
> 兼容性好的通用的数组去重方法，包括 对undefined,null,NaN,""等的去重。
>

例子：

```javascript
let arr = [1,NaN,2,1,undefined,22,"admin","admin",undefined,"asss",null,NaN,null]
let newArray = array.unique(arr)
// => [1, NaN, 2, undefined, 22, "admin", "asss", null]
```

#### setUnique方法

数组去重-语法：

```javascript
array.setUnique(arr)
```

> ##### 参数：
>
> ​	`arr：(array)`需要去重的数组。
>
> ##### 返回值：
>
> ​	`(Array):` 返回一个去重后的新数组（不影响原数组）
>
> ##### 描述：
>
> 只适用于支持ES6+语法的环境。
>

例子：

```javascript
let arr = [1,NaN,2,1,undefined,22,"admin","admin",undefined,"asss",null,NaN,null]
let newArray = array.setUnique(arr)
// => [1, NaN, 2, undefined, 22, "admin", "asss", null]
```

#### concatArr方法

数组合并再去重-语法：

```javascript
array.concatArr(arr1, arr2)
```

> ##### 参数：
>
> ​	`arr1：(array)`数组1。
>
> ​	`arr2：(array)`数组2。
>
> ##### 返回值：
>
> ​	`(Array):` 返回一个合并并去重后的新数组（不影响原数组）。
>
> ##### 描述：
>
> 将两个数组先进行合并，然后去重，并返回去重后的新数组，此操作不会影响原数组中的数据。
>

例子：

```javascript
let arr1 = [1,NaN,2,1,undefined,22,"admin","好方法","admin",undefined,"asss",null,NaN,null]
let arr2 = [1,undefined,"admin","vfan","好方法"]
let newArray = concatArr(arr1,arr2)
// =>  [1, NaN, 2, undefined, 22, "admin", "好方法", "asss", null, "vfan"]
```

#### sort方法：

普通数组排序-语法：

```javascript
array.sort(arr,type)
```

> ##### 参数：
>
> ​	`arr：(array)`要排序的数组。
>
> ​	`type：(number)`排序的方式，*0||省略-正序；1-倒序*。
>
> ##### 返回值：
>
> ​	`(Array):` 排序后的新数组（会改变原数组的顺序）。
>
> ##### 描述：
>
> 对传入的数组进行排序，会影响原数组的数据，如果数组中的数值是字符串类型则不参与排序。
>

例子：

```javascript
let arr = [3,7,1,66,4,9,0,233,546,11,234]
let newArray = sort(arr)
// => [0, 1, 3, 4, 7, 9, 11, 66, 233, 234, 546]
```

#### arrayObjSort方法：

数组对象排序-语法：

```javascript
array.arrayObjSort(arr,attr,type)
```

> ##### 参数：
>
> ​	`arr：(array)`需要排序的数组*。
>
> ​	`attr:string`根据指定的属性排序。
>
> ​	`type：(number)`排序的方式，*0||省略-正序；1-倒序*。
>
> ##### 返回值：
>
> ​	`(Array):` 排序后的新数组（会改变原数组的顺序）。
>
> ##### 描述：
>
> 数组对象即数组中的每项是个对象，根据所传入的attr属性名进行排序，type传入0或者不传时，为正序，当type为1时则是倒序。
>

例子：

```javascript
let arr = [
    {name:"小明",age:20,sex:"男",height:178},
    {name:"文文",age:21,sex:"女",height:161},
    {name:"小鑫",age:18,sex:"男",height:152},
    {name:"小丹",age:15,sex:"女",height:164}]

let newArray = arrayObjSort(arr,"age")
/* => 
[{name: "小丹", age: 15, sex: "女", height: 164},
{name: "小鑫", age: 18, sex: "男", height: 152},
{name: "小明", age: 20, sex: "男", height: 178},	
{name: "文文", age: 21, sex: "女", height: 161}]
*/
```