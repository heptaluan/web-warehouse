---
title: React 基础
date: 2017-06-11
categories: React
tags: React
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/01.jpg
---

`react` 是一个用于构建用户界面的 `JavaScript` 库，主要用于构建 `ui`，可以简单的认为 `react` 是 `MVC` 中的 `V`（视图）

<!--more-->



`react` 的一些特点如下：

* 声明式设计 − `react` 采用声明范式，可以轻松描述应用

* 高效 − `react` 通过对 `DOM` 的模拟，最大限度地减少与 `DOM` 的交互

* 灵活 − `react` 可以与已知的库或框架很好地配合

* `JSX` − `JSX` 是 `JavaScript` 语法的扩展，建议使用它

* 组件 − 通过 `react` 构建组件，使得代码更加容易得到复用，能够很好的应用在大项目的开发中

* 单向响应的数据流 − `react` 实现了单向响应的数据流，从而减少了重复代码，这也是它为什么比传统数据绑定更简单


一个简单的示例

```js
// ...

<script src='./react.min.js'></script>
<script src='./react-dom.min.js'></script>
<script src='./babel.min.js'></script>

// ...

<div id='box'></div>

<script type='text/babel'>

  ReactDOM.render(
    <h1>hello world!</h1>,
    document.getElementById('box')
  )

</script>

// ...
```

几个需要注意的地方：

* 需要引入三个 `JavaScript` 文件

* `react.min.js` - `react` 的核心库

* `react-dom.min.js` - 提供与 `DOM` 相关的功能

* `babel.min.js` - 将 `ES6` 代码转为 `ES5` 代码（`babel` 内嵌了对 `jsx` 的支持）

* 内嵌的 `script` 标签注意 `type` 格式为 `text/babel`




## jsx

`jsx` 的一些特点：


* `react` 使用 `jsx` 来替代常规的 `JavaScript`

* `jsx` 执行更快，因为它在编译为 `JavaScript` 代码后进行了优化

* 它是类型安全的，在编译过程中就能发现错误

* 使用 `jsx` 编写模板更加简单快速


```js
ReactDOM.render(
  <div>
    <h2>hello</h2>
    <h2>world</h2>
  </div>,
  document.getElementById('box')
)
```

但是需要注意的是，`jsx` 当中可以嵌套多个 `html` 标签，但是最外层只能是一个标签，即需要包裹的元素（同 `vue` 类似）

```js
// 错误的例子
ReactDOM.render(
  <h2>hello</h2>,
  <h2>world</h2>,
  document.getElementById('box')
);

// 正确的例子
ReactDOM.render(
  <div>
    <h2>hello</h2>
    <h2>world</h2>
  </div>,
  document.getElementById('box')
);
```

其他一些需要注意的地方：

可以在 `jsx` 中使用 `JavaScript` 表达式，需要写在 `{}` 当中，比如

```js
ReactDOM.render(
  <div>
    <h2>{1 + 2}</h2>
  </div>,
  document.getElementById('box')
)
```

`jsx` 中不能使用 `if...else` 语句，但是可以使用三元运算符来替代，比如

```js
ReactDOM.render(
  <div>
    <h2>{x == 1 ? 'true' : 'false'}</h2>
  </div>,
  document.getElementById('box')
)
```

`react` 推荐使用内联样式，`react` 会在指定的元素数字后面自动加上 `px`，命名时使用驼峰命名法

```js
var style = {
  fontSize: 12,
  color: red
}

ReactDOM.render(
  <div style={style}></div>,
  document.getElementById('box')
)
```

`jsx` 也允许在模版中插入数组，数组会自动展开所有成员

```js
var arr = [
  <h2>hello</h2>,
  <h2>world</h2>
]

ReactDOM.render(
  <div>{arr}</div>,
  document.getElementById('box')
)
```

`jsx` 当作也允许添加注释，但是需要注意区别两点

* 在标签内部的注释需要放在 `{}` 当中

