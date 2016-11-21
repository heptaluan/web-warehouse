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


## class 与 style 绑定

数据绑定是一个常见需求操作元素 class 列表和它的内联样式，因为它们都是属性，所以我们可以使用 v-bind 来处理它们：我们只需要计算表达式最终的字符串。

表达式的结果除了字符串之外，还可以是对象或数组

尽管可以使用 Mustache 标签绑定 class，比如 class = "{{ className }}"，但是我们不推荐这种写法和 v-bind:class 混用，只能选其一

我们可以传给 v-bind:class 一个对象，以动态的切换 class 

注意：v-bind:class 指令可以和普通的 class 特性共存：

```html

<div class="static" v-bind:class="{'class-a': isA, 'class-b': isB}">hello world</div>

data: {
    isA: true,
    isB: false
}

```

也可以直接绑定数据里的一个对象：

```html

<div v-bind:class="classObj">hello world</div>

data: {
    classObj: {
        'class-a': true,
        'class-b': false
    }
}

```


### 数组语法

我们可以把一个数组传给 v-bind:class，以应用一个 class 列表

如果你也想根据条件切换列表中的 class，可以使用三元表达式：

```html

<div v-bind:class="[classA, isB ? : classB : '']">hello world</div>

```

上面这个例子将会始终添加 classA，但是只有在 isB 是 true 的时候添加 calssB


也可以在数组语法中使用对象语法：

```html

<div v-bind:class="[classA, {classB: isB, classC: isC}]">hello world</div>

```


## 条件渲染

### v-if

在 Vue.js 中，我们可以使用 v-if 指令实现渲染模板的功能：

```html

<h1 v-if="ok">YES</h1>

```

也可以使用 v-else 添加一个 "else" 块

```html

<h1 v-if="ok">YES</h1>
<h1 v-else>NO</h1>

```

Vue.js 的模板，可以当作是一个暂存区，当条件为 true 的时候，才会被渲染出来，平时可以先隐藏起来，不会渲染到网页上

需要注意的是：Vue 中不支持 v-if 的嵌套使用


### v-show

在 Vue 中的 tamplate 里面是不能使用 v-show 的

```html

<h1 v-show="ok">hello world</h1>

```

但是在元素内使用是可以的


### v-if 和 v-show

v-if 是真实的条件渲染，因为它会确保条件块在切换当中适当地销毁与重建条件块内的事件监听器和子组件。

v-if 也是**惰性**的：如果在初始渲染时条件为假，则什么也不做——在条件第一次变为真时才开始局部编译（编译会被缓存起来）。

相比之下， v-show 简单得多——元素始终被编译并保留，只是简单地基于 CSS 切换。

一般来说， v-if 有更高的切换消耗而 v-show 有更高的初始渲染消耗。因此，如果需要频繁切换使用 v-show 较好，如果在运行时条件不大可能改变则使用 v-if 较好。


### v-else

可以使用 v-else 指令给 v-if 添加一个 "else" 块

在 2.0 版本之后，v-else 不能再跟在 v-show后面使用。

```html

<p v-if="foo">Foo</p>
<p v-if="!foo && bar">Not foo, but bar</p>

```



## 列表渲染

可以使用 v-for 指令基于一个数组来渲染一个列表，这个指令使用特殊的语法形式，形式为：item in items。items 是数据数组，item是当前数组元素的别名

另外，你可以为索引指定一个别名（如果 v-for 用于一个对象，则可以为对象的键指定一个别名）：

```html

<div v-for="(item, index) in items">
    {{index}} {{ item.message }}
</div>

```

也可以使用 of 分隔符，更为接近 JavaScript 遍历器语法

```html

<div v-for="item of items">
    {{index}} {{ item.message }}
</div>

```

需要注意的是，在 2.0 版本中， item 与 index 位置做了调整 

### template 中的 v-for

类似 template 中的 v-if，也可以将 v-for 用在 template 标签上，以渲染一个包含多个元素的块

```html

<ul>
    <template v-for="item in items">
        <li>{{ item msg ]}</li>
        <li class=""static></li>
    </template>
</ul>

```
