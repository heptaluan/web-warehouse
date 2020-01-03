---
title: SuperAgent 模块
date: 2018-07-22
categories: Node.js
tags: Node.js
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/03.jpg
---

`SuperAgent` 是 `Node.js` 里一个非常方便的客户端请求代理模块，当你想处理 `get`，`post`，`put`，`delete`，`head` 请求时，你就应该想起该用它了

<!--more-->




```js
request
  .post('/api/age')
  .send({ name: 'Manny', species: 'cat' })
  .set('X-API-Key', 'foobar')
  .set('Accept', 'application/json')
  .end(function (err, res) {
    if (err || !res.ok) {
      alert('Oh no! error');
    } else {
      alert('yay got ' + JSON.stringify(res.body));
    }
  });
```


## 基本请求

初始化一个请求可以通过调用 `request` 模块中适当的方法，然后使用 `.end()` 来发送请求，例如一个简单的 `GET` 请求

```js
request
  .get('/search')
  .end(function (err, res) {
  });
```

请求方法也可以通过参数传递:

```js
request('GET', '/search').end(callback);
```

同时也支持 `ES6`，可以使用 `.then()` 来代替 `.end()`

```js
request('GET', '/search').then(success, failure);
```

`Node.js` 客户端也允许提供绝对路径:

```js
request
  .get('http://example.com/search')
  .end(function (err, res) {
  });
```

`delete`，`head`，`post`，`put` 和别的 `http` 请求都可以使用，只需要简单的改变方法名称

不过需要注意的是，`delete` 是一个特列，因为它是系统保留的关键字，所以应该用 `.del()` 这个名字

```js
request
  .del('/user/1')
  .end(function (err, res) {
  });
```

`http` 请求默认的方法为 `get`，所以就像你看到的，下面的这个例子也是可用的

```js
request('/search', function (err, res) { });
```





## 设置头字段

设置头字段非常简单，只需调用 `.set()` 方法，传递一个名称和值就行

```js
request
  .get('/search')
  .set('API-Key', 'foobar')
  .set('Accept', 'application/json')
  .end(callback)
```

也可以直接传递一个对象，这样一次就可以修改多个头字段

```js
request
  .get('/search')
  .set({ 'API-Key': 'foobar', Accept: 'application/json' })
  .end(callback)
```



## GET 请求

当使用 `get` 请求传递查询字符串的时候，用 `.query()` 方法，传递一个对象就可以，下面的代码将产生一个 `/search?query=Manny&range=1..5&order=desc` 请求

```js
request
  .get('/search')
  .query({ query: 'Manny' })
  .query({ range: '1..5' })
  .query({ order: 'desc' })
  .end(function (err, res) {
      // ...
  })
```

或者传递一个对象：

```js
request
  .get('/search')
  .query({ query: 'Manny', range: '1..5', order: 'desc' })
  .end(function (err, res) {
      // ...
  });
```

`.query()` 方法也可以传递字符串:

```js
request
  .get('/queryString')
  .query('search=Manny&range=1..5')
  .end(function (err, res) {
      // ...
  });
```




## POST/PUT 请求

一个典型的 `json post` 请求看起来就像下面的那样，设置一个合适的 `Content-type` 头字段，然后写入一些数据，在这个例子里只是 `json` 字符串

```js
request
  .post('/user')
  .set('Content-Type', 'application/json')
  .send('{"name": "zhangsan", "age": "20"}')
  .end(callback)
```

因为 `json` 非常通用，所以就作为默认的 `Content-type`，下面的例子跟上面的一样

```js
request.post('/user')
  .send({ name: 'zhangsan', age: '20' })
  .end(callback)
```

或者调用多次 `.send()` 方法

```js
request.post('/user')
  .send({ name: 'zhangsan' })
  .send({ age: '20' })
  .end(callback)
```

默认发送字符串将设置 `Content-Type` 为 `application/x-www-form-urlencoded`，多个请求将使用 `&` 连接，这里结果是 `name=zhangsan&age=20`

```js
request.post('/user')
  .send('name=zhangsan')
  .send('age=20')
  .end(callback);
```

`superagent` 的请求数据格式化是可以扩展的，不过默认支持 `form` 和 `json` 两种格式

想发送数据以 `application/x-www-form-urlencoded` 类型的话，则可以简单的调用 `.type()` 方法传递 `form` 参数就行

这里默认是 `json`，下面的请求将会 `postname=zhangsan&age=20` 内容

```js
request.post('/user')
  .type('form')
  .send({ name: 'zhangsan' })
  .send({ age: '20' })
  .end(callback)
```

注意：`form` 是 `form-data` 和 `urlencoded` 的别名，为了向后兼容



## 设置 Content-Type

常见的方案是使用 `.set()` 方法：

```js
request.post('/user')
  .set('Content-Type', 'application/json')
```

一个简便的方法是调用 `.type()` 方法，传递一个规范的 `MIME` 名称，包括 `type/subtype`，或者一个简单的后缀就像 `xml`，`json`，`png` 这样，例如

```js
request.post('/user')
  .type('application/json')

request.post('/user')
  .type('json')

request.post('/user')
  .type('png')
```


## 设置接受类型

跟 `.type()` 简便方法一样，这里也可以调用 `.accept()` 方法来设置接受类型，这个值将会被 `request.types` 所引用

