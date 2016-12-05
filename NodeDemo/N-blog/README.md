Node.js 笔记，参考 [N-blog](https://github.com/nswbmw/N-blog)

一些零散的笔记之类


### nrm

一款管理 npm 源的工具

```js

// 查看当前 nrm 内置的几个 npm 源
nrm ls

// 切换
nrm usr cnpm 


```

### mongodb 安装及相关问题

详细见：[mongodb 问题汇总](http://hanekaoru.com/mongodb-问题汇总/)



## 2.1 require

### [require](https://nodejs.org/api/modules.html) 是用来加载一个文件的代码

* require 可加载 .js、.json 和 .node 后缀的文件

* require 的过程是同步的，所以下面这样是错误的:

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
