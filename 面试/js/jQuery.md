相关问题：

* ```$.each``` 和 ```$(selector).each()``` 的区别

* ```jQuery``` 插件中的 ```return this.each()```

* ```jQuery``` 中的 ```this``` 和 ```$(this)```

* ```jQuery``` 的链式操作是如何实现的


----

## $.each 和 $(selector).each() 的区别

#### $(selector).each()

```$(selector).each()``` 一般用于 ```jquery``` 对象的遍历

```each()``` 方法为每个匹配元素规定要运行的函数

```js
$("ul li").each(function(){
    alert($(this).text())
});
```

通过源码可知，```each``` 方法实际上调用的就是 ```jQuery.each()``` 方法

```js
each: function( callback, args ) {  
    return jQuery.each( this, callback, args );
}  
```

####  $.each

而 ```$.each()``` 使用的范围就很广了，可用于遍历任何的集合（无论是数组或对象） 

下面是几个例子：

```js
// 参数 i 为遍历索引值，n 为当前的遍历对象
$.each([{ name: "limeng", email: "xfjylimeng" }, { name: "hehe", email: "xfjylimeng" }], function (i, n) {
    console.log("索引:" + i + "对应值为：" + n.name);
});


var arr1 = ["one", "two", "three", "four", "five"];
$.each(arr1, function () {
    console.log(this);
});


var arr2 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
$.each(arr2, function (i, item) {
    console.log(item[0]);  // 1 4 7
});


var obj = { one: 1, two: 2, three: 3, four: 4, five: 5 };
$.each(obj, function (key, val) {
    console.log(obj[key]);  // 1 2 3 4 5
});
```

```jQuery each``` 源码如下：

方法 ```.each()``` 遍历当前 ```jQuery``` 对象，并在每个元素上执行回调函数，每当回调函数执行时，会传递当前循环次数作为参数，循环次数从 ```0``` 开始计数

更重要的是，**回调函数是在当前元素为上下文的语境中触发的，即关键字 this 总是指向当前元素**，在回调函数中返回 ```false``` 可以终止遍历

```js
//  jQuery.each 方法用于遍历一个数组或对象,并对当前遍历的元素进行处理  
//  jQuery.each 方法可以为处理函数增加附带的参数(带参数与不带参数的回调使用方法不完全一致)  

// 静态方法 jQuery.each() 是一个通用的遍历迭代方法，用于无缝地遍历对象和数组
// 对于数组和含有 length 属性的类数组对象（如函数参数对象 arguments），该方法通过下标遍历，从 0 到 length-1
// 对于其他对象则通过属性名遍历（for-in），在遍历过程中，如果回调函数返回 false

// ------------------------------------------

// 总的来说就是：

// 1. 对于对象，通过 for-in 循环遍历属性名，对于数组或类数组对象，则通过 for 循环遍历下标

// 2. 如果传入了参数 args，使用 apply，执行回调函数时只传入一个参数 args

// 3. 如果未传入参数 args，使用 call，执行回调函数时传入两个参数：下标或属性名，对应的元素或属性值

// ------------------------------------------

// 关于参数 args：传给回调函数 callback 的参数数组，可选
// 如果没有传入参数 args，则执行回调函数时会传入两个参数（下标或属性名，对应的元素或属性值）
// 如果传入了参数 args，则只把该参数传给回调函数
each: function (object, callback, args) {   
  
    // 当需要遍历的是一个对象时, name 变量用于记录对象的属性名   
    var name,       
       
    // 当需要遍历的是一个数组时, i 变量用于记录循环的数组下标   
    i = 0,       
       
    // 遍历数组长度,当需要遍历的对象是一个数组时存储数组长度   
    // 如果需要遍历的是一个对象, 则 length === undefined   
    length = object.length,       
       
    // 变量 isObj 表示参数 object 是对象还是数组，以便决定遍历方式
    // 如果 object.length 是 undefined 或 object 是函数，则认为 object 是对象，设置变量 isObj 为 true，将通过属性名遍历
    // 否则认为是数组或类数组对象，设置变量 isObj 为 false，将通过下标遍历
    isObj = length === undefined || jQuery.isFunction(object);   
       
    // 回调函数具有附加参数时, 执行第一个分支   
    // if(!!args) {   
    if (args) {   
           
        // 需要遍历的是一个对象   
        if (isObj) {   
               
            // 遍历对象属性, name 是对象的属性名,再函数顶部已声明 
            for (name in object) {   
               
                // 调用 callback 回调函数, 且回调函数的作用域表示为当前属性的值   
                if (callback.apply(object[name], args) === false) {   
                   
                    // 如果在 callback 回调函数中使用 return false; 则不执行下一次循环   
                    break;   
                }   
            }   
        }   
        // 需要遍历的是一个数组   
        else {   
           
            // 循环变量的自增在循环内部执行   
            for (; i < length;) {   
               
                // 调用 callback 函数, 与上面的 callback 调用一致   
                // 此处 callback 函数中的 this 指向当前数组元素   
                // 根据下标 i 依次执行
                if (callback.apply(object[i++], args) === false) {   
                    break;   
                }   
            }   
        }   
           
    }   

    // 回调函数没有附加参数时,执行第二个分支   
    else {   
       
        // 需要遍历的是一个对象   
        if (isObj) {   
             
            for (name in object) {   
               
                // 调用 callback 回调函数   
                // 在不带参数的对象遍历中, 作用域表示为当前属性的值   
                // 且回调函数包含两个参数, 第一个数当前属性名, 第二个是当前属性值    
                if (callback.call(object[name], name, object[name]) === false) {   
                   
                    // 作用同上
                    break;   
                }   
            }   
        }   
        // 需要遍历的是一个数组   
        else {      
            for (var value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) {   
            }   
        }   
    }   
       
    // 最后，返回传入的参数 object
    // 方法 .each() 调用 jQuery.each() 时，把当前 jQuery 对象作为参数 object 传入，这里返回该参数，以支持链式语法 
    return object;   
}
```



