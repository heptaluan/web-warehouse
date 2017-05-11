```fs``` 模块是 ```node``` 平台提供的一个核心模块

如果要使用的话，需要先导入 ```fs``` 模块

```js
var fs = require("fs");
```

## 读写文件

读写文件一般会用到 ```fs.readFile```（```fs.readFileSync```） / ```fs.writeFile```（```fs.writeFileSync```） 方法

#### 写入文件

```js
fs.writeFile(文件路径, 需要写入的文件数据, 回调处理函数)
```

#### 读取文件

```js
fs.readFile(文件路径, [内容编码], 回调函数)
```

#### 以写入文件为例

写入文件是向一个指定的文件中写入数据，如果该文件不存在，则新创建一个，如果存在则新的内容会覆盖原有的文件内容

写入的文件数据可以是一个 ```string``` 也可以是一个原生 ```buffer```

```js
var fs = require("fs");

fs.writeFile("./1.txt", "hello world", function (err) {
    // 回调函数中的 err 表示一个错误对象
    // 当写文件完成的时候，回调函数会自动被调用
    // 如果有错误，err 就是一个错误对象
    // 如果没有错误，err 就是 null
    if (err) {
        console.log(err);
    }

    console.log("success!")
})
```

#### 追加文件

```js
fs.appendFile(filename, data, [options], callback)
```

将数据添加到一个文件的尾部，如果文件不存在，会新创建，如果文件已经存在，则追加


#### 检查文件是否存在

```js
fs.exists(path, callback)
```

检查指定路径的文件或者目录是否存在

一个简单的示例：

```js
fs.exists(filename, function (isExists) {
    if (!isExists) {
        fs.writeFile(filename, data, function (err) {
            // ...
        })
    } else {
        fs.appendFile(filename, data, function (err) {
            // ...
        })
    }
})
```

#### 删除一个文件

```js
fs.unlink(path, callback)
```

