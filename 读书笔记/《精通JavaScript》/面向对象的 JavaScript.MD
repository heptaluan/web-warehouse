## 面向对象的 JavaScript

对象（Object）是组成 JavaScript 的基本单元，事实上，JavaScript 中**一切都是对象**

JavaScript 语言中最重要的几个部分：```引用（reference）```，```作用域（scope）```，```闭包（closure）```以及```上下文（context）```

## 引用（reference）

引用（reference）的概念是 JavaScript 的基础之一，"引用"是一个指向对象实际位置的指针，但是有一个前提：**实际的对象肯定不会是引用（字符串永远是字符串，数组永远是数组），不过多个变量却能够指向同一对象**

此外，对象可以包含一系列属性（property），这些属性也都不过是到其他对象（比如字符串，数字，数组等等）的引用，**如果多个变量指向的是同一个对象，那该对象的类型一改变，所有这些变量也会跟着相应改变**

#### 多个变量引用同一个对象

```js
var obj = new Object();

// objRef 现在是另外一个对象的引用
var objRef = obj;

// 修改原对象的一个属性
obj.oneProperty = true;

// 这个改变在两个变量中都反映了出来（因为它们引用的是同一个对象）
console.log( obj.oneProperty === objRef.oneProperty )  // true

```

#### 自修改对象的例子

```js
var items = ["one", "two", "three"];

// 数组的一个引用
var itemsRef = items;

items.push("four");

// 这两个数组指向同一个数组对象，所以，它们的长度是一致的
console.log( items.length == itemsRef.length );  // true

```

需要记住的是，引用指向的只能是具体的对象，而不是另一个引用（JavaScript里的结果是沿着引用链一直上溯到原来那个对象）

#### 修改对象的引用，同时保持完整性

```js
var items = ["one", "two", "three"];

var itemsRef = items;

items = ["four"];

// items 和 itemsRef 现在指向不同的对象
// items 指向的是 ["four"] 这个数组
// itemsRef 指向的是 ["one", "two", "three"] 这个数组
console.log( items != itemsRef )  // true

```

从上面这个例子可以看出，实际对象已经改变了，但是原来指向它的引用仍然保持指向旧的对象

我们再来看下面这个特殊的例子，看上去像是自修改对象，但是其结果却产生了一个新的非引用对象

在执行字符串连接操作的时候，结果总是会一个新的字符串对象，而非原字符串的修改版本

```js

var item = "test";

var itemRef = item;

// 这会创建一个新的对象，而非修改原对象
item += "ing";

// 不相等，因为新的字符串对象已经被创建
console.log( item != itemRef )  // true

```



## 函数重载和类型检查

#### 函数重载（function overloading）

函数重载（function overloading）必须依赖两件事情：**判断传入参数的数量的能力**和**判断传入参数类型的能力**

JavaScript 的每个函数都带有一个仅在这个函数范围内作用的变量（contextual variable）称为参数（argument），它是一个包含所有传给函数的参数的**伪数组**（pseudo-array）

函数重载的两个例子

```js
// 实例一
function sendMsg(msg, obj) {
    if (arguments.length == 2) {
        obj.handleMsg(msg);
    } else {
        console.log(msg);
    }
}

// 仅提供一个参数
sendMsg("hello world!");

// 两个参数
sendMsg("hello", {
    handleMsg: function (msg) {
        console.log(msg)
    }
})




// 实例二
function makeArray() {

    var arr = [];

    // 遍历传入的每个参数
    for (var i = 0; i < arguments.length; i++) {
        arr.push(arguments[i]);
    }

    return arr;
}

```

#### 类型检查

这里只讨论两种比较有用的方法

第一种方法是使用显而易见的 ```typeof``` 操作符。

这个工具提供了一个字符串名称（string name），用于表达内容的类型，当变量不是 ```object``` 或者 ```array``` 类型的时候，这应该算是最完美的解决方法了，但是对于自定义的对象，比如 ```obj``` 就不能用这个方法了，因为它只会返回 ```object```


#### 使用 typeof 来判断对象类型

