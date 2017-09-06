## 配置文件

`webpack` 默认的配置文件为 `webpack.config.js`（可以使用 `--config` 来指定别的文件）

```js
var path = require("path");

module.exports = {
    entry: "./src/script/main.js",
    output: {
        path: path.resolve(__dirname, "./dist/js"),
        filename: "bundle.js"
    }
}
```

* 在 `webpack 1.x` 版本中可以直接使用设置 `path: "./dist/js"`

* 但是在 `webpack 2.x` 版本以后，需要引入 `path` 模块来设置为绝对路径，否则会报错（`xxx is not an absolute path!`）

* `entry`，表示打包文件的入口，即从哪个文件开始

* `output`，出口目录，指明打包后的文件放在哪里

* `path`，设置目录

* `filename`，设置打包后的文件名

* 如果配置文件默认的名称不是 `webpack.config.js`，这时可以使用 `webpack --config webpack.xxx.js` 即可


## 配合 npm 脚本使用

在生成的 `package.json` 文件中，有一个 `scripts` 属性，可以利用它来配合 `webpack` 参数一起使用，比如

```js
// ...

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "webpack": "webpack --config webpack.config.js --progress --display-modules --colors --display-reasons"
},

// ...
```

这时，只需要运行 `npm run webpack` 即可

