受控组件与非受控组件

----

### 受控组件（Controlled Component）

代指那些交由 `React` 控制并且所有的表单数据统一存放的组件

譬如下面这段代码中 `username` 变量值并没有存放到 `DOM` 元素中，而是存放在组件状态数据中

任何时候我们需要改变 `username` 变量值时，应当调用 `setState` 函数进行修改

```js
class ControlledForm extends Component {

    state = {
        username: ''
    }

    updateUsername = (e) => {
        this.setState({
            username: e.target.value,
        })
    }

    handleSubmit = () => { }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='text' value={this.state.username} onChange={this.updateUsername} />
                <button type='submit'>Submit</button>
            </form>
        )
    }

}
```

### 非受控组件（Uncontrolled Component）

则是由 `DOM` 存放表单数据，并非存放在 `React` 组件中。我们可以使用 `refs` 来操控 `DOM` 元素

```js
class UnControlledForm extends Component {

    handleSubmit = () => {
        console.log("Input Value: ", this.input.value)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='text' ref={(input) => this.input = input} />
                <button type='submit'>Submit</button>
            </form>
        )
    }
    
}
```

从代码方面来看，非受控组件看上去更好实现，我们可以直接从 `DOM` 中抓取数据，而不需要添加额外的代码

不过实际开发中我们并不提倡使用非受控组件，因为实际情况下我们需要更多的考虑表单验证、选择性的开启或者关闭按钮点击、强制输入格式等功能支持

而此时我们将数据托管到 `React` 中有助于我们更好地以声明式的方式完成这些功能

引入 `React` 或者其他 `MVVM` 框架最初的原因就是为了将我们从繁重的直接操作 `DOM` 中解放出来