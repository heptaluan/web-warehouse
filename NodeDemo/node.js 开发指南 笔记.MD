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



## 3.3.2 创建及加载模块


### 创建模块

Node.js 提供了 exports 和 require 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。 



### 单次加载

无论调用多少次 require，获得的模块都是同一个。最终的输出结果，由最后一次调用来决定



### 覆盖 exports 

只需要把最后的输出结果挂载到 module 上

```js

module.exports = Hello;

```

这样就可以直接获得这个对象了：

```js

var Hello = require('./hello'); 

```

exports 本身仅仅是一个普通的空对象，即 {}，它专门用来声明接口，本质上是通过它为模块闭包的内部建立了一个有限的访问接口。 

> 不可以通过对 exports 直接赋值代替对 module.exports 赋值，exports 实际上只是一个和 module.exports 指向同一个对象的变量，它本身会在模块执行结束后释放，但是 module 不会，因此，只能通过指定 module.exports 来改变访问接口


## 3.3.4 Node.js 包管理器 

在使用 npm 安装包的时候， 有两种模式： **本地模式**和**全局模式**。 默认情况下我们使用 ```npm install```命令就是采用本地模式， 即把包安装到当前目录的 ```node_modules``` 子目录下。 Node.js 的 require 在加载模块时会尝试搜寻 ```node_modules``` 子目录，因此使用 npm 本地模式安装的包可以直接被引用。 

npm 还有另一种不同的安装模式被成为全局模式，使用方法为：

```js
$ npm install -g [package_name]

```

为什么要使用全局模式呢？多数时候并不是因为许多程序都有可能用到它， 为了减少多重副本而使用全局模式，而是因为本地模式不会注册 PATH 环境变量。

> 使用全局模式安装的包并不能直接在 JavaScript 文件中用 require 获得，因为 require 不会搜索 /usr/local/lib/node_modules/。






## Node.js核心模块

全局对象，常用工具，事件机制，文件系统访问，HTTP 服务器与客户端

### 全局对象 

Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 
对象的属性。 如 console、 process 等


### process 

process 是一个全局变量，即 global 对象的属性。它用于描述当前 Node.js 进程状态的对象，提供了一个与操作系统的简单接口。

一般比较常用的是 ```process.nextTick()``` 用来把复杂的工作拆散，变成一个个较小的事件。

```js

// 改写前，假设 compute() 和 somethingComplicated() 是两个较为耗时的函数

function doSomething(args, callback) { 
    somethingComplicated(args); 
    callback(); 
} 
 
doSomething(function onEnd() { 
    compute(); 
});

// 改写后

function doSomething(args, callback) { 
    somethingComplicated(args); 
    process.nextTick(callback); 
} 
 
doSomething(function onEnd() { 
    compute(); 
}); 

```

改写后的程序会把上面耗时的操作拆分为两个事件，减少每个事件的执行时间，提高事件响应速度

> 不要使用 setTimeout(fn, 0) 代替 process.nextTick(callback)，前者比后者效率要低得多。 




## 常用工具 util

util 是一个 Node.js 核心模块，提供常用函数的集合，用于弥补核心 JavaScript 的功能过于精简的不足。 

### util.inherits 

```util.inherits(constructor, superConstructor)```

用来实现 对象间原型继承的函数 ，来看一个实例：

```js

var util = require('util');


function Base() {
    this.name = 'base';
    this.base = 1991;

    this.sayHello = function () {
        console.log('Hello ' + this.name);
    };
}


Base.prototype.showName = function () {
    console.log(this.name);
};


function Sub() {
    this.name = 'sub';
}


util.inherits(Sub, Base);

var objBase = new Base();

objBase.showName();
objBase.sayHello();

console.log(objBase);

var objSub = new Sub();

objSub.showName();

// 注意 去掉这行注释会报错，因为 inherits 仅仅继承了在原型中定义的函数，构造函数内部的属性和方法
// 是不会被继承的

// objSub.sayHello(); 
console.log(objSub); 

```

> 注意，Sub 仅仅继承了 Base 在原型中定义的函数，而构造函数内部创造的 base 属性和 sayHello 函数都没有被 Sub 继承。同时，在原型中定义的属性不会被 console.log 作为对象的属性输出。




### util.inspect

```
util.inspect(object,[showHidden],[depth],[colors])
```

是一个将任意对象转换为字符串的方法， 通常用于调试和错误输出。 它至少接受一个参数 object， 即要转换的对象。


## 事件驱动 events 

events 是 Node.js 最重要的模块，原因是 Node.js 本身架构就是事件式的，而它提供了唯一的接口，所以堪称 Node.js 事件编程的基石。

### 事件发射器

events 模块只提供了一个对象： **events.EventEmitter**。EventEmitter 的核心就是**事件发射与事件监听器**功能的封装。

当事件发射时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。 


```js

var events = require("events");

var emitter = new events.EventEmitter();

emitter.on("someEvent", function (arg1, arg2) {
    console.log("listener01", arg1, arg2)
})

emitter.on("someEvent", function (arg1, arg2) {
    console.log("listener02", arg1, arg2)
})

emitter.emit("someEvent", "a", "b")

```


