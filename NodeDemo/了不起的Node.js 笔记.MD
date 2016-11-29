阻塞 与 非阻塞 IO 

在 Node 中，需要对回调函数如何修改当前内存中的变量（状态）特别小心，除此之外，还要特别注意对错误的处理是否会潜在地修改这些状态  

```js

var books = [
    "ab",
    "cd"
]

function servesBooks () {
    // 给客户端返回 HTML 代码
    var html = "<b>" + books.join("</b><br><b>") + "</b>"

    // 需要需要，把状态修改了
    books = [];

    return html;
}


// 等价的 PHP 代码

$book = array(
    "ab",
    "cd"
)

function serverBooks () {
    $html = "<br>" . join($book, "</b><br><b>") . "</b>";
    $books = array();
    return $html;
}

```

* Node 会将完整的图书列表返回第一个请求，而第二个请求则返回一个空的图书列表

* PHP 都能将完整的图书列表返回给两个请求

两者的区别在于基础架构上，node采用一个**长期运行的进程**，相反，Apache 会产出多个线程（每个请求一个线程），每次都会刷新状态，在 PHP 中，当解释器再次执行时，变量 $book 会被重新赋值，而 node 则不然，serverBooks 函数会再次被调用，且作用域中的变量不受影响（此时$book数组仍为空）


### 阻塞

区别下面 php 代码 和 node 代码的不同

```js

// php
print("Hello");

sleep(5);

print("World");


// node
console.log("hello");

setTimeout(function () {
    console.log("world");
}, 5000);

```

上述两段代码区别主要集中在 **阻塞** 与 **非阻塞** 的区别上，php 中的 sleep() 阻塞了线程的执行，而 node 使用了 时间轮询，因此 这里的 setTimeout 是非阻塞的么也就是

```js

console.log("hello");

setTimeOut(function(){
    console.log("world")
})

console.log("and");

// 会依次输出
// hello
// and
// world

```

从本质上来说，node 会先注册事件，然后不停的询问内核这些事情是否已经分发，当事件分发的时候，对应的回调函数就会被触发，然后继续执行下去，如果没有事件触发，则继续执行其他代码，知道有新的事件的时候，再去执行对应的回调函数，setTimeout 仅仅知识注册了一个事件，而程序继续执行，所有，这是异步的


### 错误处理

Node 的应用依托在一个拥有大量共享状态的大进程中，如果某个回调函数发生了错误，整个进程都会遭殃，但是如果添加了 **uncatchException** 处理器，就不一样了，进程不会退出，并且之后的事情都在你的掌控中：

```js

process.on("uncatchException", function (err) {
    console.log(err);
    process.exit(1); // 手动退出
})

```

除了 uncatchException 和 error 事件外，绝大部分 node 异步 api 接收的回调函数，**第一个参数**都是**错误处理对象或者是 null**

```js

var fs = require("fs");

fs.readerFile("1.txt", function (err, data) {
    if (err) {
        return console.error(err)
    }
    console.log(data)
})

```


### 堆栈追踪

如果引入事件轮询，那么如果程序出错，堆栈信息中有价值的信息就会丢失，同理，要捕获一个未来才会执行到的函数所抛出的错误是不可能的，这也就是为什么在 node.js 中，每步都要正确的进行错误处理的原因了，一旦遗漏，你就会发现，发生了错误以后很难追踪，因为上下文的信息都丢失了

> 有一点很重要，将来 node 会让异步处理器抛出的异常更容易被追踪到



## Node.js 中的 JavaScript

### process 

所有的全局执行上下文中的内容都在 process 对象中，浏览器中，只有一个 window 对象，在 node 中，也只有一个 process 对象。

### process.nextTick

**process.nextTick()** 函数可以将一个函数的执行时间规划到下一个事件循环中：


```js

console.log(1);

process.nextTick(function () {
    console.log(3)
});

console.log(2);

```

你可以把他想象扯个 setTimeout(fn, 1) 或者 "通过异步的方法在最近的将来调用该函数"，那么就可以很容易理解为什么上述例子输出的结果为 1， 2， 3


### 绝对和相对模块

绝对模块是指 node 通过在其内部 node_modules 查找到的模块，或者 node 内置的如果 fs，http 这样的模块

相对模块是将 require 指向一个相对工作目录中的 js 文件，比如下面这个例子：

```js

// main.js
require("a")

// a.js
console.log("hello world")

```

运行后会发现，node 未能找到，原因就在于它们并没有铜鼓 NPM 来安装，也不在 node_modules 目录张，而且 node 自带模块中也没有以此为名的模块，要修复这个问题，只需要在 require 的参数前面加上 ./

```js

require("./a")

```


### 暴露API

要让模块暴露一个 API 成为 require 调用的返回值，就要依靠 module 和 exports 这两个全局变量

在默认情况下，每个模块都会暴露一个空对象，如果你想要在该对象上添加属性，那么简单的使用 exports 即可

```js

// a.js
exports.name = "abc";
exports.data = "this is some data";

var privateVariable = 5;

exports.getPrivate = function () {
    return privateVariable;
}


// index.js
var a = require("./a");

console.log(a.name)
console.log(a.data)
console.log(a.getPrivate())

```

