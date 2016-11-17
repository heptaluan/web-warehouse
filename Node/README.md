Node.js 学习笔记记录

各种知识点汇总

参考 [《Node.js 包教不包会》](https://github.com/hanekaoru/node-lessons)

----

### lesson1 

一个最简单的 express 应用

#### 安装 express

```
$ mkdir lesson1 && cd lesson1
# 这里没有从官方 npm 安装，而是使用了大淘宝的 npm 镜像
$ npm install express --registry=https://registry.npm.taobao.org
```

#### 实现

新建一个 app.js

```js
// 引入 express 模块，并将其赋予变量 "express"
var express = require("express");

// 调用 express 实例，它是一个函数，不带参数调用的时候，会返回一个 express 实例
// 将这个变量赋予 app 变量
var app = express();

// app 本身有很多方法，其中包括最常用的 get，post，put/patch，delete，
// 这里调用 get 方法，为我们的 "/" 路径指定一个 haneler 函数

// haneler 函数会接收 req 和 res 两个对象，他们分别是请求的 request 和 response

// request 中包含了浏览器传来的各种信息，比如 query，body，headers等，都可以通过 req 对象访问到
// res 对象，我们一般不从里面获取信息，二十通过它来定制我们向浏览器输出的信息，比如 header 信息，例如想要向浏览器输出的内容

// 这里我们调用它的 #send 方法，像浏览器输出一个字符串

app.get("/", function (req, res) {
    res.send("hello world!");
})

// 定义好我们 app 的行为之后，让它监听本地的 3000 端口
// 这里的第二个函数是个回调函数，会在 listen 动作成功后执行，我们这里执行了一个命令行输出操作，告诉我们监听动作已完成。

app.listen("3000", function () {
    console.log("app is listening at port 3000");
})

```

补充知识：

#### 端口

端口的作用：通过端口来区分出同一电脑内不同应用或者进程，从而实现一条物理网线(通过分组交换技术-比如internet)同时链接多个程序 [Port_(computer_networking)](https://en.wikipedia.org/wiki/Port_(computer_networking))

#### URL

[RFC1738](http://www.ietf.org/rfc/rfc1738.txt) 定义的url格式笼统版本<scheme>:<scheme-specific-part>， scheme有我们很熟悉的http、https、ftp，以及著名的ed2k，thunder。

----


### lesson2

使用外部模块

#### $ npm init

初始化，生成一份最简单的 package.json 文件

#### $ npm install xxx xxx xxx --save

--save 参数的作用，就是会在你安装依赖的同时，自动把这些依赖写入 package.json

app.js

```js
// 引入依赖
var express = require("express");
var utility = require("utility");

// 建立 express 实例
var app = express();

app.get("/", function (req, res) {
    // 从 req.query 中取得 q 参数
    // 如果是 post 传过来的 body 数据，则存在于 req.body 里面
    // （express默认不处理 body 中的信息，需要引入 body-parser 中间件才会处理）
    var q = req.query.q;

    // 调用 utility.md5 方法，得到 md5 之后的值（相关库有很多，可自行选择）
    var md5Value = utility.md5(q);

    res.send(md5Value);

})

app.listen("3000", function (req, res) {
    console.log("app is running at port 3000")
})
```

需要注意的是，路径后面需要添加参数，即 ?q=abcdefg

若是不传入 q 参数时，req.query.q 取到的值是 undefined，utility.md5 直接使用了这个空值，导致下层的 crypto 抛错。


----


### lesson3

简单爬虫

























