相关问题

* 什么是 ```promise```

* ```promise``` 和 ```setTimeout``` 执行顺序

----

## promise

首先它是一个对象，它和 ```javascript``` 普通的对象没什么区别，同时，它也是一种规范，跟异步操作约定了统一的接口，表示一个异步操作的最终结果，以同步的方式来写代码，执行的操作是异步的，但又保证程序执行的顺序是同步的

1. ```promise``` 只有三种状态，未完成，完成 (```fulfilled```) 和失败 (```rejected```)

2. ```promise``` 的状态可以由未完成转换成完成，或者未完成转换成失败

3. ```promise``` 的状态转换只发生一次

4. ```Promise``` 状态转换完成后就是外部**不可变**的值，我们可以安全地把这个值传递给第三方，并确信它不会被有意无意的修改（特别是对于多方查看同一个 Promise 状态转换的情况）

```promise``` 有一个 ```then``` 方法，```then``` 方法可以接受 ```3``` 个函数作为参数

前两个函数对应 ```promise``` 的两种状态 ```fulfilled```, ```rejected``` 的回调函数，第三个函数用于处理进度信息（```.then()``` 总是返回一个新的 ```promise```）

一个简单的读取文件示例：

```js
var fs = require("fs");

function readFile () {
    return new Promise(function (resolve, reject) {
        fs.readFile("1.txt", "utf-8", function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

readFile().then(function (data) {
    console.log(data)
}).catch(function (err) {
    console.log(err)
})
```


----


## promise 和 setTimeout 执行顺序

详细可见 《你不知道的js（中卷）》 -- 1.5节

一个简单的示例：

```js
setTimeout(function () {
    console.log(1)
}, 0);

new Promise(function (resolve) {
        resolve();
}).then(function () {
    console.log(2);
});  

// 2, 1
```

简单来说，```promise``` 的任务会在当前事件循环末尾中执行，而 ```setTimeout``` 中的任务是在下一次事件循环执行

在 ```ES6``` 中，有一个新的概念建立在事件循环队列之上，叫做 **任务队列**

简单的理解就是，它是挂在事件循环队列的每个 ```tick``` 之后的一个队列，在事件循环的每个 ```tick``` 中，可能出现的异步动作不会导致一个完整的新事件添加到事件循环队列中，而会在当前 ```tick``` 的任务队列末尾添加一个项目（任务）

一个任务可能引起更多任务被添加到同一个队列末尾，所以，理论上说，任务循环可能无限循环（一个任务总是添加另一个任务，以此类推），进而导致程序的无限循环，无法转移到下一个事件循环 ```tick```，从概念上看，这和代码中的无限循环（类似 ```while(true)```）的体验几乎是一样的

扩展：[promise 的队列与 setTimeout 的队列有何关联？](https://www.zhihu.com/question/36972010)