```js
// 检查 num 是否实际上是字符串
if (typeof num == "string") {
    // 如果是，则转为整数
    num = parseInt(num)
}

// 检查 arr 是否实际上是字符串
if (typeof arr == "string") {
    // 如果是，则根据 "," 切分为数组
    arr = arr.split(",")
}

```

第二种检查对象类型的方法，需要引用所有 JavaScript 对象都带有的一个的属性，称为```构造函数（constructor）```，这一属性引用的是原本用来构造该对象的那个函数

#### 使用构造函数属性来判断对象的类型

```js
// 检查 num 是否实际上是字符串
if (num.constructor == String) {
    // 如果是，则转为整数
    num = parseInt(num)
}

// 检查 arr 是否实际上是字符串
if (arr.constructor == Array) {
    // 如果是，则根据 "," 切分为数组
    arr = arr.split(",")
}

```



## 作用域

在 JavaScript 中，作用域是由**函数**划分的，而不是由块（block）划分（比如while，if 和 for 语句中间）

```js

var foo = "test";

if (true) {
    // 注意：现在仍是全局作用域
    var foo = "new test"
}

console.log(foo == "new test")

function test () {
    var foo = "old test"
}

// 调用的时候 foo 只在函数作用域内起作用
test();

console.log(foo == "new test");

```

基于浏览的 JavaScript 有一个特性，所有属于全局作用域的变量其实都是 window 对象的属性（property）

```js

var test = "test";

console.log(window.test == "test")

```


## 闭包

闭包（closure）意味着内层的函数可以引用存在包围它的函数内的变量，即使外层函数的执行已经终止

```js

function delayedAlert (msg, time) {
    setTimeout(function() {
        // 它将使用包含本函数的外围函数传入的 msg 变量
        console.log(msg)
    }, time);
}

delayedAlert("hello", 2000)

```

闭包的另一种用法就是函数的 Curry 化（currying），本质上是一种通过把多个参数填充到函数体中，实现将函数转换为一个新的经过简化的（使之接受的参数更少）函数的技术

```js

function addGenerator (num) {
    return function (toAdd) {
        return num + toAdd
    }
}

// addFive 现在接受单一参数的函数，这个函数能求得 5 加上该参数的和
var addFive = addGenerator( 5 );

console.log(addFive( 4 ));

```

还可以使用闭包，通过自执行的匿名函数可以把原本属于全局的变量都隐藏起来

```js

(function () {
    // 该变量本应是全局的
    var msg = "hello world"

    window.onunload = function () {
        console.log(msg)
    }
})()

```


## 上下文对象

上下文对象是通过 this 变量体现的，这个变量永远指向当前代码所处的对象中（全局对象其实是 window 对象的属性），这意味着即使在全局上下文中，this 变量也能指向一个对象

```js
var obj = {
    yes: function () {
        this.val = true;
    },
    no: function () {
        this.val = false;
    }
}

// obj 并没有 val 属性
console.log(obj.val == null)  // true

// 执行后，就关联了起来
obj.yes();
console.log(obj.val == true)  // true

// 把 window.no 指向 obj.no
window.no = obj.no;
window.no();

// obj 的 val 不变（no 的上下文已经改变为 window 对象）
console.log(obj.val == true)  // true

// window 的 val 属性被更新了
console.log(window.val == false)  // true
```

利用 call 和 apply 修改函数上下文对象

```js
function changeColor (color) {
    this.style.color = color;
}

// 失败，因为 window 没有 style 属性
changeColor("white")

var main = document.querySelector("#main");

// 使用 call 方法将它的颜色设为黑色，call 方法将上下文对象设置为第一个参数
// 并将其他参数作为原函数的参数
changeColor.call(main, "black")

function setBodyColor () {
    // apply 方法将上下文对象设置为第一个参数指定的 body，第二个参数是传给函数所有参数的数组
    changeColor.apply(document.body, arguments)
}

setBodyColor("black")
```


## 对象

