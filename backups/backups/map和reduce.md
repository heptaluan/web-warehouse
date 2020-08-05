---
title: map/reduce
date: 2017-06-01
categories: JavaScript
tags: JavaScript
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/20.jpg
---

`map()` 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果

`reduce()` 方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值，这个函数必须接收两个参数

<!--more-->

下面分别来看这两个方法


## map

由于 `map()` 方法定义在 `JavaScript` 的 `Array` 中

比如我们有一个函数 `f(x) = x * x`，要把这个函数作用在一个数组 `[1, 2, 3, 4, 5, 6, 7, 8, 9]` 上

我们调用 `Array` 的 `map()` 方法，传入我们自己的函数，就得到了一个新的 `Array` 作为结果

```js
function pow(x) {
  return x * x;
}

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]
```

再比如，把 `Array` 的所有数字转为字符串

```js
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

arr.map(String); // ['1', '2', '3', '4', '5', '6', '7', '8', '9']
```




## reduce

`Array` 的 `reduce()` 把一个函数作用在这个 `Array` 的 `[x1, x2, x3...]` 上，这个函数必须接收两个参数，`reduce()` 把结果继续和序列的下一个元素做累积计算，其效果就是

```js
[x1, x2, x3, x4].reduce(f) = f( f( f(x1, x2), x3 ), x4 )
```

比方说对一个 `Array` 求和，就可以用 `reduce` 实现

```js
var arr = [1, 3, 5, 7, 9];

arr.reduce(function (x, y) {
  return x + y;
}); // 25
```

要把 `[1, 3, 5, 7, 9]` 变换成整数 `13579`，`reduce()` 也能派上用场

```js
var arr = [1, 3, 5, 7, 9];

arr.reduce(function (x, y) {
  return x * 10 + y;
}); // 13579
```

利用 `reduce()` 求积

```js
function product(arr) {
  return arr.reduce(function(x, y){ return x * y})
}
```

下面来看一个实例

## 寻找字符串中出现次数最少的、并且首次出现位置最前的字符

要求实现一个算法，寻找字符串中出现次数最少的、并且首次出现位置最前的字符，如 `cbaacfdeaebb`

#### 方法一

利用 `hash table`，缺点是 `Object.keys()` 不能保证顺序，所以存在风险

```js
var o = [].reduce.call('cbaacfdeaebb', function (p, n) {
  return p[n] = (p[n] || 0) + 1, p;
}, {}),
  s = Object.keys(o).reduce(function (p, n) {
    return o[p] <= o[n] ? p : n;
  });

console.log(s, o[s]);
```

#### 方法二

引入了 `index` 来解决顺序问题

```js
const all = 'cbaacfdeaebb'.split('')
  .reduce((all, ch, i) => {
    const m = all[ch] || (all[ch] = { ch: ch, index: i, count: 0 });
    m.count++;
    return all;
  }, {});

const theOne = Object.keys(all)
  .map(ch => all[ch])
  .reduce((min, t) => min.count === t.count
    ? (min.index > t.index ? t : min)
    : (min.count > t.count ? t : min));

console.log(`${theOne.ch}: ${theOne.count}`);
```

#### 方法三

利用数组代替 `hash table`，解决了顺序问题，但是 `Array.sort()` 并不一定是稳定的，风险可能更大

```js
function findFirstChar(string) {
  const desc = [];

  [...string].forEach((char, index) => {
    const item = desc.find(item => item.char === char)
    item ? item.count++ : desc.push({ char, index, count: 1 })
  })

  return desc.sort((a, b) => a.count - b.count)[0]
}
```

#### 方法四

使用 `Object.values`，但是目前还是草案

```js
const less = (x, y) => (x.count <= y.count && x.first < y.first) ? x : y;

function firstSingle(string) {
  let map = {}

  string.split('')
    .forEach((char, index) => {
      map[char] ? map[char].count++ : map[char] = { count: 1, first: index, char }
    });

  return Object.values(map).reduce(less).char
}
```


#### 方法五

代码简短，但是执行效率不是很高

```js
var str = 'cbaacfdeaebb';

var result = [...new Set(str)]
  .map(el => ({ el, len: str.split(el).length }))
  .reduce((a, e) => (a.len > e.len ? e : a))
  .el;
```


