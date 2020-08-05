---
title: React 中的路由
date: 2019-01-12
categories: React
tags: React
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/04.jpg
---

一个最基本的路由，通过 `URL` 判断进入哪个页面（组件部件）

<!--more-->


```jsx
class First extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <p>First</p>
  }
}

class Second extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <p>Second</p>
  }
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div></div>
  }
}

// ...

render((
  <Router history={hashHistory}>
    <Route path='/' component={App} />
    <Route path='first' component={First} />
    <Route path='second' component={Second} />
  </Router>
),
  document.getElementById('box')
);
```

首先，`Router` 是一个容器，`history` 属性定义了是用何种方式处理页面的 `URL`，常用的有三种方式

* `browserHistory`：通过 `URL` 的变化改变路由，比较推荐的一种方式

* `hashHistory`：通过 `#/`，其实就像是单页面应用中常见的 `hashbang` 方式，`example.com/#/path/path..`

* `createMemoryHistory`：`Memory history` 并不会从地址栏中操作或是读取，它能够帮助我们完成服务器端的渲染，我们得手动创建 `history` 对象




然后，在容器中使用 `Route` 组件定义各个路由，通过 `path` 指定路径（不区分大小写），通过 `component` 指定该路径使用的组件

也可以直接在 `Router` 容器上直接用 `routes` 属性定义各个路由，如

```js
let routes =
  <div>
    <Route path='/' component={App} />
    <Route path='first' component={First} />
    <Route path='second' component={Second} />
  </div>;

render(
  <Router routes={routes} history={hashHistory}></Router>,
  document.getElementById('box')
);
```

需要注意的是 `{routes}` 中只能有一个父级，所以这里加了 `<div>` 标签

另外，路由 `Route` 也可以嵌套，在上面的例子中，嵌套起来可能更符合实际情况

需要注意的是，这里的 `App` 在父级，为了获取子级的 `First` 与 `Second` 组件，需要在 `App` 组件中添加 `this.props.children` 获取

```js
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

render((
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <Route path='first' component={First} />
      <Route path='second' component={Second} />
    </Route>
  </Router>
),
  document.getElementById('box')
);
```

同样的，可以直接在 `Router` 中用 `routes` 属性定义路由

```js
let routes =
  <Route path='/' component={App}>
    <Route path='first' component={First} />
    <Route path='second' component={Second} />
  </Route>;

render(<Router routes={routes} history={hashHistory}></Router>, document.getElementById('box'));
```



## 其他组件

除了基本的 `Route` 之外，`IndexRoute`、`Redirect`、`IndexRedirect`、`Link`、`IndexLink` 等

* `IndexRoute`: 在主页面会用到，如上个例子中，在路径 `'/'` 下我们看到的是空白页面，可以添加默认的页面组件用于导航

* `Link`: 可以认为是 `<a>` 标签在 `React` 中的实现，使用 `to` 属性定义路径，还可以通过 `activeClass` 或 `activeStyle` 定义 `active` 的样式

* `IndexLink`: 类似 `Link`，推荐用来定义指向主页面的链接，当然也可以随意定义


```js
class First extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p>First<IndexLink to='/' activeStyle={{ color: 'red' }}>Basic</IndexLink></p>
    )
  }
}

class Second extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <p>Second</p>
  }
}

class Basic extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul role='nav'>
        <li><IndexLink to='/' activeStyle={{ color: 'red' }}>Basic</IndexLink></li>
        <li><Link to='/first' activeStyle={{ color: 'red' }}>First</Link></li>
        <li><Link to='/Second' activeClass='active'>Second</Link></li>
      </ul>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      {this.props.children}
    </div>
  }
}


render((
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Basic} />
      <Route path='first' component={First} />
      <Route path='second' component={Second} />
    </Route>
  </Router>
),
  document.getElementById('box')
);
```

* `Redirect`: 从 `from` 路径重定向到 `to` 路径

* `IndexRedirect`: 在主页面，直接重定向到 `to` 路径


```js
render((
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Basic} />
      <IndexRedirect to='first' />
      <Redirect from='second' to='first' />
      <Route path='first' component={First} />
      <Route path='second' component={Second} />
    </Route>
  </Router>
),
  document.getElementById('box')
);
```




## path 规则

`path` 定义的路由的路径，在 `hashHistory` 中，它的主页路径是 `#/`

自定义 `Route` 路由通过与父 `Route` 的 `path` 进行合并，在与主页路径合并，得到最终的路径

`path` 的语法如下

* `:paramName` 匹配 `URL` 的一个部分，直到遇到下一个 `/`、`?`、`#`

* `()` 表示 `URL` 的这个部分是可选的

* `*` 匹配任意字符（非贪婪模式），直到模式里面的下一个字符为止

* `**` 匹配任意字符（贪婪模式），直到下一个 `/`、`?`、`#`为止



```js
<Route path='/hello/:name'>     // 匹配 /hello/abc 和 /hello/def
<Route path='/hello(/:name)'>   // 匹配 /hello, /hello/abc, 和 /hello/def
<Route path='/files/*.*'>       // 匹配 /files/hello.jpg 和 /files/hello.html
<Route path='/**/*.jpg'>        // 匹配 /files/hello.jpg 和 /files/path/to/file.jpg
```

而 `:name` 可以通过 `this.props.params` 中取到

```js
class First extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p>First {this.props.params.name}
        <IndexLink to='/' activeStyle={{ color: 'red' }}>Basic</IndexLink>
      </p>
    )
  }
}

// ...

<Route path='/:name' component={First} />
```


## onEnter、onLeave 钩子

在路由的跳转中，我们可能需要在进入页面或离开页面的时候做一些特殊操作，`Route` 通过 `onEnter` 与 `onLeave` 定义了这两个行为

```js
<Route path='first' component={First} onEnter={(nextState, replace) => {
  console.log(nextState);
  alert('onEnter');
  // replace('second');
}} onLeave={() => {
  alert('onLeave');
}} />
```

如上，带两个参数，通过 `replace` 可以更新路径，把注释去掉后，进入 `'/first'` 时立马跳转值 `'/second'`，这在检测登录时应该比较有用



