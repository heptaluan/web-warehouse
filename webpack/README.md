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

```
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

```
hello.bundle.js  2.66 kB       0  [emitted]  main
   [0] ./hello.js 72 bytes {0} [built]
   [1] ./world.js 37 bytes {0} [built]
```


## 引入 css 文件

我们新建一个 `style.css` 文件然后尝试在 `hello.js` 当中来引用

```css
// style.css
* {margin: 0; padding: 0;}
```

然后尝试引入

```js
// hello.js
require("./world.js")
require("./style.css)

function hello (str) {
    console.log(str)
}
```

这时会看到控制台报错

```
You may need an appropriate loader to handle this file type.
```

这说明我们需要使用特定的 `loader` 来处理 `.css` 这种后缀文件，这时我们可以安装 `css-loader` 和 `style-loader` 来对 `css` 文件进行处理

```js
npm install css-loader style-loader --save-dev
```

安装完成以后，我们在引入 `css` 文件的时候，先调用对应的 `loader` 来处理

```js
require("./world.js")
require("css-loader!./style.css")

function hello (str) {
    console.log(str)
}
```

这个时候再去打包，就发现已经不会报错了

```
hello.bundle.js  5.23 kB       0  [emitted]  main
   [0] ./hello.js 107 bytes {0} [built]
   [1] ./world.js 37 bytes {0} [built]
   [2] ./node_modules/css-loader!./style.css 188 bytes {0} [built]
    + 1 hidden module
```