---
title: 函数的 length 和 callee 属性
date: 2017-07-04
categories: JavaScript
tags: JavaScript
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/17.webp
---

> 需要注意的是，`ES6` 以后不再提倡使用函数的 `callee` 属性

函数的 `length` 是形参列表的长度，就是函数定义的时候写在 `()` 中的参数个数，无视实参的个数，也就是说，`arguments.callee.length` 就是形参列表的个数，而 `arguments.length` 则表示实参个数

<!--more-->

两者的区别可以见下面这个示例

```js
function fn(a, b, c, d, e, f) {
  console.log(arguments.callee.length)  // 6
  console.log(arguments.length)         // 3
}

fn(1, 2, 3)
```



## callee

在函数内部，如果想要得到函数本身，使用 `this` 是得不到的，这时一般会使用 `arguments.callee`

```js
function fn() {
  // true，即 arguments.callee 就是函数本身
  console.log(arguments.callee === fn)
}

fn()
```





## 相关实例

```js
function fun(m, n, o, p, q, r) {
  alert(this.length)
}

function f(a, b) {
  arguments[0](9, 10, 11, 12, 13)
}

f(fun, 5, 6, 7)  // 4
```


函数的最终调用，是 `arguments` 对象进行的调用，而 `arguments` 对象则是一个类数组对象，所以函数 `fun` 中的 `this` 就是代表的 `arguments` 对象，所以 `this.length` 就是表示调用函数 `f()` 的『实参个数』，如果换成如下形式

```js
function fun(m, n, o, p, q, r) {
  alert(this.callee.length)
}

function f(a, b) {
  arguments[0](9, 10, 11, 12, 13)
}

f(fun, 5, 6, 7)  // 2
```

因为函数 `fun` 里面的 `this` 是 `arguments` 对象，所以 `arguments` 对象的 `callee` 属性就是 `f()` 函数，它的长度就是它的形参列表个数，为 `2`，再来看一个相关示例

```js
function fun(a, b, c, d) {
  // 决定了 fun2 当中的 this 指向的是 fun 当中的 arguments 对象
  arguments[0](5, 6)
}

function fun2(q, w, e, r, t) {
  alert(this.length)              // 6
  alert(this.callee.length)       // 4
  alert(arguments.length)         // 2
  alert(arguments.callee.length)  // 5
}

fun(fun2, 8, 9, 10, 11, 12)
```


## 一个综合示例

最后我们在来看一个稍微复杂一点的综合案例，如下

```js
var number = 2

var obj = {
  number: 4,
  fn1: (function () {     // fn1 是一个 IIFE，所以 this 是指向 window 的
    this.number *= 2      // 把全局变量中的 number 修改为了 4
    number = number * 2   // 此时 number 为 undefined，所以 undefined * 2 为 NaN
    var number = 3        // 变量提升，var number
    return function () {  // 然后返回一个函数（闭包）
      this.number *= 2    // 闭包特性，此时 this 为 window，所以此时全局变量中的 number 为 8
      number *= 3         // 闭包特性，number 可以拿到 fn1() 作用域当中的 number 值，所以 3 * 3 = 9
      alert(number)       // 9
    }
  })()
}

var fn1 = obj.fn1

// 此时全局中的 number 为 4，因为 IIFE 肯定最先执行
alert(number)

// 调用的实际上是返回的那个函数
// 把全局中的 number 变为了 8，闭包中的 number 变为了 9
// 执行的 alert() 弹出的是闭包中的 number 为 9
fn1()

// 这样调用的话，this 指向的是 obj
// 此时 this.number *= 2 即把 obj.number 变为了 8
// 此时的闭包还是老的闭包，因为没有重新赋值（因为没有执行过类似 var fn1 = obj.fn1 的操作）
// 因为之前执行过 fn1，所以闭包中的 number 为 9，此时再次调用后变为 27
obj.fn1()

// 此时全局的 number 为 8
alert(window.number)

// 8
alert(obj.number)
```