支持传递一个规范的 `MIME` 名称，包括 `type/subtype`，或者一个简单的后缀就像 `xml`，`json`，`png` 例如

```js
request.get('/user')
  .accept('application/json')

request.get('/user')
  .accept('json')

request.post('/user')
  .accept('png')
```


## 查询字符串

当用 `.send(obj)` 方法来发送一个 `post` 请求，并且希望传递一些查询字符串，可以调用 `.query()` 方法,比如向 `?format=json&dest=/login` 发送 `post` 请求

```js
request
  .post('/')
  .query({ format: 'json' })
  .query({ dest: '/login' })
  .send({ post: 'data', here: 'wahoo' })
  .end(callback);
```



## 解析响应内容

`superagent` 会解析一些常用的格式给请求者，当前支持 `application/x-www-form-urlencoded`，`application/json`，`multipart/form-data`

#### JSON/Urlencoded 

`res.body` 是解析后的内容对象，比如一个请求响应 `'{'user': {'name': '20'}}'` 字符串，`res.body.user.name` 将会返回 `20`，同样的，`x-www-form-urlencoded` 格式的 `user[name] = 20` 解析完的值，也是一样的

#### Multipart

`Node.js` 客户端通过 `Formidable` 模块支持 `multipart/form-data`，当解析 `multipart` 返回时，对象 `res.files` 对你也是可用的，假设例如一个请求响应如下 `multipart` 结构

```js
--whoop
Content - Disposition: attachment; name = 'image'; filename = '20.png'
Content - Type: image / png
 
... data here ...
--whoop
Content - Disposition: form - data; name = 'name'
Content - Type: text / plain

Tobi
--whoop--
```

`res.body.name` 将为 `'Tobi'`，`res.files.image` 作为一个 `File` 对象包含磁盘地址、文件名、和其他属性



## 响应属性

`res.text` 包含未解析前的响应内容，一般只在 `mime` 类型能够匹配 `text/`，`json`，`x-www-form-urlencoding` 的情况下，默认为 `Node.js` 客户端提供，这是为了节省内存，因为当响应以文件或者图片大内容的情况下影响性能

`res.body` 跟请求数据自动序列化一样，响应数据也会自动的解析，当为一个 `Content-Type` 定义一个解析器后，就能自动解析，默认解析包含 `application/json` 和 `application/x-www-form-urlencoded`，可以通过访问 `res.body` 来访问解析对象

`res.header` 包含解析之后的响应头数据，键值都是 `Node.js` 处理成小写字母形式，比如 `res.header['content-length']`

`res.type` `Content-Type` 响应头字段是一个特列，服务器提供 `res.type` 来访问它，默认 `res.charset` 是空的,如果有的话，则自动填充，例如 `Content-Type` 值为 `text/html; charset = utf8`，则 `res.type` 为 `text/html`，`res.charst` 为 `utf8`



## 利用 SuperAgent 完成一个简单的爬虫

```js
var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

app.get('/', function (req, res, next) {
  // 用 superagent 去抓取 https://cnodejs.org 的内容
  superagent.get('https://cnodejs.org')
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }

      // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
      // 就可以得到一个实现了 jQuery 接口的变量，我们习惯性的将它命名为 '$'

      var $ = cheerio.load(sres.text);
      var items = [];
      $('#topic_list .topic_title').each(function (index, element) {
        var $element = $(element);
        var $author = $('.user_avatar img');
        items.push({
          title: $element.attr('title'),
          href: $element.attr('href'),
          author: $author.attr('title')
        })
      })

      res.send(items)
    })
})

app.listen('3000', function (req, res) {
  console.log('app is running at port 3000')
})
```


完善一下上面的例子，使用 `eventproxy` 控制并发

```js
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');

var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl).end(function (err, res) {
  if (err) {
    return console.error(err);
  }

  var topicUrls = [];
  var $ = cheerio.load(res.text);

  // 获取首页所有链接
  $('#topic_list .topic_title').each(function (index, element) {
    var $element = $(element);

    // href 原本是 /topic/542acd7d5d28233425538b04
    // 利用 url.resolve(from, to) 拼接成完整的 'https://cnodejs.org/topic/581b0c4ebb9452c9052e7acb'
    var href = url.resolve(cnodeUrl, $element.attr('href'));
    topicUrls.push(href);

  })

  // 得到 topicUrls 之后

  // 创建一个 eventproxy 的实例
  var ep = new eventproxy();

  // 命令 ep 重复监听 topicUrls.length 次（在这里也就是 40 次） `topic_html` 事件再行动
  ep.after('topic_html', topicUrls.length, function (topics) {
    // topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair

    topics = topics.map(function (topicPair) {
      var topicUrl = topicPair[0];
      var topicHtml = topicPair[1];
      var $ = cheerio.load(topicHtml);
      return ({
        title: $('.topic_full_title').text().trim(),
        href: topicUrl,
        comment1: $('.reply_content').eq(0).text().trim(),
      });
    });

    console.log('final:');
    console.log(topics);
  });

  topicUrls.forEach(function (topicUrl) {
    superagent.get(topicUrl)
      .end(function (err, res) {
        console.log('fetch ' + topicUrl + ' successful');
        ep.emit('topic_html', [topicUrl, res.text]);
      });
  });
})
```

