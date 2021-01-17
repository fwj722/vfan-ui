## 字符串string

------

#### trim方法

去除字符串的空格-语法：

```javascript
string.trim(str,[type])
```

> ##### 参数
>
> ​	`str：(string)`要处理的字符串。
>
> ​	`type:(string)`去除空格的地方，如果不传则默认去除首尾空格，相当于fore-aft。
>
> ###### 			可取参数：
>
> ​				`fore-aft`除头和尾
>
> ​				`all`去除所有空格
>
> ​				`left`去除左边所有空格
>
> ​				`right`去右边所有空格
>
> ##### 返回值
>
> `(string):` 返回处理后的字符串

例子

```javascript
let username = "  xiao ming  "
string.trim(username) 
// str => 'xiao ming'   

string.trim(username,"all")
// str => 'xiaoming'

string.trim(username,"left")
// str => 'xiao ming  '

string.trim(username,"right")
// str => '  xiao ming'

```

