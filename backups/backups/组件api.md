---
title: 组件 API
date: 2017-06-19
categories: React
tags: React
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/02.jpg
---

下面我们来看一下在 `React` 当中，提供了哪些组件相关的 `API`

<!--more-->

#### 状态设置（setState）

```js
setState(object nextState[, function callback])
```

* `nextState`，将要设置的新状态，该状态会和当前的 `state` 合并

* `callback`，可选参数，回调函数，该函数会在 `setState` 设置成功，且组件重新渲染后调用

合并 `nextState` 和当前 `state`，并重新渲染组件，`setState` 是 `React` 事件处理函数中和请求回调函数中触发 `UI` 更新的主要方法


一些需要注意的地方


* 不能在组件内部通过 `this.state` 修改状态，因为该状态会在调用 `setState()` 后被替换

* `setState()` 并不会立即改变 `this.state`，而是创建一个即将处理的 `state`，`setState()` 并不一定是同步的，为了提升性能 `React` 会批量执行 `state` 和 `DOM` 渲染

* `setState()` 总是会触发一次组件重绘，除非在 `shouldComponentUpdate()` 中实现了一些条件渲染逻辑



```js
var Hello = React.createClass({
  getInitialState() {
    return { count: 0 };
  },
  handleClick() {
    this.setState(function (state) {
      return { count: state.count + 1 };
    })
  },
  render() {
    return (
      <h2 onClick={this.handleClick}>当前点击次数为 ===> {this.state.count}</h2>
    )
  }
})

ReactDOM.render(
  <Hello />,
  document.getElementById('box')
)
```




#### replaceState（状态替换）

```js
replaceState(object nextState[, function callback])
```

* `nextState`，将要设置的新状态，该状态会替换当前的 `state`

* `callback`，可选参数，回调函数，该函数会在 `replaceState` 设置成功，且组件重新渲染后调用

`replaceState()` 方法与 `setState()` 类似，但是方法只会保留 `nextState` 中状态，原 `state` 不在 `nextState` 中的状态都会被删除





#### setProps（属性设置）

```js
setProps(object nextProps[, function callback])
```

* `nextProps`，将要设置的新属性，该状态会和当前的 `props` 合并

* `callback`，可选参数，回调函数，该函数会在 `setProps` 设置成功，且组件重新渲染后调用


`setProps` 一般用来设置组件属性，并重新渲染组件，下面是几个需要注意的地方

* `props` 相当于组件的数据流，它总是会从父组件向下传递至所有的子组件中，当和一个外部的 `JavaScript` 应用集成时，我们可能会需要向组件传递数据或通知 `React.render()` 组件需要重新渲染，可以使用 `setProps()`

* 更新组件，可以在节点上再次调用 `React.render()` 方法，也可以通过 `setProps()` 方法来改变组件属性从而触发组件重新渲染



#### replaceProps（替换属性）

```js
replaceProps(object nextProps[, function callback])
```

* `nextProps`，将要设置的新属性，该属性会替换当前的 `props`

* `callback`，可选参数，回调函数，该函数会在 `replaceProps` 设置成功，且组件重新渲染后调用

`replaceProps()` 方法与 `setProps` 类似，但它会删除原有的 `props`


#### forceUpdate（强制更新）

```js
forceUpdate([function callback])
```

* `callback`，可选参数，回调函数，该函数会在组件 `render()` 方法调用后调用


`forceUpdate()` 方法会使组件调用自身的 `render()` 方法重新渲染组件，组件的子组件也会调用自己的 `render()`，但是组件重新渲染时，依然会读取 `this.props` 和 `this.state`，如果状态没有改变，那么 `React` 只会更新 `DOM`

`forceUpdate()` 方法适用于 `this.props` 和 `this.state` 之外的组件重绘（如：修改了 `this.state` 后），通过该方法通知 `React` 需要调用 `render()`

应该尽量避免使用 `forceUpdate()`（而仅从 `this.props` 和 `this.state` 中读取状态并由 `React` 触发 `render()` 调用）

简单来说 `forceUpdate()` 就是重新 `render()`，而有些变量不在 `state` 上，但是又想达到这个变量更新的时候，刷新 `render`，或者 `state` 里的某个变量层次太深，更新的时候没有自动触发 `render`，这些时候都可以手动调用 `forceUpdate()` 自动触发 `render`

所以建议使用 `immutable` 来操作 `state`，`redux` 等 `flux` 架构来管理 `state`




#### findDOMNode（获取 DOM 节点）

```js
// 返回 DOMElement
DOMElement findDOMNode()
```

如果组件已经挂载到 `DOM` 中，该方法返回对应的本地浏览器 `DOM` 元素，当 `render` 返回 `null` 或 `false` 时，`this.findDOMNode()` 也会返回 `null`

