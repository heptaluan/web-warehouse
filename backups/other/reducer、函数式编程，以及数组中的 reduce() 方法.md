---
title: reducer、函数式编程，以及数组中的 reduce() 方法
date: 2019-04-03
categories: React
tags: React
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/10.jpg
---

注意区分三者的区别

<!--more-->

## 纯函数（reducer）

在 `reducer` 中指定状态数据转换的逻辑，一般都是依靠着纯函数来改变数据

即每次传入一个 `state` 和 `action`，得到的 `state` 都是确定的，可以预测的


```js
(state, action) => state
```

所谓的纯函数即不产生副作用的函数

* 相同的输入，结果始终相同

* 不对外部环境进行操作


比如下面三种情况都不能属于纯函数

* 函数体中调用了 `Math.random()`（随机性）

* 函数体中调用了 `Date.now()`（随机性）

* 还有下面这种，调用了不确定的外部变量

```js
var a = 0;

function do(b) {
  return a + b
};
```




## 函数式编程

一个简单的例子

```js
car = driveForward(car);
car = stop(car);
car = removePassenger(car, passenger);

// ==>

car = removePassenger(stop(driveForward(car)), passenger);

// ==>

function uber(car, passenger) {
  return removePassenger(stop(driveForward(car)), passenger);
}

car = uber(car, passenger);
```

再来看一个示例

```js
var next = 1;
var otherVar;

function next() {
  otherVar = doSomeThing();
  return next++;
}

it('gets the next number', function () {
  expect(next().toBe(1))
})

// 这种情况下 next 的值是被改变了的，可以换成下面的写法

function next() {
  return current + 1;
}

it('gets the next number', function () {
  var current = 1;
  expect(next(current)).toBe(2)

  // current 的值并没有改变
  expect(current).toBe(1)
})
```

为什么要这样使用，有以下几个原因

* 结果总是可以预见的

* 更容易理解 `app` 的逻辑

* 更容易进行单元测试，不依赖外部的环境，不调用外部的变量

* 组件、工具函数高度分离，很容易复用、复合











## 数组中的 reduce() 方法

`reduce()` 方法接收一个函数作为累加器（`accumulator`），数组中的每个值（从左到右）开始缩减，最终为一个值

```js
arr.reduce(callback, [initialValue])
```

它接收两个参数，`callback` 和 `initialValue`

`callback` 参数，表示执行数组中每个值的函数，包含四个参数

* `previousValue`  上一次调用回调返回的值，或者是提供的初始值（`initialValue`）

* `currentValue`  数组中当前被处理的元素

* `index`  当前元素在数组中的索引

* `array`  调用 `reduce` 的数组

`initialValue` 参数，表示作为第一次调用 `callback` 的第一个参数

`reduce` 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，接受四个参数：初始值（或者上一次回调函数的返回值），当前元素值，当前索引，以及调用 `reduce` 的数组

回调函数第一次执行时，`previousValue` 和 `currentValue` 可以是一个值

* 如果 `initialValue` 在调用 `reduce` 时被提供，那么第一个 `previousValue` 等于 `initialValue` ，并且 `currentValue` 等于数组中的第一个值

* 如果 `initialValue` 未被提供，那么 `previousValue` 等于数组中的第一个值，`currentValue` 等于数组中的第二个值

例如执行下面的代码

```js
[0, 1, 2, 3, 4].reduce(function (previousValue, currentValue, index, array) {
  return previousValue + currentValue;
});
```

回调被执行四次，每次的参数和返回值如下表：

||previousValue|currentValue|index|array|return value|
|-|-|-|-|-|-|
|first call|0|1|1|[0, 1, 2, 3, 4]|1|
|second call|1|2|2|[0, 1, 2, 3, 4]|3|
|third call|3|3|3|[0, 1, 2, 3, 4]|6|
|fourth call|6|4|4|[0, 1, 2, 3, 4]|10|

`reduce` 的返回值是回调函数最后一次被调用的返回值（`10`）

如果把初始值作为第二个参数传入 `reduce`，最终返回值变为 `20`，结果如下：

```js
[0, 1, 2, 3, 4].reduce(function (previousValue, currentValue, index, array) {
  return previousValue + currentValue;
}, 10);
```

||previousValue|currentValue|index|array|return value|
|-|-|-|-|-|-|
|first call|10|0|0|[0, 1, 2, 3, 4]|10|
|second call|10|1|1|[0, 1, 2, 3, 4]|11|
|third call|11|2|2|[0, 1, 2, 3, 4]|13|
|fourth call|13|3|3|[0, 1, 2, 3, 4]|16|
|fifth call|16|4|4|[0, 1, 2, 3, 4]|20|


比如一个将数组所有项相加的例子

```js
// 结果为 6
var total = [0, 1, 2, 3].reduce(function (a, b) {
  return a + b;
});
```
