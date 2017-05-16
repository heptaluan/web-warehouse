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