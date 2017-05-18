vue 版本基于 1.0.28，仅做下笔记记录，环境就不去配置了

## vue-router

目录结构如下：

```js
├── App.vue             首页组件
├── index.html          首页，提供组件容器
├── main.js             主程序
├── router.config.js    路由模块    
├── components          组件视图（views）
│   ├── Home.vue
│   └── News.vue
```

首先新建一个 index.html，来放置我们的组件

```js
// index.html
<div id="box">
    <a v-link={path: "/home"}>首页</a>
    <a v-link={path: "/news"}>新闻</a>

    <router-view></router-view>
</div>
```

```js
// App.vue
<template>
    <div id="box">
        <a v-link={path: "/home"}>首页</a>
        <a v-link={path: "/news"}>新闻</a>

        <router-view></router-view>
    </div>
</template>

<script>
    
</script>

<style>

</style>
```

然后就可以来配置路由了

```js
// main.js
import Vue from "vue"
import VueRouter from "vue-router"
import App from "./App.vue"
import routerConfig from "./router.config.js"

// 使用路由模块
Vue.use(VueRouter)

// 第二步：创建 router 实例
const router = new VueRouter();

// 第三步：定义路由
router.map(routerConfig)

// 访问根目录的话，默认跳转到首页
router.redirect({
    "/": "/home"
})
// 第四步：开启路由
router.start(App, "#box")
```

将路由模块抽取出去形成一个单独的路由配置模块

```js
// router.config.js
// 配置路由

// 第一步：定义（路由）组件
import Home from "./components/Home.vue"
import News from "./components/News.vue"

// 第三步：定义路由
export default {
    "home": {
        component: Home
    },
    "news": {
        component: News
    }
}
```


## 嵌套路由

现在在首页下新增两个路由及对应模版，分别为用户登录（login）和用户注册（reg）

```js
// Home.vue
<template>
    <div id="box">
        <a v-link={path: "/home/login"}>用户登录</a>
        <a v-link={path: "/home/reg"}>用户注册</a>

        <router-view></router-view>
    </div>
</template>

// Login.vue
<template>
    <h1>用户登录页</h1>
</template>

<script>
    
</script>

<style>

</style>

// Reg.vue
<template>
    <h1>用户注册页</h1>
</template>

<script>
    
</script>

<style>

</style>
```

然后去路由配置文件导入两个相应的子模版，然后设置子路由

```js
// router.config.js
// 配置路由

// 第一步：定义（路由）组件
import Home from "./components/Home.vue"
import News from "./components/News.vue"
import Login from "./components/Login.vue"
import Reg from "./components/Reg.vue"

// 第三步：定义路由
export default {
    "/home": {
        component: Home,
        subRouter: {
            "/login": {
                component: Login
            },
            "/reg": {
                component: Reg
            }
        }
    },
    "/news": {
        component: News
    }
}
```

这样就成功的设置了两个子路由


