---
title: axios
date: 2018-05-10
categories: Vue
tags: Vue
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/04.jpg
---

先来看看一些 `axios` 的特点

<!--more-->


* 浏览器端发起 `XMLHttpRequest` 请求

* `Node.js` 发起 `http` 请求

* 支持 `Promise API`

* 拦截请求和返回

* 转化请求和返回（`data`）

* 取消请求

* 自动转化 `json` 数据

* 客户端支持抵御 `XSRF`


## 基本语法

一个简单的 `GET` 请求

```js
axios.get('/user?id=1234')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (err) {
    console.log(err);
  })

// 等同于
axios.get('/user', {
  params: {
    id: 1234
  }
}).then(function (response) {
  console.log(response)
}).catch(function (err) {
  console.log(err)
})
```

一个简单的 `POST` 请求

```js
axios.post('/user', {
  firstName: 'firstName',
  lastName: 'lastName'
}).then(function (response) {
  console.log(response)
}).catch(function (err) {
  console.log(err)
})
```

一个多重并发请求

```js
axios.all([
  axios.get('/user/123'),
  axios.get('/user/456')
]).then(axios.spread(function (acc, pers) {
  // 两个请求均已经完成
}))
```


## API

```js
// POST 请求
axios({
  method: 'post',
  url: '/user/123',
  data: {
    firstName: 'firstName',
    lastName: 'lastName'
  }
});

// 获取远程图片
axios({
  method: 'get',
  url: 'http://imgurl/1234',
  responseType: 'stream'
}).then(function (response) {
  response.data.pipe(fs.createWriteStream('123.jpg'))
})
```


#### Request Config

请求时的设置只有 `url` 是必须的，如果没有指明 `method` 的话，默认的请求方式是 `GET`

```js
{
  // url 是服务器链接，用来请求
  url: '/user',

  // method 是发起请求时的请求方法，默认是 GET
  method: 'get',

  // baseURL 如果 url 不是绝对地址，那么将会加在其前面（当 axios 使用相对地址时这个设置非常方便）
  baseURL: 'http://some-domain.com/api/',

  // transformRequest 允许请求的数据在传到服务器之前进行转化
  // 这个只适用于 PUT，GET，PATCH 方法
  // 数组中的最后一个函数必须返回一个字符串或者一个 ArrayBuffer/Stream/Buffer/ArrayBuffer/FormData
  transformRequest: [function (data) {
    return data;
  }],

  // transformResponse 允许返回的数据传入 then/catch 之前进行处理
  transformResponse: [function (data) {
    return data;
  }],

  // headers 是自定义的要被发送的头信息
  headers: { 'X-Requested-with': 'XMLHttpRequest' },

  // params 是请求连接中的请求参数，必须是一个纯对象，或者 URLSearchParams 对象
  params: {
    id: 123
  },

  // paramsSerializer 是一个可选的函数，是用来序列化参数
  // https://ww.npmjs.com/package/qs || http://api.jQuery.com/jQuery.param/
  paramsSerializer: function(params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' })
  },

  // data 是请求提需要设置的数据
  // 只适用于应用的 'PUT' || 'POST' || 'PATCH'
  // 当没有设置 transformRequest 时，必须是以下其中之一的类型（不可重复？）：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer
  data: {
    firstName: 'firstName'
  },

  // timeout 定义请求的时间，单位是毫秒
  timeout: 1000,

  // withCredentials 表明是否跨网站访问协议（cross-site Access-Control requests）
  // 应该使用证书
  withCredentials: false

  // adapter 适配器，允许自定义处理请求，这会使测试更简单
  // 返回一个 promise，并且提供验证返回（https://github.com/axios/axios/tree/master/lib/adapters）
  adapter: function(config) {
    /*...*/
  },

  // auth 表明 http 基础的认证应该被使用，并且提供证书
  // 这个会设置一个 authorization 头（header），并且覆盖你在 header 设置的 Authorization 头信息
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // responsetype 表明服务器返回的数据类型，这些类型的设置应该是
  // 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responsetype: 'json',

  // xsrfHeaderName 是 http 头（header）的名字，并且该头携带 xsrf 的值
  xrsfHeadername: 'X-XSRF-TOKEN',

  // onUploadProgress 允许处理上传过程的事件
  onUploadProgress: function(progressEvent) {
    /*...*/
  },

  // onDownloadProgress 允许处理下载过程的事件
  onDownloadProgress: function(progressEvent) {
    /*...*/
  },

  // maxContentLength 定义 http 返回内容的最大容量
  maxContentLength: 2000,

  // validateStatus 定义 promise 的 resolve 和 reject
  // http 返回状态码，如果 validateStatus 返回 true（或者设置成 null/undefined），promise 将会接受，其他的 promise 将会拒绝
  validateStatus: function(status) {
    return status >= 200 && stauts < 300;
  },

  // 在 Node.js 中 httpAgent 和 httpsAgent 当产生一个 http 或者 https 请求时分别定义一个自定义的代理
  // 像是 keepAlive -- 这个在默认中是没有开启的
  httpAgent: new http.Agent({ keepAlive: treu }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // proxy 定义服务器的主机名字和端口号
  // auth 表明 http 基本认证应该跟 proxy 相连接，并且提供证书
  // 这个将设置一个 'Proxy-Authorization' 头（header），覆盖原先自定义的
  proxy: {
    host: 127.0.0.1,
    port: 9000,
    auth: {
      username: 'abc',
      password: '123'
    }
  },

  // cancelTaken 定义一个取消，能够用来取消请求
  cancelToken: new CancelToken(function (cancel) {
    /*...*/
  })
}
```



