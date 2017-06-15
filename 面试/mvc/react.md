## ```React```

首先，传统意义上，```React``` 并不是一个 ```MVC``` 框架，只是一个用于构建组件化 ```UI``` 的库，是一个前端界面开发工具，顶多算是 ```MVC``` 中的 ```V```（```view```）

## 组件化而非模板

```React``` 构建 ```UI``` 是使用组件化的方式，而不是常见的模板，组件并不是一个新概念，它是某个独立功能或者界面的封装，达到复用或者 ```UI``` 和业务松耦合的目的

## 虚拟 DOM

在 ```JavaScript``` 中 ```DOM``` 操作是独立成为一个分支的，各浏览器在实现 ```DOM``` 操作库也是大同小异，都是在单独的模块中实现了 ```DOM``` 操作，由于各种技术上的原因，```DOM``` 操作的性能损耗相对于其他操作是很大的，在前端开发中都是需要特别尽量保持较小的 ```DOM``` 操作次数来提高性能

为了提高性能，```React``` 在操作页面交互时引入了虚拟 ```DOM``` 的概念，虚拟 ```DOM``` 是在 ```React``` 中用 ```JavaScript``` 重新实现的一个 ```DOM``` 模型，和原生的 ```DOM``` 并没有多少关系，只是借鉴了原生 ```DOM``` 的一些概念，虚拟 ```DOM``` 并没有完全实现 ```DOM```，只是保留了元素直接的层级关系和少量必要的属性，因为减少了不必要的复杂性，实践校验的结果是虚拟 ```DOM``` 的性能比原生 ```DOM``` 高很多

对比普通 ```DOM``` 和虚拟 ```DOM```

```js
// 普通 DOM
var a = document.createElement("a")

a.setAttribute("class", "link")
a.setAttribute("href", "www.a.com")

a.appendChild(document.createTextNode("React"))

//---------------------------------------------

// 虚拟 DOM
var a = React.createElement("a", {
    className: "link",
    href: "www.a.com"
}, "React")
```


可以看到 ```React``` 中使用了自己实现的 ```createElement``` 方法来生成元素 ```DOM``` 结构

在基于 ```React``` 开发中构建的 ```DOM``` 都是通过虚拟 ```DOM``` 进行的，在 ```React``` 的实际的使用中，需要根据不同的数据展现不同的 ```UI```，当数据变化时，```React``` 会重新构建整个 ```DOM``` 树，然后将当前的 ```DOM``` 树和之前的比较，得到 ```DOM``` 树的区别，然后仅仅把变化的部分反映到实际的浏览器 ```UI``` 更新上

```React``` 会在同一个事件循环内合同 ```DOM``` 的变化，只是会对比开始和结束的 ```DOM``` 变化，忽略中间过程的 ```DOM``` 变化，尽管每次数据变化都是重新构建 ```DOM``` 树，但虚拟 ```DOM``` 的操作性能极高，这样使用 ```React``` 时，开发者不在需要关心数据变化时页面上 ```DOM``` 元素的更新，而只是关心各个数据状态下页面实际展现的效果



## JSX

```JSX``` 是 ```React``` 的重要组成部分，他使用类似 ```XML``` 标记的方式来声明界面及关系，所以他只是一个文档规范

```js
var helloMsg = React.createClass({
    render: function () {
        return <div> hello {this.props.name} </div>
    }
});

React.render(<helloMsg name="abc" />, mountNode)
```

```JSX``` 只是简化了 ```React``` 的使用难度，但并不是必须的，在 ```React``` 中也可以不使用 ```JSX```，而是使用原生 ```JavaScript``` 的方式编写代码，在实际使用过程中也是把 ```JSX``` 转换成了 ```JavaScript``` 代码来运行的


## Flux

```Flux``` 是另外一个独立于 ```React``` 的架构，之所以说 ```Flux``` 是一个架构而不是框架或者类库，是因为 ```Flux``` 仅仅用于配合 ```React``` 框架来处理组件和数据之间的交互

简单来说 ```Flux``` 就是用于管理数据流，和其他 ```MVC``` 框架倡导的双向数据绑定不同，```Flux``` 使用了单向数据绑定的机制，即数据模型到视图的流动

![React](http://img2.tuicool.com/ZBRNFjr.png!web)

```Flux``` 中主要使用了三个概念：```Dispatcher```、```Action``` 和 ```Store```

这三个概念区别于 ```MVC``` 的 ```model```、```view``` 和 ```controller``` 概念，因为 ```MVC``` 中更多的是数据双向绑定

* ```Actions``` 是用于传递数据给 ```Dispatcher``` 的操作集合，```Action``` 可能来自于用户界面的操作，也可能是服务器端的数据更新

* ```Dispatcher``` 是一个全局的分发器，接受 ```Action```，并传递给注册的回调函数

* ```Stores``` 包含了应用的状态及注册到 ```Dispatcher``` 的回调函数，这些函数用于处理业务逻辑

和 ```React Views``` 最密切的是 ```Store```，```React view``` 从 ```Store``` 取得 ```state``` 和其他数据，并更新界面