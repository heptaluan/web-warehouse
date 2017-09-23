`React` 中 `refs` 的作用

----

`Refs` 是 `React` 提供给我们的安全访问 `DOM` 元素或者某个组件实例的句柄（类似与 `id` 属性，可以直接获取到 `DOM` 元素）

我们可以为元素添加 `ref` 属性然后在回调函数中接受该元素在 `DOM` 树中的句柄，该值会作为回调函数的第一个参数返回：

```js
var App = React.createClass({

    getInitialState: function () {
        return { userInput: '' };
    },

    handleChange: function (e) {
        this.setState({ userInput: e.target.value });
    },

    clearAndFocusInput: function () {
        this.setState({ userInput: '' }, function () {
            React.findDOMNode(this.refs.theInput).focus();
        });
    },

    render: function () {
        return (
            <div>
                <div onClick={this.clearAndFocusInput}>
                    Click to Focus and Reset
                </div>
                <input ref="theInput" value={this.state.userInput} onChange={this.handleChange} />
            </div>
        );
    }
});
```

在这个例子中，`render` 函数返回 `<input />` 实例的描述，但真正的实例是通过 `this.refs.theInput` 访问的

只要带有 `ref = "theInput"` 的子组件从 `render` 返回，`this.refs.theInput` 就会访问适当的实例

需要注意的是，向一个特定的子实例发送消息，`Refs` 是一个很好的方式，但是通过流动式接收 `props` 和 `state` 的方式是更为可靠的

对于你的应用程序中的流动数据来说，`refs` 不应该是首选（慎用）