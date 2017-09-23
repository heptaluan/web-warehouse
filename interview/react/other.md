* 在什么情况下你会优先选择使用 `Class Component` 而不是 `Functional Component`

* `Element` 与 `Component` 的区别

* `ajax` 请求应当放置于哪一个生命周期当中

* `shouldComponentUpdate` 的作用

* `props.children` 和 `props.children.map`

* `React` 中的事件处理逻辑

* `createElement` 与 `cloneElement` 的区别

* `setState` 函数的第二个参数的作用

----

### 在什么情况下你会优先选择使用 Class Component 而不是 Functional Component

在组件需要包含内部状态或者使用到生命周期函数的时候使用 `Class Component` ，否则使用函数式组件（纯展示组件）


----


### Element 与 Component 的区别

简单而言，`React Element` 是描述屏幕上所见内容的数据结构，是对于 `UI` 的对象表述

典型的 `React Element` 就是利用 `JSX` 构建的声明式代码片然后被转化为 `createElement` 的调用组合

```js
render(
    return <div id='login-btn'>Login</div>
)

// ==>

const element = React.createElement(
    'div',
    { id: 'login-btn' },
    'Login'
)
```

而 `React Component` 则是可以接收参数输入并且返回某个 `React Element` 的函数或者类


----


### ajax 请求应当放置于哪一个生命周期当中

组件的生命周期如下：

```js
// 实例化期（Mounting）
componentWillMount           // 组件挂载之前执行，只执行一次

componentDidMount            // 组件渲染完成，只执行一次

// 存在期间（Updating）
componentWillRecevieProps    // 组件将要接收新的 props 执行

shouldComponentUpdate        // 判断组件是否应该重新渲染，默认是 true（门神）

componentWillUpdate          // 组件将要重新渲染

componentDidUpdate           // 组件重新渲染完成

// 销毁期（Unmounting）
componentWillUnmount         // 卸载组件
```

所以我们应当将请求放到 `componentDidMount` 函数中执行，主要原因有下：

* `React` 下一代调和算法 `Fiber` 会通过开始或停止渲染的方式优化应用性能，其会影响到 `componentWillMount` 的触发次数

* 对于 `componentWillMount` 这个生命周期函数的调用次数会变得不确定，React 可能会多次频繁调用 `componentWillMount`

* 如果我们将 `ajax` 请求放到 `componentWillMount` 函数中，那么显而易见其会被触发多次，自然也就不是好的选择

* 如果我们将 `ajax` 请求放置在生命周期的其他函数中，我们并不能保证请求仅在组件挂载完毕后才会要求响应

* 如果我们的数据请求在组件挂载之前就完成，并且调用了 `setState` 函数将数据添加到组件状态中，对于未挂载的组件则会报错

* 而在 `componentDidMount` 函数中进行 `ajax` 请求则能有效避免这个问题


----



### shouldComponentUpdate 的作用

`shouldComponentUpdate` 允许我们手动地判断是否要进行组件更新，根据组件的应用场景设置函数的合理返回值能够帮我们避免不必要的更新（一般常说的门神）


----


### props.children 和 props.children.map

`props.children` 并不一定是数组类型，譬如下面这个元素

```js
<Parent>
    <h1>Welcome</h1>
</Parent>
```

如果我们使用 `props.children.map` 函数来遍历时会受到异常提示，因为在这种情况下 `props.children` 是对象（`object`）而不是数组（`array`）

`React` **当且仅当超过一个子元素的情况下**会将 `props.children` 设置为数组，就像下面这个代码片

```js
<Parent>
    <h1>hello</h1>
    <h2>world</h2>
</Parent>
```

这也就是我们优先选择使用 `React.children.map` 函数的原因，其已经将 `props.children` 不同类型的情况考虑在内了


----


### React 中的事件处理逻辑

为了解决跨浏览器兼容性问题，`React` 会将浏览器原生事件（`Browser Native Event`）封装为合成事件（`SyntheticEvent`）传入设置的事件处理器中

这里的合成事件提供了与原生事件相同的接口，不过它们屏蔽了底层浏览器的细节差异，保证了行为的一致性

另外 `React` 并没有直接将事件附着到子元素上，而是以单一事件监听器的方式将所有的事件发送到顶层进行处理

这样 `React` 在更新 `DOM` 的时候就不需要考虑如何去处理附着在 `DOM` 上的事件监听器，最终达到优化性能的目的


----


### createElement 与 cloneElement 的区别

`createElement` 函数是 `jsx` 编译之后使用的创建 `React Element` 的函数，而 `cloneElement` 则是用于复制某个元素并传入新的 `props`


----


### setState 函数的第二个参数的作用

该函数会在 `setState` 函数调用完成并且组件开始重渲染的时候被调用，我们可以用该函数来监听渲染是否完成

```js
this.setState({ 
    username: 'zhangsan' 
}, () => {
    console.log(`setState has finished and the component has re-rendered`)
})
```