* 在标签外部的注释不能使用 `{}`

```js
ReactDOM.render(
  /* 这里也是注释 */
  <div>{/* 这里是注释 */}</div>,
  document.getElementById('box')
)
```

`jsx` 不仅可以渲染 `html` 标签，同时还可以渲染 `react` 组件，在 `jsx` 当中使用大小写来区分（注意标签最后需要闭合，即 `/`）

```js
// 渲染 html 标签
var divElement = <div className='foo' />;
ReactDOM.render(divElement, document.getElementById('box'));

// 渲染 react 组件
var Component = React.createClass({ /**/ })
var divElement = <Component flag={true} />;
ReactDOM.render(divElement, document.getElementById('box'));
```




## 组件

一个最基本的组件

```js
var HelloWorld = React.createClass({
  render: function () {
    return <h1>hello world!</h1>
  }
})

ReactDOM.render(
  <HelloWorld />,
  document.getElementById('box')
)
```

上例中的 `React.createClass` 方法用于生成一个组件类 `HelloWorld`，有几个需要注意的地方

原生 `html` 元素以小写字母开头，而自定义的 `React` 类名以大写字母

组件类只能包含一个顶层标签，否则也会报错

在渲染组件的时候，组件名称需要关闭，即 `< ... />` 中的 `/`


#### 参数传递

如果需要向组件传递参数，可以使用 `this.props` 对象

```js
var HelloWorld = React.createClass({
  render: function () {
    return <h1>{this.props.name}</h1>
  }
})

ReactDOM.render(
  <HelloWorld name='hello' />,
  document.getElementById('box')
)
```



#### 复合组件

也可以通过创建多个组件来合并成一个大组件

```js
var User = React.createClass({
  render() {
    return (
      <div>
        <Name name={this.props.name} />
        <Age age={this.props.age} />
      </div>
    )
  }
})

var Name = React.createClass({
  render() {
    return (
      <h1>{this.props.name}</h1>
    )
  }
})

var Age = React.createClass({
  render() {
    return (
      <h1>{this.props.age}</h1>
    )
  }
})

ReactDOM.render(
  <User name='zhangsan' age='20' />,
  document.getElementById('box')
)
```



#### 状态

`react` 把组件看成是一个状态机（`State Machines`），通过与用户的交互，实现不同状态，然后渲染 `UI`，让用户界面和数据保持一致

在 `react` 中，只需要更新组件的 `state`，然后就可以在不刷新 `DOM` 的前提下根据新的 `state` 重新渲染用户界面

```js
var LikeButton = React.createClass({
  getInitialState() {
    return { liked: false };
  },
  handleClick(event) {
    this.setState({ liked: !this.state.liked });
  },
  render() {
    var text = this.state.liked ? '是' : '否';
    return (
      <p onClick={this.handleClick}>
        点击切换状态 ==> ## {text}
      </p>
    );
  }
});
```




## State 和 Props 的区别

两者其实都是用于描述 `component` 状态的，并且这个状态应该是与显示相关的

两者的主要区别在于 `props` 是不可变的，而 `state` 可以根据与用户交互来改变，这就是为什么有些容器组件需要定义 `state` 来更新和修改数据，而子组件只能通过 `props` 来传递数据

`props` 是一个父组件传递给子组件的数据流，这个数据流可以一直传递到子孙组件，而 `state` 代表的是一个组件内部自身的状态（可以是父组件、子孙组件）


#### State

改变一个组件自身状态，从语义上来说，就是这个组件内部已经发生变化，有可能需要对此组件以及组件所包含的子孙组件进行重渲染

如果 `component` 的某些状态需要被改变，并且会影响到 `component` 的 `render`，那么这些状态就应该用 `state` 表示

例如：一个购物车的 `component`，会根据用户在购物车中添加的产品和产品数量，显示不同的价格，那么'总价'这个状态，就应该用 `state` 表示


#### Props

