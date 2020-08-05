---
title: Vue 中的 Mixin
date: 2018-04-15
categories: Vue
tags: Vue
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/01.jpg
---

有一种很常见的情况：有两个非常相似的组件，他们的基本功能是一样的，但他们之间又存在着足够的差异性

<!--more-->

在这种情况下就可以选择使用 `Mixin`


## 示例

有两个不同的提示组件，它们的作用都是通过切换状态（`Boolean` 类型）来展示或者隐藏模态框或提示框

除了功能相似，没有其他共同点，看起来不一样，用法不一样，但是逻辑是一样的

```js
// 模态框
const Modal = {
  template: '#Modal',
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    toggleShow() {
      this.isShow = !this.isShow;
    }
  },
  components: {
    appChild: Child
  }
}

// 提示框
const Tooltip = {
  template: '#Tooltip',
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    toggleShow() {
      this.isShow = !this.isShow;
    }
  },
  components: {
    appChild: Child
  }
}
```

这里就可以使用 `Mixin` 来提取可以被重用的地方

```js
const toggle = {
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    toggleShow() {
      this.isShow = !this.isShow;
    }
  }
}

const Modal = {
  template: '#Modal',
  mixins: [toggle],
  components: {
    appChild: Child
  }
}

const Tooltip = {
  template: '#Tooltip',
  mixins: [toggle],
  components: {
    appChild: Child
  }
}
```

完整示例可以见 `Sarah Drasner` 提供的 [Mixin](https://codepen.io/sdras/pen/101a5d737b31591e5801c60b666013db/) 的例子

如果在项目当中使用的话，也是同样的操作

```js
// 引入 Child 和 Mixin
import Child from './Child'
import { toggle } from "./toggle"

export default {
  name: 'modal',
  mixins: [toggle],
  components: {
    appChild: Child
  }
}
```



## 埋点应用

一个比较通用的需求，在用户进入页面和离开页面的时候记录记录在当前页面的停留时间

使用 `Mixin`， 简化代码如下

```js
// mixin.js
let cache = null;

export default {
  methods: {
    sendEnterPage() {
      cache = this.$router
      console.log('enter page', cache)
    },
    sendLeavePage() {
      console.log('leave page', cache)
    }
  },
  mounted() {
    this.sendEnterPage()
  },
  destroyed() {
    this.sendLeavePage()
  }
}


// 使用
import sendPage from './mixin'

export default {
  data() {
    return { text: 'hello world' }
  },
  mixins: [sendPage],
  methods: {
    logic() {
      console.log('do the logic about hello page')
    }
  },
  mounted() {
    this.logic()
  }
}
```

使用局部的 `mixin` 可以发现，`mounted`，`destroyed` 等组件中的生命周期方法与 `mixin` 是合并的

而 `methods` 当中的方法则是覆盖的，具体是通过 [mergeOptions](https://github.com/vuejs/vue/blob/master/src/core/util/options.js) 方法实现的



