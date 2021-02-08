---
title: JavaScript 中的 Map 与 forEach 的对比
date: 2018-09-12
categories: JavaScript
tags: JavaScript
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/31.webp
---

先来看一看 `MDN` 上对 `Map` 和 `ForEach` 的定义

* `forEach()` 方法对数组的每个元素执行一次提供的函数
* `map()` 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果

<!--more-->

两者的共同点

1. 都是循环遍历数组中的每一项，
2. `forEach()` 和 `map()` 里面每一次执行匿名函数都支持 `3` 个参数（数组中的当前项 `item`，当前项的索引 `index`，原始数组 `input`）
3. 匿名函数中的 `this` 都是指 `window`
4. 只能遍历数组


## forEach()

首先需要注意，`forEach()` 方法是『没有返回值』的，它不会返回执行结果，而是 `undefined`，也就是说，`forEach()` 会修改原来的数组，而 `map()` 方法会得到一个新的数组并返回

```js
arr[].forEach(function (value, index, array) {
  // ...
})
```

参数 `value` 为数组中的当前项，`index` 当前项的索引，`Array` 原始数组，数组中有几项，那么传递进去的匿名回调函数就需要执行几次，理论上这个方法是没有返回值的，仅仅是遍历数组中的每一项，不对原来数组进行修改，但是可以自己通过数组的索引来修改原来的数组

```js
let ary = [12, 23, 24, 42, 1]

let res = ary.forEach(function (item, index, input) {
  input[index] = item * 10
})

console.log(res)  // ==> undefined
console.log(ary)  // ==> 通过数组索引改变了原数组
```

## map()

是有返回值的，并且可以通过 `return` 操作符返回出来 

```js
arr[].map(function (value, index, array) {
  
  // ...

  return xxx
})
```

参数 `value` 为数组中的当前项，`index` 当前项的索引，`Array` 原始数组，区别在于 `map` 的回调函数中支持 `return` 返回值，`return` 的是什么，相当于把数组中的这一项变为什么，并不影响原来的数组，只是相当于把原数组克隆一份，把克隆的这一份的数组中的对应项改变了

```js
let ary = [12, 23, 24, 42, 1]

let res = ary.map(function (item, index, input) {
  return item * 10
})

console.log(res)  // ==> [120, 230, 240, 420, 10]  原数组拷贝了一份，并进行了修改
console.log(ary)  // ==> [12, 23, 24, 42, 1]       原数组并未发生变化
```


## 速度对比

可以使用 `jsPref` 来进行两者的速度比较，[map-vs-foreach-speed-test](https://jsperf.com/map-vs-foreach-speed-test)，结果如下

![](https://gitee.com/heptaluan/backups/raw/master/cdn/js/01.png)




## 哪个更好

至于这两个方法哪个更好，完全取决于你想要做什么（使用场景），`forEach` 适合于你并不打算改变数据的时候，而只是想用数据做一些事情，比如打印数据

```js
let arr = ['a', 'b', 'c', 'd']

arr.forEach(letter => {
  console.log(letter)
})

// a
// b
// c
// d
```

而 `map()` 适用于你要改变数据值的时候，不仅仅在于它更快，而且返回一个新的数组，这样的优点在于你可以使用复合（`map()`，`filter()`，`reduce()` 等组合使用）来玩出更多的花样

```js
let arr = [1, 2, 3, 4, 5]
let arr2 = arr.map(num => num * 2).filter(num => num > 5)

// arr2 = [6, 8, 10]
```

我们首先使用 `map` 将每一个元素乘以 `2`，然后紧接着筛选出那些大于 `5` 的元素，最终结果赋值给 `arr2`


## JavaScript 中数组迭代的方法汇总

![](https://gitee.com/heptaluan/backups/raw/master/cdn/js/02.png)

