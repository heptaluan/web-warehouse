## vue2.0 路由

基本使用，从之前的 ```v-link = ...``` 变成了下面这种方式，用于展示的 router-view 没有变化

```js
<div>
    <router-link to="/home">首页</router-link>

    <router-view></router-view>
</div>
```

基本框架搭建完成以后，就可以开始配置路由了

```js
// 首先定义组件
const Home = {
    template: `<h3>首页</h3>`
}

const News = {
    template: `<h3>新闻</h3>`
}

// 配置路由
const router = {
    { path: "/home", component: Home },
    { path: "/news", component: News },
    // 重定向现在写在配置路由当中
    { path: "*", redirect: "/home" }
}

// 生成路由实例
const router = new VueRouter({
    // 本意为 routers: routers，可以简写为以下形式
    routers
})

// 挂载路由
new Vue({
    // 也可以写为 router: router
    router,
    el: "#box",
    // ...
})
```