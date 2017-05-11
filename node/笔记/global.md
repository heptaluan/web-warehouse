关于 ```__dirname``` 与 ```__filename```

```__dirname```：返回当前模块文件所在目录解析后的绝对路径，该路径也不是全局的，而是模块作用域下的（文件夹）

```__filename```：返回当前模块文件解析后的绝对路径，该路径其实也并非全局的，而是模块作用域下的（文件）


----

## process 对象

process 对象是一个全局对象，可以在任何地方都能访问它，通过这个对象提供的属性和方法，使我们可以对当前运行的程序的进程进行访问和控制

常用的有以下几个方法：

* argv 一组包含命令行参数的数组（Array）

第一个元素会是 node，第二个元素将是 .js 文件的名称，第三个的元素依次是命令行传入的参数

```js
process.argv.forEach(function (val, index, array) {
    console.log(index + ": " + val)
})
```

* execPath 开启当前进程的绝对路径

* env 返回用户环境信息

比较重要的是下面两个

* stdin 标准输入流

* stdout 标准输出流

stdin 和 stdout 提供了操作输入数据和输出数据的方法，通常也被称为 IO 操作

#### stdout

一个指向 标准输出流（stdout）的 可写流（Writable Stream）

比如可以利用 stdout 来实现 console.log：

```js
function consoleLog (d) {
    process.stdout.write(d);
}
```

process.stderr 和 process.stdout 不像 Node 中其他的流（Streams）那样，他们通常是阻塞式的写入

当其他引用指向 普通文件 或者 TTY文件描述符 时，他们就是阻塞的（注：TTY 可以理解为终端的一种，可联想 PuTTY）

当他们引用指向管道（pipe）时，他们就同其他的流（Streams）一样是非阻塞的

要检查 Node 是否正在运行一个 TTY上下文 中（注：linux 中没有运行在 tty 下的进程是 守护进程），可以使用 process.stderr，process.stdout 或 process.stdin 的 isTTY 属性：

```js
$ node -p "Boolean(process.stdout.isTTY)"  // true
```

#### stdin

一个指向 标准输入流（stdin） 的 可读流（Readable Stream）

标准输入流默认是暂停（pause）的，所以必须要调用 process.stdin.resume() 来恢复（resume）接收

下面是一个标准输入流，并监听两个事件的示例：

```js
process.stdin.on("end", function () {
    process.stdout.write("end")
})

// get 函数的简单实现
function gts (callback) {

    // 恢复
    process.stdin.resume();
    process.stdin.setEncoding("utf8")

    process.stdin.on("data", function (chunk) {
        process.stdin.pause();
        callback(chunk);
    })

}

gets(function (result) {
    console.log(`${result}`)
})
```

一个监听用户输入的示例：

```js
var a, b;

process.stdout.write("请输入a的值：");

process.stdin.on("data", function (chunk) {
    if (!a) {
        a = Number(chunk);
        process.stdout.write("请输入b的值")
    } else {
        b = Number(chunk);
        process.stdout.write("结果为：" + (a + b))
    }

})
```