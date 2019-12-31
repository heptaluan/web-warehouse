---
title: Vue 中一些容易忽视的知识点
date: 2018-04-11
categories: Vue
tags: Vue
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/01.jpg
---

主要记录一些在使用 `Vue` 开发过程中容易忽视的知识点

<!--more-->

## 用 key 管理可复用的元素

比如

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

因为两个模板使用了相同的元素，`input` 不会被替换掉——仅仅是替换了它的 `placeholder`

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


## 替换数组

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



## 特殊的 is 特性

当使用 `DOM` 作为模板时（例如，使用 `el` 选项来把 `Vue` 实例挂载到一个已有内容的元素上），你会受到 `HTML` 本身的一些限制

因为 `Vue` 只有在浏览器解析、规范化模板之后才能获取其内容

尤其要注意，像 `ul`、`ol`、`table`、`select` 这样的元素里允许包含的元素有限制，而另一些像 `option` 这样的元素只能出现在某些特定元素的内部

在自定义组件中使用这些受限制的元素时会导致一些问题，例如：

```js
<table>
  <my-row>...</my-row>
</table>
```

自定义组件 `my-row` 会被当作无效的内容，因此会导致错误的渲染结果，变通的方案是使用特殊的 `is` 特性

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

