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