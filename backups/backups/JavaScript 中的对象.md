---
title: JavaScript 中的对象
date: 2017-10-07
categories: JavaScript
tags: JavaScript
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/20.jpg
---

`JavaScript` 中的所有事物都是对象，比如字符串、数值、数组、函数等等，对象只是带有属性和方法的特殊数据类型，可以使用 `typeof` 来进行判断


## typeof

<!--more-->

`typeof` 函数输出的一共有几种类型，如下

```js
console.log(typeof x)                   // undefined
console.log(typeof 10)                  // number

console.log(typeof 'abc')               // string
console.log(typeof true)                // boolean

console.log(typeof (function () { }))   // function
console.log(typeof [1, 'a', true])      // object

console.log(typeof { a: 10, b: 20 })    // object
console.log(typeof null)                // object

console.log(typeof new Number(10))      // object

console.log(typeof Symbol())            // symbol
```

其中上面的四种（`undefined`，`number`，`string`，`boolean`）的返回值属于简单的值类型，不是对象

剩下的几种情况，函数、数组、对象、`null`、`new Number(10)` 的返回值都是对象，它们都是引用类型

另外 `ES6` 引入了一种新的原始数据类型 `Symbol`，表示独一无二的值，它是 `JavaScript` 语言的第七种数据类型

判断一个变量是不是对象非常简单，只需要记住，值类型的类型判断用 `typeof`，引用类型的类型判断用 `instanceof`

```js
var fn = function () { }
console.log(fn instanceof Object)  // true
```

下面来看看创建 `JavaScript` 对象的几种方式


## 使用 new object() 来创建对象

在 `JavaScript` 中并不存在类，所以可以直接通过 `Objeact` 来创建对象

```js
var person = new object()

person.name = 'abc'
person.age = '20'

person.say = function () {
  alert(this.name + ',' + this.age)
}
```

使用如上方式创建，带来的最大问题是，由于没有类的约束，无法实现对象的重复利用，并且没有一种约定，在操作的时候可能会带来问题




## 使用 JSON 来创建对象

`JSON` 格式就是 `JavaScript` 的对象，但是它神略去了 `xml` 中的标签，而是通过 `{ }` 来完成对象的说明

```js
var person = {
  name: '张三',
  age: 20,
  say: function () {
    alert(this.name + ',' + this.age)
  }
}

person.say()
```

通过 `JSON` 依然可以创建对象数组，创建的方式和 `JavaScript` 的数组一样

```js
var arr = [
  {name : '张三', age : 20},
  {name : '李四', age : 30}
]

for (var i = 0; i < arr.length; i++) {
  alert(arr[i].name)
}
```

这里需要注意区分单纯的 `{}` 和通过 `Object.create(null)` 创建出来的 `{}` 之间的差异，详细见 [Object.create(null)](https://heptaluan.github.io/2017/03/03/JavaScript/07/#Object-create-null)



## 使用工厂模式来创建对象

通过工厂的方式来创建 `person` 对象，在 `createPerson` 中创建一个对象，然后为这个对象设置相应的属性和方法，之后在返回这个对象

```js
function createPerson(name, age) {
  var o = new Object()
  o.name = name
  o.age = age
  o.say = function () {
    alert(this.name + ',' + this.age)
  }
  return o
}

var p1 = createPerson('张三', 20)
var p2 = createPerson('李四', 20)

p1.say()
p2.say()
```

使用工厂的方式，虽然有效的解决了类的问题，但是依然存在一个问题，没有办法检测 `p1` 和 `p2` 的数据类型

通过 `typeof` 仅仅只能检测出 `object` 类型，如果希望使用 `instanceof` 来检测的话，无法确定检测的类型

简单来说就是，对象无法识别，因为所有的实例都指向一个原型



## 使用构造函数来创建对象

通过构造函数的方式创建，和基于工厂的创建类似，最大的区别就是函数的名称，约定成俗，第一个字母大写，使用构造函数创建的时候，在函数内部是通过 `this` 关键字来完成属性的定义

```js
function Person(name, age) {
  this.name = name
  this.age = age
  this.say = function () {
    alert(this.name + ',' + this.age)
  }
}

// 通过 new Person 来创建对象
var p1 = new Person('张三', 20)
var p2 = new Person('李四', 30)

p1.say()
p2.say()

// 使用构造函数的方式可以通过以下的方式来检测对象的类型
alert(p1 instanceof Person)
```

相较于工厂模式，使用构造函数来创建对象，其实例可以识别为一个特定的类型，但是使用构造函数创建所带来的问题就是每一个对象中都会存在一个方法的拷贝，如果对象行为很多的话，空间的占用率会大大的增加

如果在 `Person` 内部来创建方法 `p1.say()` 和 `p2.say()` 是不一样的，解决方法是可以将函数放到全局变量中去定义，这样可以让类中的行为指向同一个函数

```js
function Person(name, age) {
  this.name = name
  this.age = age
  this.say = say
}

function say() {
  alert(this.name + ',' + this.age)
}
```

若是将其设置为全局方法，如果将所有的方法都设为全局函数的时候，这个函数就可以被 `window` 调用

此时就破坏了对象的封装性，而且如果某个对象有大量的方法，就会导致代码中充斥着大量的全局函数，而不利于维护






## 使用原型模式来创建对象

```js
function Person(name) { }

Person.prototype.name = 'zhangsan'
Person.prototype.getName = function () {
  console.log(this.name)
}

var person1 = new Person()
```

优点是方法不会重新创建但是同样也有缺点

* 所有的属性和方法都共享

* 不能初始化参数

我们可以稍微调整一下，如下

```js
function Person(name) { }

Person.prototype = {
  name: 'zhangsan',
  getName: function () {
    console.log(this.name)
  }
}

var person1 = new Person()
```

这样封装性好了一点，但是重写了原型，丢失了 `constructor` 属性，再来稍微调整一下

```js
function Person(name) { }

Person.prototype = {
  constructor: Person,
  name: 'zhangsan',
  getName: function () {
    console.log(this.name)
  }
};

var person1 = new Person()
```

实例虽然可以通过 `constructor` 属性找到所属构造函数，但是原型模式该有的缺点还是有


## 基于组合和动态原型创建

为了解决原型所带来的问题，此外需要通过组合构造函数和原型来实现对象的创建，将属性在构造函数中定义，将方法在原型中定义

这种有效集合了两者的优点，是目前最为常用的一种方式

```js
function Person(name, age) {
  // 属性在构造函数中定义
  this.name = name
  this.age = age
}

Person.prototype = {
  constructor: Person,
  // 方法在原型中定义
  say: function () {
    alert(this.name + this.age)
  }
}

// 此时所有的属性都是保存在自己的空间中的
var p1 = new Person('zhangsan', 18)
var p2 = new Person('lisi', 22)

p1.say()
p2.say()
```






