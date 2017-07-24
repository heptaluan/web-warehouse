`react` 是一个用于构建用户界面的 `JavaScript` 库，主要用于构建 `ui`，可以简单的认为 `react` 是 `MVC` 中的 `V`（视图）

## 特点

* 声明式设计 − `react` 采用声明范式，可以轻松描述应用

* 高效 − `react` 通过对 `DOM` 的模拟，最大限度地减少与 `DOM` 的交互

* 灵活 − `react` 可以与已知的库或框架很好地配合

* `JSX` − `JSX` 是 `JavaScript` 语法的扩展，建议使用它

* 组件 − 通过 `react` 构建组件，使得代码更加容易得到复用，能够很好的应用在大项目的开发中

* 单向响应的数据流 − `react` 实现了单向响应的数据流，从而减少了重复代码，这也是它为什么比传统数据绑定更简单

一个简单的示例

```
// ...

<script src="./react.min.js"></script>
<script src="./react-dom.min.js"></script>
<script src="./babel.min.js"></script>

// ...

<div id="box"></div>

<script type="text/babel">

    ReactDOM.render(
        <h1>hello world!</h1>,
        document.getElementById("box")
    )

</script>

// ...
```

几个注意点：

* 需要引入三个 `js` 文件

  * `react.min.js` - `react` 的核心库

  * `react-dom.min.js` - 提供与 `DOM` 相关的功能

  * `babel.min.js` - 将 `ES6` 代码转为 `ES5` 代码（`babel` 内嵌了对 `jsx` 的支持）

* 内嵌的 `script` 标签注意 `type` 格式为 `text/babel`