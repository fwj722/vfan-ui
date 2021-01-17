## 数据data

------

#### 深拷贝方法

深拷贝1-[一般的深拷贝]-语法：

```javascript
clone.jsonDeepClone(obj)
```

> ##### 参数
>
> ​	obj：(string|array|object)`不包含函数、undefined，symbol等的数组或对象。
>
> ##### 返回值
>
> `(string|array|object):`拷贝的新的数据对象
>
> 描述：
>
> 该方法是借助JSON.parse(JSON.stringify(obj))的原理，可以拷贝一般的数据对象，但不能拷贝函数/方法，undefined，symbol等。

例子

```javascript
let persion = [
    {
        userName:"小王",age:25,sex:"男",
        tp:[
            {id:1,tpName:"web",year:"3"},
            {id:2,tpName:"java",year:"2"},
            {id:3,tpName:"nodeJs",year:"1"}
        ]
    },
    {
        userName:"小五",age:25,sex:"女",
        tp:[
            {id:1,tpName:"ps",year:"3"},
            {id:2,tpName:"ai",year:"2"},
            {id:3,tpName:"cdr",year:"1"}
        ]
    },
    {
        userName:"小马",age:25,sex:"女",
        tp:[
            {id:1,tpName:"绘画",year:"3"},
            {id:2,tpName:"摄影",year:"2"},
            {id:3,tpName:"影楼后期",year:"1"}
        ]
    }
]
let newData = clone.jsonDeepClone(persion);
// newData => 返回与newData完全一样的一个新对象newData

```

深拷贝2-[通用的深拷贝]-语法：

```javascript
clone.objDeepClone(obj)
```

> ##### 参数
>
> ​	obj：(object)`可以是数组、对象、方法等任意数据。
>
> ##### 返回值
>
> `(object):`拷贝的新的数据对象
>
> 描述：
>
> objDeepClone是通用的深拷贝方法，可以拷贝带undefined，null，函数，深嵌套等。

例子：

```javascript
let persion = [
    {
        userName:"小王",
        sex:"男",
        age:null,
        height:undefined,
        run:function(){
            console.log("小王run")
        },
        course:[{
            chinese:{
                teacher:"王老师",
                age:29
            },
            mathematics:{
                teacher:"李老师",
                age:35
            }
        },{
            english:[12,34,33,55],
            chemistry:[66,44,343,232,function(){
                console.log("这是课程")
            }]
        }]
    }
]
let newData = clone.objDeepClone(persion);
// newData => 返回与newData完全一样的一个新对象newData
```

