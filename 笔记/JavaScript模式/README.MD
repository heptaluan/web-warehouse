## 第三章 字面量和构造函数

####  自定义构造函数

当以 ```new``` 操作符调用构造函数的时候，函数的内部将放生以下情况：

* 创建一个空对象并且 ```this``` 变量引用了该对象，同时还继承了该函数的原型

* 属性和方法被加入到 ```this``` 引用的对象中

* 新创建的对象由 ```this``` 所引用，并且如果最后没有显示的返回其他对象，那就隐式的返回 ```this```

```js
function Person (name) {
    this.name = name;
    this.say = function () {
        return `I am  ${this.name}`
    }
}

var bar = new Person("zhangsan");

bar.say();
```

就如发生了以下事情：

```js
function Person (name) {

    // 使用对象字面量模式创建了一个新对象
    // var this = {}

    // 向 this 添加属性和方法
    this.name = name;
    this.say = function () {
        return `I am  ${this.name}`
    }

    // return this
}
```

关于 ```var this = {}```

该"空"对象实际上并不空，它已经从 Person 的原型中继承了很多成员，更像是：

```js
// var this = Object.create(Person.prototype)
```


#### 函数属性 - 备忘模式

自定义属性的其中一个用例是缓存函数结果（即返回值），因此，在下一次调用该函数的时候，就不需要重做潜在的繁重计算



```js
function foo (param) {
    if (!foo.cache[param]) {
        var result = {};
        // do something..
        foo.cache[param] = result;
    }
    return foo.cache[param];
}

// 缓存存储
foo.cache = {}
```

上面代码假定该函数只需要一个参数 ```param```，并且它是一个基本数据类型，如果有更多以及更复杂的参数，对此的通用的解决方案是将它们序列化：

```js
function foo () {
    var cacheKey = JSON.stringify(Array.prototype.slice.call(arguments)),
        result;

    if (!foo.cache[cacheKey]) {
        result = {};
        // do something..
        foo.cache[cacheKey] = result;
    }
    return foo.cache[cacheKey];
}

// 缓存存储
foo.cache = {}
```

请注意这个序列化过程，对象的"标识"将会丢失，如果有两个不同的对象并且恰好都具有相同的属性，这两个对象将会共享同一个缓存条目

另外一种方法就是使用 ```arguments.callee``` 来引用该函数（ES5 不推荐这么做，虽然目前可行）

```js
function foo (param) {
    var f = arguments.callee,
        result;

    if (!f.cache[param]) {
        result = {};
        // do something..
        f.cache[param] = result;
    }
    return f.cache[param];
}

// 缓存存储
foo.cache = {}
```


## Curry

#### 函数应用

先看一个实例：

```js
// 定义函数
var sayHi = function (who) {
    return "Hello" + (who ? ", " + who : "") + "!";
}

// 调用函数
sayHi();  // "Hello!"
sayHi("world");  // "Hello, world!"

// 应用函数
sayHi.apply(null, ["hello"]) // "Hello, hello!"
```

上面例子可以看出，调用和应用函数都可以得到相同的结果，```apply()``` 带有两个参数

* 第一个参数为将要绑定到该函数内部 ```this``` 的一个对象

* 第二个参数是一个数组或多个参数变量，这些参数将变成可用于该函数内部的类似数组的 ```arguments``` 对象

* 如果第一个参数为 ```null```，那么 ```this``` 将指向全局对象

在使用 ```apply()``` 方法的时候（```call``` 类似），如果函数是一个对象的方法的时候，此时不能传递 ```null``` 引用，在这种情况下，这里的对象将成为 ```apply()``` 的第一个参数

```js
var alien = {
    sayHi: function (who) {
        return "Hello" + (who ? ", " + who : "") + "!";
    }
}

alien.sayHi("world");  // "Hello, world!"
alien.sayHi.apply(alien, ["hello"])  // "Hello, hello!"
```

#### 部分应用

假定有一个函数 add()：

```js
// 仅用于演示，并不是合法的 js
function add (x, y) {
    return x + y;
}

// 有以下函数
add(5, 4);

// 类似步骤一
function add (5, y) {
    return 5 + y;
}

// 类似步骤二
function add (5, 4) {
    return 5 + 4;
}
```

使函数理解并处理部分应用的过程就称为 ```Curry``` 过程（Currying）

#### Curry化

我们可以将之前的 ```add()``` 函数修改成为一个用于处理部分应用的 ```Curry``` 化函数

```js
// curry 化的 add() 函数
// 接受部分参数列表
function add (x, y) {
    if (typeof y === "undefined") {
        return function (y) {
            return x + y;
        }
    }
    // 完全应用：
    return x + y;
}
```

下面是一个通用的 ```curry``` 化函数：

```js
function schonfinkelize (fn) {
    var slice = Array.prototype.slice,
        stored_args = slice.call(arguments, 1);
    return function () {
        var new_args = slice.call(arguments),
            args = stored_args.concat(new_args);
        return fn.apply(null, args);
    }
}
```

使用：

```js
// 普通函数
function add (x, y) {
    return x + y;
}

// 将一个函数 curry 化以获得一个新的函数
var newAdd = schonfinkelize(add, 5);
newAdd(4);  // 9

// 另一种选择 - 直接调用新函数
schonfinkelize(add, 6)(7);  // 13

// ---- 并不局限于单个参数或者单步 Curry 化
// 普通函数
function add (a, b, c, d, e) {
    return a + b + c + d + e;
}

// 可运行于任意数量的参数
schonfinkelize(add, 1, 2, 3)(5, 5);  // 16

// 两步 Curry 化
var addOne = schonfinkelize(add, 1);
addOne(10, 10, 10, 10);  // 41

var addSix = schonfinkelize(addOne, 2, 3);
addSix(5, 5);  // 16
```








