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
}).$mount("#box")  //  <== 就是这个
```

#### vm.$options

```js
new Vue({
    data: {},
    aa: "123" // $options 就是用来获取这种属性
}).$mount("#box")  
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

特别需要注意的一个就是，模版里面只能有一个根元素，即只能 ```<div><span></span></div>``` 而不能 ```<div></div><span></span>```

```js
<script type="text/x-templae" id="tem">
    <h1>
        <span>hello world</span>
        <ul>
            <li>111</li>
            <li>222</li>
        </ul>
    </h1>
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

就是将 sceipt 标签替换成 template

```js
<template id="tem">
    <h1>
        <span>hello world</span>
        <ul>
            <li>111</li>
            <li>222</li>
        </ul>
    </h1>
    
</template>
```


#### 动态组件

组件也可以动态的去渲染，比如上例上的 ```<hello></hello>```，需要注意的是：写法是固定的，即 ```<component :is="组件的名称"></component>```

```js
var vm = new Vue({
    el: "#box",
    data: {
        // 默认显示 a组件
        a: "aaa"
    },
    components: {
        "aaa": {
            template: "<h1>a组件</h1>"
        },
        "bbb": {
            template: "<h1>b组件</h1>"
        }
    }
})

// =====================
<div id="box">
    <input type="button" @click="a='aaa'" value="aaa">
    <input type="button" @click="a='bbb'" value="bbb">
    <component :is="a"></component>
</div>
```



#### 父子组件

```js
var vm = new Vue({
    el: "#box",
    data: {},
    components: {
        "aaa": {
            template: "<h1><span>这是aaa组件</span><bbb></bbb></h1>",
            components: {
                "bbb": {
                    template: "<h6>这是bbb组件</h6>"
                }
            }
        }
    }
})

// ==========================
<div id="box">
    <aaa></aaa>
</div>
```

需要注意两点，一个是子组件在渲染的时候需要写在父组件内部（js 当中），而不是写在 html 里面，二就是之前提到过的，模版中只能存在一个根元素


#### 父子组件间数据交互

首先需要明确的是，vue 在默认情况下，子组件无法直接访问父组件的数据（这个时候需要使用数据传递），就如下面的例子，定义在父组件中的数据只能父组件自己使用，而子组件是无法继承（直接）得到的，即 ```<bbb></bbb>``` 中的 ```{{msg}}``` 是无法获取到数据的

```js
var vm = new Vue({
    el: "#box",
    data: {},
    components: {
        "aaa": {
            data () {
                return {
                    msg: "父组件的数据"
                }
            },
            template: "<h1><span>{{msg}}</span><bbb>{{msg}}</bbb></h1>",
            components: {
                "bbb": {
                    template: "<h6>这是bbb组件</h6>"
                }
            }
        }
    }
})
```

如果需要进行数据传递，可以使用 props，为了便于理解先将模版写在外部

```js
<template id="tem">
    <h1>
        父组件的数据：<span>111</span><br>
        子组件的数据：<bbb></bbb>
    </h1>
</template>
```

如上所示，大致原理就是，在 id 为 tem 的模版当中，```{{msg}}``` 这个数据除了在子组件内部是无法访问的，其他地方都是可以访问的到的，就如是下面这个丧心病狂的例子：

```js
<template id="tem">
    <h1>
        父组{{msg}}件的数据：<span>{{msg}}</span><br>{{msg}}
        子组件{{msg}}的数据：{{msg}}<bbb :b-msg="msg" :b-msg2="msg2"></bbb>{{msg}}
    </h1>
</template>
```

那么这样一来就可以在子组件当中定义一个自定义属性（就是上例中的的 bmsg），然后利用子组件身上绑定的这个属性将父元素中的数据传递到子组件当中，然后子组件来接收即可

同理，需要注意接收到的数据在渲染的时候需要写在子组件自身所属的的 components 中，而不是 template 中（简单点记就是，组件渲染数据的时候写在 js 里面，不是写在 html 里面）

```js
<template id="tem">
    <h1>
        父组件的数据：<span>{{msg}}</span><br>
        子组件的数据：<bbb :b-msg="msg"></bbb>
    </h1>
</template>

// ==========================

var vm = new Vue({
    el: "#box",
    data: {},
    components: {
        "aaa": {
            data () {
                return {
                    msg: "父组件的数据"
                }
            },
            template: "#tem",
            components: {
                "bbb": {
                    template: "<span>{{bMsg}}</span>",
                    props: ["bMsg"]
                } 
            }
        }
    }
})
```

几个注意事项

一个是在自定义组件的时候，名称如果使用的是 b-msg 这样的方式，那么在接收的时候，就需要写成 bMsg，否则会报错

另外一个是 props 有两种定义方式，一种是常规的使用数组的形式，比如上面的 ```["bMsg", "bMsg2"]```，另外一种就是写成一个对象的形式，这样同时也可以来进行数据的验证，比如：

```js
<template id="tem">
    <h1>
        父组件的数据：<span>111</span><br>
        子组件的数据：<bbb :b-msg="msg" :b-msg2="msg2"></bbb>
    </h1>
</template>

// ===================
var vm = new Vue({
    el: "#box",
    data: {},
    components: {
        "aaa": {
            data () {
                return {
                    msg: "父组件的数据",
                    msg2: 222
                }
            },
            template: "#tem",
            components: {
                "bbb": {
                    template: "<span>{{bMsg}} ---- {{bMsg2}}</span>",
                    props: {
                        bMsg: String,
                        bMsg2: Number
                    }
                } 
            }
        }
    }
})
```

如果传递过来的数据不是 props 指定的类型，则会报错