### EventEmitter常用的API

* ##### EventEmitter.on(event, listener) 
 * 为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数 listener。 

* ##### EventEmitter.emit(event, [arg1], [arg2], [...]) 
 * 发射 event 事件，传递若干可选参数到事件监听器的参数表。

* ##### EventEmitter.once(event, listener)
 * 为指定事件注册一个单次监听器，即监听器最多只会触发一次，触发后立刻解除该监听器。 

* ##### EventEmitter.removeListener(event, listener)
 * 移除指定事件的某个监听器，listener 必须是该事件已经注册过的监听器。  

* ##### EventEmitter.removeAllListeners([event])
 * 移除所有事件的所有监听器，如果指定 event，则移除指定事件的所有监听器。


### 继承 EventEmitter

大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 fs、net、http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。

原因有两点：
* 具有某个实体功能的对象实现事件符合语义，事件的监听和发射应该是一个对象的方法。

* JavaScript 的对象机制是基于原型的，支持部分多重继承，继承 EventEmitter 不会打乱对象原有的继承关系。



## 文件系统 fs

fs 模块是文件操作的封装，它提供了文件的读取、写入、更名、删除、遍历目录、链接等 POSIX 文件系统操作。


### fs.readFile 

```
fs.readFile(filename,[encoding],[callback(err,data)])
```

如果指定了 ```encoding```，data 是一个解析后的字符串，否则 data 将会是以 ```Buffer``` 形式表示的二进制数据。 

> Node.js 的异步编程接口习惯是以函数的最后一个参数为回调函数，通常一个函数只有一个回调函数。回调函数是实际参数中第一个是 err，其余的参数是其他返回的内容。如果没有发生错误，err 的值会是 null 或 undefined。如果有错误发生，err 通常是 Error 对象的实例。



### fs.open 

```
fs.open(path, flags, [mode], [callback(err, fd)])
```

接受两个必选参数，path 为文件的路径，flags 可以是以下值。

* r ：以读取模式打开文件。 

* r+ ：以读写模式打开文件。 

* w ：以写入模式打开文件，如果文件不存在则创建。 

* w+ ：以读写模式打开文件，如果文件不存在则创建。 

* a ：以追加模式打开文件，如果文件不存在则创建。

* a+ ：以读取追加模式打开文件，如果文件不存在则创建。


### fs.read

```
fs.read(fd, buffer, offset, length, position, [callback(err, bytesRead, buffer)])
```

```fs.read``` 的功能是从指定的文件描述符 fd 中读取数据并写入 buffer 指向的缓冲区对象。

下面是一个使用 fs.open 和 fs.read 的示例：

```js

var fs = require("fs");

fs.open("content.txt", "r", function (err, fd) {
    if (err) {
        console.error(err)
        return;
    }

    var buf = new Buffer(8);
    fs.read(fd, buf, 0, 8, null, function (err, bytesRead, buffer) {
        if (err) {
            console.error(err);
            return 
        }

        console.log("bytesRead " + bytesRead);
        console.log(buffer)
    })
})

```

> 一般来说，除非必要，否则**不要使用**这种方式读取文件，因为它要求你手动管理缓冲区和文件指针，尤其是在你不知道文件大小的时候，这将会是一件很麻烦的事情。


## HTTP 服务器与客户端

### HTTP 服务器

http.Server 是 http 模块中的 HTTP 服务器对象，用 Node.js 做的所有基于 HTTP 协议的系统

一个简单的 htpp 服务器：

```js

var http = require("http");

// 创建一个 http.Server 的实例，接受两个参数，请求对象（ req ）和响应对象（ res ） 
http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("hello world");
    res.end()
}).listen("3000", function (req, res) {
    console.log("app is running at port 3000")
})

```


### 获取 GET 请求内容 

需要手动解析 url 后面的内容作为 GET 请求的参数。Node.js 的 url 模块中的 parse 函数提供了这个功能，例如：

```js

var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(util.inspect(url.parse(req.url, true)));
}).listen(3000); 


```

通过 url.parse，原始的 path 被解析为一个对象，其中 ```query``` 就是我们所谓的 GET 请求的内容，而路径则是 ```pathname```。 


### 获取 POST 请求内容

相比 GET 请求把所有的内容编码到访问路径中，POST 请求的内容全部都在请求体中。

Node.js 默认是不会解析请求体的，当你需要的时候，需要手动来做。让我们看看实现方法：

```js

var http = require('http');
var querystring = require('querystring');
var util = require('util');

http.createServer(function (req, res) {
    var post = '';

    req.on('data', function (chunk) {
        post += chunk;
    });

    req.on('end', function () {
        post = querystring.parse(post);
        res.end(util.inspect(post));
    });

}).listen(3000);

```

上面代码并没有在请求响应函数中向客户端返回信息，而是定义了一个 post 变量，用于在闭包中暂存请求体的信息。 