----

## jQuery 插件中的 return this.each()

原理是通过返回当前对象，来维护链式调用

同时也是是为了保证遍历完成后才执行下一个操作，否则迭代是延迟执行的，前面的插件并没有实际执行，而且 ```each``` 返回的也是 ```this``` 对象（还可以带 ```function``` 参数）

简单来说就是一个是先返回在执行，一个是先执行在返回

看下面代码就明白了：

```js
return this.each(function () {
    $(this).append(' - ' + $(this).data('x'));
});

// 等价于

var objs = this;

for (var i = 0; i < objs.length; i++) {
    var obj = objs[i];
    $(obj).append(' - ' + $(obj).data('x'));
};

return this;
```


----


## jQuery 中的 this 和 $(this)

其实同 ```jQuery``` 中的 ```get()``` 和 ```eq()``` 类似，```$(this)``` 返回的是一个 ```jQuery``` 对象，而 ```this``` 返回的其实就是一个 ```element```，看下面代码

```js
// 这样使用是可以的，this 返回的是一个 element，有 title 属性
$("#box").hover(function () {
    this.title = "A"
}, function () {
    this.title = "B"
})

// 这样就会报错，$(this) 返回的是一个 jQuery 对象，没有 title 属性
$("#box").hover(function () {
    $(this).title = "A"
}, function () {
    $(this).title = "B"
})

// 换成这样就可以了
// 建议如果已经使用了 jQuery，那就统一使用 $(this) 而不再用 this 应该是比较不错的选择
$("#box").hover(function () {
    $(this).attr("title", "A")
}, function () {
    $(this).attr("title", "B")
})
```


----


## jQuery 的链式操作是如何实现的

简单来说，仅仅是通过对象上的方法最后 return this 把对象再返回回来，这样一来就可以链式操作了

一个简单的模拟

```js
// 定义初始类
function Foo() {}

// 扩展它的 prototype 
Foo.prototype = {

    setName: function (name) {
        this.name = name;
        return this;
    },

    getName: function () {
        return this.name;
    },

    setAge: function (age) {
        this.age = age;
        return this;
    }

};

// 链式调用 
new Foo().setName("abc").setAge(20);  // Foo {name: "abc", age: 20}
```