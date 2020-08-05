---
title: 使用 Underscore
date: 2018-06-22
categories: JavaScript
tags: JavaScript
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/40.jpg
---

`underscore` 提供了一套完善的函数式编程的接口，让我们更方便地在 `JavaScript` 中实现函数式编程

<!--more-->


```js
'use strict'

_.map([1, 2, 3], (x) => x * x);  // [1, 4, 9]
```

重要的一点，是 `underscore` 的 `map()` 还可以作用于 `Object`

```js
'use strict'

_.map( { a: 1, b: 2, c: 3 }, (v, k) => k + ' = ' + v);  // ['a = 1', 'b = 2', 'c = 3']
```


## map / filter

和 `Array` 的 `map()` 与 `filter()` 类似，但是可以作用于 `Object`，当作用于 `Object` 时，传入的函数为 `function (value, key)`，第一个参数接收 `value`，第二个参数接收 `key`

需要注意的是，对 `Object` 作 `map()` 操作的返回结果是 `Array`（若是需要返回 `Object`，请使用 `_.mapObject()`）


## every / some

当集合的所有元素都满足条件的时候，`_.every()` 函数返回 `true`

当集合的至少一个元素满足条件的时候，`_.some()` 函数返回 `true`

```js
_.every([1, 4, 5, 6, 8, -2], (x) => x > 0);  // false

_some([1, 4, 5, 6, 8, -2], (x) => x > 0);  // true
```

```js
'use strict';

var obj = {
  name: 'bob',
  school: 'No.1 middle school',
  address: 'xueyuan road'
};

// 判断 key 和 value 是否全部是小写
var r1 = _.every(obj, function (value, key) {
  return (value + key) === (value + key).toLowerCase();
});

var r2 = _.some(obj, function (value, key) {
  return (value + key) === (value + key).toLowerCase();
});

alert('every key-value are lowercase: ' + r1 + '\nsome key-value are lowercase: ' + r2);
```



## max / min

返回集合中最大和最小的数

```js
var arr = [3, 5, 7, 9];

_.max(arr);  // 9

_.min(arr);  // 3


// 需要注意的是，空集合会返回 -Infinity 和 Infinity，所以要先判断集合不为空

_.max([]);  // -Infinity

_.min([]);  // Infinity
```

如果集合是 `Object，max()` 和 `min()` 只作用于 `value`，会忽略掉 `key`：

```js
_.max({ a: 1, b: 2, c: 3 });  // 3
```


## groupBy

`groupBy()` 会把集合的元素按照 `key` 归类，`key` 由传入的函数返回，一般用于数组分组

```js
'use strict'

var scores = [20, 81, 75, 40, 91, 59, 77, 66, 72, 88, 99];

var groups = _.groupBy(scores, function (x) {
  if (x < 60) {
    return 'C';
  } else if (x < 80) {
    return 'B';
  } else {
    return 'A';
  }
})

// 结果:
// {
//   A: [81, 91, 88, 99],
//   B: [75, 77, 66, 72],
//   C: [20, 40, 59]
// }
```


## shuffle / sample

`shuffle()` 用于洗牌算法随机打乱一个集合：

```js
'use strict'

_.shuffle([1, 2, 3, 4, 5, 6]);  // [3, 5, 4, 6, 2, 1]
```

`sample()` 则是随机选择一个或多个元素：

```js
'use strict'

// 随机选取 1 个
_.sample([1, 2, 3, 4, 5, 6]);  // 2

// 随机选取 3 个
_.sample([1, 2, 3, 4, 5, 6], 3);  // [6, 1, 4]
```



## Arrays

#### first / last

```js
var arr = [2, 4, 6, 8];

_.first(arr);  // 2

_.last(arr);   // 8
```


#### flatten

`flatten()` 接收一个 `Array`，无论这个 `Array` 里面嵌套了多少个 `Array`，`flatten()` 最后都会把他们变成一个一维数组

```js
_.flatten([1, [2], [3, [[4], [5]]]]);  // [1, 2, 3, 4, 5]
```


#### zip / unzip

`zip()` 把两个或多个数组的所有元素按索引对齐，然后按索引合并成新数组，例如，你有一个 `Array` 保存了名字，另一个 `Array` 保存了分数，现在，要把名字和分数给对上，用 `zip()` 轻松实现

