





## React && Redux

最近打算从头开始梳理一下 `React` 和 `Redux` 的一些相关进阶知识点，也算是总结和复习一下，在这里记录一下

主要参考的是[官方文档](https://zh-hans.reactjs.org/)和一些网络资料，针对自己不太熟悉的地方，在这里做一下整理汇总

<!--more-->

## Redux、Flux 和 React-Redux

之前已经整理过 `Redux`、`Flux` 和 `React-Redux` 相关知识点，如下

[Flux](https://heptaluan.github.io/2019/02/22/React/05/)

[Redux](https://heptaluan.github.io/2019/03/13/React/06/)

[Redux 官方示例剖析](https://heptaluan.github.io/2019/03/14/React/07/)

[React-Redux](https://heptaluan.github.io/2019/03/25/React/08/)

[Redux、Flux 和 React-Redux 三者之间的区别](https://heptaluan.github.io/2019/04/02/React/09/)

[Redux 源码初探](https://heptaluan.github.io/2019/06/05/React/11/)


## Code Spliting

在 `16.6` 版本之前，`code-spliting` 通常是由第三方库来完成的，比如 [react-loadble](https://github.com/jamiebuilds/react-loadable)

在 `16.6` 版本中提供了 `Suspense` 和 `lazy` 这两个钩子, 因此在之后的版本中便可以使用其来实现 `Code Spliting`

`Code Spliting` 在 `React` 中的使用方法是在 `Suspense` 组件中使用 `<LazyComponent>` 组件

```jsx
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```



## 事件处理函数


#### 如何绑定？

可以使用 `onClick={ this.handleClick }` 用于绑定


#### 如何确保处理函数在组件实例作用域内？

第一种是在 `constructor` 中，通过 `this.handleClick = this.handleClick.bind(this)` 来绑定作用域

第二种可以使用箭头函数来声明处理函数 `handleClick = () => { ... }`

第三种就是在 `render` 中使用 `bind` 绑定，但是需要注意此方法会在每次组件渲染时创建一个新函数，而影响性能

```jsx
<button onClick={ this.handleClick.bind(this) }>Click Me</button>
```

最后一种就是在 `render` 中使用箭头函数，但是同第三种一样，也会影响性能

```jsx
<button onClick={ () => this.handleClick() }>Click Me</button>
```

#### 如何传参？

有两种方式，第一种就是使用箭头函数

```jsx
<button onClick={ () => this.handleClick(id) } />
```

另外一种方式可以通过 `data-*` 来进行属性传参

```jsx
<button data-id={ id } onClick={ this.handleClick } />
```

在 `handleClick` 中通过 `e.target.dataset.id` 拿取 `data-id` 的值




## jsx

`jsx` 本质上是 `React.createElement(component, props, ...children)` 方法提供的语法糖，比如以下代码

```js
<MyButton color="blue" size={2}>
  Click Me
</MyButton>
```

会被编译为

```js
React.createElement(
  MyButton,
  { color: 'blue', size: 2 },
  'Click Me'
)
```

在没有子元素的情况下，可以直接使用闭合标签

```js
<MyButton className="warn" />
```

这会被编译为：

```js
React.createElement(
  MyButton,
  { className: 'warn' },
  null
)
```


#### 在 jsx 类型中使用点语法

在 `jsx` 中，你也可以使用点语法来引用一个 `React` 组件，当你在一个模块中导出许多 `React` 组件时，这会非常方便

例如，如果 `MyComponents.DatePicker` 是一个组件，你可以在 `jsx` 中直接使用

```js
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```

但是这里有个需要注意的地方，比如下面这个示例

```js
import React from 'react'
import { PhotoStory, VideoStory } from './stories'
const components = {
  photo: PhotoStory,
  video: VideoStory
}
```

如果我们以下面的方式引用，是错误的，因为 `jsx` 标签名不能是一个表达式

```js
// 错误的使用方式
render(props) {
  return <components[props.storyType] story={ props.story } />
}
```

为了解决这个问题，可以事先保存变量

```js
render(props) {
  const Component = components[props.storyType]
  return <Component story={ props.story } />
}
```



## Portals

`Portal` 提供了一种将子节点渲染到存在于父组件以外的 `DOM` 节点的解决方案（也就是其他框架当中的插槽的概念）

```js
ReactDOM.createPortal(child, container)
```

第一个参数（`child`）是任何可渲染的 `React` 子元素，例如一个元素，字符串或 `fragment`

第二个参数（`container`）是一个 `DOM` 元素

通常来讲，当你从组件的 `render` 方法返回一个元素时，该元素将被挂载到 `DOM` 节点中离其最近的父节点

```js
render() {
  // React 挂载了一个新的 div，并且把子元素渲染其中
  return (
    <div>
      {this.props.children}
    </div>
  );
}
```

然而，有时候将子元素插入到 `DOM` 节点中的不同位置也是有好处的

```js
render() {
  // React 并没有创建一个新的 div，它只是把子元素渲染到 domNode 中
  // domNode 是一个可以在任何位置的有效 DOM 节点
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );
}
```

一个 `portal` 的典型用例是当父组件有 `overflow: hidden` 或 `z-index` 样式时，但你需要子组件能够在视觉上**跳出**其容器（例如对话框、悬浮卡以及提示框）






## Refs

`Refs` 是使用 `React.createRef()` 创建的，并通过 `ref` 属性附加到 `React` 元素

在构造组件时，通常将 `Refs` 分配给实例属性，以便可以在整个组件中引用它们

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

当 `ref` 被传递给 `render` 中的元素时，对该节点的引用可以在 `ref` 的 `current` 属性中被访问

```js
const node = this.myRef.current;
```

`ref` 的值根据节点的类型而有所不同，下面是一些需要注意的地方

* 在 `v16` 版本后，通过 `createRef()` 来生成 `ref` 并赋值给对应组件或 `DOM` 元素，之前是通过在元素上 `el => this.refName = el` 完成赋值

* 在 `v16` 版本后，通过 `this.refName.current` 来获取 `refName` 对应对应组件或 `DOM` 元素，之前是直接通过 `this.refName` 获取

* 当 `ref` 属性赋在 `DOM` 元素上时，`this.refName.current` 返回的就是 `DOM` 元素，当赋给 `React` 组件时，`this.refName.current` 返回的就是 `React` 组件

* 不能在函数式组件上使用 `ref` 属性，但可以在函数式组件内部的子组件中使用 `ref` 属性


#### 为 DOM 元素添加 ref

`React` 支持给任意组件添加特殊属性，而 `ref` 属性则接收一个回调函数

这个回调函数在组件加载或卸载时会立即执行，并且将底层的 `DOM` 元素作为参数传给回调函数

```js
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 我们通过 current 来访问 DOM 节点
    this.textInput.current.focus();
  }

  render() {
    // 告诉 React 我们想把 <input> ref 关联到
    // 构造器里创建的 textInput 上
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />

        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

`React` 会在组件挂载时给 `current` 属性传入 `DOM` 元素，并在组件卸载时传入 `null` 值

`ref` 会在 `componentDidMount` 或 `componentDidUpdate` 生命周期钩子触发前更新


#### 为 Class 组件添加 ref

如果我们想包装上面的 `CustomTextInput`，来模拟它挂载之后立即被点击的操作

我们可以使用 `ref` 来获取这个自定义的 `input` 组件并手动调用它的 `focusTextInput` 方法

```js
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
```

请注意，这仅在 `CustomTextInput` 声明为 `Class` 时才有效

```js
class CustomTextInput extends React.Component {
  // ...
}
```









#### 传递 refs

当父组件需要拿到子组件的 `ref` 时，在 `v16` 版本后可以通过 `React.forwardRef()` 实现，之前则是父组件给子组件传递一个回调作为属性，子组件则获取这个回调，绑定到 `ref` 上

即通过父组件向子组件传递 `ref` 属性，在子组件中获取到父组件赋值的 `ref` 值后，对应的赋给相应元素实现 `ref` 的传递

```js
// 通过 this.ref.current 可以直接获取到 button
const FancyButton = React.forwardRef((props, ref) => (
  <div>
    <h3>子组件</h3>
    <button ref={ref}>{props.children}</button>
  </div>
));

const ref = React.createRef();

<FancyButton ref={ref}>按钮</FancyButton>
```

比如下面这个在类组件中传递 `ref` 的示例

```js
// 父组件
this.childRef = React.createRef();
<Child ref={this.childRef} />

// 子组件
class Child extends React.Component {
  render() {
    const { forwardedRef, ...rest } = this.props;
    return (
      <div>
        <h3>这是子组件的另一个按钮</h3>
        <button ref={forwardedRef}>另一个按钮</button>
      </div>
    )
  }
}

export default React.forwardRef((props, ref) => (<Child forwardedRef={ref} />));
```

通过 `React.forwardRef()` 包裹组件用于传递父组件赋值的 `ref`

在类组件中，通过属性 `forwardedRef` 来获取父组件赋值的 `ref`，并赋给对应的元素或组件实例




## 生命周期

主要分为挂载，更新，卸载三个阶段，可以参考[生命周期图谱](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)作为速查表，如下

![](https://gitee.com/heptaluan/backups/raw/master/cdn/react/04.png)

#### 挂载

当组件实例被创建并插入 `DOM` 中时，其生命周期调用顺序如下

* [constructor()](https://zh-hans.reactjs.org/docs/react-component.html#constructor)

* [static getDerivedStateFromProps()](https://zh-hans.reactjs.org/docs/react-component.html#static-getderivedstatefromprops)

* [render()](https://zh-hans.reactjs.org/docs/react-component.html#render)

* [componentDidMount()](https://zh-hans.reactjs.org/docs/react-component.html#componentdidmount)

> 需要注意的是：`UNSAFE_componentWillMount()` 这个方法即将被移除


#### 更新

当组件的 `props` 或 `state` 发生变化时会触发更新，组件更新的生命周期调用顺序如下

* [static getDerivedStateFromProps()](https://zh-hans.reactjs.org/docs/react-component.html#static-getderivedstatefromprops)

* [shouldComponentUpdate()](https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate)

* [render()](https://zh-hans.reactjs.org/docs/react-component.html#render)

* [getSnapshotBeforeUpdate()](https://zh-hans.reactjs.org/docs/react-component.html#getsnapshotbeforeupdate)

* [componentDidUpdate()](https://zh-hans.reactjs.org/docs/react-component.html#componentdidupdate)

> 需要注意的是：`UNSAFE_componentWillUpdate()` 和 `UNSAFE_componentWillReceiveProps()` 这两个方法即将被移除


#### 卸载

当组件从 `DOM` 中移除时会调用如下方法

* [componentWillUnmount()](https://zh-hans.reactjs.org/docs/react-component.html#componentwillunmount)

## 使用 PropTypes 进行类型检查

> 自 `React v15.5` 起，`React.PropTypes` 已移入另一个包中，请使用 `prop-types` 库代替

`React` 有一些内置的类型检查功能，要检查组件的属性，需要配置特殊的 `propTypes` 属性

```jsx
import PropTypes from 'prop-types'

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    )
  }
}

Greeting.propTypes = {
  name: PropTypes.string
}
```

`PropTypes` 包含一整套验证器，可用于确保你接收的数据是有效的

在上面示例当中，我们使用了 `PropTypes.string`，当你给属性传递了无效值时，`JavsScript` 控制台将会打印警告

出于性能原因，`propTypes` 只在开发模式下进行检查



## Fragments

`React` 中经常会有一个组件返回多个元素的场景，但是又有**只能有一个根组件**的限定

通常的做法则是使用 `<div>` 进行包裹，但是这样子会在 `DOM` 中增加额外的节点

那么 `Fragment` 就是为了解决这一问题的方案

```jsx
import { Component, Fragment } from 'react';

class Columns extends Component {
  render() {
    return (
      <Fragment>
        <p>Hello</p>
        <p>World</p>
      </Fragment>
    );
  }
}
```

之所以需要有这种特性，是因为通常情况下 `<div>` 包裹不会有什么问题，但对于 `table` 渲染而言

```js
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr><Columns /></tr>
      </table>
    )
  }
}

class Columns extends React.Component {
  render() {
    return (
      <div>
        <td>Hello</td>
        <td>World</td>
      </div>
    )
  }
}
```

这种情况下，最终渲染会得到

```html
<table>
  <tr>
    <div>
      <td>Hello</td>
      <td>World</td>
    </div>
  </tr>
</table>
```

最终的 `HTML` 元素则是无效的，`Fragment` 还可以使用一种更简短的语法来声明

也可以理解为简写方式

```jsx
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}
```

事实上，`<></>` 是 `<React.Fragment>` 的语法糖，我们也可以这么写

```js
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    )
  }
}
```

应该注意的是，`<></>` 不能接受任何 `key` 或者属性

比如在循环当中需要使用 `key`，请用 `<React.Fragment>`，它可以接受且目前也只能接收 `key` 这一属性



## 高阶组件

关于高阶组件的用法有许多，这里只做简单介绍，详细内容可能会另起篇章来进行介绍

高阶组件（`HOC-Higher-Order-Components`）是 `React` 中用于重用组件逻辑的高级技术

高阶组件是一个函数，能够接受一个组件并返回一个新的组件，简单来说就是高阶组件将一个组价转化（包装）成另外一个组件

在第三方组件库中，`HOC` 非常常见，如例如 `Redux` 的 [connect](https://github.com/reduxjs/react-redux/blob/master/src/connect/connect.js) 和 [createFragmentContainer](https://relay.dev/docs/en/fragment-container.html)

需要注意，高级组件是纯函数，没有副作用

```js
// 创建一个高阶组件，使每个组件在更新时，打印其新旧 props 的值
export default function logProps(WrappedComponent) {
  return class extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props', preProps);
      console.log('new props', this.props)
    }
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