在上面的例子中，exports 其实就是对 module.exports 的引用，其在默认情况下是一个对象，你也可以彻底重写 module.exports 

```js

// person.js
module.exports = Person;

function Person (name) {
    this.name = name;
}

Person.prototype.talk = function () {
    console.log("my name is " + this.name)
}


// index.js
var Person = require("./person");
var john = new Person("john");

john.talk();

```

如上，在 index 中，你不再是接收一个对象作为返回值，而是函数



### 事件

node.js 中的基础 api 之一就是 EcentEmitter，如你也希望在 node 中随处进行时间的监听和分发，node 暴露了 Event EmitterAPI，在这个API上定义了 on， emit， 以及 removeListener 方法，它以 process.EventEmitter 的形式暴露出来

```js

var EventEmitter = require("events").EventEmitter;
var a = new EventEmitter

a.on("enevt", function () {
    console.log("event called")
})

a.emit("event")


```

在 node 中，你可以很容易的将其添加到自己的类中：

```js

var EventEmitter = process.EventEmitter;
var MyClass = function () {};

MyClass.prototype.__proto__ = EventEmitter,prototype;

// 这样 所有的 MyClass 的实例都具备了事件功能

var a = new MyClass;

a.on("some events", function () {
    // do something
})

```

事件是 node 非阻塞设计的重要体现，node 通常不会直接返回数据（因为这样可能会在等待某个资源的时候发生线程阻塞），而是采用分发事件来传递数据的方式

以 http 服务器为例，当请求到达的时候，node 会调用一个回调函数，这个时候数据可能不会一下全部到达，比如用户提交表单，我们通常会监听请求的 data 和 end 事件：

```js

http.createServer(function (req, res) {
    var buf = "";
    
    req.on("data", function (data) {
        buf += data;
    })

    req.on("end", function () {
        console.log("数据接收完毕！")
    })

})

```

将请求数据内容进行缓冲（data事件），等到所有数据都接收完毕后（end事件）再对数据进行处理

有时候会有这样的需求，不管某个事件在将来会触发多少次，我都希望只调用一次回调函数，node 为这类需求提供了一个简洁的方法：

```js

a.once("某个事件", function () {
    // 尽管事件会触发多次，但是此方法只会执行一次
})

```


### buffer

buffer 是一个表示固定内存分配的全局对象（也就是说，要放到缓冲区中的字节数需要提前定下）

该功能一部分作用就是可以对数据进行编码转换，比如，可以创建一幅用 base64 表示的图片，然后将其作为二进制 png 图片的形式写入到文件中：

```js

var myBuffer = new Buffer("==ii1j2i3h1i23h", "base64");
console.log(myBuffer)

require("fs").writeFile("logo.png", myBuffer);

```


### fs

```js

var fs = require("fs");

fs.readdir(__dirname, function (err, data) {
    console.log(data)
})

```


### 流（stream）

process 全局对象中包含三个流对象，分别对应三个 UNIX 标准流

```js

- **stdin**: 标准输入
- **stdout**: 标准输出
- **stderr**: 标准错误

```

第一个 stdin 是一个可读流，而 stdout 和 stderr 都是可写流

stdin流 默认的状态是暂停的（paused），通常，执行一个程序，程序会做一些处理然后退出，不过，有些时候，程序需要一直处在运行状态来接收用户输入的数据

简而言之，当涉及持续不断地对数据进行读写的时候，流 就出现了


### 工作目录

##### process.argv 包含了所有 node 程序运行的时候的参数值

```js
// index.js
console.log(process.argv);
```

第一个元素始终是 node， 第二个元素始终是执行的文件路径。紧接着是命令行后紧跟着的参数

要获取这些真正的元素，需要将数组的前两个元素去除掉： ```console.log(process.argv.slice(2))```

获取两个不同的目录：一个是程序本身所在的目录，另外一个是程序运行的时候所在的目录

##### __dirname 用来获取执行文件时该文件在文件系统中所在的目录

##### process.cwd 获取当前工作目录

##### process.chdir 允许灵活地更改工作目录

##### process.exit 当发生错误的时候，需要退出程序，这个时候最好使用错误代码 1，```process.exit(1)```





### Stream

**fs.createReadStream** 方法允许为一个文件创建一个**可读**的 Stream 对象

为了更好的理解，看下面两个示例：

```js

fs.readFile("my-file.txt", function (err, data) {
    // 对文件进行处理
})

```

这样一来，回调函数必要要等到整个文件读取完毕，载入到 RAM ，可用的情况下才会触发，然而，使用 Stream 可以让每次都会读取大小可变的内容块，并且每次读取后会触发回调函数

```js

var stream = fs.createReadStream("my-file.txt");

stream.on("data", function (chunk) {
    // 处理文件部分内容
})

stream.on("end", function (chunk) {
    // 文件读取完毕
})

```

用这种方式来上传大型文件，使用 Stream 可以大大提速上传过程


### 监视（Watch）

