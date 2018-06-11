## Vue 的双向数据绑定原理是什么？

`vue.js` 是采用数据劫持结合发布者-订阅者模式的方式，通过 `Object.defineProperty()` 来劫持各个属性的 `setter`，`getter`，在数据变动时发布消息给订阅者，触发相应的监听回调

第一步，需要 `observe` 的数据对象进行递归遍历，包括子属性对象的属性，都加上 `setter` 和 `getter` 这样的话，给这个对象的某个值赋值，就会触发 `setter`，那么就能监听到了数据变化

第二步，`compile` 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图

第三步，`Watcher` 订阅者是 `Observer` 和 `Compile` 之间通信的桥梁，主要做的事情是:

* 1、在自身实例化时往属性订阅器（`dep`）里面添加自己

* 2、自身必须有一个 `update()` 方法

* 3、待属性变动 `dep.notice()` 通知时，能调用自身的 `update()` 方法，并触发 `Compile` 中绑定的回调，则功成身退

第四步，`MVVM` 作为数据绑定的入口，整合 `Observer`、`Compile` 和 `Watcher` 三者，通过 `Observer` 来监听自己的 `model` 数据变化，通过 `Compile` 来解析编译模板指令，最终利用 `Watcher` 搭起 `Observer` 和 `Compile` 之间的通信桥梁，所以最终便可以达到达到 `数据变化 -> 视图更新` 和 `视图交互变化（input） -> 数据 model 变更` 的双向绑定效果














## 数组替换

由于 `JavaScript` 的限制，`Vue` 不能检测以下变动的数组

* 当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`

* 当你修改数组的长度时，例如：`vm.items.length = newLength`

为了解决第一类问题，以下两种方式都可以实现和 `vm.items[indexOfItem] = newValue` 相同的效果，同时也将触发状态更新

```js
Vue.set(app.items, indexOfItem, newValue)
```

```js
app.items.splice(indexOfItem, 1, newValue)
```

为了解决第二类问题，可以使用 `splice`

```js
app.items.splice(newLength)
```













## 对象更改检测注意事项

由于 `JavaScript` 的限制，`Vue` 不能检测对象属性的添加或删除

```js
var vm = new Vue({
    data: {
        // vm.a 现在是响应的
        a: 1
    }
})

// vm.b 不是响应的
vm.b = 2;
```

对于已经创建的实例，`Vue` 不能动态添加根级别的响应式属性，但是可以使用 `Vue.set(object, key, value)` 方法向嵌套对象添加响应式属性

```js
var vm = new Vue({
    data: {
        userProfile: {
            name: 'zhangsan'
        }
    }
})

// 添加一个新的响应属性 age
Vue.set(vm.userProfile, 'age', 22)

// 也可以使用 vm.$set 实例方法
vm.$set(this.userProfile, 'age', 22)
```

有时可能需要为已有对象赋予多个新属性，比如使用 `Object.assign()` 或者 `_.extend()`

在这种情况下，应该用两个对象的属性创建一个新的对象

```js
// 不要像这样
Object.assign(this.userProfile, {
    age: 22,
    favoriteColor: 'Vue Green'
})

// 而是像这样
this.userProfile = Object.assign({}, this.userProfile, {
    age: 22,
    favoriteColor: 'Vue Green'
})
```















## 介绍一下 Vue 当中的 is 属性

当使用 `DOM` 作为模板时（例如，使用 `el` 选项来把 `Vue` 实例挂载到一个已有内容的元素上），你会受到 `HTML` 本身的一些限制，因为 `Vue` 只有在浏览器解析、规范化模板之后才能获取其内容

尤其要注意，像 `<ul>`、`<ol>`、`<table>`、`<select>` 这样的元素里允许包含的元素有限制，而另一些像 `<option>` 这样的元素只能出现在某些特定元素的内部

在自定义组件中使用这些受限制的元素时会导致一些问题，例如：

```js
<table>
  <my-row>...</my-row>
</table>
```

自定义组件 `<my-row>` 会被当作无效的内容，因此会导致错误的渲染结果，变通的方案是使用特殊的 `is` 特性

```js
<table>
  <tr is="my-row"></tr>
</table>
```

应当注意，如果使用来自以下来源之一的字符串模板，则没有这些限制：

* `<script type="text/x-template">`

* `JavaScript` 内联模板字符串

* `.vue` 组件

因此，请尽可能使用字符串模板













## methods 和 computed 的区别

不同的是计算属性是基于它们的依赖进行缓存的

计算属性只有在它的相关依赖发生改变时才会重新求值，这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数

相比而言，只要发生重新渲染，`method` 调用总会执行该函数

总之，重新计算开销很大的话请选计算属性，不希望有缓存的请选 `methods`











## $nextTick 的作用

`Vue` 实现响应式并不是数据发生变化之后 `DOM` 立即变化，而是按一定的策略进行 DOM 的更新

`$nextTick` 是在下次 `DOM` 更新循环结束之后执行延迟回调，在修改数据之后使用 `$nextTick`，则可以在回调中获取更新后的 `DOM`

有一点需要注意：`mounted` 回调里是无法直接通过 `this.$refs` 获取到用 `ref` 命名的子组件的，只有 `nextTick` 才能访问到

简单来说，可以理解为队列，算是真正意义上 `setTimeout(fn, 0)`












## 组件之间传参

#### 父组件向子组件传递数据

使用 `props`，父组件使用 `:bind` 语法，代码如下

```js
<Child :msg="msg"></Child>

// ----

export default {
  data() {
    return {
      msg: 'test-msg'
    }
  },
  component: {
    Child
  }
}
```

子组件通过 `props` 接收即可

```js
export default {
  props: ['msg']
}
```

#### 子组件向父组件传递数据

子组件通过 `$emit` 发送事件，代码如下

```js
<input v-model="msg" @change="changInput">

// ----

export default {
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    changeInput() {
      this.$emit('fromChild', this.msg)
    }
  }
}
```

父组件通过监听子组件 `emit` 的方法来达到数据接收的目的

```js
<Child @fromChild="getChildMsg"></Child>

// ----

export default {
  methods: {
    getChildMsg(msg) {
      console.log(msg)
    }
  }
}
```

#### EventBus

在数据不是很多的情况下可以使用 `EventBus` 来进行一个中转

```js
var bus = new Vue();

// 在组件 A 的 methods 方法中触发事件
bus.$emit('say-hello', 'world')

// 在组件 B 的 created 钩子函数中监听事件
bus.$on('say-hello', function (arg){}
```

#### 扩展：如果子组件需要修改 props 该怎么操作

有两种方式

* 把 `props` 赋值给一个局部变量，然后修改的话修改这个局部变量

* 在计算属性中对 `props` 进行处理




















## Vue 循环中的 key 的作用

可以用来管理可复用的元素，比如

```js
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```

上面的代码中切换 `loginType` 将不会清除已经输入的内容

因为两个模板使用了相同的元素，`<input>` 不会被替换掉——仅仅是替换了它的 `placeholder`

如果要解决这种问题，只需添加一个具有唯一值的 `key` 属性即可

```js
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```