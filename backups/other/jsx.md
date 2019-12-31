---
title: jsx
date: 2017-07-02
categories: React
tags: React
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/03.jpg
---

在 `jsx` 中，`html` 属性是受限制的

在 `html` 标签中使用非原始 `html` 支持的属性（但是可以添加 `data-` 前缀），是会被 `react` 所忽略的

`class` 关键字需要换成 `className`，事件绑定需要使用 `camelCase` 形式（比如 `onClick`）

<!--more-->




```js
var Info = React.createClass({
  render: function () {
    return <p className="user" me="me" name="myName">{this.props.name}</p>
  }
});
```


## setState 调用之后的异步

`setState` 实际上是一个异步方法，可带两个参数

```js
this.setState(
  {
    age: this.state.age + 1
  },
  function () {

  }
)
```

但是更好的做法是直接在第一个参数使用函数，如此便可以保证函数内部能取到正确的值

```js
this.setState(function (prevState, next) {
  return {
    age: this.state.age + 1
  }
})
```


## 组件的定义方式和绑定方式

定义方式常见的有三种

#### 函数式定义

使用函数的方式定义，特点是无状态，实际上它并没有被实例化，所以无法访问 `this` 对象，不能管理生命周期，一般用于纯展示组件

```js
// 函数组件接受一个属性参数，可直接获取
function Info(props) {
  return <p>{props.name}</p>
}

ReactDOM.render(<Info name="zhangsan" />, document.getElementById('box'));
```

#### React.createClass

之前比较流行的一种方式

```js
var Info = React.createClass({
  // 初始化 state
  getInitialState: function () {
    return {
      name: 'myName'
    };
  },
  render: function () {
    return <p>{this.state.name}</p>
  }
});
```

#### extends React.Component

`ES6` 的类形式

```js
class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || 'myName'
    };
  }

  showYear(e) {
    console.log(this)
    let elem = ReactDOM.findDOMNode(e.target);
  }

  render() {
    return <p onClick={this.showYear} data-year={this.props.year}>{this.state.name}</p>
  }
}

Info.defaultProps = {
  year: new Date().getFullYear()
};

ReactDOM.render(<Info />, document.getElementById('box'));
```

可以发现，初始化 `props` 与 `state` 的方式不一样

在 `React.createClass` 形式中是直接在函数中 `return` 的方式，而 `ES6` 形式的 `state` 是在构造函数中直接初始化 `this.state`，而 `props` 初始化则需要在外部进行

至于点击事件，在 `ES6` 的类形式中，可以发现上述中输出的 `this` 为 `null`，这时因为 `React` 并不会自动绑定函数方法的 `this` 对象，需要自行绑定（绑定方式见下面）



绑定方式常用的也有三种

#### 直接在构造函数中统一绑定

```js
constructor(props) {
  super(props);
  this.state = {
    name: this.props.name || 'myName'
  };

  this.showYear = this.showYear.bind(this);
}
```

#### 直接在 onClick 中绑定

```js
render() {
  return <p onClick={this.showYear.bind(this)} data-year={this.props.year}>{this.state.name}</p>
}
```

#### 在 onClick 绑定中使用回调函数调用

```js
// 这种方式需要手动传入 event 参数，而上述两种不需要
render() {
  return <p onClick={(e) => this.showYear(e)} data-year={this.props.year}>{this.state.name}</p>
}
```



## 组件的生命周期

如下：

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

需要注意的是：`Ajax` 请求一般放到 `componentDidMount` 函数中执行


## 受控组件与非受控组件

#### 非受控组件

非受控，即表单项的 `value` 不受 `React` 的控制，不设初始 `value` 值，我们可以随意更改

但不便于统一使用 `React` 进行管理，也不便于设置初始值


#### 受控组件

受控组件，是为了更好地管理表单项的值，但要注意的是，一旦设置了 `value`，将不能通过直接在表单项输入就能改变 `value` 值

因为 `value` 已经被 `React` 控制，要更新 `value` 值，就得更新相应的 `state` 状态值

对于受控组件，又有初始值和值两种之分

1. 初始值（`defaultValue`） -- 注：其实 `defaultValue` 应该是属于非受控组件的

`defaultValue` 指的是 `input`，`select`，`textarea` 等，相应的 `checkbox`，`radio` 是 `defaultChecked`

初始值只是初始的一个值，在第一次设置定义之后就不可改变

在实际开发中，数据的获取经常是异步的，大部分情况下会先初始设置 `input` 表单值为空，获取到数据后再放到 `input` 中

```js
class InputItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.inputValue || ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      inputValue: nextProps.inputValue
    });
  }

  inputChange(e) {
    let inputValue = e.target.value;

    console.log(inputValue);

    // this.setState({
    //   inputValue
    // });
  }

  render() {
    return <p><input type="input" onChange={this.inputChange.bind(this)} defaultValue={this.state.inputValue} /></p>
  }
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        inputValue: 'myValue'
      });
    }, 1000);
  }

  render() {
    return <InputItem inputValue={this.state.inputValue} />
  }
}

ReactDOM.render(<Page />, document.getElementById('box'));
```

初始在 `InputItem` 中设置了 `defaultValue` 为空，一段时间后获取到父 `Page` 传来的新值 `inputValue`，然而 `InputItem` 中的 `defaultValue` 并不会更新

这种情况，就不适用与 `defaultValue` 了，换成用状态控制的 `value` 即可

2. 值（`value`）

```js
render() {
  return <p><input type="input" onChange={this.inputChange.bind(this)} value={this.state.inputValue} /></p>
}
```

获取到异步的数据后，通过 `componentWillReceiveProps` 中更新状态值，加入 `onChange` 事件，在输入的时候更新状态值

3. 补充

对于 `onChange` 事件的调用更新 `state`，假如 `input` 项目太多，为每个 `input` 定义一个 `change` 回调并不实际

这时可以在 `bind` 中指定参数，指定是某个 `input` 项，或者直接在 `input` 项中添加属性区分，调用的时候再获取

```js
class InputItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.userName || '',
      age: this.props.age || ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      userName: nextProps.userName,
      age: nextProps.age
    });
  }

  inputChange(name, e) {
    this.setState({
      [name]: e.target.value
    });
  }

  // inputChange(e) {
  //   this.setState({
  //     [e.target.getAttribute('name')]: e.target.value
  //   });
  // }

  render() {
    return (
      <div>
        <p><input type="input" name="userName" 
          onChange={this.inputChange.bind(this, 'userName')} 
          value={this.state.userName} /></p>
        <p><input type="input" name="age" 
          onChange={this.inputChange.bind(this, 'age')} 
          value={this.state.age} /></p></div>
    )
  }
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      age: ''
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        userName: 'zhangsan',
        age: 10
      });
    }, 1000);
  }

  render() {
    return <InputItem userName={this.state.userName} age={this.state.age} />
  }
}

ReactDOM.render(<Page />, document.getElementById('box'));
```

默认情况下，如果 `bind` 中不填第二个参数，在回调中第一个参数就是触发的 `event` 对象

如果有第二个参数，回调中的第一个参数就是该参数，后续的参数才是触发的 `event` 对象

上述两个 `inputChange` 方法调用之后结果一样，这里也利用了 `ES6` 支持对象属性名为变量的新特性
