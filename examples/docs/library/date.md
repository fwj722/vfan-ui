## 日期时间date

时间戳自定义格式转换，支持年月日时分秒等多种形式组合的日期和时间的方法

------

#### formatDate方法

时间戳转日期时间-语法：

```javascript
date.formatDate(date,formatStr)
```

> ##### 参数
>
> ​	`date：(Date)`创建 Date 对象,如果是时间戳，则需要通过new Date()来创建Date对象，如果此处是中国标准时间，则直接传入即可。
>
> ​	`formatStr:(string)`日期格式。格式可自定义，如：
>
> 年月日时分秒格式：YYYY-MM-DD HH:ii:ss，YYYY年MM月DD日 HH时ii分ss秒
>
> 年月日格式：YYYY-MM-DD，YYYY年MM月DD日
>
> 时分秒的格式：HH:ii:ss，HH时ii分ss秒
>
> 年月日周格式：YYYY-MM-DD 周W
>
> 月日周格式：MM-DD 周W
>
> ......更多的可随意发挥
>
> [^注]: 对于周的表述，大写的W代表周，小写的w代表当天在周中的第几天，如周日表示0，周一表示1，一次类推。
>
> ##### 返回值
>
> `(string):` 日期时间
>
> ##### 描述
>
> date参数是创建的时间对象，即new Date，需要传入要转换的时间戳，此时间戳为毫秒；formatStr参数是自定义的转换后的格式，支持年月日时分秒等多种形式组合的日期和时间的方法。

例子

```javascript
// 例子1：时间戳转 => 年、月、日、时、分、秒
let dateTime = date.formatDate(new Date(1596931689*1000),"YYYY-MM-DD HH:ii:ss");
let dateTime1 = date.formatDate(new Date(1596931689*1000),"YYYY年MM月DD日 HH时ii分ss秒");
// dateTime => 2020-08-09 08:08:09
// dateTime1 => 2020年08月09日 08时08分09秒

// 例子2：时间戳转 => 年、月、日、周
let dateWeek = date.formatDate(new Date(1596931689*1000),"YYYY年MM月DD日 周W");
// dateWeek => 2020年08月09日 周日

// 例子3：时间戳转 => 时、分、秒
let time = date.formatDate(new Date(1596931689*1000),"HH:ii:ss");
// time => 08:08:09
```

#### timeToTimestamp方法

日期时间转时间戳-语法：

```javascript
date.timeToTimestamp(dateTime)
```

> ##### 参数
>
> ​	dateTime：(Date)`标准日期时间格式。
>
> ##### 返回值
>
> `(Date):` 时间戳
>
> ##### 描述
>
> timeToTimestamp方法是将传入的日期时间转成时间戳,转换后是毫秒，timeToTimestamp可以为标准日期时间格式，中国日期时间格式等，具体可参考下方例子。

例子：

```javascript
let dateTime = date.timeToTimestamp("2020-09-09 12:43:23");
// dateTime => 1599626603000

let dateTime1 = date.timeToTimestamp(new Date());
// dateTime1 => 1600869711736

let dateTime3 = date.timeToTimestamp("Wed Sep 23 2020 22:02:12 GMT+0800 (中国标准时间)");
// dateTime3 => 1600869732000

let dateTime4 = date.timeToTimestamp("2020/09/08");
// dateTime4 => 1599494400000
```

#### getTimeInterval方法

获取两个时间的间隔时间差-语法：

```javascript
date.getTimeInterval(st,et)
```

> ##### 参数
>
> ​	st：(string)`开始时间，此处为时间戳。
>
> ​	et：(string)`结束时时间，此处为时间戳。
>
> ##### 返回值
>
> `(string):`返回间隔的天、小时、分钟和秒
>
> ##### 描述
>
> getTimeInterval方法是传入开始和结束的时间戳，获得时间差，时间差以-天-时-分-秒形式展示，如果时间差为负数，则返回空。

例子：

```javascript
// 当开始时间大于结束时间时：
let dateTime = date.getTimeInterval("1600143669000","1599970991000");
// dateTime => 空的

// 当开始时间小于于结束时间时：
let dateTime1= date.getTimeInterval("1599970991000","1600143669000");
// dateTime1 => 1天23小时57分钟58秒
```

