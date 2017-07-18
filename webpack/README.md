记录一些 `webpack` 相关知识

----

## 基本操作

#### 单个文件打包

新建一个 `hello.js` 文件，然后使用 `webpack` 来打包

```js
// hello.js
function hello (str) {
    console.log(str)
}
```

然后运行 `webpack hello.js hello.bundle.js` 来进行打包，可以看到控制台输出类似的信息

```js
Hash: 6b369e952e4e764b98b8
Version: webpack 2.3.0
Time: 56ms
          Asset     Size  Chunks             Chunk Names
hello.bundle.js  2.47 kB       0  [emitted]  main
   [0] ./hello.js 0 bytes {0} [built]
```

* `Hash`，表示哈希值

* `Version`，表示 `webpack` 的版本

* `Time`，表示打包所花费的时间

* `Asset`，表示打包生成的文件

* `Size`，文件大小

* `Chunks`，本次打包文件的分块

* `Chunk Names`，表示本次打包的块名称


#### 多个文件打包

在新建一个 `world.js` 文件，使其呈引用状态

```js
// hello.js
require("./world.js")

function hello (str) {
    console.log(str)
}

// world.js
function world () {
    return {}
}
```

和上面一样的操作，最后可以看到生成结果

```js
// ...
hello.bundle.js  2.66 kB       0  [emitted]  main
   [0] ./hello.js 72 bytes {0} [built]
   [1] ./world.js 37 bytes {0} [built]
```