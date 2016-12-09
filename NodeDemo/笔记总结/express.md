## 什么是 express

Express 是当前非常流行的一个 node web 框架。利用这个框架，我们可以非常方便的建立一个 web 站点。

利用 express 可以帮我们处理 web 服务上涉及到的很多很多的内容

* url 路由，url 参数读取，以及表单读取

* 对于不同 http 方法（GET、POST、PUT）的分发

* 自动填写 HTTP 头，例如 Content-Type

* cookie、session 的管理

* 用户管理，包括用户名判重、密码加密和保持登陆

* 模板渲染，将动态的脚本渲染成浏览器可识别的 HTML

* 静态文件服务

* 用户上传文件

* 国际化，创建语言无关的站点

* MVC支持（良好的代码结构可极大的提高代码的可读性和可维护性）

* ...

## 中间件与 next

express 的精髓在于中间件的设计理念。

express 通过其中间件机制实现了这些功能的管理。每一个中间件对应一个功能，而中间件可以是第三方库，也可以是我们的业务逻辑。

你可以把一个中间件理解为一个**处理函数（从请求产生响应）**，通过 ```app.use(<中间件名称>)``` 方法将中间件添加到一个列表中。当 HTTP 请求到达时，Express 会依次调用队列中的中间件，它们的功能便会依次执行，直到某个中间件返回了 HTTP 响应为止。

简单点来说就是：express 中的中间件（middleware）就是用来**处理请求**的，当一个中间件处理完，可以通过调用 next() 传递给下一个中间件，如果没有调用 next()，则请求不会往下传递

> 比如内置的 ```res.render``` 其实就是渲染完 html 直接返回给客户端，没有调用 next()，从而没有传递给下一个中间件。

看下面这个例子加深理解：

```js

var express = require("express");
var app = express();

app.use(function (req, res, next) {
    console.log(1)
    next()
})

app.use(function (req, res, next) {
    console.log(2)
    res.status(200).end();
})

app.listen(3000)

```

一些小贴士：

> 需要注意的是：中间件的加载顺序很重要！后面的中间件**可能**需要前面中间件的处理结果。例如：路由中间件可能需要表单解析中间件的结果，或者通常把日志中间件放到比较靠前的位置，又比如 ```connect-flash``` 中间件是基于 session 的，所以需要在 express-session 后加载。

> express@4 之前的版本基于 connect 这个模块实现的中间件的架构，express@4 及以上的版本则移除了对 connect 的依赖自己实现了，理论上基于 connect 的中间件（通常以 connect- 开头，如 connect-mongo）仍可结合 express 使用。