```js
var names = ['Adam', 'Lisa', 'Bart'];
var scores = [85, 92, 59];

_.zip(names, scores);  // [['Adam', 85], ['Lisa', 92], ['Bart', 59]]
```

`unzip()` 则是反过来

```js
var namesAndScores = [['Adam', 85], ['Lisa', 92], ['Bart', 59]];

_.unzip(namesAndScores);  // [['Adam', 'Lisa', 'Bart'], [85, 92, 59]]
```


#### object

与 `zip()` 类似，不过是把名字和分数直接对应为 `Object`

```js
var names = ['Adam', 'Lisa', 'Bart'];

var scores = [85, 92, 59];

_.object(names, scores);  // {Adam: 85, Lisa: 92, Bart: 59}
```


#### range

`range()` 可以快速生成一个序列，不再需要使用 `for` 循环实现，如果只传入一个参数，默认是从 `0` 开始

```js
// 从 0 开始小于 10:
_.range(10); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// 从 1 开始小于 11：
_.range(1, 11); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 从 0 开始小于 30，步长 5:
_.range(0, 30, 5); // [0, 5, 10, 15, 20, 25]

// 从 0 开始大于 -10，步长 -1:
_.range(0, -10, -1); // [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
```


## functions

#### bind

同 `ES5` 中的 `bind()` 方法类似

```js
// 不使用 bind 的话，需要这样，直接使用的话会报错，因为直接调用 log() 传入的 this 指针是 undefined
var log = console.log();

// 调用 call 并传入 console 对象作为 this:
log.call(console, 'Hello, world!');
```

`bind()` 可以帮我们把 `console` 对象直接绑定在 `log()` 的 `this` 指针上，以后调用 `log()` 就可以直接正常调用了

```js
var log = _.bind(condole.log, console);

log('Hello, world!');
```



#### memoize

如果一个函数调用开销很大，我们就希望把结果缓存下来，以便后续调用的时候直接获得结果

```js
function factorial(n) {
  console.log('start calculate ' + n + '!...');
  var s = 1, i = n;
  while (i > 1) {
    s = s * i;
    i--;
  }
  console.log(n + '! = ' + s);
  return s;
}

factorial(10);  // 3628800
// start calculate 10!...
// 10! = 3628800
```

使用 `memoize()` 就可以自动缓存函数计算的结果：

```js
var factorial = _.memoize(function (n) {
  console.log('start calculate ' + n + '!...');
  var s = 1, i = n;
  while (i > 1) {
    s = s * i;
    i--;
  }
  console.log(n + '! = ' + s);
  return s;
})

// 第一次调用:
factorial(10); // 3628800
// 注意控制台输出:
// start calculate 10!...
// 10! = 3628800

// 第二次调用:
factorial(10); // 3628800
// 控制台没有输出
```

对于相同的调用，比如连续两次调用 `factorial(10)`，第二次调用并没有计算，而是直接返回上次计算后缓存的结果，不过，当你计算 `factorial(9)` 的时候，仍然会重新计算，这个时候可以对 `factorial()` 进行改进，让其递归调用：

```js
var factorial = _.memoize(function (n) {
  console.log('start calculate ' + n + '!...');
  if (n < 2) {
    return 1;
  }
  return n * factorial(n - 1);
})

factorial(10); // 3628800

// 输出结果说明 factorial(1)~factorial(10) 都已经缓存了:
// start calculate 10!...
// start calculate 9!...
// start calculate 8!...
// start calculate 7!...
// start calculate 6!...
// start calculate 5!...
// start calculate 4!...
// start calculate 3!...
// start calculate 2!...
// start calculate 1!...

factorial(9); // 362880
// console 无输出
```


#### once

`once()` 保证某个函数执行且仅执行一次，与 `jQuery` 中的 `one()` 方法类似


#### delay

`delay()` 可以让一个函数延迟执行，效果和 `serTimeout()` 是一样的（与 `jQuery` 中的 `delay()` 方法类似）

```js
// 2 秒后调用 alert
_.delay(alert, 2000);
```

如果要延迟调用的函数有参数，把参数也传进去

```js
var log = _.bind(console.log, conole);

_.delay(log, 200, 'Hello, world!');  // 2 秒后输出 Hello, world!
```



## Objects

#### keys / allkeys

`keys()` 可以方便地返回一个 `object` 自身所有的 `key`，但不包含从原型链继承下来的

```js
function Student (name, age) {
  this.name = name;
  this.age = age;
}

var xiaoming = new Student('小明', 20);
_.keys(xiaoming);  // ['name', 'age']
```

