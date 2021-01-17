## 防抖节流和导出

------

#### 防抖方法

防抖-语法：

```javascript
debounce(func, [wait = 0], [immediate])
```

> ##### 参数
>
> ​	`func` (Function):要防抖动的函数。
>
> ​	`[wait=0]` (number): 需要延迟的毫秒数。
>
> ​	`immediate`(Boolean):触发的时机，为true时，会在 wait 时间间隔的开始调用这个函数，即先调用再等待；为false时，则会在wait间隔的时间结束调用，即 先等待后调用。
>
> ##### 返回值
>
> 无
>
> ##### 描述：
>
> 返回 function 函数的防反跳, 将延迟函数的执行(真正的执行)在函数最后一次调用时刻的 wait 毫秒之后. 对于必须在一些输入（多是一些用户操作）停止到达之后执行的行为有帮助。 例如: 渲染一个Markdown格式的评论预览, 当窗口停止改变大小之后重新计算布局, 等等.
>
>   在 wait 间隔结束时，将使用最近传递给 debounced（去抖动）函数的参数调用该函数。
>
>   传参 immediate 为 true， debounce会在 wait 时间间隔的开始调用这个函数 。（并且在 waite 的时间之内，不会再次调用。）在类似不小心点了提交按钮两下而提交了两次的情况下很有用。
>
> 如果需要取消预定的 debounce ，可以在 debounce 函数上调用 .cancel()。

例子

```javascript
// 例子1：
let num = 0
let doSome = debounce(function () {
    if (num > 6) {
        doSome.cancel()
    }
}, 800, true)

document.querySelector("#btn").onclick = doSome
document.querySelector("#btn1").onclick = function () {
    if (num > 50) {
        doSome.cancel()
    }
}

// 例子2：
let lazyLayout = _.debounce(calculateLayout, 300);
$(window).resize(lazyLayout);

```

#### 节流方法

节流-语法：

```javascript
throttle(func, [wait], [options])
```

> ##### 参数
>
> ​	func (Function):要节流的函数。
>
> ​	[wait=0] (number): 需要节流的毫秒。
>
> ​	[options={}] (Object): 选项对象。
>
> ​	[options.leading=true] (boolean): 指定调用在节流开始前。
>
> ​	[options.trailing=true] (boolean): 指定调用在节流结束后。
>
> ##### 返回值
>
> ​	无
>
> ##### 描述：
>
> 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，至少每隔 wait毫秒调用一次该函数。对于想控制一些触发频率较高的事件有帮助。
>
> 默认情况下，throttle将在你调用的第一时间尽快执行这个function，并且，如果你在wait周期内调用任意次数的函数，都将尽快的被覆盖。如果你想禁用第一次首先执行的话，传递{leading: false}，还有如果你想禁用最后一次执行的话，传递{trailing: false}。
>
> 如果需要取消预定的 throttle ，可以在 throttle 函数上调用 .cancel()。

例子：

```javascript
// 例子1：
let num = 0
let doSome = throttle(function () {
    console.log(num++)
    if (num > 6) {
        doSome.cancel()
    }
}, 800, true)
document.querySelector("#btn").onclick = doSome

 // 例子2:
let throttled = throttle(updatePosition, 100);
$(window).scroll(throttled);
```

#### 导出方法：

文件导出-语法：

```javascript
exportExcel(data, name)
```

> ##### 参数
>
> ​	data:接口返回的数据。
>
> ​	name:导出的文件名字。
>
> ##### 返回值
>
> ​	无
>
> ##### 描述：
>
> [注]：如果出现导出乱码，在调用接口的参数中添加参数responseType: 'blob'即可

例子：

```javascript
// 1.接口api
getUserInfo(data) {
    return http({
        url: "/api/userInfo",
        method: "post",
        responseType: "blob",
        headers: { "Content-Type": "application/json" }
        data
    });
}
// 2.引入方法
import moment from "moment";
import { exportExcel } from "exportExcel";
// 3.调用用户接口
async exportData() {
    try {
        let res = await getUserInfo(this.userObject);
        const date = moment().format("YYYYMMDDHHmmss");
        exportExcel(res, `用户信息表{date}.xls`);
    } catch (error) {
        console.log(error);
    }
}
```

