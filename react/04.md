主要介绍以下几个 `API`

## 状态设置（setState）

```js
setState(object nextState[, function callback])
```

* `nextState`，将要设置的新状态，该状态会和当前的 `state` 合并

* `callback`，可选参数，回调函数，该函数会在 `setState` 设置成功，**且组件重新渲染后**调用

合并 `nextState` 和当前 `state`，并重新渲染组件，`setState` 是 `React` 事件处理函数中和请求回调函数中触发 `UI` 更新的主要方法

一些需要注意的地方

* 不能在组件内部通过 `this.state` 修改状态，因为该状态会在调用 `setState()` 后被替换

* `setState()` 并不会立即改变 `this.state`，而是创建一个即将处理的 `state`，`setState()` 并不一定是同步的，为了提升性能 `React` 会批量执行 `state` 和 `DOM` 渲染

* `setState()` 总是会触发一次组件重绘，除非在 `shouldComponentUpdate()` 中实现了一些条件渲染逻辑

```js
var Hello = React.createClass({
    getInitialState () {
        return { count: 0 };
    },
    handleClick () {
        this.setState(function (state) {
            return { count: state.count + 1 };
        })
    },
    render () {
        return (
            <h2 onClick={this.handleClick}>当前点击次数为 ===> {this.state.count}</h2>
        )
    }
})

ReactDOM.render(
    <Hello />,
    document.getElementById("box")
)
```


## replaceState（状态替换）

```js
replaceState(object nextState[, function callback])
```

* `nextState`，将要设置的新状态，该状态会替换当前的 `state`

* `callback`，可选参数，回调函数，该函数会在 `replaceState` 设置成功，**且组件重新渲染后**调用

`replaceState()` 方法与 `setState()` 类似，但是方法只会保留 `nextState` 中状态，原 `state` 不在 `nextState` 中的状态都会被删除



## setProps（属性设置）

```js
setProps(object nextProps[, function callback])
```

* `nextProps`，将要设置的新属性，该状态会和当前的 `props` 合并

* `callback`，可选参数，回调函数，该函数会在 `setProps` 设置成功，且组件重新渲染后调用

一般用来设置组件属性，并重新渲染组件

几个需要注意的地方

* `props` 相当于组件的数据流，它总是会从父组件向下传递至所有的子组件中，当和一个外部的 `JavaScript` 应用集成时，我们可能会需要向组件传递数据或通知 `React.render()` 组件需要重新渲染，可以使用 `setProps()`

* 更新组件，可以在节点上再次调用 `React.render()` 方法，也可以通过 `setProps()` 方法来改变组件属性从而触发组件重新渲染


#### replaceProps（替换属性）

```js
replaceProps(object nextProps[, function callback])
```

* `nextProps`，将要设置的新属性，该属性会替换当前的 `props`

* `callback`，可选参数，回调函数，该函数会在 `replaceProps` 设置成功，且组件重新渲染后调用

`replaceProps()` 方法与 `setProps` 类似，但它会删除原有的 `props`


## forceUpdate（强制更新）

```js
forceUpdate([function callback])
```

* `callback`，可选参数，回调函数，该函数会在组件 `render()` 方法调用后调用

`forceUpdate()` 方法会使组件调用自身的 `render()` 方法重新渲染组件，组件的子组件也会调用自己的 `render()`，但是组件重新渲染时，依然会读取 `this.props` 和 `this.state`，如果状态没有改变，那么 `React` 只会更新 `DOM`

`forceUpdate()` 方法适用于 `this.props` 和 `this.state` 之外的组件重绘（如：修改了 `this.state` 后），通过该方法通知 `React` 需要调用 `render()`

应该尽量避免使用 `forceUpdate()`（而仅从 `this.props` 和 `this.state` 中读取状态并由 `React` 触发 `render()` 调用）

简单来说 `forceUpdate()` 就是重新 `render()`，而有些变量不在 `state` 上，但是又想达到这个变量更新的时候，刷新 `render`，或者 `state` 里的某个变量层次太深，更新的时候没有自动触发 `render`，这些时候都可以手动调用 `forceUpdate()` 自动触发 `render`

所以建议使用 `immutable` 来操作 `state`，`redux` 等 `flux` 架构来管理 `state`


## findDOMNode（获取 DOM 节点）

```js
// 返回 DOMElement
DOMElement findDOMNode()
```

如果组件已经挂载到 `DOM` 中，该方法返回对应的本地浏览器 `DOM` 元素，当 `render` 返回 `null` 或 `false` 时，`this.findDOMNode()` 也会返回 `null`

从 `DOM` 中读取值的时候，该方法很有用，如：获取表单字段的值和做一些 `DOM` 操作


## isMounted（判断组件的挂载状态）

```js
// 返回布尔值，表示是否挂载
bool isMounted()
```

`isMounted()` 方法用于判断组件是否已挂载到 `DOM` 中，可以使用该方法保证了 `setState()` 和 `forceUpdate()` 在异步场景下的调用不会出错



