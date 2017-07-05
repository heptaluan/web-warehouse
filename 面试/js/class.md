一些相关知识点：

* 类的内部所有定义的方法，都是不可枚举的

* 类和模块的内部，默认就是严格模式，所以不需要使用 ```use strict``` 指定运行模式

* 一个类必须有 ```constructor``` 方法，如果没有显式定义，一个空的 ```constructor``` 方法会被默认添加

* 不存在变量提升（```hoist```）

* 类的方法内部如果含有 ```this```，它默认指向类的实例

* ```class``` 中的方法有三种类型：构造函数、静态方法、原型方法

* ```Class``` 内部只有静态方法，没有静态属性

----

## 私有方法

```ES6``` 不提供，只能通过变通方法模拟实现

一种做法是在命名上加以区别

```js
class Widget {

    // 公有方法
    foo(baz) {
        this._bar(baz);
    }

    // 私有方法
    _bar(baz) {
        return this.snaf = baz;
    }

    // ...
}
```

另一种方法就是索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的

```js
class Widget {
    // foo 是公有方法，内部调用了 bar.call(this, baz)
    // 使得 bar 实际上成为了当前模块的私有方法
    foo(baz) {
        bar.call(this, baz);
    }

    // ...
}

function bar(baz) {
    return this.snaf = baz;
}
```

有一种方法是利用 ```Symbol``` 值的唯一性，将私有方法的名字命名为一个 ```Symbol``` 值

```js
const bar = Symbol("bar");
const snaf = Symbol("snaf");

export default class myClass {

    // 公有方法
    foo(baz) {
        this[bar](baz);
    }

    // 私有方法
    [bar](baz) {
        return this[snaf] = baz;
    }

    // ...
};
```



## 私有属性

与私有方法一样，```ES6``` 不支持私有属性，但是可以通过闭包来实现私有属性

```js
var People = (function () {
    var p = new WeakMap();
    class People {
        constructor(name) {
            var privateProperties = {
                name: name
            };
            p.set(this, privateProperties);
        }
        sayName() {
            console.log(this.name);
        }

        get name() {
            return p.get(this).name;
        }
    }
    return People;
})();

var p = new People("zhangsan");
console.log(p.name);
p.sayName();

var p2 = new People("lisi");
console.log(p2.name);
p2.sayName();
```


## 静态方法

静态方法一般用来提供一些工具方法，可以通过 ```static``` 关键字定义静态方法

```js
class People {
    constructor(name) { //构造函数
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
    static formatName(name) {
        return name.toUpperCase();
    }
}

console.log(People.formatName("zhangsan"));
```


## 静态属性

```Class``` 内部只有静态方法，没有静态属性

静态属性指的是 ```Class``` 本身的属性，即 ```Class.propName```，而不是定义在实例对象（```this```）上的属性

```js
class Foo {}

Foo.prop = 1;
Foo.prop // 1
```