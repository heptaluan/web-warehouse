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

* ```Array.from``` 方法可以将 ```Set``` 结构转为数组（```var array = Array.from(new Set([1, 2, 3, 4, 5]));```）

* 提供了另外一种数组去重的方法（```Array.from(new Set(array));```）



#### 遍历操作

Set 结构的实例有四个遍历方法：

* **keys()**：返回键名的遍历器

* **values()**：返回键值的遍历器

* **entries()**：返回键值对的遍历器（键名和键值）

* **forEach()**：使用回调函数遍历每个成员

```Set``` 的遍历顺序就是插入顺序（比如保存一个回调函数列表，调用时就能保证按照添加顺序调用）

（1）```keys()```，```values()```，```entries()```

上面三个方法都是遍历器对象，由于 ```Set``` 结构没有键名，只有键值（或者说键名和键值是同一个值），所以 ```keys``` 方法和 ```values``` 方法的行为完全一致

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

* ```Set``` 结构的实例默认可遍历，它的默认遍历器生成函数就是它的 ```values``` 方法

```js
Set.prototype[Symbol.iterator] === Set.prototype.values
```

* 这样一来可以省略 ```values``` 方法，直接使用 ```for...of``` 循环遍历 ```Set```

```js
for (let x of new Set(["red", "green", "blue"])) { console.log(x); }
```

（2）```forEach()```

用于对每个成员执行某种操作，没有返回值（参数依次为键值、键名、集合本身）

```js
new Set([1, 2, 3]).forEach( (value, key) => console.log(value * 2) )  // 2 4 6
```

```forEach``` 方法还可以有第二个参数，表示绑定的 ```this``` 对象




## Map

ES6 提供了 ```Map``` 数据结构。它类似于对象，也是键值对的集合，但是 "键" 的范围不限于字符串，各种类型的值（包括对象）都可以当作键

```js
var m = new Map();
var o = { p: "Hello World" };

m.set(o, "content");
m.get(o);  // "content"

m.has(o);  // true
m.delete(o);  // true
m.has(o);  // false
```

* 作为构造函数，```Map``` 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组

* 如果对同一个键多次赋值，后面的值将覆盖前面的值

* 如果读取一个未知的键，则返回 ```undefined```

**特别需要注意的是**：只有对同一个对象的引用，```Map``` 结构才将其视为同一个键

```js
var map = new Map();

map.set(["a"], 555);

// 面是针对同一个键，但实际上这是两个值，内存地址是不一样的，因此 get 方法无法读取该键，返回 undefined
map.get(["a"])  // undefined

// 调整为  ----------

var map = new Map();
var a1 = ["a"];

map.set(a1, 555);
map.get(a1);  // 555
```

同理，同样的值的两个实例，在 ```Map``` 结构中被视为两个键

```js
var map = new Map();

// 变量 k1 和 k2 的值是一样的，但是它们在 Map 结构中被视为两个键
var k1 = ["a"];
var k2 = ["a"];

map
.set(k1, 111)
.set(k2, 222);

map.get(k1)  // 111
map.get(k2)  // 222
```

由上可知，```Map``` 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键

如果 ```Map``` 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，```Map``` 将其视为一个键，包括 ```0``` 和 ```-0```，以及 ```NaN```


#### Map 结构实例的属性和方法

**size** 属性 

* 返回 ```Map``` 结构的成员总数

**set(key, value)**

* 设置 ```key``` 所对应的键值，然后返回整个 ```Map``` 结构（可以采用链式写法）（如果 ```key``` 已经有值，则键值会被更新，否则就新生成该键）

**get(key)**

* 读取 ```key``` 对应的键值，如果找不到 ```key```，返回 ```undefined```

**has(key)**

* 返回一个布尔值，表示某个键是否在 ```Map``` 数据结构中

**delete(key)**

* 删除某个键，返回 ```true```。如果删除失败，返回 ```false```

**clear()**

* 清除所有成员，没有返回值（```map.size === 0```）

```Map``` 结构转为数组结构，比较快速的方法是结合使用扩展运算符（```...```）

结合数组的 ```map``` 方法、```filter``` 方法，可以实现 ```Map``` 的遍历和过滤（```Map``` 本身没有 ```map``` 和 ```filter``` 方法）

```js
let map0 = new Map()
    .set(1, "a")
    .set(2, "b")
    .set(3, "c");

let map1 = new Map(
    [...map0].filter(([k, v]) => k < 3)
);
// 产生Map结构 {1 => "a", 2 => "b"}

let map2 = new Map(
    [...map0].map(([k, v]) => [k * 2, "_" + v])
);
// 产生Map结构 {2 => "_a", 4 => "_b", 6 => "_c"}
```
