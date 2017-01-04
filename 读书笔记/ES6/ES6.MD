## var 对比 let / const

ES6 提供了两个新的标识符（let，const）来储存变量，它们与 var 不同的是，let 和 const 语句并不会提升到作用域的顶端（变量提升），因为在 ES6 之前并不存在 **"块级作用域"**

```js
// 一个使用 var 的例子

var snack = "Meow Mix";

function getFood (food) {
    // snack 变量被提升到这里
    // var snack = undefined
    if (food) {
        var snack = "Friskies";
        // snack = "Friskies";
        return snack;
    }
    return snack;
}

getFood(false);  // undefined
```

然而，当我们使用 let 替换 var 之后：

```js
// 使用 let

var snack = 'Meow Mix';

function getFood(food) {
    // 这里不会被提升到作用域的顶端
    if (food) {
        let snack = 'Friskies';
        return snack;
    }
    // 当 food 为 false 的时候，它只能从上一级作用域查找变量 snack，这个过程一直延伸到"全局作用域"
    return snack;
}

getFood(false);
```

需要注意的是：let 和 const 都是块级作用域，因此，块级作用域的标识符在定义之前就被引用，将会产生ReferenceError(引用错误)

```js
console.log(x);  // ReferenceError: x is not defined

let x = "abc"; 
```




## 使用 ES6 块替换 IIFE

**自调用函数表达式**的常见用途是将变量封装在其作用域，ES6 提供了一种创建 **块级作用域** 的能力，因此，我们不在单纯局限于函数作用域

```js
(function () {
    var food = "Meow Mix";
}())

console.log(food);  // 引用错误
```

使用 ES6 块：

```js
{
    let food = "Meow Mix";
}

console.log(food);  // 引用错误
```





## 箭头函数

很多时候，嵌套函数的目的是想"维护"当前词法作用域中this。

```js
function Person (name) {
    this.name = name;
}

Person.prototype.prefixName = function (arr) {
    return arr.map(function (character) {
        // this 被绑定到全局对象，严格模式 this 被绑定到 undefined
        return this.name + character;  // 读取不到 name 属性
    })
}
```

一个比较普遍的解决方法就是通过一个变量（that/_this）来存储当前的上下文 this

```js
function Person (name) {
    this.name = name;
}

Person.prototype.prefixName = function (arr) {
    var that = this; // 存储当前上下文的 this
    return arr.map(function (character) {
        return that.name + character;
    })
}
```

也可以为数组的 map 方法传入一个适当的上下文 this，作为 map 方法的参数：

```js
function Person (name) {
    this.name = name;
}

Person.prototype.prefixName = function (arr) {
    return arr.map(function (character) {
        return this.name + character;
    // 上下文 this
    }, this)
}
```

甚至可以使用 bind 来为函数绑定适当的 上下文：

```js
function Person (name) {
    this.namr = name;
}

Person.prototype.prefixName = function (arr) {
    return arr.map(function (character) {
        return this.name + character;
    // 利用 bind 绑定上下文 this
    }.bind(this))
}
```

使用**箭头函数**，词法作用域中的 this 并没有变得很神秘，重写上面的代码：

```js
function Person (name) {
    this.name = name;
}

Person.prototype.prefixName = function (arr) {
    return arr.map(character => this.name + character)
}
```

当你想维护词法作用域中 this，最好使用箭头函数（当使用函数表达式只是简单地返回一个值，使用箭头函数会显得更为简洁）

```js
var squares = arr.map(function (x) { return x * x });  // 函数表达式
```

```js
const arr = [1, 2, 3, 4, 5];
const squares = arr.map(x => x * x);  // 使用箭头函数更简洁的实现
```





## 字符串

#### .includes()

当字符串之间是包含关系，使用 ```indexOf``` 将会返回一个 ```-1``` 的结果，比如：

```js
var string = "food";
var substring = "foo";

console.log(string.indexOf(substring) > -1);
```

在 ES6 中，可以简单的使用 .includes() 取代这种操作，并且 .includes() 将会返回一个布尔值

```js
const string = "food";
const substring = "foo";

console.log(string.includes(substring));  // true
```

#### .repeat()

```.repeat()``` 主要用来实现字符串重复功能

```js
function repeat(string, count) {
    var strings = [];
    while (strings.length < count) {
        strings.push(string);
    }
    return strings.join("");
}
```

在 ES6 中，有了一个更简洁的接口来实现 ```.repeat()```

```js
// String.repeat(numberOfRepetitions)
'meow'.repeat(3); // 'meowmeowmeow'
```





## 模版字面量

待续...