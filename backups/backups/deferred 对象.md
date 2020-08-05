---
title: deferred 对象
date: 2017-06-21
categories: jQuery
tags: jQuery
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/01.jpg
---

`jQuery.Deferred()` 基于 `Promises/A` 规范实现，因为 `jQuery` 本身的设计风格，`jQuery.Deferred()` 并没有完全遵循 `Promises/A` 规范

`jQuery` 的 `Deferred` 对象支持多个回调绑定多个任务，任务本身既可以是同步也可以是异步的，`deferred` 对象就是 `jQuery` 的回调函数解决方案

<!--more-->

说起 `deferred`，就不得不提到 `promise`，`deferred` 和 `promise` 不同，它们没有共通的规范


## deferred 和 promise 的关系

简单来说，`deferred` 和 `promise` 具有如下的关系

* `deferred` 拥有 `promise`

* `deferred` 具备对 `promise` 的状态进行操作的特权方法

![](https://gitee.com/heptaluan/backups/raw/master/cdn/jquery/01.png)

如果说 `promise` 是用来对值进行抽象的话，`deferred` 则是对处理还没有结束的状态或操作进行抽象化的对象，我们也可以从这一层的区别来理解一下这两者之间的差异

`promise` 代表了一个对象，这个对象的状态现在还不确定，但是未来一个时间点它的状态要么变为正常值（`FulFilled`），要么变为异常值（`Rejected`）

而 `deferred` 对象表示了一个处理还没有结束的这种事实，在它的处理结束的时候，可以通过 `promise` 来取得处理结果

而本文中主要介绍 `deferred` 对象，更多关于 `promise` 和 `deferred` 的内容可以参考文底链接

`deferred` 对象的含义就是延迟到未来某个点再执行，它解决了如何处理耗时操作的问题，对那些操作提供了更好的控制，以及统一的编程接口

## deferred 的使用

有了 `deferred` 对象以后，我们可以这样写：

```js
$.ajax('test.html')
  .done(function () { alert('success'); })
  .fail(function () { alert('error'); });
```

可以看到，`done()` 相当于 `success` 方法，`fail()` 相当于 `error` 方法，采用链式写法以后，代码的可读性大大提高

一个较完整的例子

```js
$.when(wait())
  .done(function () { alert('success'); })
  .fail(function () { alert('error'); });

// 如果代码是上面这样，done() 方法会立即执行，原因在于 $.when() 的参数只能是 deferred 对象
// 所以必须对 wait() 进行改写（如下所示）

var dtd = $.Deferred();  // 新建一个 deferred 对象

var wait = function (dtd) {
  var tasks = function () {
    alert('done');
    // 改变 deferred 对象的执行状态
    dtd.resolve();
  };
  setTimeout(tasks, 5000);
  return dtd;
};

// 现在，wait() 函数返回的是 deferred 对象，这就可以加上链式操作了
// wait() 函数运行完，就会自动运行 done() 方法指定的回调函数

$.when(wait(dtd))
  .done(function () { alert('success'); })
  .fail(function () { alert('error'); });
```

## resolve() 和 reject()

`jQuery` 规定，`deferred` 对象有三种执行状态 - 未完成，已完成和已失败

* 如果执行状态是已完成（`resolved`），`deferred` 对象立刻调用 `done()` 方法指定的回调函数

* 如果执行状态是已失败，调用 `fail()` 方法指定的回调函数

* 如果执行状态是未完成，则继续等待，或者调用 `progress()` 方法指定的回调函数（`jQuery1.7` 版本添加）

前面部分的 `Ajax` 操作时，`deferred` 对象会根据返回结果，自动改变自身的执行状态，但是，在 `wait()` 函数中，这个执行状态必须由程序员手动指定

`dtd.resolve()` 的意思是，将 `dtd` 对象的执行状态从未完成改为已完成，从而触发 `done()` 方法

类似的，还存在一个 `deferred.reject()` 方法，作用是将 `dtd` 对象的执行状态从未完成改为已失败，从而触发 `fail()` 方法：

```js
// 新建一个 Deferred 对象
var dtd = $.Deferred();

var wait = function (dtd) {
  var tasks = function () {
    alert('done');
    // 改变 Deferred 对象的执行状态
    dtd.reject();
  };
  setTimeout(tasks, 5000);
  return dtd;
};

$.when(wait(dtd))
  .done(function () { alert('success'); })
  .fail(function () { alert('error'); });
```

## promise 对象

大多数情况下，我们不想让用户从外部更改 `deferred` 对象的状态，这时，你可以在 `deferred` 对象的基础上，返回一个针对它的 `promise` 对象

我们可以把后者理解成，`promise` 是 `deferred` 的只读版，或者更通俗地理解成 `promise` 是一个对将要完成的任务的承诺

你可以通过 `promise` 对象，为原始的 `deferred` 对象添加回调函数，查询它的状态，但是无法改变它的状态

也就是说 `promise` 对象不允许你调用 `resolve` 和 `reject` 方法

```js
var wait = function (dtd) {
  // 在函数内部，新建一个 Deferred 对象
  var dtd = $.Deferred();

  var tasks = function () {
    alert('done');
    // 改变 Deferred 对象的执行状态
    dtd.resolve();
  };

  setTimeout(tasks, 5000);

  // 返回 promise 对象
  return dtd.promise();
};

$.when(wait())
  .done(function () { alert('success'); })
  .fail(function () { alert('error'); });
```


#### then() 方法

`then()` 的作用也是指定回调函数，它可以接受三个参数，也就是三个回调函数

第一个参数是 `resolve` 时调用的回调函数，第二个参数是 `reject` 时调用的回调函数，第三个参数是 `progress()` 方法调用的回调函数

```js
deferred.then(doneFilter[, failFilter][, progressFilter])
```

* 在 `jQuery 1.8` 之前，`then()` 只是 `.done()` 和 `.fail()` 写法的语法糖，两种写法是等价的

* 在 `jQuery 1.8` 之后，`then()` 返回一个新的 `deferred` 对象，而 `done()` 返回的是原有的 `deferred` 对象

  * 如果 `then()` 指定的回调函数有返回值，该返回值会作为参数，传入后面的回调函数

```js
var defer = jQuery.Deferred();

defer.done(function (a, b) {
  return a * b;
}).done(function (result) {
  console.log('result = ' + result);
}).then(function (a, b) {
  return a * b;
}).done(function (result) {
  console.log('result = ' + result);
}).then(function (a, b) {
  return a * b;
}).done(function (result) {
  console.log('result = ' + result);
});

defer.resolve(2, 3);

// 在 jQuery 1.8 版本之前
result = 2
result = 2
result = 2

// 在 jQuery 1.8 版本之后
result = 2
result = 6
result = NaN
```

这一点需要特别注意，比如下面这个实例：

```js
$.ajax(url1, { dataType: 'json' })
  .then(function (data) {
    return $.ajax(url2, { data: { user: data.userId } });
  }).done(function (data) {
    // 处理的是从 url2 获取的数据，而不是从 url1 获取的数据
  });
```

利用 `then()` 会修改返回值这个特性，我们可以在调用其他回调函数之前，对前一步操作返回的值进行处理

```js
// 先使用 then() 方法，从返回的数据中取出所需要的字段（firstName）
var post = $.post('/echo/json/')
  .then(function (p) {
    return p.firstName;
  });

// 后面的操作就可以只处理这个字段了
post.done(function (r) { console.log(r); });
```

有时，`Ajax` 操作返回 `json` 字符串里面有一个 `error` 属性，表示发生错误，这个时候，传统的方法只能是通过 `done()` 来判断是否发生错误

但是通过 `then()` 方法，可以让 `deferred` 对象调用 `fail()` 方法

```js
var myDeferred = $.post('/echo/json/', { json: JSON.stringify({ 'error': true }) })
  .then(function (response) {
    if (response.error) {
      return $.Deferred().reject(response);
    }
    return response;
  }, function () {
    return $.Deferred().reject({ error: true });
  });

myDeferred.done(function (response) {
  $('#status').html('success!');
}).fail(function (response) {
  $('#status').html('error');
});
```

#### state 方法

该方法用来返回 `deferred` 对象目前的状态

```js
var deferred = new $.Deferred();

deferred.state();  // 'pending'
deferred.resolve();
deferred.state();  // 'resolved'
```

返回值有三个：

* `pending`：表示操作还没有完成

* `resolved`：表示操作成功

* `rejected`：表示操作失败


#### notify() 和 progress()

`progress()` 用来指定一个回调函数，当调用 `notify()` 方法时，该回调函数将执行，它的用意是提供一个接口，使得在非同步操作执行过程中，可以执行某些操作，比如定期返回进度条的进度

```js
var userProgress = $.Deferred();
var $profileFields = $('input');
var totalFields = $profileFields.length

userProgress.progress(function (filledFields) {
  var pctComplete = (filledFields / totalFields) * 100;
  $('#progress').html(pctComplete.toFixed(0));
});

userProgress.done(function () {
  $('#thanks').html('Thanks for completing your profile!').show();
});

$('input').on('change', function () {
  var filledFields = $profileFields.filter('[value!='']').length;
  userProgress.notify(filledFields);
  if (filledFields == totalFields) {
    userProgress.resolve();
  }
});
```



#### always()

`always()` 也是指定回调函数，不管是 `resolve` 或 `reject` 都要调用


#### pipe 方法

`pipe` 方法接受一个函数作为参数，表示在调用 `then`、 `done`、 `fail` 或者 `always` 方法并且指定的回调函数之前

先运行 `pipe` 方法指定的回调函数，它通常用来对服务器返回的数据做初步处理


## 综合实例

```js
// 使用 deferred 对象写一个 wait 方法，表示等待多少毫秒后再执行
$.wait = function (time) {
  return $.Deferred(function (dfd) {
    setTimeout(dfd.resolve, time);
  });
}

// 使用
$.wait(5000).then(function () {
  alert('from the future!');
});

// 改写 setTimeout 方法
// 在上面的 wait 方法的基础上，还可以改写 setTimeout 方法，让其返回一个 deferred 对象
function doSomethingLater(fn, time) {
  var dfd = $.Deferred();
  setTimeout(function () {
    dfd.resolve(fn());
  }, time || 0);
  return dfd.promise();
}

var promise = doSomethingLater(function () {
  console.log('已经延迟执行');
}, 100);

// 自定义操作使用 deferred 接口
// 利用 deferred 接口，使得任意操作都可以用 done() 和 fail() 指定回调函数
Twitter = {
  search: function (query) {
    var dfr = $.Deferred();
    $.ajax({
      url: 'http://search.twitter.com/search.json',
      data: { q: query },
      dataType: 'jsonp',
      success: dfr.resolve
    });
    return dfr.promise();
  }
}

// 使用方法
Twitter.search('intridea').then(function (data) {
  alert(data.results[0].text);
});

// deferred 对象的另一个优势是可以附加多个回调函数
function doSomething(arg) {
  var dfr = $.Deferred();
  setTimeout(function () {
    dfr.reject('Sorry, something went wrong.');
  });
  return dfr;
}

doSomething('uh oh').done(function () {
  alert('erroring here!');
}).fail(function (message) {
  alert(message)
});
```






## 参考

[什么是 Promise](https://www.kancloud.cn/kancloud/promises-book/44258)

[Promise 对象](http://es6.ruanyifeng.com/#docs/promise)

[大白话讲解 Promise](https://www.cnblogs.com/lvdabao/p/es6-promise-1.html)

[Promise & Deferred objects in JavaScript Pt.1: Theory and Semantics.](http://blog.mediumequalsmessage.com/promise-deferred-objects-in-javascript-pt1-theory-and-semantics)

[The Deferred anti-pattern](https://github.com/petkaantonov/bluebird/wiki/Promise-anti-patterns#the-deferred-anti-pattern)

[Coming from jQuery](https://github.com/kriskowal/q/wiki/Coming-from-jQuery)

