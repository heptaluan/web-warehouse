## 模块路径解析规则

```require``` 函数支持斜杠```（/）```或盘符```（C:）```开头的绝对路径，也支持 ```./``` 开头的相对路径

但这两种路径在模块之间建立了强耦合关系，一旦某个模块文件的存放位置需要变更，使用该模块的其它模块的代码也需要跟着调整

因此，```require``` 函数支持第三种形式的路径，写法类似于 ```foo/bar```，并依次按照以下规则解析路径，直到找到模块位置

#### 1. 内置模块

如果传递给 ```require``` 函数的是 ```NodeJS``` 内置模块名称，不做路径解析，直接返回内部模块的导出对象，例如 ```require('fs')```

#### 2. node_modules 目录

```NodeJS``` 定义了一个特殊的 ```node_modules``` 目录用于存放模块。例如某个模块的绝对路径是 ```/home/user/hello.js```，在该模块中使用 ```require('foo/bar')``` 方式加载模块时，则 ```NodeJS``` 依次尝试使用以下路径

```js
/home/user/node_modules/foo/bar

/home/node_modules/foo/bar

/node_modules/foo/bar
```

### 3. NODE_PATH 环境变量

与 ```PATH``` 环境变量类似，```NodeJS``` 允许通过 ```NODE_PATH``` 环境变量来指定额外的模块搜索路径

```NODE_PATH``` 环境变量中包含一到多个目录路径，路径之间在 ```Linux``` 下使用 ```:``` 分隔，在 ```Windows``` 下 使用 ```;``` 分隔

例如定义了以下 ```NODE_PATH``` 环境变量：

```js
NODE_PATH=/home/user/lib:/home/lib
```

当使用 ```require('foo/bar')``` 的方式加载模块时，则 ```NodeJS``` 依次尝试以下路径

```js
/home/user/lib/foo/bar

/home/lib/foo/bar
```



## NPM 版本号

使用 ```NPM``` 下载和发布代码时都会接触到版本号，```NPM``` 使用语义版本号来管理代码

语义版本号分为 ```X.Y.Z``` 三位，分别代表主版本号，次版本号和补丁版本号，当代码变更时，版本号按以下原则更新

* 如果只是修复 ```BUG```，需要更新 ```Z``` 位

* 如果是新增了功能，但是向下兼容，需要更新 ```Y``` 位

* 如果有大的变动，向下不兼容，需要更新 ```X``` 位

版本号有了这个保证后，在申明三方包依赖时，除了可依赖于一个固定版本号外，还可依赖于某个范围的版本号

例如 ```"argv": "0.0.x"``` 表示依赖于 ```0.0.x``` 系列的最新版 ```argv```

