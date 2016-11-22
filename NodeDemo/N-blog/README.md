Node.js 笔记

参考 [N-blog](https://github.com/nswbmw/N-blog)

## 2.1 require

### require 是用来加载一个文件的代码

* require 可加载 .js、.json 和 .node 后缀的文件

* require 的过程是同步的，所以这样是错误的:

```js
setTimeout(() => {
    module.exports = { a: 'hello' };
}, 0);
```

require 这个文件得到的是空对象 ```{}```

* require 目录的机制是:
 * 如果目录下有 package.json 并指定了 main 字段，则用之
 * 如果不存在 package.json，则依次尝试加载目录下的 index.js 和 index.node

* require 过的文件会加载到缓存，所以多次 require 同一个文件（模块）不会重复加载

* 判断是否是程序的入口文件有两种方式:
 * require.main === module（推荐）
 * module.parent === null


### 循环引用

循环引用（或循环依赖）简单点来说就是 a 文件 require 了 b 文件，然后 b 文件又反过来 require 了 a 文件。我们用 a->b 代表 b require 了 a。

简单的情况:

```js
a->b
b->a

```

复杂点的情况:

```js

a->b
b->c
c->a

```

循环引用并不会报错，导致的结果是 require 的结果是空对象 {}，原因是 b require 了 a，a 又去 require 了 b，此时 b 还没初始化好，所以只能拿到初始值 {}。当产生循环引用时一般有两种方法解决：

1. 通过分离共用的代码到另一个文件解决，如上面简单的情况，可拆出共用的代码到 c 中，如下:

```js

c->a
c->b

```

2. 不在最外层 require，在用到的地方 require，通常在函数的内部

总的来说，循环依赖的陷阱并不大容易出现，但一旦出现了，对于新手来说还真不好定位。它的存在给我们提了个醒，要时刻注意你项目的依赖关系不要过于复杂，哪天你发现一个你明明已经 exports 了的方法报 undefined is not a function，我们就该提醒一下自己：哦，也许是它来了。




## 2.2 exports 和 module.exports

### exports 和 module.exports 用来导出代码

require 用来加载代码，而 exports 和 module.exports 则用来导出代码。

先来看一个示例，test.js

```js

var a = {name: 1};
var b = a;

console.log(a);    // { name: 1 }
console.log(b);    // { name: 1 }
// a 是一个对象，b 是对 a 的引用，即 a 和 b 指向同一块内存，所以前两个输出一样。

b.name = 2;
console.log(a);    // { name: 2 }
console.log(b);    // { name: 2 }
// 当对 b 作修改时，即 a 和 b 指向同一块内存地址的内容发生了改变，所以 a 也会体现出来，所以第三四个输出一样。

var b = {name: 3};    
console.log(a);    // { name: 2 }
console.log(b);    // { name: 3 }
// 当 b 被覆盖时，b 指向了一块新的内存，a 还是指向原来的内存，所以最后两个输出不一样。

```

了解了上述例子以后，我们只需知道三点就知道 **exports** 和 **module.exports** 的区别了：

1. module.exports 初始值为一个空对象 {}

2. exports 是指向的 module.exports 的引用

3. require() 返回的是 module.exports 而不是 exports

我们经常看到这样的写法：

```js

exports = module.exports = {...}

```

上面的代码等价于:

```js

module.exprots = {...}

exports = module.exprots

```

原理很简单：module.exports 指向新的对象时，exports 断开了与 module.exports 的引用，那么通过 exports = module.exports 让 exports 重新指向 module.exports。

> ES6 的 import 和 export 不在本文的讲解范围，有兴趣的读者可以去学习阮一峰老师的[《ECMAScript6入门》](http://es6.ruanyifeng.com/)。 


## 2.4 环境变量

环境变量（environment variables）一般是指在操作系统中用来指定操作系统运行环境的一些参数。在 Mac 和 Linux 的终端直接输入 env，会列出当前的环境变量，如：USER=xxx。简单来讲，环境变量就是传递参数给运行程序的。

在 Node.js 中，我们经常这么用:

```js

NODE_ENV=test node app

```

通过以上命令启动程序，指定当前环境变量 NODE_ENV 的值为 test，那么在 app.js 中可通过 process.env 来获取环境变量:


```js

console.log(process.env.NODE_ENV) // test

```

另一个常见的例子是使用 [debug](https://www.npmjs.com/package/debug) 模块时:


```js

DEBUG=* node app

```

Windows 用户需要首先设置环境变量，然后再执行程序：


```js

set DEBUG=*
set NODE_ENV=test
node app

```

或者使用 [cross-env](https://www.npmjs.com/package/cross-env)：



```js

$ npm i cross-env -g

```

使用方式：


```js

cross-env NODE_ENV=test node app

```



## 2.5 package.json

package.json，它存储了该 Node.js 应用的名字、版本、描述、作者、入口文件、脚本、版权等等信息。


## 2.6 npm

### npm init

一般用来初始化一个空项目。npm init 有智能的默认选项，比如从根目录名称推断模块名称，通过 ```~/.npmrc``` 读取你的信息，用你的 Git 设置来确定 repository 等等。

### npm install

在控制台输入 npm install -h 查看使用方式:

![image](https://github.com/nswbmw/N-blog/blob/master/book/img/2.6.1.png)   



我们通过 npm install 可以安装 npm 上发布的某个版本、某个tag、某个版本区间的模块，甚至可以安装本地目录、压缩包和 git/github 的库作为依赖。

> npm i 是 npm install 的简写，建议使用 npm i

直接使用 ```npm i``` 安装的模块是不会写入 package.json 的 dependencies (或 devDependencies)，需要额外加个参数:

1. npm i express --save/npm i express -S (安装 express，同时将 "express": "^4.14.0" 写入 dependencies )

2. npm i express --save-dev/npm i express -D (安装 express，同时将 "express": "^4.14.0" 写入 devDependencies )

3. npm i express --save --save-exact (安装 express，同时将 "express": "4.14.0" 写入 dependencies )

简单的来说就是：

1. --save-dev 安装的 插件，被写入到 devDependencies（devDependencies  里面的插件只用于开发环境）对象里面去

2. --save 安装的 插件，则被写入到 dependencies（dependencies  是需要发布到生产环境的） 对象里面去

3. 加了 -dev 就是开发环境，不加则是生产环境

4. --save-exact 是将固定版本号写入 dependencies

建议线上的 Node.js 应用都采取这种锁定版本号的方式，因为你不可能保证第三方模块下个小版本是没有验证 bug 的，即使是很流行的模块。

运行以下命令：

```js

$ npm config set save-exact true

```

这样每次 ```npm i xxx --save``` 的时候会锁定依赖的版本号，相当于加了 --save-exact 参数。

> npm config set 命令将配置写到了 ~/.npmrc 文件，运行 npm config list 查看。


### npm shrinkwrap

之前说过要锁定依赖的版本，但这并不能完全防止意外情况的发生，因为锁定的只是最外一层的依赖，而里层依赖的模块的 package.json 有可能写的是 ```"mongoose": "*"```。为了彻底锁定依赖的版本，让你的应用在任何机器上安装的都是同样版本的模块（不管嵌套多少层），通过运行 ```npm shrinkwrap```，会在当前目录下产生一个 ```npm-shrinkwrap.json```，里面包含了通过 node_modules 计算出的模块的依赖树及版本。上面的截图也显示：只要目录下有 npm-shrinkwrap.json 则运行 npm install 的时候会优先使用 npm-shrinkwrap.json 进行安装，没有则使用 package.json 进行安装。

更多阅读：

1. https://docs.npmjs.com/cli/shrinkwrap

2. http://tech.meituan.com/npm-shrinkwrap.html

> 需要注意的是，如果 node_modules 下存在某个模块（如直接通过 ```npm install xxx``` 安装的）而 ```package.json``` 中没有，运行 ```npm shrinkwrap``` 则会报错。另外，```npm shrinkwrap``` 只会生成 ```dependencies``` 的依赖，不会生成 ```devDependencies``` 的。
<<<<<<< HEAD



## 3 初始化一个 Express 

### supervisor

使用 supervisor 来解决修改代码需要 结束/启动 服务，全局安装 supervisor：

```js
npm install -g supervisor
```

运行 supervisor --harmony index 启动程序，如下所示：

![image](https://github.com/nswbmw/N-blog/blob/master/book/img/3.1.2.png)

supervisor 会监听当前目录下 node 和 js 后缀的文件，当这些文件发生改动时，supervisor 会自动重启程序。


## 3.2 路由

默认的例子我们只是挂载了根路径的路由控制器，然后我们现在新增一个路径：

```js

app.get("/users/:name", function (req, res) {
    res.send("hello " + req.params.name)
})

```

当访问根路径时，依然返回之前设定好的 hello world，但是当访问如 localhost:3000/users/abc 路径时，返回 hello abc。

路径中 :name 起了占位符的作用，这个占位符的名字是 name，可以通过 req.params.name 取到实际的值。

> express 使用了 [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) 模块实现的路由匹配。

req 中包含了请求来的相关信息，res 则是用来返回该请求的响应，更多见 [express](http://expressjs.com/en/4x/api.html) 官方文档。

几个常用的 req 的属性：

* ```req.query```: 解析后的 url 中的 ```querystring```，如 ```?name=haha```，```req.query``` 的值为 ```{name: 'haha'}```

* ```req.params```: 解析 url 中的占位符，如 ```/:name```，访问 ```/haha```，```req.params``` 的值为 ```{name: 'haha'}```

* ```req.body```: 解析后请求体，需使用相关的模块，如 [body-parser](https://www.npmjs.com/package/body-parser)，请求体为 ```{"name": "haha"}```，则 ```req.body``` 为 ```{name: 'haha'}```


### express.Router

上面只是很简单的路由使用的例子（将所有路由控制函数都放到了 index.js），但在实际开发中通常有几十甚至上百的路由，都写在 index.js 既臃肿又不好维护，这时可以使用 express.Router 实现更优雅的路由解决方案。

创建空文件夹 routes，在 routes 目录下创建 index.js 和 users.js。最后代码如下：

```js

// index.js
var express = require('express');
var app = express();
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', userRouter);

app.listen(3000);



// routes/index.js
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('hello, express');
});

module.exports = router;



// routes/users.js
var express = require('express');
var router = express.Router();

router.get('/:name', function(req, res) {
  res.send('hello, ' + req.params.name);
});

module.exports = router;


```

我们将 ```/``` 和 ```/users/:name``` 的路由分别放到了 ```routes/index.js``` 和 ```routes/users.js``` 中，每个路由文件通过生成一个 ```express.Router``` 实例 ```router``` 并导出，通过 ```app.use``` 挂载到不同的路径。

更多 express.Router 的用法见 [express 官方文档](http://expressjs.com/en/4x/api.html#router)



## 3.3 模板引擎

### ejs

ejs 有 3 种常用标签：

1. ```<% code %>```：运行 JavaScript 代码，不输出

2. ```<%= code %>```：显示转义后的 HTML内容

3. ```<%- code %>```：显示原始 HTML 内容

> 注意：<%= code %> 和 <%- code %> 都可以是 JavaScript 表达式生成的字符串，当变量 code 为普通字符串时，两者没有区别。当 code 比如为 <h1>hello</h1> 这种字符串时，<%= code %> 会原样输出 <h1>hello</h1>，而 <%- code %> 则会显示 H1 大的 hello 字符串。

下面的例子解释了 <% code %> 的用法：

Data

```
supplies: ['mop', 'broom', 'duster']
```

Template
```
<ul>
<% for(var i=0; i<supplies.length; i++) {%>
   <li><%= supplies[i] %></li>
<% } %>
</ul>
```

Result
```
<ul>
  <li>mop</li>
  <li>broom</li>
  <li>duster</li>
</ul>
```

更多 ejs 的标签请看 [官方文档](https://www.npmjs.com/package/ejs#tags)


### includes

我们将原来的 ```users.ejs``` 拆成出了 ```header.ejs``` 和 ```footer.ejs```，并在 users.ejs 通过 ejs 内置的 include 方法引入，从而实现了跟以前一个模板文件相同的功能。

拆分模板组件通常有两个好处：

1. 模板可复用，减少重复代码

2. 主模板结构清晰

### 注意：要用 ```<%- include('header') %>``` 而不是 ```<%= include('header') %>```
=======
>>>>>>> origin/master
