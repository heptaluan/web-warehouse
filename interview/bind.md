## bind 的实现

bind 方法的定义 [bind](http://yanhaijing.com/es5/#324)

```js
fun.bind(thisArg[, arg1[, arg2[, ...]]])
```

bind() 方法会创建一个新函数，当这个新函数被调用时，它的 this 值是传递给 bind() 的第一个参数, 它的参数是 bind() 的其他参数和其原本的参数

bind返回的绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的this值被忽略，同时调用时的参数被提供给模拟函数。

bind方法与call、apply最大的不同就是前者返回一个绑定上下文的函数，而后两者是直接执行了函数

> 还可以写成 fn.bind(obj, arg1)(arg2)

一句话概括

该方法创建一个新函数，称为绑定函数，绑定函数会以创建它时传入bind方法的第一个参数作为this，传入bind方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数


## 实现

初级实现

```js
Function.prototype.bind = Function.prototype.bind || function (context) {
  // 记住 this，就是需要绑定 this 的实例函数（原函数）
  var me = this;
  var argsArray = Array.prototype.slice.call(arguments);
  return function () {
    // 剔除第一个参数，其余作为参数来传递（提供给原函数）
    return me.apply(context, argsArray.slice(1));
  }
}
```

这里存在一些问题，在于在预置参数功能丢失的现象（因为使用了 argsArray.slice(1)），比较好的解决方式是下面这种

```js
Function.prototype.bind = Function.prototype.bind || function (context) {
  var me = this;
  var args = Array.prototype.slice.call(this.arguments, 1);
  return function () {
    return me.apply(context, args.concat(Array.prototype.slice.call(arguments)))
  }
}
```

但是 bind 当中还有一点比较特殊

bind返回的函数如果作为构造函数，搭配new关键字出现的话，我们的绑定this就需要“被忽略”

这样一来就需要在构造函数的场景下来进行兼容

```js
Function.prototype.bind = Function.prototype.bind || function (context) {
  var me = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var F = function () { };
  F.prototype = this.prototype;
  var bound = function () {
    return me.apply(this instanceof F ? this : context || this, args.concat(Array.prototype.slice.call(arguments)));
  }
  bound.prototype = new F();
  return bound;
}
```

如果比较严谨的话，还需要判断调用 bind 方法的一定要为一个函数，否则就抛出一个错误

```js
if (typeof this !== 'function') {
  throw new Error(`Function.prototype.bind - what is trying to be bound is not callable`)
}
```


## 扩展，要求不使用 call 和 apply

简单来说，就是手动实现一个 call 和 apply 即可

call 和 apply 本质是一样的，区别就在于参数的不同

call 方法的定义 [call](http://yanhaijing.com/es5/#323)

简单来说就是

* call() 方法在使用一个指定的this值和若干个指定的参数值的前提下调用某个函数或方法

* apply() 方法在使用一个指定的this值和参数值必须是数组类型的前提下调用某个函数或方法


## 原理

call() 和 apply() 的第一个参数是要调用函数的母对象，它是调用上下文，在函数体内通过 this 来获得它的引用，比如以对象 o 的方法来调用函数 f() 

```js
f.call(o)

f.apply(o)
```

大致原理如下所示

```js
o.m = f;    // 将 f 存储为 o 的临时方法
o.m();      // 调用它，不传入参数

delete o.m; // 将临时方法删除
```

在严格模式中，call() 和 apply() 的第一个参数都会变成 this 的值，哪怕传入的实参是原始值甚至 null 或 undefined 

在 ES3 或者非严格模式中，传入的 null 和 undefined 都会被全局对象代替，而其他原始值则会被相应的包装对象（wrapper object）所替代

简单来说就是，f.call(o) 其原理就是先通过 o.m = f 将 f作为o的某个临时属性m存储，然后执行m，执行完毕后将m属性删除



## 实现

这里以 apply 为例

初级实现

```js
Function.prototype.apply = function (context) {
  context.fn = this;
  context.fn();
  delete context.fn;
}
```

但是 apply 有一点不同，它的参数是一个数组，在执行的时候会把数组的值依次传递给函数当参数

需要实现类似 context.fn(arg1,arg2,arg3...) 的调用方式，这里采用 evel 来实现

```js
Function.prototype.apply = function (context) {
  var args = arguments[1];
  context.fn = this;

  // 使用 evel 来实现（并不是唯一的方式）
  // 来得到 context.fn(arg1,arg2,arg3...)
  var fnStr = 'context.fn(';
  for (var i = 0; i < args.length; i++) {
    fnStr += i == args.length - 1 ? args[i] : args[i] + ',';
  }
  fnStr += ')';
  eval(fnStr);

  delete context.fn;
}
```

有几个需要注意的地方

this 参数可以传递 null 或者不传，当为 null 的时候，则指向 window

函数是可以指定返回值的

```js
Function.prototype.apply = function (context) {
  var context = context || window;
  var args = arguments[1];
  context.fn = this;

  if (args === void 0) {
    return context.fn();
  }

  // 使用 evel 来实现（并不是唯一的方式）
  // 来得到 context.fn(arg1,arg2,arg3...)
  var fnStr = 'context.fn(';
  for (var i = 0; i < args.length; i++) {
    fnStr += i == args.length - 1 ? args[i] : args[i] + ',';
  }
  fnStr += ')';
  var returnVal = eval(fnStr);

  delete context.fn;
  return returnVal;
}
```

还有一个问题，即 context.fn = this，这里我们只是假设不存在名为 fn 的属性，所以这里我们需要保证 fn 的唯一性

这里可以采用 ES6 提供的 symbol 数据类型，直接添加即可

```js
var fn = Symbol()
context[fn] = this
```

如果不使用 symbol，也可以来手动模拟一个，简单来说就是随机定义一个属性名称，然后在进行赋值的时候判断一下

```js
function symbol(obj) {
  var unique_proper = "00" + Math.random();
  if (obj.hasOwnProperty(unique_proper)) {
    // 如果已经存在这个属性，则递归调用，直到没有这个属性
    arguments.callee(obj)
  } else {
    return unique_proper;
  }
}

// 使用
var fn = symbol(context);
```

而 call 方法，可以利用上面的 apply 来简单实现

```js
Function.prototype.call = function (context) {
  return this.apply(([].shift.applyFive(arguments), arguments))
}
```



## 汇总

```js
function symbol(obj) {
  var unique_proper = "00" + Math.random();
  if (obj.hasOwnProperty(unique_proper)) {
    // 如果已经存在这个属性，则递归调用，直到没有这个属性
    arguments.callee(obj)
  } else {
    return unique_proper;
  }
}

Function.prototype.apply = function (context) {

  var context = context || window

  // 获取传入的数组参数
  var args = arguments[1]
  var fn = symbol(context);

  // 保证 fn 的唯一性
  context[fn] = this

  // 如果没有传入参数则直接执行
  if (args == void 0) {
    return context[fn]()
  }

  // 使用 evel 来实现（并不是唯一的方式）
  // 来得到 context.fn(arg1,arg2,arg3...)
  var fnStr = 'context[fn]('
  for (var i = 0; i < args.length; i++) {
    fnStr += i == args.length - 1 ? args[i] : args[i] + ','
  }
  fnStr += ')'

  // 使用 evel 执行，完成后删除这个属性
  var returnValue = eval(fnStr)
  delete context[fn]

  return returnValue
}

Function.prototype.call = function (context) {
  return this.apply(([].shift.apply(arguments)), arguments)
}


Function.prototype.bind = Function.prototype.bind || function (context) {

  // 判断调用对象是否是函数
  if (typeof this !== 'function') {
    throw new Error(`Function.prototype.bind - what is trying to be bound is not callable`)
  }

  // 记住 this，就是需要绑定 this 的实例函数（原函数）
  var me = this;
  var args = Array.prototype.slice.call(arguments, 1);

  // 在构造函数的场景下来进行兼容（因为在搭配 new 使用的时候，绑定的 this 需要被忽略）
  var F = function () { };
  F.prototype = this.prototype;

  var bound = function () {
    return me.apply(this instanceof F ? this : context || this, args.concat(Array.prototype.slice.call(arguments)));
  }

  bound.prototype = new F();
  
  return bound;
}

```