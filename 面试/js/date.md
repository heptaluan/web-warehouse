Date 对象常用的一些方法

----

```js
// 获取当前时间
// 返回的是一个对象类型，类似（Mon Jul 03 20xx 20:04:31 GMT+0800 (中国标准时间)）
var d = new Date();


// 获取当前时间的时间戳，类似（1210745780625）
// 等同于 Date.now()  ==> 没有括号
var d = new Date().getTime();
```

## 转换

对于时间戳格式的日期，可以将其传入 new Date() 方法，即可得到日期的对象格式

```js
var d = new Date().getTime();  // 1499084023051

// ==> 直接传入

new Date(d);  // Mon Jul 03 2017 20:14:59 GMT+0800 (中国标准时间)
```

得到日期对象以后就可以使用下面方式来得到当前的日期时间

```js
// 年 - 月 - 日（注意月份从 0 开始计算）
new Date(d).getFullYear()

new Date(d).getMonth()

new Date(d).getDay()

// 时 - 分 - 秒
new Date(d).getHours()

new Date(d).getMinutes()

new Date(d).getSeconds()
```