从 `DOM` 中读取值的时候，该方法很有用，如：获取表单字段的值和做一些 `DOM` 操作


#### isMounted（判断组件的挂载状态）

```js
// 返回布尔值，表示是否挂载
bool isMounted()
```

`isMounted()` 方法用于判断组件是否已挂载到 `DOM` 中，可以使用该方法保证了 `setState()` 和 `forceUpdate()` 在异步场景下的调用不会出错








## 组件的生命周期

这里只做简单介绍，详细可参考 [官方文档](https://facebook.github.io/react/docs/react-component.html)

`React` 组件的生命周期大致可分成三个状态：

* `Mounting`，已插入真实 `DOM`

* `Updating`，正在被重新渲染

* `Unmounting`，已移出真实 `DOM`

生命周期的方法有：

* `componentWillMount`，在渲染前调用（在客户端也在服务端）

* `componentDidMount`，在第一次渲染后调用，只在客户端，之后组件已经生成了对应的 `DOM` 结构，可以通过 `this.getDOMNode()` 来进行访问，如果你想和其他 `JavaScript` 框架一起使用，可以在这个方法中调用 `setTimeout`，`setInterval` 或者发送 `Ajax` 请求等操作（防止异部操作阻塞 `UI`）

* `componentWillReceiveProps`，在组件接收到一个新的 `prop` 时被调用，这个方法在初始化 `render` 时不会被调用

* `shouldComponentUpdate`，返回一个布尔值，在组件接收到新的 `props` 或者 `state` 时被调用，在初始化时或者使用 `forceUpdate()` 时不被调用， 可以在你确认不需要更新组件时使用

* `componentWillUpdate`，在组件接收到新的 `props` 或者 `state` 但还没有 `render` 时被调用，在初始化时不会被调用

* `componentDidUpdate`，在组件完成更新后立即调用，在初始化时不会被调用

* `componentWillUnmount`，在组件从 `DOM` 中移除的时候立刻被调用

两个个简单的示例

示例一，在 `Hello` 组件加载以后，通过 `componentDidMount` 方法设置一个定时器，每隔 `100` 毫秒重新设置该组件的透明度，并重新渲染：

```js
var Hello = React.createClass({
  getInitialState() {
    return {
      opacity: 1.0
    };
  },

  componentDidMount() {
    this.timer = setInterval(() => {
      var opacity = this.state.opacity;
      opacity -= .05;
      if (opacity < 0.1) {
        opacity = 1.0;
      }
      this.setState({
        opacity: opacity
      });
    }, 100);
  },

  render() {
    return (
      <div style={{ opacity: this.state.opacity }}>Hello</div>
    );
  }
});

ReactDOM.render(
  <Hello name='world' />,
  document.getElementById('box')
);
```

示例二，初始化 `state`，`setNewnumber` 用于更新 `state`，所有生命周期在 `Content` 组件中

```js
var Button = React.createClass({
  getInitialState() {
    return {
      data: 0
    };
  },
  setNewNumber() {
    this.setState({ data: this.state.data + 1 })
  },
  render() {
    return (
      <div>
        <button onClick={this.setNewNumber}>Button</button>
        <Content myNumber={this.state.data}></Content>
      </div>
    );
  }
})

var Content = React.createClass({
  componentWillMount() {
    console.log('Component WILL MOUNT!')
  },
  componentDidMount() {
    console.log('Component DID MOUNT!')
  },
  componentWillReceiveProps(newProps) {
    console.log('Component WILL RECEIVE PROPS!')
  },
  shouldComponentUpdate(newProps, newState) {
    return true;
  },
  componentWillUpdate(nextProps, nextState) {
    console.log('Component WILL UPDATE!');
  },
  componentDidUpdate(prevProps, prevState) {
    console.log('Component DID UPDATE!')
  },
  componentWillUnmount() {
    console.log('Component WILL UNMOUNT!')
  },

  render() {
    return (
      <div>
        <h3>{this.props.myNumber}</h3>
      </div>
    );
  }
});

ReactDOM.render(
  <div>
    <Button />
  </div>,
  document.getElementById('box')
);
```






## ajax

`React` 组件的数据可以通过 `componentDidMount` 方法中的 `Ajax` 来获取，当从服务端获取数据库可以将数据存储在 `state` 中，再用 `this.setState` 方法重新渲染 `UI`

当使用异步加载数据时，在组件卸载前使用 `componentWillUnmount` 来取消未完成的请求

下面是一个利用 `jQuery` 实现的数据请求的简单示例

```js
var UserGist = React.createClass({
  getInitialState: function () {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function () {
    this.serverRequest = $.get(this.props.source, function (result) {
      var lastGist = result[0];
      this.setState({
        username: lastGist.owner.login,
        lastGistUrl: lastGist.html_url
      });
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.serverRequest.abort();
  },

  render: function () {
    return (
      <div>
        {this.state.username} 用户最新的 Gist 共享地址为：<a href={this.state.lastGistUrl}>{this.state.lastGistUrl}</a>
      </div>
    );
  }
});

ReactDOM.render(
  <UserGist source='https://api.github.com/users/octocat/gists' />,
  document.getElementById('example')
);
```


## 表单事件（数据双向绑定）

首先设置输入框 `input` 的默认值为 `value = {this.state.data}`，然后使用 `onChange` 事件来监听 `input` 的变化，在输入框值发生变化时可以动态更新 `state`

```js
var HelloMessage = React.createClass({
  getInitialState() {
    return { value: 'hello world' };
  },
  handleChange(event) {
    this.setState({ value: event.target.value });
  },
  render() {
    var value = this.state.value;
    return (
      <div>
        <input type='text' value={value} onChange={this.handleChange} />
        <h4>{value}</h4>
      </div>
    )
  }
});

ReactDOM.render(
  <HelloMessage />,
  document.getElementById('box')
);
```


## 子组件上数据绑定

在父组件通过创建事件句柄（`handleChange`） ，作为 `prop`（`updateStateProp`） 传递到子组件上，`onChange` 方法将触发 `state` 的更新并将更新的值传递到子组件的输入框的 `value` 上来重新渲染界面

```js
var Content = React.createClass({
  render() {
    return (
      <div>
        <input type='text' value={this.props.myDataProp} onChange={this.props.updateStateProp} />
        <h4>{this.props.myDataProp}</h4>
      </div>
    )
  }
})

var HelloMessage = React.createClass({
  getInitialState() {
    return { value: 'hello world' }
  },
  handleChange(event) {
    this.setState({ value: event.target.value })
  },
  render() {
    var value = this.state.value;
    return (
      <div>
        <Content myDataProp={value} updateStateProp={this.handleChange} />
      </div>
    )
  }
})

ReactDOM.render(
  <HelloMessage />,
  document.getElementById('example')
)
```


## 事件

一个简单的示例，通过 `onClick` 事件来修改数据

```js
var HelloMessage = React.createClass({
  getInitialState() {
    return { value: 'hello world' }
  },
  handleChange() {
    this.setState({ value: 'world hello' })
  },
  render() {
    var value = this.state.value;
    return (
      <div>
        <button onClick={this.handleChange}>点我</button>
        <h2>{value}</h2>
      </div>
    )
  }
})

ReactDOM.render(
  <HelloMessage />,
  document.getElementById('example')
)
```

当需要从子组件中更新父组件的 `state` 时，需要在父组件通过创建事件句柄（`handleChange`） ，并作为 `prop`（`updateStateProp`） 传递到你的子组件上，如下所示：

```js
var Content = React.createClass({
  render() {
    return (
      <div>
        <button onClick={this.props.updateStateProp}>点我</button>
        <h2>{this.props.myDataProp}</h2>
      </div>
    )
  }
})

var HelloMessage = React.createClass({
  getInitialState() {
    return { value: 'hello world' }
  },
  handleChange() {
    this.setState({ value: 'world hello' })
  },
  render() {
    var value = this.state.value;
    return (
      <div>
        <Content myDataProp={value} updateStateProp={this.handleChange} />
      </div>
    )
  }
})

ReactDOM.render(
  <HelloMessage />,
  document.getElementById('example')
)
```





## Refs

`React` 支持一种非常特殊的属性 `Ref` ，你可以用来绑定到 `render()` 输出的任何组件上

这个特殊的属性允许你引用 `render()` 返回的相应的支撑实例（`backing instance`），这样就可以确保在任何时间总是拿到正确的实例

比如绑定一个 `ref` 属性到 `render` 的返回值上

```js
<input ref='myInput' />
```

而在其它的代码中，可以通过 `this.refs` 来获取支撑实例:

```js
var input = this.refs.myInput;

var inputValue = input.value;

var inputRect = input.getBoundingClientRect();
```

一个完整的示例，通过使用 `this` 来获取当前 `React` 组件，或使用 `ref` 来获取组件的引用

```js
var MyComponent = React.createClass({
  handleClick() {
    this.refs.myInput.focus();
  },
  render() {
    return (
      <div>
        <input type='text' ref='myInput' /> &nbsp;&nbsp;&nbsp;
              <input type='button' value='点击获取焦点' onClick={this.handleClick} />
      </div>
    )
  }
})

ReactDOM.render(
  <MyComponent />,
  document.getElementById('example')
)
```

