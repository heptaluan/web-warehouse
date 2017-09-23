根据生成的组件完成其相关类的定义

----

组件如下

```js
<Twitter username='zhangsan'>
    {(user) => user === null
        ? <Loading />
        : <Badge info={user} />}
</Twitter>
```

完成相关类的定义

```js
import React, { Component, PropTypes } from 'react'
import fetchUser from 'twitter'
// fetchUser take in a username returns a promise
// which will resolve with that username's data.
class Twitter extends Component {
    // finish this
}
```

最终完成效果如下，组件会接收某个函数作为其子组件，然后在渲染函数中以 `props.children` 进行调用

```js
import React, { Component, PropTypes } from 'react'
import fetchUser from 'twitter'

class Twitter extends Component {

    state = {
        user: null,
    }

    static propTypes = {
        username: PropTypes.string.isRequired,
    }

    componentDidMount() {
        fetchUser(this.props.username)
            .then((user) => this.setState({ user }))
    }

    render() {
        return this.props.children(this.state.user)
    }
    
}
```

这种模式的优势在于将父组件与子组件解耦和，父组件可以直接访问子组件的内部状态而不需要再通过 `props` 传递，这样父组件能够更为方便地控制子组件展示的 `UI` 界面

譬如将原本展示的 `Badge` 组件替换为 `Profile` 组件，我们只需要修改下回调函数即可：

```js
<Twitter username='zhangsan'>
    {(user) => user === null
        ? <Loading />
        : <Profile info={user} />}
</Twitter>
```