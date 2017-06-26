## 监听对象属性改变

在 ```ES5``` 中新增了一个 ```Object.defineProperty``` 的方法，可以直接在一个对象上定义一个新属性，或者修改一个已经存在的属性， 并返回这个对象

```js
Object.defineProperty(obj, prop, descriptor)
```

其接受的第三个参数可以取 ```get/set``` 并各自对应一个 ```getter/setter``` 的方法

```js
var a = { obj: 0 };

Object.defineProperty(a, 'obj', {

    get: function () {
        console.log('get：' + obj);
        return obj;
    },

    set: function (value) {
        obj = value;
        console.log('set:' + obj);
    }
    
});

a.obj = 2; // set: 2
console.log(a.obj); // get：2
```

有个缺点就是在 ```IE8``` 及更低版本 IE 是无法使用的，因为这个特性是没有 ```polyfill``` 的，所以无法在不支持的平台实现


#### Proxy

另外还可以使用 ```ES6``` 提供的 ```Proxy``` 代理来处理

```js
var user = {}

var proxy = new Proxy(user, {

    get (target, property) {
        console.log(`get prop ${property}`)
        return `[${target[property]}]`
    },

    set (target, property, value) {
        console.log(`set prop ${property}`)
        target[property] = btoa(value)
    }
})

proxy.name = "admin"  // set prop name
                      // "admin"
```

----


## 监听数组的变化

简单来说，就是定义一个新数组，然后继承原生的 ```Array```，然后重写其中我们需要监听的方法（```pop```，```push``` 等）

```js
class NewArray extends Array {
    constructor (...args) {
        // 调用父类 Array 的 constructor
        super(...args)
    }

    push (...args) {
        
        console.log(`监听到数组变化`)

        // 调用父类方法
        return super.push(...args);
    }
}

let arr = [1, 2];

let newArr = new NewArray(...arr);

console.log(newArr)  // [1, 2]

newArr.push(3);      // 监听到数组变化

console.log(newArr)  // [1, 2, 3]
```

#### 关于 ES5 以下实现

在 ```ES5``` 及以下的 ```JS``` 无法完美继承数组，因为 ```Array``` 构造函数执行时不会对传进去的 ```this``` 做任何处理，不止 ```Array```，```String```，```Number```，```Regexp```，```Object``` 等等 ```JS``` 的内置类都不行

数组其响应式的 ```length``` 属性以及内部的 ```[[class]]``` 属性我们无法再 ```JS``` 层面实现，这就导致我们无法去用任何一个对象来 "模仿" 一个数组

但是可以使用非标准属性 ```__proto__``` 来实现