`allkeys()` 除了 `object` 自身的 `key`，还包含从原型链继承下来的

```js
function Student (name, age) {
  this.name = name;
  this.age = age;
}

Student.prototype.school = 'NO.1 Middle School';
var xiaoming = new Student('小明', 20);

_.allkeys(xiaoming);  // ['name', 'age', 'school']
```


#### values

和 `keys()` 类似，`values()` 返回 `object` 自身但不包含原型链继承的所有值（注意：没有 `allvalues()`）

```js
var obj = {
  name: '小明',
  age: 20
}

_.values(obj);  // ['小明', 20]
```



#### mapObject()

是针对 `object` 的 `map` 版本：

```js
var obj = { a: 1, b: 2, c: 3 };

// 需要注意的是，传入的函数名，value 在前，key 在后
_.mapObject(obj, (v, k) => 100 + v);  // { a: 101, b: 102, c: 103 }
```


#### invert

`invert()` 把 `object` 的每个 `key-value` 互相交换，`key => value`，`value => key`

```js
var obj = {
  Adam: 90,
  Lisa: 85,
  Bart: 59
}

_.invert(obj); // { '59': 'Bart', '85': 'Lisa', '90': 'Adam' }
```


#### extend / extendOwn

可以把多个 `object` 的 `key-value` 合并到第一个 `object` 并返回（可以参考 `jQuery` 的 `extend()` 方法）

```js
var a = {name: 'Bob', age: 20};
_.extend(a, {age: 15}, {age: 88, city: 'WuHan'});  // {name: 'Bob', age: 88, city: 'WuHan'}

// 变量 a 的内容也改变了
a;  // {name: 'Bob', age: 88, city: 'WuHan'}
```

需要注意的是：如果有相同的 `key`，后面的 `object` 的 `value` 将覆盖前面的 `object` 的 `value`

`extendOwn()` 和 `extend()` 类似，但是获取属性的时候会忽略掉从原型链继承下来的属性


#### clone

如果我们要复制一个 `objec`t 对象，可以使用 `clone()` 方法，它会把原有对象的所有属性都赋值到新的对象中

但是需要需要的是，`clone()` 是 '<em>浅复制'，即两个对象相同的 `key` 所引用的 `value` 其实是同一对象

也就是说，修改其中一个的话，会影响到另外一个

注意区分修改和重新赋值

* `clone()` 方法是浅拷贝，对象的引用是不同的，但是对象属性值的引用与原对象是一致的

* 修改是改变原对象值的引用所指向的内存地址存储的值，此时原对象和复制得到的新对象的属性值引用还是原来的，并没有变化，所以这种修改两个对象的属性值都会变化

* 重新赋值是开辟一个新的内存空间存新的值，这时候原对象属性值的引用已经不是之前的引用了，换句话说，这已经不是当时要复制的对象了，对之前复制得到的对象没有影响


简单来说 `Array` 可变，所以是修改，`string` 不可变，所以是重新赋值

可参考：

```js
var a = 1;
var b = a;
a === b;  // true

var a = 1;
var b = a;
a = 2;
var c = a;
b === 1;  // true
c === 2;  // true


var a = {};
var b = {};
a === b  // false
```


#### isEqual

`isEqual()` 是对两个 `object` 进行深度比较，如果内容完全相同，则返回 `true`

```js
var o1 = { name: 'Bob', skills: { AA: 90, BB: 99 }};
var o2 = { name: 'Bob', skills: { BB: 99, AA: 90 }};

o1 === o2; // false
_.isEqual(o1, o2); // true
```

其实也可以对 `Array` 进行比较：

```js
var o1 = ['Bob', { skills: ['AA', 'BB'] }];
var o2 = ['Bob', { skills: ['AA', 'BB'] }];

o1 === o2; // false
_.isEqual(o1, o2); // true
```



#### Chaining

我们有一组操作，用 `underscore` 提供的函数，如下

```js
_.filter(_.map([1, 3, 9, 16, 25], Math.sqrt), x => x % 2 === 1);
```

使用 `chain()` 函数，就可以实现链式调用的方式：

```js
_.chain([1, 4, 9, 16, 25]).map(Math.sqrt).filter(x => x % 2 === 1).value();
```

因为每一步返回的都是包装对象，所以最后一步的结果需要调用 `value()` 获取最终的结果

