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






