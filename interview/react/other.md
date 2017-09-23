* 在什么情况下你会优先选择使用 `Class Component` 而不是 `Functional Component`

* `Element` 与 `Component` 的区别

----

### 在什么情况下你会优先选择使用 Class Component 而不是 Functional Component

在组件需要包含内部状态或者使用到生命周期函数的时候使用 `Class Component` ，否则使用函数式组件（纯展示组件）


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