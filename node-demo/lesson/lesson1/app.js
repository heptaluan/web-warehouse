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
    res.send("你好，世界");
})

// 定义好我们 app 的行为之后，让它监听本地的 3000 端口，这里的第二个函数是个回调函数，会在 listen 动作成功后执行，我们这里执行了一个命令行输出操作，告诉我们监听动作已完成。

app.listen("3000", function () {
    console.log("app is listening at port 3000");
})





