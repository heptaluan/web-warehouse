---
title: CommonJS、AMD 和 CMD
date: 2017-02-03
categories: JavaScript
tags: JavaScript
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/05.webp
---

关于这三个名词的释义，我们是经常可以看见的，今天我们就来简单的总结一下这三者之间的联系和区别

<!--more-->

## CommonJs

`CommonJs` 是服务器端模块的规范，`Node.js` 采用了这个规范，根据 `CommonJS` 规范，一个单独的文件就是一个模块，加载模块使用 `require` 方法，该方法读取一个文件并执行，最后返回文件内部的 `exports` 对象，比如我们在 `foobar.js` 当中定义如下内容

```js
// 私有变量
var test = 123

// 公有方法
function foobar () {
  this.foo = function () {
    // do someing ...
  }
  this.bar = function () {
    //do someing ...
  }
}

// exports 对象上的方法和变量是公有的
var foobar = new foobar()
exports.foobar = foobar
```

在 `index.js` 文件当中就可以进行引用来进行使用

```js
// require 方法默认读取 javaScript 文件，所以可以省略 javaScript 后缀
var test = require('./foobar').foobar

test.bar()
```

`CommonJS` 加载模块是同步的，所以只有加载完成才能执行后面的操作，像 `Node.js` 主要用于服务器的编程，加载的模块文件一般都已经存在本地硬盘，所以加载起来比较快，不用考虑异步加载的方式，所以 `CommonJS` 规范比较适用，但如果是浏览器环境，要从服务器加载模块，这是就必须采用异步模式，所以就有了 `AMD` 和 `CMD` 解决方案


## AMD

`AMD` 用白话文讲就是『异步模块定义』，所有的模块将被异步加载，模块加载不影响后面语句运行，所有依赖某些模块的语句均放置在回调函数中，适用 `AMD` 规范适用 `define` 方法定义模块

```js
// 通过数组引入依赖 ，回调函数通过形参传入依赖
define(['someModule1', 'someModule2'], function (someModule1, someModule2) {
  function foo() {
    // someing
    someModule1.test()
  }
  return { foo: foo }
})
```

`AMD` 规范允许输出模块兼容 `CommonJS` 规范，这时 `define` 方法如下

```js
define(function (require, exports, module) {
  var reqModule = require('./someModule')
  requModule.test()
  exports.asplode = function () {
    // someing
  }
})
```

## CMD

与 `AMD` 不同的是，`CMD` 依赖可以就近书写，而不需要在一开始就写好

```js
// AMD
define(['./a', './b'], function (a, b) {
  // 依赖一开始就写好
  a.test()
  b.test()
})

// CMD
define(function (requie, exports, module) {
  // 依赖可以就近书写
  var a = require('./a')
  a.test()

  // ...

  // 软依赖
  if (status) {
    var b = requie('./b')
    b.test()
  }
})
```

虽然 `AMD` 也支持 `CMD` 写法，但依赖前置是官方文档的默认模块定义写法

## AMD 与 CMD 区别

具体的区别可以参考两者的规范，这里只是简单的介绍

* [AMD规范](https://github.com/amdjs/amdjs-api/wiki/AMD)
* [CMD规范](https://github.com/seajs/seajs/issues/242)

总的来说，区别有两点

1. 对于依赖的模块，`AMD` 是提前执行，`CMD` 是延迟执行，不过 `RequireJS` 从 `2.0` 开始，也改成可以延迟执行（根据写法不同，处理方式不同）
2. `CMD` 推崇依赖就近（`as lazy as possible`），`AMD` 推崇依赖前置

`CMD` 推崇依赖就近，可以把依赖写进你的代码中的任意一行，例

```js
define(function (require, exports, module) {
  var a = require('./a')
  a.doSomething()

  var b = require('./b')
  b.doSomething()
})
```

代码在运行时，首先是不知道依赖的，需要遍历所有的 `require` 关键字，找出后面的依赖，具体做法是将 `function toString` 后，用正则匹配出 `require` 关键字后面的依赖，显然，这是一种牺牲性能来换取更多开发便利的方法

而 `AMD` 是依赖前置的，换句话说，在解析和执行当前模块之前，模块作者必须指明当前模块所依赖的模块，表现在 `require` 函数的调用结构上为

```js
define(['./a', './b'], function (a, b) {
  a.doSomething()
  b.doSomething()
})
```

代码在一旦运行到此处，能立即知晓依赖，而无需遍历整个函数体找到它的依赖，因此性能有所提升，缺点就是开发者必须显式得指明依赖，但是这会使得开发工作量变大，比如当你写到函数体内部几百上千行的时候，忽然发现需要增加一个依赖，你不得不回到函数顶端来将这个依赖添加进数组，但是这不是全部的情况，有的时候情况是这样的

```js
// 函数体内
if (status) {
  a.doSomething()
}
```

在这个函数体内，可能依赖 `a`，也可能不依赖 `a`，这种可能的依赖成为软依赖，对于软依赖当然可以直接当硬依赖处理，但是这样不经济，因为依赖是不一定的，有可能加载了此处的依赖而实际上没有用上，对于软依赖的处理，推荐 依赖前置 + 回调函数 的实现形式，上面的例子简单表述如下

```js
// 函数体内
if (status) {
  async(['a'], function (a) {
    a.doSomething()
  })
}
```

我们先把依赖分为两种，强依赖（肯定需要）和弱依赖（可能需要），对于强依赖，如果要性能优先，则考虑参照依赖前置的思想设计你的模块加载器，也更推崇这个方案一些，如果考虑开发成本优先，则考虑按照依赖就近的思想设计你的模块加载器，对于弱依赖，只需要将弱依赖的部分改写到回调函数内即可








## 参考

* [CommonJS 到 Sea.js](https://github.com/seajs/seajs/issues/269)
* [以代码爱好者角度来看 AMD 与 CMD](http://www.cnblogs.com/dojo-lzz/p/4707725.html)
* [AMD 和 CMD 的区别有哪些？](https://www.zhihu.com/question/20351507/answer/14859415)
* [AMD 规范与 CMD 规范介绍](http://blog.chinaunix.net/uid-26672038-id-4112229.html)


