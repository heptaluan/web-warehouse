相关问题

* 什么是 ```promise```

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