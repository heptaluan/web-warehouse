---
title: vue 和 node 交互过程中跨域相关问题
date: 2018-09-18
categories: Vue
tags: Vue
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/14.jpg
---

## 问题发现

在前端代码中使用 `vue-resource` 的 `$.http.post()` 方法去访问后端 `RestAPI` 的时候，会发现在 `Chrome` 浏览器下报错

<!--more-->



```js
XMLHttpRequest cannot load http://localhost:3000/. Origin http://localhost is not allowed by Access-Control-Allow-Origin.
```

注：服务器均为本地，即 `localhost`，这个问题在使用 `$.http.get()` 方法去读取本地文件（比如同目录下的 `1.txt`）的时候也会发生

大致代码如下，只摘选了部分重点内容：

```js
// 前台 vue 代码

// ...

methods: {
  reg: function () {
    this.$.http.post("localhost:3000/api/users", {
      // ...
    }).then(function (data) {
      // ...
    })
  }
}

// ...


// ======================================================


// 后台 node 代码

// ...

router.post("/api/users", (req, res, next) => {
  // ...
})

// ...
```

这个时候可以在 `Chrome` 浏览器中的网络请求中看到，请求方式变成了 `OPTIONS`，本质上这就是跨域问题，这也是网络应用安全模型中很重要的一个概念，即 [同源准则（same-origin policy）](https://segmentfault.com/a/1190000000709909)

简单来说，就是 [非简单请求](http://www.ruanyifeng.com/blog/2016/04/cors.html) 在跨域时，浏览器会默认自动帮你发一个 `OPTIONS` 请求到服务器端去请求服务器来确认该请求的合法性

服务器端必须得有相应的路由处理该请求，并认真返回 `200` 响应，然后浏览器才会再次发出正常的，你所需要的请求

也就是说，跨域的情况下 不能随意加 `http` 请求 `header` 头，否则会先有一次对服务器的先导请求，也就是前面提到过的 `OPTIONS` 请求，然后再是正式的请求，并且这个 `OPTIONS` 请求不能被缓存，效率很低，而且也后端来配合


## 解决方法

解决方法也很简单，一种是可以使用 `Node.js` 提供的 [cors](https://github.com/expressjs/cors) 模块

另外一种就是使用 [xhr2.0](https://www.html5rocks.com/en/tutorials/file/xhr2/) 当中的 `CROS` 来处理

这里面就会涉及到 `header` 头信息的定义，这里可以参考 [w3c 中的 header 定义](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html) 和 [header 头信息详解](http://kb.cnblogs.com/page/92320/)

浏览之后可以发现，其中两个跨域相关的 `header` 属性定义如下

* `Access-Control-Allow-Origin`    允许的域（可以直接设为 `*`，表示任意）

* `Access-Control-Allow-Headers`   允许的 `header` 类型


这个时候只需要在后台手动添加一个头信息，即可解决问题，如下

```js
app.all('*', (req, res, next) => {

  res.header('Access-Control-Allow-Origin', '*');

  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    // 让 options 请求快速返回
    res.send(200);
  } else {
    next();
  }

});
```
