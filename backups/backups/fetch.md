---
title: Fetch
date: 2017-03-09
categories: JavaScript
tags: JavaScript
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/08.jpg
---

首先我们先来看看 `Fetch` 与 `jQuery` 的 `ajax()` 方法的一些不同点

<!--more-->


* 基于 `promise` 设计

* 当接收一个代表错误的 `http` 状态码的时候，从 `fetch()` 返回的 `promise` 不会被标记为 `reject`，即使该 `http` 响应的状态码是 `404` 或 `500`，相反，它会将 `promise` 状态标记为 `resolve`（但是会将 `resolve` 的返回值的 `ok` 属性设置为 `false`），仅当网络故障或请求被阻止时，才会标记为 `reject`

* 默认情况下，`fetch` 不会从服务端发送或接收任何 `cookies`，如果站点依赖用户 `session`，则会导致未经认证的请求（要发送 `cookie`，必须设置 `credentials` 选项），`credentials` 是 `request` 接收的只读属性，用于表示用户代理是否应该在跨域请求的情况下从其他域发送 `cookies`（与 `XHR` 的 `withCredentials` 标志相似）



## 基本语法


```js
fetch(url, options).then(function (response) {
  // handle http response
}, function (err) {
  // handle network error
})
```

## 示例

```js
// 因为现在支持性不是很好，所以需要兼容
require('babel-polyfill');
require('es6-promise').polyfill()

import 'whatwg-fetch'

fetch(url, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'same-origin'
}).then(function (response) {
  response.status      // => number 100-599
  response.statusText  // => String
  response.headers     // => Headers
  response.url         // => String

  response.text().then(function (responseText) {
    // ...
  })
}, function (err) {
  err.message  // => String
});
```


## 相关参数


#### url 

定义要获取的资源

* 一个 `USVString` 字符串，包含要获取资源的 `URL`

* 一个 `Reauest` 对象



#### options（可选） 

一个配置项对象，包括所有对请求的设置，可选的参数有

* `methods` - 请求方法，`GET`、`POST`

* `headers` - 请求的头信息，形式为 `Headers` 对象或 `ByteString`

* `body` - 请求的 `body` 信息，可能是 `bold`，`BufferSource`，`FormData`，`URLSearchParams` 或者 `USVString` 对象（`GET` 或 `HEAD` 方法的请求不包含 `body` 信息）

* `mode` - 请求的模式，如 `cors`，`no-cors`，`some-origin`

* `credentials` - 请求的 `credentials`，如 `omit`，`same-origin`，`include`

* `cache` - 请求的 `cache` 模式，如 `default`，`no-store`，`reload`，`no-cache`，`force-cache`，`only-if-cached`


#### response 

一个 `promise`，`resolve` 时回传 `Response` 对象

属性如下

* `status (number) http` - 请求结果参数 `100–599`

* `statusText (String)` - 服务器返回的状态报告

* `ok (boolean)` - 如果返回 `200` 表示请求成功则为 `true`

* `headers (Headers)` - 返回头部信息

* `url (String)` - 请求的地址


方法如下

* `text()` - 以 `string` 的形式生成请求 `text`

* `json()` - 生成 `JSON.parse(responseText)` 的结果

* `blob()` - 生成一个 `Blob`

* `arrayBuffer()` - 生成一个 `ArrayBuffer`

* `formData()` - 生成格式化的数据，可用于其他的请求


其他方法

* `clone()`

* `Response.error()`

* `Response.redirect()`



#### response.headers

* `has(name) (boolean)` - 判断是否存在该信息头

* `get(name) (String)` - 获取信息头的数据

* `getAll(name) (Array)` - 获取所有头部数据

* `set(name, value)` - 设置信息头的参数

* `append(name, value)` - 添加 header 的内容

* `delete(name)` - 删除 header 的信息

* `forEach(function(value, name){ ... }, [thisContext])` - 循环读取 `header` 的信息




## 实例

#### GET

```js
// HTML
fetch('./index.html').then(function (response) {
  return response.text()
}).then(function (body) {
  document.body.innerHTML = body
})
```

```js
// IMAGE
var img = document.querySelector('img')

fetch('index.jpg').then(function (response) {
  return response.blob()
}).then(function (bold) {
  let objectURL = URL.createObjectURL(bold)
  img.src = objectURL
})
```

```js
// JSON
fetch(url)
  .then(response => {
    return response.json()
  })
  .then(data => console.log(data))
  .catch(err => console.log(err))
```


#### POST

```js
fetch('/users', {
  methods: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'zhangsan',
    login: 'zhangsan'
  })
})

// 检查请求状态
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let err = new Error(response.statusText)
    err.response = response
    throw err
  }
}

function parseJSON(response) {
  return response.json()
}

fetch('/users')
  .then(checkStatus)
  .then(parseJSON)
  .then(data => console.log(data))
  .catch(err => console.log(err))
```

文件上传

```js
// File Upload
let input = document.querySelector('input[type="file"]')

var data = new FormData()
data.append('file', input.files[0])
data.append('user', 'zhangsan')

fetch('/upload', {
  method: 'POST',
  body: data
})
```
