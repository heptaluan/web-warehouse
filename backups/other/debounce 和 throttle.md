---
title: once/bind/debouce/throttle 实现原理
date: 2017-08-25
categories: JavaScript
tags: JavaScript
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/48.jpg
---

这些函数在平常的开发过程中会经常用到，我们就来看看它们到底是如何实现的

<!--more-->

## once

原理是利用闭包的特性，传递参数，执行完一次以后就自动解除绑定

```js
function once(dom, event, callback) {
  var handle = function () {
    callback();
    dom.removeEventListener(event, handle);
  }
  dom.addEventListener(event, handle)
}
```

第二种方式，基本原理差不多，定义一个局部变量，用来标记函数是否已经调用

```js
const once = (fn) => {
  let done = false;
  return function () {
    done ? undefined : ((done = true), fn.apply(this, arguments));
  }
}

const test = once(() => {
  console.log(`test`);
})

test();  // test
test();  // undefined
```

## bind

简单的实现方式为

```js
Function.prototype.bind = Function.prototype.bind || function (context) {
  // 保存 this
  const self = this;
  // 保存第一部分参数（拆分）
  const args = Array.prototype.slice.call(arguments, 1);
  return function () {
    // 合并参数（实现 currying 功能）
    return self.apply(context, args.concat(Array.prototype.slice.call(arguments)));
  }
}
```

`MDN` 上 `bind` 的实现为下面这种，详细解释可见 [bind 的定义与实现](https://heptaluan.github.io/2017/05/07/JavaScript/15/)

```js
if (!Function.prototype.bind) {

  Function.prototype.bind = function (oThis) {

    if (typeof this !== 'function') {
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function () { },
      fBound = function () {
        return fToBind.apply(this instanceof fNOP
          ? this
          : oThis,
          aArgs.concat(Array.prototype.slice.call(arguments)));
      };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
```


## debounce 和 throttle

在某些场景下，比如拖拽（`mousemove`），窗口大小调整（`resize`）等事件，触发频率比较高，若稍处理函数很复杂的话，就需要较多的运算执行时间，响应速度跟不上触发频率，往往会出现延迟，导致假死或者卡顿感

这种情况下就出现了函数节流（`throttle`），和其类似的就是 `debounce` 函数，这两个函数的目的都是为了解决上述问题

#### 原理

比如每天上班大厦底下的电梯，把电梯完成一次运送，类比为一次函数的执行和响应，假设电梯有两种运行策略 `throttle` 和 `debounce` ，超时设定为 `15` 秒，不考虑容量限制

* `throttle` 策略的电梯，保证如果电梯第一个人进来后，`15` 秒后准时运送一次，不等待，如果没有人，则待机

* `debounce` 策略的电梯，如果电梯里有人进来，等待 `15` 秒，如果有人进来，`15` 秒等待重新计时，直到 `15` 秒超时，开始运送


#### debounce 实现

```js
// 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 time，handle 才会执行
var deBounce = function (fn, wait = 300) {
  let timer
  return function () {
    if (timer) {
      clearTimeOut(timer)
    }
    timer = setTimeOut(() => {
      fn.apply(this, arguments)
    }, wait)
  }
}
```


#### throttle 实现

```js
// 频率控制 返回函数连续调用时，handle 执行频率限定为 次/time
// throttle(time, handle)
var throttle = function (fn, wait = 300) {
  let prev = +new Date();
  return function () {
    const args = argument, now = +new Date();
    if (now > prev + wait) {
      prev = now;
      fn.apply(this, args)
    }
  }
}
```