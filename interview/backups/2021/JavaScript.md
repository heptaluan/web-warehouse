---
title: JavaScript 知识梳理
date: 2020-07-22
categories: JavaScript
tags: JavaScript
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/53.webp
---

之前我们整理了 [HTML 知识梳理](https://heptaluan.github.io/2020/06/29/HTML/00/) 和 [CSS 知识梳理](https://heptaluan.github.io/2020/07/12/CSS/00/)，本章我们就开始梳理最为重要的 `JavaScript` 部分，内容可能比较多，但是不要着急，我们会分章节来慢慢进行介绍，更多详细内容可见 [前端知识体系整理](https://heptaluan.github.io/target/)

<!--more-->

本章当中主要内容包括以下这些

* `ECMAScript`
  * `ES5`
    * 基本数据类型（类型转换/类型判断）
    * 运算符（优先级/隐式类型转换）
    * 对象（定义方式/原型链）
    * 函数（事件流/基本类型与引用类型/作用域/执行上下文栈/继承）
    * `this`（调用方式/如何确定 `this` 的值）
    * 闭包（闭包模型/柯里化/偏函数）
    * 深浅拷贝
  * `ES6+`
    * 块级作用域/模板字符串
    * `Class/Reflect/Symbol/Set/Map/Generator/Iterator/Arrow Function`
* `BOM` 和 `DOM`
  * `DOM`（节点类型/节点关系/节点操作）
  * `BOM`（`Window/Navigator/Screen/History/Location`）
* 手写 `API`
  * `call/apply/bind`
  * `once/debounce/thorttle`
* 异步（`Callback/Promise/Generator/Async/Await`）
* 并发模型（渲染进程/`Event Loop`/任务队列）
* `V8` 引擎
  * 解析器与 `AST`（基线编译器/优化编译器）
  * 垃圾回收机制（标记清除/引用计数）
    * 新生代（`Scavenge/Cheney`）
    * 老生代（`Mark-Sweep/Mark-Compact`）
* 设计模式（单例模式/工厂模式/代理模式/观察者模式/发布订阅模式/适配器模式/装饰器模式）
* `TypeScript`
  * 基础类型/内置对象/对象类型/数组类型/函数类型
  * 元组/枚举/类与接口（`readonly`/抽象类/私有字段）
  * 泛型（接口/类/约束/参数默认类型/条件类型/工具类型）
  * `React + TypeScript`
    * 组件 `Props` 与 `Hooks`
* 正则表达式





## 运算符

`JavaScript` 当中的运算符我们这里暂且分为两类，一类是比较常见的 `===`，`||` 等，另一类是平常使用较少但是多见于各种类库当中的位运算符，`==` 和 `===` 我们在上面的类型之间的转换当中已经介绍过了，下面我们来看剩余的一些内容

* [JavaScript 中的 || 和 &&](https://heptaluan.github.io/2017/05/19/JavaScript/15/)
  * `||`
  * `&&`
  * 短路
  * 隐式强制类型转换
  * 运算符优先级
* [JavaScript 中的位运算符](https://heptaluan.github.io/2020/07/17/JavaScript/52/)
  * `!!`
  * `~~`
  * `&`（按位与）
  * `|`（按位或）
  * `^`（按位异或）
  * `<<`（左移运算符）
  * `>>`（有符号右移）
  * `>>>`（无符号右移）


## 对象

`JavaScript` 中的所有事物都是对象，比如字符串、数值、数组、函数等等，对象只是带有属性和方法的特殊数据类型，创建方式有以下这些

* 使用 `new object()` 来创建对象，在 `JavaScript` 中并不存在类，所以可以直接通过 `Objeact` 来创建对象，比如 `var person = new object()`
* 使用 `JSON` 来创建对象，也就是比较常见的 `var obj = { }`
* 使用工厂模式来创建对象，就是在函数当中创建一个对象，然后为这个对象设置相应的属性和方法，之后在返回这个对象
* 使用构造函数来创建对象，同工厂模式，不过在使用构造函数创建的时候，函数内部是通过 `this` 关键字来完成属性的定义
* 使用原型模式来创建对象，在函数的 `prototype` 上去定义属性和方法（这里重写了原型，会存在 `constructor` 丢失的问题）
* 基于组合和动态原型创建，属性在构造函数中定义，将方法在原型中定义，比较常用的一种

创建了对象以后，我们就可以进行遍历的操作，这部分可以参考 [遍历对象的几种方法](https://heptaluan.github.io/2019/06/28/JavaScript/35/)，主要包括

* `Object.keys(obj)`
* `for-in`
* `Object.getOwnPropertyNames(obj)`
* `Reflect.ownKeys`
* `for-of`
* `Object.getOwnPropertySymbols()`

但是在使用 `Object.keys(obj)` 的过程当中可能会遇到排序的问题，这个可以参考 [为什么 Object.keys 的返回值会自动排序](https://heptaluan.github.io/2019/03/16/JavaScript/32/)

在了解完对象的创建与遍历以后，就可以来深入的了解一下原型和原型对象，也就是 `prototype`、`__proto__` 和 `constructor` 三者之间的关系，这部分内容可以参考 [JavaScript 中的原型和原型对象](https://heptaluan.github.io/2017/04/08/JavaScript/09/)，主要包括

* 实例对象
* `prototype`
* `proto`
* `constructor`
* 实例与原型
* 原型的原型
* 自定义对象


## 函数

`JavaScript` 中函数的定义以及一些基本内容可以参考 [JavaScript 中的函数](https://heptaluan.github.io/2017/10/08/JavaScript/21/)，主要包括

* 函数的定义
* 函数对象
* 函数调用
* 函数没有重载
* 函数的值传递
* 函数中的 `arguments`
* `arguments.callee()`
* 函数中的 `this`
* 函数的返回值

事件相关内容可以参考 [JavaScript 中的事件](https://heptaluan.github.io/2016/12/12/JavaScript/01/)，主要包括

* `HTML` 事件处理程序
* `DOM 0` 级事件处理程序
* `DOM 2` 级事件处理程序
* `IE` 事件处理程序
* 跨浏览器的事件处理程序
* 关于 `event`
* 事件委托
* 事件流，冒泡与捕获

值和引用相关内容可以参考 [JavaScript 中的值和引用](https://heptaluan.github.io/2017/02/22/JavaScript/06/)，主要包括

* 引用类型值的传递
* 基本类型值的传递

函数当中的作用域相关内容，这部分可以参考 [JavaScript 中的作用域](https://heptaluan.github.io/2017/01/18/JavaScript/03/)，主要包括

* 变量提升（`Hoisting`）
* 作用域（`Scoping`）
* 执行上下文环境
* 全局执行上下文环境
* 函数体上下文环境（也就是所谓的局部）
* 变量对象
* 活动对象
* 执行上下文栈
* 作用域链

最后再来看看 `JavaScript` 当中的继承相关内容，关于这部分可以参考 [JavaScript 中的继承](https://heptaluan.github.io/2017/06/15/JavaScript/20/)，主要包括

* 类式继承（构造函数继承）
* 原型继承
* 组合式继承
* 寄生式组合继承





## this

`this` 是 `JavaScript` 语言的一个关键字它代表函数运行时，自动生成的一个内部对象，只能在函数内部使用，随着函数使用场合的不同，`this` 的值会发生变化，但是有一个总的原则，那就是 `this` 指向的是，调用函数的那个对象

更多关于 `this` 的内容可以参考 [JavaScript 中的 this](https://heptaluan.github.io/2017/10/09/JavaScript/22/) 这篇文章，主要内容包括

* `this` 的调用方式
  * 为对象方法调用
  * 作为函数调用
  * 作为构造函数调用
  * 使用 `apply` 或 `call` 调用
* 箭头函数中的 `this`
* 如何确定 `this` 的值（可见规范当中的 [11.2.3 函数调用](http://yanhaijing.com/es5/#164)）
  * 计算 `MemberExpression` 的结果赋值给 `ref`
  * 判断 `ref` 是不是一个 `Reference` 类型
    * 如果 `ref` 是 `Reference`，并且 `IsPropertyReference(ref)` 是 `true`，那么 `this` 的值为 `GetBase(ref)`
    * 如果 `ref` 是 `Reference`，并且 `base value` 值是 `Environment Record`，那么 `this` 的值为 `ImplicitThisValue(ref)`
    * 如果 `ref` 不是 `Reference`，那么 `this` 的值为 `undefined`




## 闭包

闭包简单来说就是函数的局部变量集合，只是这些局部变量在函数返回后会继续存在，更为详细的内容可以参考 [JavaScript 中的闭包](https://heptaluan.github.io/2017/05/12/JavaScript/14/) 这篇文章（可以配合 [作用域与执行上下文栈](https://heptaluan.github.io/2017/01/18/JavaScript/03/) 进行了解），主要内容包括

* 什么是闭包
* 闭包模型
* 闭包中 `this` 的指向
* 柯里化
* 偏函数




## 深浅拷贝

在 `JavaScript` 中，变量包含两种不同数据类型的值，『基本类型』和『引用类型』，所以相对应的在拷贝的时候我们需要分类别进行讨论，关于深浅拷贝相关内容可以参考 [JavaScript 中的深浅拷贝](https://heptaluan.github.io/2018/01/14/JavaScript/24/)，内容包括

* 数据类型
* 变量的存储方式
* 变量的赋值
* 数组的浅拷贝/对象的浅拷贝
* 数组的深拷贝/对象的深拷贝
* `JavaScript` 中的 `Mixin`




## ES6 相关知识整理

大部分其实都是一些扩展，但是也有新增比如新的基本类型 `Symbol`，迭代器和生成器，`Map` 和 `Set` 等相关概念，汇总一下如下所示

* [Class](https://heptaluan.github.io/2017/09/20/JavaScript/19/)
  * 静态属性/静态方法
  * 私有属性/私有方法
  * `super` 关键字
* [Reflect](https://heptaluan.github.io/2017/09/21/JavaScript/43/)
  * `Reflect.apply(target, thisArgument, argumentsList)`
  * `Reflect.construct(target, argumentsList[, newTarget])`
  * `Reflect.defineProperty(target, propertyKey, attributes)`
  * `Reflect.getPrototypeOf(target)`
  * `Reflect.ownKeys(target)`
* [Symbol/Set/Map](https://heptaluan.github.io/2019/11/07/JavaScript/48/)
  * `Symbol` 的特性
  * `Set/WeakSet`
  * `Map/WeakMap`
* [迭代器与生成器](https://heptaluan.github.io/2019/07/13/JavaScript/44/)
  * 迭代器/迭代器协议
  * 内建迭代器
  * 生成器对象
  * `yield*`
  * `Map/Set/String/Array` 互相转换




## BOM 和 DOM

这两部分的内容在我们平常开发当中可能涉及的较少，但是我们在这里还是简单的总结一下，可以参考 [BOM 和 DOM](https://heptaluan.github.io/2017/11/17/JavaScript/16/) 内容如下

* `BOM`
  * `window/Navigator/Screen/History/Location`
* `DOM`
  * 节点类型/节点关系
  * 节点操作（创建/插入/删除/替换/克隆）





## 手写 API

这一块在梳理过之后，发现涉及到的内容实在是太多太多，所以打算另开一章来进行整合，详细可见 [JavaScript 常用方法的实现](https://heptaluan.github.io/2019/08/02/JavaScript/53/)，主要包括一些手写 `API`，常用方法，常见字符串、数组算法和数据结构相关算法的汇总，反正就是面试可能涉及到的一些手写功能可能都会有所涉及，不仅仅只是为了面试所用，也算是在这里做下汇总记录，方便以后可以快速查询




## 异步

让我们从头开始，一步一步的的梳理一下 `JavaScript` 当中的异步处理的演进流程，首先最基本的，也是最为常见的那就是回调函数的方式了，回调函数实际就是一个参数，将一个函数当做参数传到另一个函数里，当那个函数执行完后，再执行传进去的这个函数，这个过程就叫做回调，字面也好理解，就是先处理本体函数，再处理回调的函数，比如 `setTimeout` 就是一个经典的回调应用，如下

```js
setTimeout(() => {
  // callback 函数体
}, 1000)
```

它的优点是解决了同步的问题，但是只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行，另外存在的一些缺点有回调地狱，不能用 `try catch` 捕获错误，也不能 `return` 等

为了解决上面这些问题，`ES6` 当中提供了 `Promise` 函数，而 `Promise` 的出现就是为了解决 `callback` 的问题而产生的，`Promise` 实现了链式调用，也就是说每次 `then` 后返回的都是一个全新 `Promise`，如果我们在 `then` 中 `return`，`return` 的结果会被 `Promise.resolve()` 包装

```js
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo')
  }, 300)
}).then((value) => {
  console.log(value)
})
```

> 关于 `Promise` 的更多用法，可以参考 [JavaScript 中的 Promise](https://heptaluan.github.io/2018/03/19/JavaScript/26/) 以及 [JavaScript 中 Promise 的实现](https://heptaluan.github.io/2020/11/15/JavaScript/55/)

但是它也是存在一点缺点的，那就是无法取消 `Promise`，而且错误需要通过回调函数来捕获，下面我们再来看另外一种处理异步的方式，那就是 `Generator`，更多内容可以参考 [迭代器与生成器](https://heptaluan.github.io/2019/07/13/JavaScript/44/)，用法如下

```js
function* gen() {
  yield 1
  yield 2
  yield 3
}

let g = gen()

g.next()  // { value: 1, done: false }
g.next()  // { value: 2, done: false }
g.next()  // { value: 3, done: false }
g.next()  // { value: undefined, done: true } 
```

使用 `Generator` 可以控制函数的执行，但是在上面例子当中也发现了，我们需要手动的去调用它的 `next()` 方法，如果想要其自动执行，可以配合 `co` 函数库使用，更多关于 `co` 的相关实现和用法可以参考 [Node.js 中的 co 模块](https://heptaluan.github.io/2019/01/02/Node/02/)

最后我们再来看看异步的终极解决方案，那就是 `Async/await`，它的优点是代码清晰，不用像 `Promise` 写一大堆 `then` 链，而且也可以处理回调地狱的问题，但是同样的也存在着一定的缺点，那就是 `await` 会将异步代码改造成同步代码，如果多个异步操作没有依赖性而使用 `await` 会导致性能上的降低

```js
async function setTime(time) {
  await setTimeout(() => { console.log(1) }, time)
}

async function log(val, time) {
  await setTime(time)
  console.log(val)
}

log(2, 3000)

// 2 ==> 立即输出
// 1 ==> 三秒后输出
```

更多关于 `Async` 和 `Await` 的用法可以参考 [Async 和 Await](https://heptaluan.github.io/2020/01/16/JavaScript/50/)




## 并发模型

`JavaScript` 的一大特点就是单线程，这意味着在任何时候只能有一段代码执行，`JavaScript` 主线程在运行时，会建立一个执行同步代码的栈和执行异步代码的队列，这部分内容之前已经整理过，详细可见 [JavaScript 中的事件轮询机制](https://heptaluan.github.io/2018/08/12/JavaScript/30/)，内容包括

* `JavaScript` 中的栈和堆
* 进程和线程
* 浏览器是多进程的
* 浏览器内核（渲染进程）
* `Event Loop`
* 任务队列（宏任务/微任务）
* 执行流程
* 关于 `requestAnimationFrame`



## V8 引擎机制

大致过了一遍，发现涉及到的东西还是比较多的，所以另开篇章进行介绍，详细可见 [V8 引擎机制](https://heptaluan.github.io/2020/08/02/JavaScript/54/)，主要内容包括

* 解析器与 `AST`(基线编译器/优化编译器)
* 垃圾回收机制（标记清除/引用计数）
  * 新生代（`Scavenge/Cheney`）
  * 老生代（`Mark-Sweep/Mark-Compact`）


## 设计模式

单一职责原则和开放封闭原则，这两点可能我们在平常也经常看到，它们说的意思是

* 单一职责原则，一个类只负责一个功能领域中的相应职责，或者可以定义为，就一个类而言，应该只有一个引起它变化的原因
* 开放封闭原则，核心的思想是软件实体（类、模块、函数等）是可扩展的、但不可修改的，也就是说，对扩展是开放的，而对修改是封闭的

其他的关于 `JavaScript` 当中一些比较常用的设计模式可以参考 [JavaScript 常用方法的实现](https://heptaluan.github.io/2019/08/02/JavaScript/53/) 当中关于设计模式部分，其中都有代码实现的方式，所以我们在这里就不详细展开了，内容主要包括

* 单例模式
* 工厂模式
* 代理模式
* 观察者模式
* 发布订阅模式
* 适配器模式
* 装饰器模式

## TypeScript

针对 `TypeScript` 的相关内容又从新做了一次梳理，内容可见 [重温 TypeScript](https://heptaluan.github.io/2020/12/26/JavaScript/56/)，主要包括

* 什么是 `TypeScript`
* `TypeScript` 基础类型（布尔值/数值/字符串/任意值/`Unknown`/空值/`Null`/`Undefined`/`object`/`Object`/`{ }`/`Never`）
* 内置对象
* `TypeScript` 断言（类型断言/非空断言/确定赋值断言）
* 联合类型
* 对象类型（可选属性/任意属性/只读属性）
* 数组类型
* 函数类型（接口/可选参数/默认值/剩余参数/重载/声明合并）
* 重载与重写
* 继承与多态
* 运算符（`?.`/`??`）

接着又在上面的基础之上，梳理一些 `TypeScript` 当中的进阶内容，内容可见 [深入 TypeScript](https://heptaluan.github.io/2021/01/01/JavaScript/57/)，主要包括

* 类型别名
* 字面量类型
* 元组
* 枚举
* 类（`readonly`/抽象类/私有字段）
* 类与接口
* `tsconfig.json`

另外单独针对 `TypeScript` 当中的泛型做了比较深入的梳理，内容可见 [深入 TypeScript 当中的泛型](https://heptaluan.github.io/2021/01/09/JavaScript/58/)，主要包括

* 泛型是什么
* 泛型接口
* 泛型类
* 泛型约束
* 泛型参数默认类型
* 泛型条件类型
* 泛型工具类型（`Partial`/`Record`/`Pick`/`Exclude`/`ReturnType`）
* 使用泛型创建对象

最后又梳理一下在 `React` 当中使用 `TypeScript` 的一些常见类型定义和注意事项，内容可见 [在 React 当中使用 TypeScript](https://heptaluan.github.io/2021/01/10/JavaScript/59/)，主要包括

* 组件 `Props`（基础类型/对象类型/函数类型/`React` 相关类型/函数式组件）
* `Hooks`（`useState`/`useReducer`/`useEffect`/`useRef`/`useImperativeHandle`/自定义 `Hook`）
* `React + TypeScript`
  * 模块导入相关问题
  * `antd` 的按需加载
  * 使用 `React.createRef()`
  * `@connect` 装饰器相关问题
  * `HOC` 的类型定义







## 正则表达式

* 待整理