> 假如我们想手动控制返回的错误内容，则需要加载一个自定义错误处理的中间件 [express 的错误处理官方文档](http://expressjs.com/en/guide/error-handling.html)


## MVC

**MVC（Model-View-Controller）**的架构，为的是将网站的**数据存储**、**页面展示**、**业务逻辑**三部分分离，便于各部分的文件组织、人员分工，更重要的是由此带来的良好的可复用性和灵活性。

MVC 模式把软件系统分为三个基本部分：```模型（Model）```、```视图（View）```和```控制器（Controller）```

![image](https://docs.spring.io/spring/docs/current/spring-framework-reference/html/images/mvc.png)

一个 HTTP 请求从发出到响应完成将主要经历以下几个步骤：

1. 主控制器根据 url 和和其他信息将请求交给摸一个具体的 controller 进行处理

2. controller 处理完成后将需要展示给用户的信息用 model 传递出去

3. 主控制器将 model 和模板一起交给模板引擎进行处理，返回渲染后的 HTML

4. 将 HTML 返回给用户


## 创建 Express 项目

1. 首先安装 [express-generator](https://expressjs.com/en/starter/generator.html)

```js
$ npm install express-generator -g
```

2. 建立一个名叫 blog 的 Express 项目，并进入这个目录：

```js
express blog

cd blog
```

3. 运行 ```npm install``` 安装依赖

4. 通过 ```node ./bin/www``` 来运行我们的项目

然后用浏览器打开 3000 端口，即可看到我们的应用，我们来了解一下项目的构成：

```js
.
├── app.js
├── bin
│   └── www
├── node_modules/
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade
```
* ```app.js``` 中定义并导出了整个应用

* ```/bin/www``` 导入并执行了 app.js 中定义的应用，它是一个入口

* ```node_modules``` 则是我们 npm install 安装的依赖所在目录

* ```package.json``` 定义了我们的应用，应用也是一个 npm 包，有着一系列的依赖

* ```public``` 下存放的是静态文件，这些文件一旦客户端请求，我们会原样地返回（例如客户端javascript、css）

* ```routes``` 则是项目最核心的部分，也就是我们常说的路由模块，它拿到 HTTP 请求并返回 HTTP 响应。它最终被 app.js 引入

* ```views``` 则是视图模板，就是 HTML 的模板，用来产生动态页面


在深入展开之前，我们先来了解一下模块加载的机制:

### 模块加载机制

模块分为两大类，**核心模块** 和 **文件模块**

**核心模块** 就是 Node.js 标准 API 中提供的模块，如 ```fs、http、net``` 等。我们可以直接通过 require 获取核心模块，例如 ```require('fs')```。

核心模块拥有最高的加载优先级，换言之如果有模块与其命名冲突，Node.js 总是会加载核心模块。 

**文件模块** 则是存储为单独的文件（或文件夹）的模块，可能是 JavaScript 代码、JSON 或编译好的 C/C++ 代码。


### 按路径加载模块 

文件模块的加载有两种方式，一种是按路径加载，一种是查找 node_modules 文件夹。

如果 require 参数以  " / " 开头， 那么就以**绝对路径**的方式查找模块名称

如果 require 参数以  " ./" 或 " ../ "开头，那么则以**相对路径**的方式来查找模块

```js

var http = require("http")

// main.js
require("./a")

// a.js
console.log("hello world")

```

### 加载缓存

Node.js 模块之所以不会被重复加载，这是因为 Node.js 通过**文件名缓存**所有加载过的文件模块，所以以后再访问到时就不会重新加载了。

注意，Node.js 是根据实际**文件名**缓存的，而不是 require() 提供的参数缓存的

也就是说即使你分别通过 ```require('express')``` 和 ```require('./node_modules/express')``` 加载两次，也不会重复加载，因为尽管两次参数不同，解析到的文件却是同一个。


## 错误处理

### node.js 中的错误处理

Node 的应用依托在一个拥有大量共享状态的大进程中，如果某个回调函数发生了错误，整个进程都会遭殃，但是如果添加了 **uncatchException** 处理器，就不一样了，进程不会退出，并且之后的事情都在你的掌控中：

```js

process.on("uncatchException", function (err) {
    console.log(err);
    process.exit(1); // 手动退出
})

```

除了 uncatchException 和 error 事件外，绝大部分 node 异步 api 接收的回调函数，**第一个参数**都是**错误处理对象或者是 null**

```js

var fs = require("fs");

fs.readerFile("1.txt", function (err, data) {
    if (err) {
        return console.error(err)
    }
    console.log(data)
})

```

### 堆栈追踪

如果引入事件轮询，那么如果程序出错，堆栈信息中有价值的信息就会丢失，同理，要捕获一个未来才会执行到的函数所抛出的错误是不可能的，这也就是为什么在 node.js 中，每步都要正确的进行错误处理的原因了，一旦遗漏，你就会发现，发生了错误以后很难追踪，因为上下文的信息都丢失了

> 有一点很重要，将来 node 会让异步处理器抛出的异常更容易被追踪到



### express 中的错误处理

Express 中，错误处理通过特殊的中间件来完成。一般中间件的参数为3个：```req```, ```res```, ```next```。如果你 ```use``` 一个 4 个参数的中间件，它将被 Express 视为**错误处理中间件**。

```js

// app.js
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500); // 状态码默认为500（服务器内部错误）
        // 这里的 res.render 将第二个参数指定的数据传递给第一个参数指定的模板 error.hbs 得到 HTML 并返回给浏览器。这个过程成为 渲染 
        res.render('error', {
            message: err.message,
            error: err    // 生产环境中应设为 error: {}，禁止输出错误
        });
    });
}

// 当错误发生的时候，你需要手动地将错误传递给错误处理中间件
app.get('/throw/error', function(req, res, next){
    var err = new Error('i am an error');
    next(err);
});

```

通过 ```app.use``` 加载中间件，在中间件中通过 next 将请求传递到下一个中间件，next 可接受一个参数接收错误信息，如果使用了 next(error)，则会返回错误而不会传递到下一个中间件，简单来说就是：

* 如果带不带参数调用（如next()）则会传递给下一个普通中间件

* 如果带参数调用（如next(err)）则会传递给下一个错误处理中间件