JavaScript 中没有类（class）的概念，对象本身可以用来创建新对象，而对象也可以继承自其他对象，这个概念成为 原型化继承（prototypal inheritance）

```js
// 一个简单的函数，接受名称并将其存入当前上下文中
function User (name) {
    this.name = name;
}

var me = new User("hello")

console.log(me.name == "hello")

console.log(me.constructor == User);

// 如果直接来调用
User("world")

// 它的 this 上下文对象未曾设定，所以默认为全局的 window
console.log(window.name == "world")
```

关于 constructor 属性：在每个对象中都存在，并一直指向创建它的函数

```js
function User () {}

var me = new User();

// 用前一个对象的 constructor 引用来创建一个新的 User 对象
var you = new me.constructor();

// 两个对象的 constructor 实质上是一致的
console.log(me.constructor == you.constructor);
```

#### 公共方法

公共方法（public method）在对象的上下文是最终用户始终可以接触到的，要实现这种在对象的每个实例中都可以使用的公共方法,就要利用到 prototype（原型）的属性，这个属性包含了一个对象，该对象可以作为所有新副本的基引用（base reference），本质上说，所有对象原型属性都能在该对象的每个实例中找到

对象的原型仍然是对象，和其他任何对象一样，你也可以给它们添加新的属性，给原型添加属性的结果是由该原型实例化的每个对象都会获得这些属性

```js
function User (name, age) {
    this.name = name;
    this.age = age;
}

User.prototype.getNmae = function () {
    return this.name;
}

User.prototype.getAge = function () {
    return this.age;
}

var user = new User("zhangsan", "50");

console.log(user.getNmae() == "zhangsan")
console.log(user.getAge() == "50")
```

#### 私有方法

这种方法定义一些只让对象内部访问，而外部访问不到的代码

```js
function Classroom (students, teacher) {
    function disp () {
        console.log( this.names.join(", ") )
    }

    this.students = students;
    this.teacher = teacher;

    disp();
}

var classroom = new Classroom( ["zhangsan", "lisi"], "Mr wangwu");

// 会失败，因为它不是该对象的公共属性
classroom.disp();
```

#### 特权方法

用来指代那些在查看并处理（对象中）私有变量的同时允许用户以公共方法的方式访问的方法

```js
function User (name, age) {
    var year = (new Date()).getFullYear() - age;

    // 创建一个新的特权方法，能够访问 year 变量，同时自身属于公共可访问
    this.getYear = function () {
        return year;
    }
}

var user = new User("zhangsan", 50);

console.log(user.getYear() == 1966);

// 无法访问该对象的私有的年份属性
console.log(user.year == null)
```

本质上，特权方法是动态生成的，因为它们是在运行的时候才添加到对象中的，而不是在代码第一次编译的时候就已经生成了

```js
function User (properties) {
    // 遍历该对象的所有属性，并保证其作用域正确
    for (var i in properties) {
        (function (which) {
            var p = i;
            // 创建此属性的一个新的读取器（getter）
            which[ "get" + p ] = function () {
                return properties[p];
            }

            // 创建此属性的一个新的设置器（setter）
            which[ "set" + p ] = function (val) {
                properties[p] = val;
            }
        })(this);
    }
}

// 创建一个新的用户对象实例，并把具有两个属性的一个对象传入作为种子
var user = new User({
    name: "zhangsan",
    age: 50
})

// 注意 name 属性并不存在，因为它是属性对象（properties object）的私有变量
console.log(user.name == null)

// 我们可以使用新的 getname() 方法来获得这个值，因为此函数是动态生成的
console.log(user.getname() == "zhangsan")

// 最后我们看到能够使用这个新生成的函数来设置或获取年龄
user.setage(22);
console.log(user.getage() == 22);
```

#### 静态方法

静态方法的实质与任何其他一般函数没有什么不同，最主要的区别在于，其他函数是以对象的静态属性形式存在的，作为一个属性，它们不能在该对象的实例的上下文中访问，而只属于主对象本身的那个上下文中

```js
User.cloneUser = function (user) {
    return new User(
        user.getName(),
        user.getAge()
    );
};
```

