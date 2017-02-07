## Set

数据结构 Set，类似于数组，但是它的成员都是唯一的，没有重复的值

```js
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
    console.log(i);  // 2 3 5 4
}
```

通过以上结果可知，Set 结构不会添加重复的值

Set 函数可以接受一个数组（或类似数组的对象）作为参数，用来初始化

```js
// 实例一
var set = new Set([1, 2, 3, 4, 4]);

[...set];  // 1, 2, 3, 4

// 实例二
var items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);

items.size;  // 5

// 实例三
function divs () {
    return [...document.querySelectorAll("div")];
}

var set = new Set(divs());

set.size;

// 类似与

divs().forEach(div => set.add(div));

set.size; 
```

需要注意的几点：

* 向 Set 加入值的时候，不会发生类型转换，所以 5 和 "5" 是两个不同的值

* Set 内部判断两个值是否不同，类似于精确相等运算符（===），主要的区别是 NaN 等于自身

* 两个对象总是不相等的


#### Set 实例的属性和方法

Set 结构有以下属性：

* ```Set.prototype.constructor```：构造函数，默认就是 Set 函数

* ```Set.prototype.size```：返回 Set 实例的成员总数

Set 结构的方法有两大类，操作方法（用于操作数据）和遍历方法（用于遍历成员）：

* **add(value)**：添加某个值，返回 Set 结构本身

* **delete(value)**：删除某个值，返回一个布尔值，表示删除是否成功

* **has(value)**：返回一个布尔值，表示该值是否为 Set 的成员

* **clear()**：清除所有成员，没有返回值

```js
// 注意2被加入了两次
s.add(1).add(2).add(2);

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false
```

与 ```Object``` 结构对比：

```js
// 对象的写法
var properties = {
    "width": 1,
    "height": 1
};

if (properties[someName]) {
    // do something
}

// Set的写法
var properties = new Set();

properties.add("width");
properties.add("height");

if (properties.has(someName)) {
    // do something
}
```

* Array.from 方法可以将 Set 结构转为数组（```var array = Array.from(new Set([1, 2, 3, 4, 5]));```）

* 提供了另外一种数组去重的方法（```Array.from(new Set(array));```）



#### 遍历操作

Set 结构的实例有四个遍历方法：

* ```keys()```：返回键名的遍历器

* ```values()```：返回键值的遍历器

* ```entries()```：返回键值对的遍历器（键名和键值）

* ```forEach()```：使用回调函数遍历每个成员

Set 的遍历顺序就是插入顺序（比如保存一个回调函数列表，调用时就能保证按照添加顺序调用）

（1）```keys()```，```values()```，```entries()```

上面三个方法都是遍历器对象，由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以 keys 方法和 values 方法的行为完全一致

```js
let set = new Set(["red", "green", "blue"]);

for (let item of set.keys()) {
    console.log(item);
}

// red
// green
// blue

for (let item of set.values()) {
    console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
    console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

* ```Set``` 结构的实例默认可遍历，它的默认遍历器生成函数就是它的 ```values``` 方法（```Set.prototype[Symbol.iterator] === Set.prototype.values```）

* 这样一来可以省略 ```values``` 方法，直接使用 ```for...of``` 循环遍历 ```Set```（```for (let x of new Set(["red", "green", "blue"])) { console.log(x); }```）```

（2）```forEach()```

用于对每个成员执行某种操作，没有返回值（参数依次为键值、键名、集合本身）

```js
new Set([1, 2, 3]).forEach( (value, key) => console.log(value * 2) )  // 2 4 6
```

```forEach``` 方法还可以有第二个参数，表示绑定的 ```this``` 对象