// 使用
import logProps from './hocWrapper';

class More extends React.Component {
  // ...
}

export default logProps(More)
```

如上，每当传入 `More` 组件的 `props` 发生变化时，都会打印其 `prop` 修改状况

下面是一些在使用过程中需要注意的地方

* 不要改变原始组件原型，推荐用容器组件组合包裹组件且不修改包裹组件

* 不要在 `render()` 函数中使用高阶组件，因为每次调用 `render()` 函数都会创建一个新的高阶组件，这将导致子树每次渲染都会进行卸载，和重新挂载的操作

* `Refs` 不会被传递，若向一个高阶组件赋值 `ref`，那么通过这个 `ref` 拿到的是最外层的窗口组件（可以使用 `React.forwardRef` 来解决这个问题）

* 高阶组件的静态方法需要手动从原组件进行复制，即 `HOCComponet.staticMethod = WrappedComponent.staticMethod`


## 阻止组件渲染

有时候我们希望是整个组件都不渲染，而不仅仅是局部不渲染

那么这种情况下，我们就可以在 `render()` 函数里返回一个 `null`，来实现我们想要的效果

如下示例

```js
// 定义如下
function LogBtn(props) {
  const isLogined = props.isLogined;
  const isShow = props.isShow;
  if (isShow) {
    return (
      <div>You can
        <button>{isLogined ? '退出' : '登陆'}</button>
      </div>
    )
  }
  return null;
}

// 使用如下
<LogBtn isLogined={false} />
```

> 但是有一个需要注意的地方，当组件里返回 `null` 不会影响组件生命周期的触发
>
> 即 `componentWillUpdate` 和 `componentDidUpdate` 仍然会被调用




## React 中的表单