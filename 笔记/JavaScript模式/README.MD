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




