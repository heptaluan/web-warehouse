## 3.2.2 回调函数

### 异步的方式读取一个文件

```js

var fs = require("fs");

fs.readFile("1.txt", "utf-8", function (err, data) {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});

console.log("end."); 

```

运行的结果如下： 
```js
end. 
hello world.
```

### 同步的方式读取一个文件

```js

var fs = require("fs");
var data = fs.readFileSync("file.txt", "utf-8");

console.log(data);
console.log("end."); 

```
运行的结果如下： 
```js
end. 
hello world.
```

同步式读取文件的方式比较容易理解，将文件名作为参数传入 fs.readFileSync 函数，阻塞等待读取完成后，将文件的内容作为函数的返回值赋给 data 变量，接下来控制台输出 data 的值，最后输出 end.。 

异步式读取文件就稍微有些违反直觉了，end.先被输出。

fs.readFile 调用时所做的工作只是将异步式 I/O 请求发送给了操作系统，然后立即返回并执行后面的语句，执行完以后进入事件循环监听事件。

当 fs 接收到 I/O 请求完成的事件时，事件循环会主动调用回调函数以完成后续工作。因此我们会先看到 end.，再看到 file.txt 文件的内容。

> Node.js 中，不鼓励使用同步 I/O。 