通过 req 的 data 事件监听函数， 每当接受到请求体的数据，就累加到 post 变量中。在 end 事件触发后，通过 querystring.parse 将 post 解析为真正的 POST 请求格式，然后向客户端返回。

> 这只是一个帮助你理解的示例，不要在真正的生产应用中使用上面这种简单的方法来获取 POST 请求，因为它有严重的效率问题和安全问题。 




### http.ServerResponse 

是返回给客户端的信息，决定了用户最终能看到的结果。它也是由 http.Server 的 request 事件发送的，作为第二个参数传递，一般简称为 response 或 res。 

**http.ServerResponse** 有三个重要的成员函数，用于返回**响应头**、**响应内容**以及**结束请求**。 

* ##### response.writeHead(statusCode, [headers])
 * 向请求的客户端发送响应头。statusCode 是 HTTP 状态码，如 200 （请求成功） 、404 （未找到）等。headers 是一个类似关联数组的对象，表示响应头的每个属性。该函数在一个请求内最多只能调用一次，如果不调用，则会自动生成一个响应头。 

* ##### response.write(data, [encoding])
 * 向请求的客户端发送响应内容。data 是一个 Buffer 或字符串，表示要发送的内容。如果 data 是字符串，那么需要指定 encoding 来说明它的编码方式，默认是 utf-8。在 response.end 调用之前，response.write 可以被多次调用。
 
* ##### response.end([data], [encoding])
 * 结束响应，告知客户端所有发送已经完成。当所有要返回的内容发送完毕的时候，该函数 必须 被调用一次。它接受两个可选参数，意义和 response.write 相同。如果不调用该函数，客户端将永远处于等待状态。



### HTTP 客户端

http 模块提供了两个函数 ```http.request``` 和 ```http.get```，功能是作为客户端向 HTTP 服务器发起请求。

**http.request(options, callback)**

发起 HTTP 请求。 接受两个参数， option 是一个类似关联数组的对象， 表示请求的参数， callback 是请求的回调函数。 option 

常用的参数如下所示。 

* host ：请求网站的域名或 IP 地址。 

* port ：请求网站的端口，默认 80。 

* method ：请求方法，默认是 GET。

* path ：请求的相对于根的路径，默认是“/” 。QueryString 应该包含在其中。例如 /search?query=abc。

* headers ：一个关联数组对象，为请求头的内容。 

callback 传递一个参数，为 http.ClientResponse 的实例。 

http.request 返回一个 http.ClientRequest 的实例。 

> 不要忘了通过 req.end() 结束请求，否则服务器将不会收到信息。 


**http.get(options, callback)**

 http 模块还提供了一个更加简便的方法用于处理GET请求： http.get。 它是 http.request 的简化版， 唯一的区别在于http.get 自动将请求方法设为了 GET 请求，同时**不需要**手动调用 req.end()。

```js

var http = require('http');

http.get({ host: 'www.abcabc.com' }, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
        console.log(data);
    });
}); 


```




## Express 

本章开始，该书中的案例大部分在现在已经不适合了，所以打算随便翻一翻，了解一些，然后换一本书籍

### 安装

```js

$ npm install -g express

// 4.X 以后，需要安装这个，不然会提示“express命令找不到的”
$ npm install -g express-generator


```

### 建立工程

```js
// 书中是 express -t ejs microblog 但是这样安装出来的是 jade 模板
express -e ejs app

```

```js

$ cd app && npm install

```

### 启动服务器

```express 4.x```以上都是用 ```npm start``` 来启动项目，不再是使用 ```node app.js```，或者使用 supervisor

```js

$ supervisor bin/www

```




## 模块加载机制


### 模块的类型

模块分为两大类，**核心模块** 和 **文件模块**

**核心模块**就是 Node.js 标准 API 中提供的模块，如 fs、http、net、vm 等。我们可以直接通过require 获取核心模块，例如 require('fs')。

核心模块拥有最高的加载优先级，换言之如果有模块与其命名冲突，Node.js 总是会加载核心模块。 

**文件模块**则是存储为单独的文件（或文件夹）的模块，可能是 JavaScript 代码、JSON 或编译好的 C/C++ 代码。



### 按路径加载模块 

文件模块的加载有两种方式，一种是按路径加载，一种是查找 node_modules 文件夹。

如果 require 参数以 “ / ” 开头， 那么就以绝对路径的方式查找模块名称

如果 require 参数以“ ./ ”或“ ../ ”开头，那么则以相对路径的方式来查找模块




### 加载缓存

在前面提到过，Node.js 模块不会被重复加载，这是因为 Node.js 通过文件名缓存所有加载过的文件模块，所以以后再访问到时就不会重新加载了。

注意，Node.js 是根据实际**文件名**缓存的，而不是 require() 提供的参数缓存的，也就是说即使你分别通过 require('express') 和 require('./node_modules/express') 加载两次，也不会重复加载，因为尽管两次参数不同，解析到的文件却是同一个。