`props` 是父组件传递的参数，可以被用于显示内容，或者用于此组件自身状态的设置（部分 `props` 可以用来设置组件的 `state`），不仅仅是组件内部 `state` 改变才会导致重渲染，父组件传递的 `props` 发生变化，也会执行

如果 `component` 的某些状态由外部所决定，并且会影响到 `component` 的 `render`，那么这些状态就应该用 `props` 表示

例如：一个下拉菜单的 `component`，有哪些菜单项，是由这个 `component` 的使用者和使用场景决定的，那么'菜单项'这个状态，就应该用 `props` 表示，并且由外部传入


```js
// name 属性通过 this.props.name 来获取
var HelloWorld = React.createClass({
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
})

ReactDOM.render(
  <HelloWorld name='zhangsan' />,
  document.getElementById('box')
)
```



## 默认的 props

你可以通过 `getDefaultProps()` 方法为 `props` 设置默认值

```js
var HelloWorld = React.createClass({
  getDefaultProps() {
    return {
      name: 'zhangsan'
    }
  },
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
})

ReactDOM.render(
  <HelloWorld />,
  document.getElementById('box')
)
```



## State 和 Props 结合

我们可以在父组件中设置默认的 `state`，在子组件的 `render` 函数中通过 `props` 来接收父组件通过 `state` 传递过来的数据，然后来设置 `name` 和 `site` 的值

```js
var HelloWorld = React.createClass({
  getInitialState() {
    return {
      name: 'zhangsan',
      link: 'www.baidu.com'
    }
  },
  render() {
    return (
      <div>
        <User name={this.state.name} />
        <Link link={this.state.link} />
      </div>
    )
  }
})

var Name = React.createClass({
  render: function () {
    return (
      <h1>{this.props.name}</h1>
    );
  }
});

var Link = React.createClass({
  render: function () {
    return (
      <a href={this.props.site}>
        {this.props.site}
      </a>
    );
  }
});

ReactDOM.render(
  <HelloWorld />,
  document.getElementById('box')
)
```




## Props 验证

`Props` 可以使用 `propTypes` 来进行验证，它可以保证我们的应用组件被正确使用，`React.PropTypes` 提供很多验证器（`validator`）来验证传入数据是否有效

```js
React.createClass({
  propTypes: {
    // 可以声明 prop 为指定的 javaScript 基本数据类型，默认情况，这些数据是可选的
    optionalArray: React.PropTypes.array,
    optionalBool: React.PropTypes.bool,
    optionalFunc: React.PropTypes.func,
    optionalNumber: React.PropTypes.number,
    optionalObject: React.PropTypes.object,
    optionalString: React.PropTypes.string,

    // 可以被渲染的对象 numbers, strings, elements 或 array
    optionalNode: React.PropTypes.node,

    // React 元素
    optionalElement: React.PropTypes.element,

    // 用 javaScript 的 instanceof 操作符声明 prop 为类的实例
    optionalMessage: React.PropTypes.instanceOf(Message),

    // 用 enum 来限制 prop 只接受指定的值
    optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),

    // 可以是多个对象类型中的一个
    optionalUnion: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.instanceOf(Message)
    ]),

    // 指定类型组成的数组
    optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),

    // 指定类型的属性构成的对象
    optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),

    // 特定 shape 参数的对象
    optionalObjectWithShape: React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number
    }),

    // 任意类型加上 `isRequired` 来使 prop 不可空
    requiredFunc: React.PropTypes.func.isRequired,

    // 不可空的任意类型
    requiredAny: React.PropTypes.any.isRequired,

    // 自定义验证器，如果验证失败需要返回一个 Error 对象，不要直接使用 `console.warn` 或抛异常，因为这样 `oneOfType` 会失效
    customProp: function (props, propName, componentName) {
      if (!/matchme/.test(props[propName])) {
        return new Error('Validation failed!');
      }
    }
  },

  // ...
});
```


