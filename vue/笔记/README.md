## 交互（ajax）

如果 vue 想做交互，需要引入另外一个库 vue-resouce

#### get

获取一个普通文本数据

```js
new Vue({
    el: "#app",
    data: {},
    methods: {
        get: function () {
            // 返回的是一个 promise 对象
            this.$http.get("1.txt").then(function(res) {
                console.log(res.data)
            })
        }
    }
})

// ==========================================================

// html
<div id="app">
    <input type="button" value="按钮" @click="get()">
</div>
```

使用 get 向服务器发送请求

同上面类似，data 是作为第二个参数传入

```js
// ...

methods: {
    get: function () {
        this.$http.get("url?page=", {
            params: {
                page: 10
            }
        }).then(function(res) {
            console.log(res.data)
        })
    }
}

// ...
```

使用 post 向服务器发送数据

也类似，不同的是需要添加第三个参数（option）来做标识，才能把 post 数据提交出去

```js
methods: {
    get: function () {
        this.$http.post("url", {
            a: 123,
            b: 456
        }, {
            emulateJSON: true
        }).then(function(res) {
            console.log(res.data)
        })
    }
}
```


使用 jsonp 跨域请求数据

有几点需要注意，如果接口默认的回调函数名称为 callback，如下所示，直接使用即可

```js
methods: {
    get: function () {
        this.$http.jsonp("www.123.com/search=123&callback=abc", {
            search: abc
        }).then(function(res) {
            console.log(res.data)
        })
    }
}
```

但是如果回调函数名称不是callback，那就需要指定第三个参数，用来指定 callback 的名称（vue 默认的回调函数名称为 callback）


```js
methods: {
    get: function () {
        this.$http.jsonp("www.123.com/search=123&cb=abc", {
            search: abc
        }, {
            jsonp: "cb"
        }).then(function(res) {
            console.log(res.data)
        })
    }
}
```


## vue 实例的简单方法

#### vm.$el

就是指向 vue 实例对象中的那个 el 对应的元素

```js
new Vue({
    el: //  <== 就是这个
    data: {}
})
```

#### vm.$data

就是指向 vue 实例对象中的那个 data 对应的元素

```js
new Vue({
    el: ...,
    data: {} //  <== 就是这个
})
```

#### vm.$mount

```js
new Vue({
    data: {} 
}).$mount("#box)  //  <== 就是这个
```

#### vm.$options

```js
new Vue({
    data: {},
    aa: "123" // $options 就是用来获取这种属性
}).$mount("#box)  
```

还有两个用的不多的 vm.$destory（销毁对象） 和 vm.$log（查看现在数据的状态）


## 组件

#### 第一种方式

```js
// 全局组件
var Com = Vue.extend({
    template: "<h1>hello world</h1>"
})

Vue.component("hello", Com);

var vm = new Vue({
    el: "#box",
    data: {}
})

// ==================
<div id="box">
    <hello></hello>
</div>
```

需要注意的是，如果组件里面要放数据，比如下面这样是不行的

```js
var Com = Vue.extend({
    data: {
        msg: "hello world"
    },
    template: "<h1>{{ msg }}</h1>"
})
```

因为 data 必须是函数的形式，函数必须返回一个对象（json）

```js
var Com = Vue.extend({
    data () {
        return {
            msg: "hello world"
        }
    },
    template: "<h1>{{ msg }}</h1>"
})
```

这样就可以正常运行了，其他的一些操作就跟正常情况下一样了，比如添加事件

```js
var Com = Vue.extend({
    data() {
        return {
            msg: "hello world"
        }
    },
    methods: {
        change: () {
            this.msg = "word hello"
        }
    },
    template: "<h1 @click='change'>{{ msg }}</h1>"
})
```

如果想变为局部组件，只需要将 Com 对象添加到根组件（vm）内部即可，但是 component 会变成 components（注意有个 s）

```js
var Com = Vue.extend({
    data() {
        return {
            msg: "hello world"
        }
    },
    methods: {
        change: function () {
            this.msg = "word hello"
        }
    },
    template: "<h1 @click='change'>{{ msg }}</h1>"
})

var vm = new Vue({
    el: "#box",
    data: {},
    components: {
        "hello": Com
    }
})
```

#### 第二种方式

也就是第一种的简写模式，添加事件等同上面一样

```js
// 全局组件
Vue.component("hello", {
    template: "<h1>hello world</h1>"
})

var vm = new Vue({
    el: "#box",
    data: {}
})

// 局部组件
var vm = new Vue({
    el: "#box",
    data: {},
    components: {
        "hello": {
            template: "<h1>hello world</h1>"
        }
    }
})
```

#### 配合模版来使用

上面那种方式只适合单个标签来使用，当模版内标签多的时候就不起作用了，这个时候可以采取下面的方式

第一种方式（使用较少）

即定义一个 script 标签，在内部来添加模版，注意：需要添加一个自定义的 type 类型，不然会被解析

```js
<script type="x-templae" id="tem">
    <h1>hello world</h1>
</script>

var vm = new Vue({
    el: "#box",
    data: {},
    components: {
        "hello": {
            template: "#tem"
        }
    }
})

// ===================
<div id="box">
    <hello></hello>
</div>
```

第二种方式是比较推荐的一种

```js

```