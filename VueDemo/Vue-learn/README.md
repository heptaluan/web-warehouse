Vue.js 

所有例子都基于 2.0 版本实现

## 概述

是一个构建数据驱动的 web 界面库，目标是通过尽可能的简单的 API 实现**响应的数据绑定和组合的视图组件**

核心是一个响应的数据绑定系统，它让数据与 DOM 保持同步。


## 实例

### 构造器

是用来设定对象的 property 或者调用 method，用来使对象能正常运作

### 实例

是构造器 new 出来的 对象

### 构造器观念

在实例化 Vue 的时候，需要传入一个**选项对象**，它可以包含数据、模板、挂载元素、方法、生命周期钩子等选项。

可以扩展 Vue 构造器，从而用预定义选项创建可复用的**组件构造器**

```js

var myComponent = Vue.extend({
    // do somethig
})

// 所有的 myComponent 实例都将以预定义的扩展选项被创建
var myComponentInstance = new myComponent()

```

尽管可以命令式的创建扩展实例，不过在多数情况下将组建构造器注册为一个自定义元素，然后声明式的用在模板中

### vm.$mount( [elementOrSelector] )

如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用vm.$mount() 手动地挂载一个未挂载的实例。

### vm.$destroy()

完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。

**注意**：在大多数场景中你不应该调用这个方法。最好使用 v-if 和 v-for 指令以数据驱动的方式控制子组件的生命周期。



### 属性与方法

每个 Vue 实例都会代理其 data 对象里所有的属性：

```js

var data = {a: 1}

var vm = new Vue({
    data: data
})

vm.a === data.a // true

// 设置属性也会影响到原始数据
vm.a = 2;
data.a; // 2

// 反之亦然
data.a = 3;
vm.a; // 3

```

需要注意的是，这些被代理的属性是响应的，但是如果在实例创建之后添加新的属性到实例上，它将不会触发视图更新


### 属性方法中的 $

除了数据属性，Vue 实例暴露了一些有用的实例属性与方法，这些属性与方法都有前缀 $，以便与代理的数据属性区别

```js

var data = {a: 1}

var vm = new Vue({
    el: "#app",
    data: data
})

vm.$data === data; // true

vm.$el === document.getElementById("app"); // true

// $watch 是一个实例方法
vm.$watch("a", function (newVal, oldVal) {
    // 这个回调将在 "vm.a" 改变后调用
})

```


### 实例的生命周期

Vue 实例在创建的时候有一系列初始化步骤，比如需要建立数据观察，编译模板，创建必要的数据绑定。在这个过程中，也将提供一些生命周期钩子，给自定义逻辑提供运行的机会

```js

var vm = new Vue({
    data: {
        a: 1
    },
    created: function () {
        // this 指向 vm 的实例
        console.log("a is:" + this.a)
    }
})


```

钩子的 this 指向调用它的 Vue 实例，需要注意，在 Vue 中**没有控制器**的概念（MVC中的controller）


## 数据绑定

Vue 的模板是基于 DOM 实现的，这意味着所有的 Vue.js 目标都是可以解析的有效的 HTML 且通过一些特殊的特性做了增强

Vue 模板因而从根本上不同于基本字符串模板

### 插值-文本

数据绑定的最基本形式是文本插值，使用"Mustache"（{{ 双大括号 }}）

```html

<span>Message is : {{ msg }}</span>

```

Mustache 标签会被相应数据对象的 msg 属性的值替换，每当这个属性变化的时候它也会随着更新

也可以使用 **v-once** 只处理单次插值，今后的数据变化不会引起插值更新


### 插值-原始的html

{{}} 标签将会解析为纯文本而不是 html，为了输出 html 字符，需要使用 v-html="html"

```js

<div v-html="raw_html"></div>

```

### 表达式

Vue.js 在数据绑定内支持全功能的 JsvaScript 表达式

```js

{{ number + 1 }}

{{ ok ? "YES" : "NO" }}

{{ message.split("").reverse().join("") }}

```

但是有所限制，比如只能包含单个表达式，语句是无效的，流程控制也是不行的，但是可以改用三元表达式


### 过滤器

尽管插入文本内部的过滤器依然有效，所有内置过滤器已经移除了，比如（capitalize等）。取代的是，推荐在每个区域使用更专业的库来解决。

Vue 2.x 中，过滤器只能在 mustache 绑定中使用。为了在指令绑定中实现同样的行为，你应该使用计算属性。

过滤器函数总接受表达式的值作为第一个参数。

```js

// ...

{{ message | capitalize }}

// ...

filters: {
    capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
    }
}

```

过滤器是 JavaScript 函数，因此可以接受参数：

```js
{{ message | filterA('arg1', arg2) }}
```

这里，字符串 'arg1' 将传给过滤器作为第二个参数， arg2 表达式的值将被求值然后传给过滤器作为第三个参数。


## 计算属性

在模板中表达式非常便利，但是放入太多的逻辑会让模板过重而且难以维护，如果需要多于一个表达式的逻辑，应当使用计算属性。

我们声明了一个计算属性 b，我们提供的函数将用作属性 vm.b 的 getter

```js

console.log(vm.b) // 2
vm.a = 2;

console.log(vm.b) // 3

```
你可以打开浏览器的控制台，修改实例中的 vm，vm.b的值始终取决于 vm.a 的值

你可以像绑定普通属性一样在模板中绑定计算属性，Vue知道 vm.b 依赖于 vm.a，因此，当 vm.a 发生改变的时候，依赖于 vm.b 的绑定也会更新，而且最妙的是我们是声明的创建这种依赖关系：计算属性的 getter 是干净无副作用的


### $watch

Vue.js 提供了一个方法 $watch，它用于观察 Vue 实例上的数据变动，当一些数据需要根据其他数据变化的时候

不过，通常更好的办法是使用计算属性而不是一个命令式的 $watch 回调

### .lazy

在默认情况下， v-model 在 input 事件中同步输入框的值与数据，但你可以添加一个修饰符 lazy ，从而转变为在 change 事件中同步：

```html

<!-- 在 "change" 而不是 "input" 事件中更新 -->
<input v-model.lazy="msg" >

```

### .number

如果想自动将用户的输入值转为 Number 类型（如果原值的转换结果为 NaN 则返回原值），可以添加一个修饰符 number 给 v-model 来处理输入值：

```html

<input v-model.number="age" type="number">

```

这通常很有用，因为在 type="number" 时 HTML 中输入的值也总是会返回字符串类型。