#### Response Schema

```js
{
  // 服务器返回的消息
  data: {},

  // htpp status
  status: 200,

  // 返回的 http 状态信息
  statusText: 'ok',

  // 返回中携带的 headers
  headers: {},

  // axios 的设置，目的是为了请求（request）
  config: {}
}

// --------------------------

axios.get('/user/12345')
  .then(function (response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
```



当使用 `catch` 时，或者传入一个 `reject callback` 作为 `then` 的第二个参数，那么返回的错误信息将能够被使用



## 添加拦截器

可以在请求或者返回被 `then` 或者 `catch` 处理之前对它们进行拦截

```js
// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  // code here
  return config;
}, function (err) {
  // code here
  return Promise.reject(err);
})

// 添加一个返回拦截器
axios.interceptors.response.use(function (response) {
  // code here
  return response;
}, function (err) {
  // code here
  return Promise.reject(err);
})
```

## 移除拦截器

```js
var myInterceptor = axios.interceptors.request.use(function() { /*...*/ })
axios.interceptors.request.eject(myInterceptor)
```

可以在一个 `axios` 实例中使用拦截器

```js
var instance = axios.create();
instance.interceptors.request.use(function() { /*...*/ });
```



## 实例

在项目中经常会遇到请求的时候需要携带 `token`，所以我们可以将其封装，使其每个请求都可以携带自定义 `token`

```js
import axios from 'axios'
import { Message } from 'element-ui'
import store from './store'

// 创建 axios 实例
const service = axios.cerate({
  baseURL: process.env.BASE_URL,  // API 的 bade_url，读取 config 配置文件
  timeout: 5000                   // 请求超时时间
})

// request 拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // 让每个请求携带自定义的 token
    config.headers['X-Token'] = store.getters.token;
  }
  return config;
}, error => {
  console.log(error);
  Promise.reject(error);
})

// response 拦截器
service.interceptors.response.use(response => {
  const res = response.data;
  // 根据 res.code 进行判断
  if (res.code !== 10000) {
    Message({
      message: res.code,
      type: 'error',
      duration: 3000
    })
    return Promise.reject(error)
  } else {
    return response.data;
  }
}, error => {
  console.log(`err${error}`)
  Message({
    message: error.message,
    type: 'error',
    duration: 3000
  })
  return Promise.reject(error)
})

export default service;
```

由于 `axios` 每一个都是一个实例里，每一请求都是基于这个实例而来的，所以配置的参数属性都会被继承下来

```js
// api
import fetch from '@/utils/fetch'

export function getInfo(token) {
  return fetch({
    url: '/user/info',
    methods: 'get',
    params: { token }
  })
}

// 可以直接使用，之前的配置都是可以生效的，会自动有一个之前所配置的 baseURL
// 如果想要手动修改请求路径，只需要覆盖 baseURL 即可
export function getInfo(token) {
  return fetch({
    baseURL: 'http://123.com',
    url: '/user/info',
    methods: 'get',
    params: { token }
  })
}
```