更多见 [官方文档](https://npmjs.org/doc/files/package.json.html#dependencies)

```NPM``` 的一些其他功能：

* ```NPM``` 提供了很多命令，例如 ```install``` 和 ```publish```，使用 ```npm help``` 可查看所有命令

* 使用 ```npm help <command>``` 可查看某条命令的详细帮助，例如 ```npm help install```

* 在 ```package.json``` 所在目录下使用 ```npm install . -g``` 可先在本地安装当前命令行程序，可用于发布前的本地测试

* 使用 ```npm update <package>``` 可以把当前目录下 ```node_modules``` 子目录里边的对应模块更新至最新版本

* 使用 ```npm update <package> -g``` 可以把全局安装的对应命令行程序更新至最新版

* 使用 ```npm cache clear``` 可以清空 ```NPM``` 本地缓存，用于对付使用相同版本号发布新版本代码的人

* 使用 ```npm unpublish <package>@<version>``` 可以撤销发布自己发布过的某个版本代码




## 小文件拷贝

```NodeJS``` 提供了基本的文件操作 ```API```，但是像文件拷贝这种高级功能就没有提供，我们来手动实现一个

与 ```Copy``` 命令类型，我们的程序需要能接受源文件路径与目标文件路径两个参数

```js
var fs = require("fs");

function copy (src, dst) {
    fs.writeFileSync(dst, fs.readFileSync(src));
}

function main (argv) {
    copy(argv[0], argv[1]);
}

main(process.argv.slice(2));
```

关于 ```process```：

```process``` 是一个全局变量，可通过 ```process.argv``` 获得命令行参数，由于 ```argv[0]``` 固定等于 ```NodeJS``` 执行程序的绝对路径，```argv[1]``` 固定等于主模块的绝对路径，因此，第一个命令行参数是从 ```argv[2]``` 这个位置开始


## 大文件拷贝

上面的程序拷贝一些小文件没什么问题，但是这种一次性把所有文件内容都读取到内存中然后在一次性的写入磁盘的方式不适合拷贝大文件，对于大文件，只能读一点写一点，直到完成拷贝

```js
var fs = require("fs");

function copy (src, dst) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

function main (argv) {
    copy(argv[0], argv[1]);
}

main(process.argv.slice(2));
```






## 相关 API

node < v6.0.0

#### Buffer

```JS``` 语音自身只有字符串数据类型，没有二进制数据类型，因此 ```NodeJS``` 提供了一个与 ```String``` 对等的全局构造函数 ```Buffer``` 来提供对二进制数据的操作，除了可以读取文件得到 ```Buffer``` 的实例之外，还可以直接构造

```js
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);

// 新的创建方式
const buf = Buffer.from([ 0x62, 0x75, 0x66, 0x66, 0x65, 0x72 ]);
```

```Buffer``` 与字符串类似，除了可以用 ```.length``` 属性得到字节长度外，还可以使用 ```[index]``` 方式读取指定位置的字节：

```js
bin[0];  // => 0x68
```

```Buffer``` 与字符串可以互相转化

```js
var str = bin.toString("utf-8");  // "hello"
```

也可以反过来，将字符串转为指定编码下的二进制数据

```js
var bin = new Buffer("hello", "urf-8");  // => <Buffer 68 65 6c 6c 6f>
```

```Buffer``` 与字符串有一个重要区别，字符串是只读的，并且对字符串的任何修改得到的都是一个新字符串，原字符串保持不变

至于 ```Buffer```，更像是可以做指针操作的 ```C``` 语言数组，例如，可以使用 ```[index]``` 方式直接修改某个位置的字节

```js
bin[0] = 0x48;
```

而 ```.slice``` 方法也不是返回一个新的 ```Buffer```，而更像是返回了指向原 ```Buffer``` 中间的某个位置的指针

```js
[ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]
    ^           ^
    |           |
   bin     bin.slice(2)
```

因此对 ```.slice``` 方法返回的 ```Buffer``` 的修改会作用于原 ```Buffer```

```js
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var sub = bin.slice(2);

sub[0] = 0x65;
console.log(bin);  // => <Buffer 68 65 65 6c 6f>
```

所以，如果想要拷贝一份 ```Buffer```，需要先创建一个新的 ```Buffer```，并通过 ```.copy``` 方法把原 ```Buffer``` 中的数据复制过去，类似于申请一块新的内存，并把已有内存中的数据复制过去

```js
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var dup = new Buffer(bin.length);

bin.copy(dup);
dup[0] = 0x48;

console.log(bin);  // <Buffer 68 65 6c 6c 6f>
console.log(dup);  // <Buffer 48 65 6c 6c 6f>
```

总之，```Buffer``` 将 ```JS``` 的数据处理能力从字符串扩展到了任意二进制数据









#### Stream(数据流)

当内存中无法一次装下需要处理的数据时，我们就需要用到 ```Stream```

以上边的大文件拷贝程序为例，我们可以为数据来源创建一个只读数据流，示例如下：

```js
var rs = fs.createReadStream(pathname);

rs.on("data", function (chunk) {
    doSomething(chunk);
})

rs.on("end", function () {
    cleanUp();
})
```

需要注意的是，```Stream``` 基于事件机制工作，所有 ```Stream``` 的实例都继承于 ```NodeJS``` 提供的 [EventEmitter](https://nodejs.org/api/events.html)

上面代码中 ```data``` 事件会源源不断的被触发，不管 ```doSomething()``` 函数是否处理的过来，调整如下：

```js
var rs = fs.createReadStream(src);

rs.on("data", function (chunk) {
    rs.pause();
    doSomething(chunk, function () {
        rs.resume();
    });
});

rs.on("end", function () {
    cleanUp();
});
```

我们给 ```doSomething()``` 函数加上了回调，因此我们可以在处理数据之前暂停读取，并在处理数据后继续读取数据

此外，我们也可以为数据目标创建一个只写数据流：

```js
var rs = fs.createReadStream(src);
var ws = fs.createWriteStream(dst);

rs.on("data", function (chunk) {
    ws.write(chunk);
});

rs.on("end", function () {
    ws.end();
});
```

我们把 ```doSomething``` 换成了往只写数据流里写入数据后，以上代码看起来就像是一个文件拷贝程序了

但是以上代码存在上边提到的问题，如果写入速度跟不上读取速度的话，只写数据流内部的缓存会爆仓

我们可以根据 ```.write``` 方法的返回值来判断传入的数据是写入目标了，还是临时放在了缓存了，并根据 ```drain``` 事件来判断什么时候只写数据流已经将缓存中的数据写入目标，可以传入下一个待写数据了

```js
var rs = fs.createReadStream(src);
var ws = fs.createWriteStream(dst);

rs.on("data", function (chunk) {
    if (ws.write(chunk) === false) {
        rs.pause();
    }
});

rs.on("end", function () {
    ws.end();
});

ws.on("drain", function () {
    rs.resume();
});
```

以上代码实现了数据从只读数据流到只写数据流的搬运，并包括了防爆仓控制

这种使用场景很多，所以 ```NodeJS``` 直接提供了 ```.pipe``` 方法来做这件事情








