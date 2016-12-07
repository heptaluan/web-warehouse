### Connect

Connect 是一个基于 HTTP 服务器的工具集，它提供了一种新的组织代码的方式来与请求、响应对象进行交互，称之为 中间件（middleware）

#### 原生的 http 构建的建议网站

```js

// 加载依赖
var http = require("http");
var fs = require("fs");

var server = http.createServer(function (req, res) {
    // 检查 URL 是否和服务器目录下的文件匹配，如果匹配则读取文件并且显示出来
    // 检查请求方式为 GET 并且以 /images开始， .jpg 结束
    // 如果 URL 为 "/" 的话，则响应 index.html，否则 404
    if ("GET" == req.method && "/images" == req.url.substr(0, 7) && ".jpg" == req.url.substr(-4)) {
        // fs.stat 检查文件是否存在，__dirname 来获取当前服务器所在的路径
        // 注意：这里不使用同步版本，否则当处理磁盘文件的时候，会阻塞其他请求的处理
        fs.stat(__dirname + req.url, function (err, stat) {
            if (err || !stat.isFile()) {
                res.writeHead(404);
                res.end("not found")
                return;
            }
            serve(__dirname + req.url, "application/jpg")
        })
    } else if ("GET" == req.method && "/" == req.url) {
        serve(__dirname + "/index.html", "text/html")
    } else {
        res.writeHead(404);
        res.end("not found")
    }

    function serve (path, type) {
        res.writeHead(200, { "Content-Type": type });
        fs.createReadStream(path).pipe(res);
    }
}) 

server.listen(3000, function (req, res) {
    console.log("app is running at port 3000");
})


```


#### 通过 Connect 来实现

中间件 其实就是一个简单的 js 函数，在这个例子中，我们这样配置 static 中间件--通过传递一些参数给 connect.static 方法，该方法本身会返回一个方法

```js
var connect = require("connect");

var server = connect.cerateServer();

// 将 index.html 以及 images 目录放大 /website 下，确保没有将不想托管的文件放进去
server.use(connect.static(__dirname + "/website"))

server.listen(3000)
```

简单来说，中间件由函数组成，它除了处理 req 和 res 对象之外，还接收一个 next 函数来做 **流控制**

利用中间件来改写上面的例子：

```js


server.use(function (req, res, next) {
    // 记录日志
    console.log(" %s %s ", req.method, req.url);
    next();
})

server.use(function (req, res, next) {
    if ("GET" == req.method && "/images" == req.url.substr(0, 7)) {
        //  托管图片
    } else {
        // 交给其他的中间件去处理
        next();
    }
})

server.use(function (req, res, next) {
    if ("GET" == req.method && "/" == req.url) {
        // 响应 index 文件
    } else {
        // 交给其他中间件去处理
        next()
    }
})

server.use(function (req, res, next) {
    // 最后一个中间件，如果到了这里，就意味着无能为力，只能返回 404
    res.writeHead(404);
    res.end("not found");
})

```

使用中间件，不仅能够让代码有更强大的表达能力（将应用拆分为更小单元的能力），还能够实现很好的重用性



### 书写可重用的中间件

```js

// 请求时间中间件

// 选项： "time"("Number"): 超时阀值（默认为100）

module.exports = function (opts) {
    // 默认值为 100
    var time = opts.time || 100;

    // 返回一个中间件函数
    return function (req, res, mext) {
        // 创建一个计时器，并在指定时间内触发
        var timer = setTimeout(function () {
            console.log("taking to long!", req.method, req.url)
        }, time)

        var end = res.end;
        // 首先保持对原始函数的引用（var end = res.end）
        // 然后在重写函数中，在恢复原始函数，并调用它，最后清除计时器
        res.end = function (chunk, encoding) {
            res.end = end;
            res.end(chunk, encoding)
            // 响应结束的时候，清除计时器
            clearInterval(timer);
        }

        next()
    }
}

```

测试的时候发现几点需要注意的：

1. **connect.createServer() not function**
因为最新的创建server的方式变了 见[https://github.com/senchalabs/connect](https://github.com/senchalabs/connect)

2. **Connect error - has no method 'logger'**

现在需要使用 morgan

```js

var logger = require('morgan');

var app = connect().use(logger()).// ...

```

### static 中间件

**挂载**

Connect 允许中间件挂载到 URL 上，比如，static 允许将任意一个 URL 匹配到文件系统中任意一个目录

比如说，要将/my-images URL 和 名为 /images 的目录对应起来：

```js
server.use("./my-images", connect.static("./path/to/images"))
```

需要注意的是，connect 模块现在已不支持 static，请使用 serve-static

[https://github.com/expressjs/serve-static](https://github.com/expressjs/serve-static)

或者载入指定的版本 ```npm install connect@2.X.X```










