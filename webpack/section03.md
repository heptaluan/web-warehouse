## entry

`entry` 一般就是我们所说的入口文件，有三种定义方式

#### 第一种方式

也就是前面使用的方式，即直接指定一个入口文件，这样所有的依赖文件都在一个入口中指定

```js
module.exports = {
    entry: "./src/js/main.js",
    // ...
}
```

### 第二种方式

第二种方式就是指定一个数组，这样是为了解决两个平行互相依赖的文件将其打包到一起

```js
module.exports = {
    entry: ["./src/js/a.js", "./src/js/b.js"],
    // ...
}
```

### 第三种方式

第三种方式一般用于多页面，内部设置可以为 `string` 也可以为数组，一般配合 `output` 来使用


## output

如果只指定单个出口文件的话，如下所示

```js
module.exports = {
    entry: {
        a: "./src/js/a.js",
        b: "./src/js/b.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist/js"),
        filename: "bundle.js"
    }
}
```

这样打包出来的文件也只会是单一的 `bundle.js`，这时就需要使用**占位符**，一般有三种

* `[name]`，表示 `chunk name`，即我们的 `entry` 入口文件中的 `key`（比较上面的 `a` 和 `b`）

* `[hash]`，使用 `hash` 值来命名生成的文件（我们每次打包的时候都会生成一个 `hash` 值）

* `[chunkhash]`，指每个 `chunk` 自己的 `hash` 值（和打包生成的 `hash` 值不一致，可以认为是文件的版本号或是 `MD5` 值，只有修改过的文件的 `hash` 值才会变化）

```js
var path = require("path");

module.exports = {
    entry: {
        a: "./src/script/a.js",
        b: "./src/script/b.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist/js"),
        // filename: "[name]-[hash].js"
        filename: "[chunkhash].js"
    }
}
```