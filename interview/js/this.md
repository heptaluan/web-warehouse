## this 

* ```this``` 不是单纯的指向自身

* ```this``` 也不是单纯的指向函数的作用域

**```this``` 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式**

再次强调：每个函数的 ```this``` 是在调用时被绑定的，完全取决于函数的调用位置（也就是函数的调用方法）

#### 四条绑定规则

1. 默认：在严格模式下绑定到 ```undefined```，否则绑定到全局对象

2. 由上下文对象调用？绑定到那个上下文对象

3. 由 ```call``` 或者 ```apply```（或者 ```bind```）调用？绑定到指定的对象

4. 由 ```new``` 调用绑定到新创建的对象

#### 优先级

函数是否在 ```new``` 中调用（```new``` 绑定）？如果是的话 ```this``` 绑定的是新创建的对象

```js
var bar = new foo()
```

函数是否通过 ```call```、```apply```（显式绑定）或者硬绑定调用？如果是的话，```this``` 绑定的是指定的对象

```js
var bar = foo.call(obj2)
```

函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，```this``` 绑定的是那个上下文对象

```js
var bar = obj1.foo()
```

如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 ```undefined```，否则绑定到全局对象

```js
var bar = foo()
```



## 箭头函数中的 this

先看一个简单的示例

```js
var obj = {
    say: function () {
        setTimeout(() => {
            console.log(this)
        });
    }
}

obj.say(); // obj
```

此时的 ```this``` 指向定义它的对象 ```obj```，而不是 ```window```

#### 多层嵌套中的 this

```js
var obj = {
    say: function () {
        var f1 = () => {
            console.log(this); // obj
            setTimeout(() => {
                console.log(this); // obj
            })
        }
        f1();
    }
}

obj.say()
```

因为 ```f1``` 定义时所处的函数 中的 ```this``` 是指的 ```obj``` 所以不管有多层嵌套，都是 ```obj```

## 普通函数和箭头函数混杂嵌套

```js
var obj = {
    say: function () {
        var f1 = function () {
            console.log(this);    // window，f1 调用时没有宿主对象，默认是 window
            setTimeout(() => {
                console.log(this); // window
            })
        };
        f1();
    }
}

obj.say()
```

简单总结就是：

* ```JavaScript``` 中每一个 ```function``` 有自己独立的运行上下文，而箭头函数不属于普通的 ```function```，所以没有独立的上下文（所以不能用于构造函数）

* 箭头函数里的 ```this``` 其实是包含该箭头函数最近的一个 ```function``` 上下文中的 ```this```（如果没有最近的 ```function```，就是全局）

* 严格模式下为 ```undefined```