node 允许监视文件或目录是否发生变化，监视意味着当文件系统中的文件（或者目录）发生变化的时候，会分发一个事件，然后触发指定的回调函数

来看一个示例，首先，查找工作目录下所有的 CSS 文件，然后监视其是否发生改变，一旦文件发生更改，就将该文件名输出到控制台：

```js

var stream = fs.createReadStream("my-file.txt");

var fs = require("fs");

// 获取目录下所有的文件
var files = fs.readdirSync(process.cwd());
files.forEach(function (file) {
    // 监听 ".css" 文件
    if (/\.css/.test(file)) {
        fs.watchFile(process.cwd() + "/" + file, function () {
            console.log(" - " + file + " changed!");
        })
    }
})

```

除了 **fs.watchFile** 之外，也可以使用 **fs.watch** 来监视整个目录



### TCP

传输控制协议（TCP）是一个面向连接的协议，它保证了两台计算机之间数据传输的可靠性和顺序

换句话说，TCP 是一种传输层协议，它可以让你将数据从一台计算机上完整有序的传输到另一台计算机

### TCP 的特性

TCP 的首要特性就是 它是面向连接的（面向连接的通信和保证顺序的传递）

可以将客户端和服务器端的通信看作是一个连接或者数据流，因为 TCP 协议做基于的 IP 协议是面向无连接的

### 面向字节

TCP 允许数据以 ASCII 字符（每一个字符一个字节）或者 Unicode（每个字符四个字节）进行传输

### 可靠性

当数据发送出去以后，发送方就会等待一个确认消息（表示数据包已经收到的简短的确认消息），如果过了指定的窗口事件，还没有收到确认消息，发送方就会对数据进行重发

### 流控制

TCP 会通过一种叫流控制的方式来确保两点之间传输数据的平衡

### 拥堵控制

TCP 有一种内置的机制能够控制数据包的延迟率及丢包率不会太高，以此来确保服务的质量（QoS）


### connect 方法

和 createServer 一样，net API 提供了另外一个名为 connect 的方法，如下所示

```net.connect(port[[, host], callback]])```

如果提供了回调函数，就等于监听了该方法返回的对象上的 connect 事件

```js

var client = net.connect(3000, "localhost");

client.on("connect", function () {...})

```

上述代码和下面的代码是一样的：

```net.connect(300, "localhost", function () {})```

此外，我们还可以监听 data 和 close 事件




### HTTP

超文本传输协议，又被称为 HTTP，是一种 Web 协议，它为 Web 注入了很多强大的功能，它是属于 TCP 上层的协议


### HTTP 结构

HTTP 协议构建在请求和响应的概念上，对应在 Node.js 中就是由 http.ServerRequest 和 http.ServerResponse 这两个构造器构造出来的对象

当用户浏览一个网站的时候，用户代理（浏览器）会创建一个请求，该请求通过 TCP 发送给 Web 服务器，随后服务器会给出响应


### 头信息

HTTP 协议和 IRC 一样流行，其目的是进行文档交换，它在请求和响应消息前使用头信息（header）来描述不同的消息内容

发送内容的类型（type）就是在著名的 Content-Type 头信息中标注的

发送数据的方式在涉及文件系统的情况下会非常高效，因为 node 允许以数据块的形式往响应中写数据，同时它又允许以数据块的形式读取文件，所以我们就可以使用 ReadStream 文件系统 API 来实现，下面这个例子用于读取 image.png 文件，并以正确的 ConTent-Type 头信息做出响应：

```js

require("http").cerateServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "image/png"})
    var stream = require("fs").createReadStream("image.png")

    stream.on("data", function (data) {
        res.write(data);
    })

    stream.on("end", function () {
        res.end()
    })
}).listen(3000)


```

以一系列数据块的形式来将图片写入到响应中，有如下好处：

* 高效的内存分配，要是对每个请求在写入前都完全把图片信息取完（通过 fs.readFile），在处理的时候会消耗大量内存

* 数据一旦结束就可以立即写入

实际上我们做的是把一个流（Stream）（文件系统）接（piping）到了另外一个流上（一个 http.ServerResponse对象）。流 是 node 中非常重要的一种抽象，因此，有一种简洁的方式：

```js

require("http").cerateServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "image/png"})
    require("fs").createReadStream("image.png").pipe(res);
}).listen(3000)


```


### 连接

TCP服务器 和 HTTP服务器 很相似：都调用了 createServer 方法，并且当客户端连入的时候都会执行一个回调函数

区别在于：在 net 服务器中，是个连接（connection）对象，而在 HTTP 服务器中，则是请求和响应对象

之所以这样，原因有两个

* 其一，HTTP 服务器是更高层的 API，提供了控制和 HTTP 协议相关的一些功能

* 其二，浏览器在访问站点的时候不会就只用一个连接，很多主流的浏览器为了更快地加载网站内容，能向同一个主机打开八个不同的连接，并发送请求。



### method 和 URL

node 会将主机名后所有的内容都放在 URL 属性中，假设访问的是 http://myhost.com/url?this+is+a+long+url

那么 url 的值就会是 /url?this+is+a+long+url






