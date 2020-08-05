---
title: axios 中跨域访问的问题
date: 2018-05-11
categories: Vue
tags: Vue
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/05.jpg
---


一般分为两种情况

<!--more-->


## 服务端不支持跨域

比如在开发过程中遇到下面这种情况

```console
No 'Access-Control-Allow-Origin' header is present on the requested resource. 
Origin 'http://xxx.com' is therefore not allowed access.
```

这种情况可以在服务端修改相关配置支持跨域即可亦或是使用 `webpack` 提供的 `proxyTable`

```js
// 在 config/index.js 中的 proxyTable 中添加
proxyTable: {
  '/WebService.asmx': {
    target: 'http://localhost:8080/jsnf_service/',
    logLevel: 'debug',
    changeOrigin: true
  }
},
```

这样就可以正常使用 `axios` 进行 `Ajax` 请求了，但是这样只能在开发模式下使用，打包部署的时候可以使用 `nginx` 做代理来解决



## 服务端支持跨域

这里又分为两种情况

1.  一种是服务端支持跨域，但是不能响应 `OPTIONS` 请求

这种情况一般说明 `Nginx` 不能响应 `OPTIONS` 请求，比如在控制台当中看到的以下信息

```js
General
  Request URL: http://...
  Request Method: OPTIONS
  Status Code: 405 Not Allowed
  // ...
```

出现 `OPTIONS` 请求的原因 [http 访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/http/Access_control_CORS#)

* 跨源资源共享标准通过新增一系列 `http` 头，让服务器能声明哪些来源可以通过浏览器访问该服务器上的资源

* 另外，对那些会对服务器数据造成破坏性影响的 `http` 请求方法（特别是 `GET` 以外的 `http` 方法，或者搭配某些 `MIME` 类型的 `POST` 请求）

* 标准强烈要求浏览器必须先以 `OPTIONS` 请求方式发送一个预请求（`preflight request`），从而获知服务器端对跨源请求所支持 `http` 方法

* 在确认服务器允许该跨源请求的情况下，以实际的 `http` 请求方法发送那个真正的请求

* 服务器端也可以通知客户端，是不是需要随同请求一起发送信用信息（包括 `Cookies` 和 `http` 认证相关数据）


解决方法：

#### 如果服务端支持简单请求

所谓的简单请求：

* 只使用 `GET`，`HEAD` 或者 `POST` 请求方法

* 如果使用 `POST` 向服务器端传送数据，则数据类型（`Content-Type`）只能是 `application/x-www-form-urlencoded`，`multipart/form-data` 或 `text/plain` 中的一种

* 不会使用自定义请求头（类似于 `X-Modified` 这种）

可以使用官方提供的解决方式，见 [Using application/x-www-form-urlencoded format](https://github.com/axios/axios#using-applicationx-www-form-urlencoded-format)


2. 另外一种情况如果服务器端支持跨域，那么可以采用 `JSONP` 来进行请求

`jsonp` 实际上就是通过添加 `script` 标签来添加的，请求回来的数据也是 `JavaScript` 格式

但是 `axios` 目前还不支持，只能自己手动创建 `script` 标签，把请求的地址赋给 `script` 标签的 `src` 属性，最后添加到 `head` 标签上，等到请求返回再把标签删掉

```js
jsonpRequest: function (a, e) {
  this._ajaxTimer && clearTimeout(this._ajaxTimer);

  this._ajaxTimer = setTimeout(function () {
    var request_script = document.createElement('script');

    request_script.setAttribute('id', 'request_script');
    request_script.src = 'http://xxxx' + '&t=' + Date.now();

    window.callback = function (response) {
      // 移除脚本
      document.body.removeChild(document.getElementById('request_script'));
      console.log(response.content);
    }

    document.body.appendChild(request_script);
  }, 500);
},
```

