算是一个大的汇总仓库吧，囊括了平时瞎捣鼓的绝大部分东西，还有一些笔记啊，杂七杂八的知识点，面试题之类的

内容比较多的的部分都单独摘选出来放到博文当中了，详细可见 ==> [heptaluan's blog](HTTPs://heptaluan.github.io/)

权当是记录自己成长的过程吧，欢迎拍砖，如果觉得内容还不错，可以点颗 `Star` 支持一下：）

反正就是提醒自己有事没事刷一刷（~~而不是闲的时候刷知乎，QQ群斗图~~）

路还很遥远，一步一步来，每天进步一点点

----

----

无意中看到一篇文章，[《一个程序员的成长之路》]([图片]HTTPs://mp.weixin.qq.com/s/zWPjfHiYxx0HH9lE99Yijw)，触动很大，感悟颇多，也想了许多

虽然工作已经好几年了，也是一直在从事着前端开发的工作，但是发现能真正沉淀下来的东西很少

所以打算从新整理了一下目前所掌握的前端知识体系，也算是对自己这几年的工作以来的一个总结

然后针对自己比较薄弱的地方努力去攻克，争取做到先有广度，后有深度，与君共勉

目前主要技术栈方向为 [Angular](https://angular.cn/) 和 [Node.js](http://nodejs.cn/)


<!-- 

跨域处理方式

font 优化

grid

BOM

-->



## HTML

* 对 WEB 标准以及 W3C 的理解与认识
* HTML5 新特性与语义化
* 行内元素与块级元素
* [ALT 与 TITLE 的区别](https://heptaluan.github.io/2017/01/10/JavaScript/02/)
* 渐进增强与优雅降级的理解及区别
* cookie、sessionStorage、localStorage 原理与区别
* ...





## CSS

* [浮动原理与解决办法](https://heptaluan.github.io/2016/11/09/CSS/01/)
* CSS 盒模型
* [样式来源与层叠规则](http://heptaluan.github.io/2017/09/03/CSS/11/)
* 获取盒子宽高的几种方式及区别
* [单行，多行的溢出隐藏](https://heptaluan.github.io/2016/12/02/CSS/02/)
* Flex 与 Grid 布局
* CSS 常见选择器
* BFC 与 IFC
* 定位
* 常见的页面布局
* CSS3 新特性
* 常见单位
* 移动端
* 文字、盒子水平垂直居中
* link 和 @import 有什么区别
* 常见兼容性问题
* ...






## JavaScript

* 基本数据类型
  * [类型判断（包装对象，空对象）](http://heptaluan.github.io/2018/03/17/JavaScript/30/)
  * [类型转换，== 与 ===](https://heptaluan.github.io/2017/03/17/JavaScript/09/)
  * [运算符优先级](http://heptaluan.github.io/2018/05/27/JavaScript/33/)，[|| 和 &&](https://heptaluan.github.io/2017/05/19/JavaScript/19/)
* [对象](http://heptaluan.github.io/2017/10/07/JavaScript/25/)
* [函数](http://heptaluan.github.io/2017/10/08/JavaScript/26/)
* [this](http://heptaluan.github.io/2017/10/09/JavaScript/27/)
* [基本类型，引用类型](https://heptaluan.github.io/2017/02/22/JavaScript/06/)
* [作用域与变量对象](https://heptaluan.github.io/2017/01/18/JavaScript/03/)
* [事件与事件流](https://heptaluan.github.io/2016/11/14/JavaScript/01/)
* [parseInt() 与 parseFloat()](https://heptaluan.github.io/2017/04/15/JavaScript/12/)
  * 0.1 + 0.2 === 0.3
  * ['1', '2', '3'].map(parseInt)
* [节点（Node）属性](http://heptaluan.github.io/2017/06/26/JavaScript/21/)
  * 创建节点/插入节点/删除节点/替换节点/克隆节点
* 对象的遍历
  * Object.keys()
  * for...in
  * Object.getOwnPropertyNames()
  * Reflect.ownKeys()
  * for...of
* 原型链
  * [constructor、__proto__ 和 prototype](https://heptaluan.github.io/2017/04/06/JavaScript/10/)，[原型和原型对象](https://heptaluan.github.io/2017/04/08/JavaScript/11/)
* [继承](http://heptaluan.github.io/2018/01/10/JavaScript/28/)
  * 类式继承
  * 原型继承
  * 组合模式
  * [Object.create()](https://heptaluan.github.io/2017/03/03/JavaScript/07/)
* [闭包](https://heptaluan.github.io/2017/05/12/JavaScript/16/)
  * [JavaScript Closures for Dummies](http://heptaluan.github.io/2017/05/13/JavaScript/17/)
  * [异步回调函数当中进行取值](http://heptaluan.github.io/2017/09/17/JavaScript/51/)
* [对象深浅拷贝](http://heptaluan.github.io/2018/01/14/JavaScript/29/)
  * [JSON.parse() && JSON.stringify()](http://heptaluan.github.io/2017/07/06/JavaScript/23/)
* [ES6 中的 Class](http://heptaluan.github.io/2017/09/20/JavaScript/24/)
* [Reflect](http://heptaluan.github.io/2017/09/21/JavaScript/53/)
* [promise 和 setTimeout](http://heptaluan.github.io/2018/03/19/JavaScript/31/)
* 迭代器与生成器

----
* [map/reduce](https://heptaluan.github.io/2017/06/01/JavaScript/20/)
* [bind](https://heptaluan.github.io/2017/05/07/JavaScript/15/)，[call、apply](https://heptaluan.github.io/2018/04/16/JavaScript/32/)
  * currying
  * call 和 apply 的第一个参数（严格模式）
  * call 和 apply 哪个速度快一些
* [once/debouce/throttle](http://heptaluan.github.io/2017/08/25/JavaScript/48/)
* [监听对象和数组的变化](http://heptaluan.github.io/2017/08/29/JavaScript/49/)
* [window.requestAnimationFrame()](http://heptaluan.github.io/2018/06/11/JavaScript/45/)
* 浏览器对象
  * Window 对象
  * History 对象
  * Location 对象
  * Screen 对象
* offset，scroll，client
* Event 事件
----
* 数组
  * 数组排序
  * 数组去重
  * 扁平化数组
  * 求数组中最大值和最小值
* 排序方式
  * 冒泡排序
  * 选择排序
  * 快速排序
  * 递归
----
* 原生 Ajax
* [跨域](http://heptaluan.github.io/2018/04/26/JavaScript/39/)
* [设计模式](http://heptaluan.github.io/2017/08/17/JavaScript/47/)
  * [单例模式](https://heptaluan.github.io/2017/01/25/JavaScript/04/)
  * 工厂模式
  * 代理模式
  * 观察者模式
* [CommonJS、AMD 和 CMD](https://heptaluan.github.io/2017/02/03/JavaScript/05/)
* JavaScript 并发模型
  * Event Loop
  * 运行机制
  * 进程与线程
  * 宏任务与微任务
* 常见的模块化
* 同步与异步
* [垃圾回收机制](http://heptaluan.github.io/2017/12/25/Essay/02/)
* ...







## jQuery

* window.onload 事件和 jQuery ready 函数有何不同
* [jQuery 架构](http://heptaluan.github.io/2017/06/23/jQuery/03/)
  * [jQuery.fn.init()](http://heptaluan.github.io/2017/07/11/jQuery/04/)
  * [jQuery.each](https://heptaluan.github.io/2017/06/04/jQuery/01/)
  * [jQuery.extend() 和 jQuery.fn.extend()](http://heptaluan.github.io/2017/07/18/jQuery/07/)
  * [jQuery.buildFragment(args, nodes, scripts)](http://heptaluan.github.io/2017/08/02/jQuery/08/)
  * [jQuery.clean(elems, context, fragment, scripts)](http://heptaluan.github.io/2017/08/11/jQuery/09/)
  * [工具函数](http://heptaluan.github.io/2017/07/15/jQuery/05/)
* jQuery 动画
* [deferred 对象](https://heptaluan.github.io/2017/06/21/jQuery/02/)
* ...








## TypeScript

* TypeScript 特点及理解
* Typescript 常用语法
  * 基础类型
  * 布尔值 boolean
  * 数字 number
  * 字符串 string
  * 数组 number[] Array
  * 元祖 Tuple
  * 枚举 enum
  * any
  * void
  * null && undefined
  * never
  * object
* 类型断言
* 变量声明
* 接口
* 类
* 函数
* 泛型
* 类型判断
* 高级类型
* ...


## Angular

* Angular-CLI
* [:host 和 ::ng-deep](http://heptaluan.github.io/2018/01/16/Angular/06/)
* 依赖注入
* [装饰器](http://heptaluan.github.io/2018/01/15/Angular/05/)
  * @Input，@Output（inputs，outputs）
  * @ViewChild，@ViewChildren
  * @HostListener，@HostBinding
* [管道](http://heptaluan.github.io/2018/01/11/Angular/04/)
* 动态加载
* ExpressionChangedAfterItHasBeenCheckedError
* Angular 中使用 WebSocket
* 表单
* 路由传递参数的几种方式
* 属性绑定 [] 和 {{}}
* rxjs
* ngrx
* @effect
* ...



## React

* Virtual DOM
* JSX 语法
* 属性 props && 状态 state
* React 生命周期
* React 优化
  * shouldComponentUpdate
* 函数组件 && 类组件 && 高阶组价
* Fiber 的理解
* React Hooks
  * useState
  * useEffect
  * useContext
  * useReducer
* React-Router-Dom
* React 路由的原理
* 常用 API
  * BrowserRouter && HashRouter
  * Route
  * Link && NavLink
  * Switch
  * Prompt
  * Redirect
  * match location history对象
* Redux
* Action 创建函数
* 常用 API
  * State
  * Action
  * Reducer
  * createStore
  * combineReducers
  * applyMiddleware
  * bindActionCreators
  * compose
* Store 常用方法
  * getState
  * dispatch
  * subscribe
* react-redux
  * Provider
  * connect
    * mapStateToProps
    * mapDispatchToProps
* 处理异步 redux-thunk
* ...




## Vue

* [Vue 当中的 Mixin](http://heptaluan.github.io/2018/04/15/Vue/02/)
* [双向绑定原理](http://heptaluan.github.io/2018/07/10/JavaScript/34/)
* Vue常见API
* [在 Vue 中使用 jsx](http://heptaluan.github.io/2018/04/29/Vue/03/)
* [axios](http://heptaluan.github.io/2018/05/10/Vue/04/)
  * [axios 中跨域访问的问题](http://heptaluan.github.io/2018/05/11/Vue/05/)
* 常见选项
  * methods watch computed filter mixins ...
* 常用指令
  * v-for v-pre v-html v-bind v-model...
* 常用组件
  * transition transition-group keep-alive slot ...
* nexttick，ref，set，slots，scopedslots
* 动态绑定class & style
* Vue生命周期
* Vue监听数组
* 组件的封装
* Vue-cli2.x & Vue-cli3.x
* 组件间的通信
  * 父子组件
    * 父组件向子组件 props $children
    * 子组件向父组件 parent
  * 非父子组件兄弟组件
    * 中央事件总线 EventBus
    * listeners inheritAttrs
    * provide inject
* Vue-loader的理解
* Vue-Router的理解
  * router-link
  * router-view
* 导航方式
  * 编程式导航
  * 声明式导航
* 命名路由 & 命名视图
  * name属性 -> {name:, params:}
  * router-view的name属性与components对应
* 动态路由及路由组件间传参
  * name + params方式
  * path + query方式
* router & route的理解
* 导航守卫
  * 全局守卫
  * 组件内守卫
  * 路由独享守卫
* 路由懒加载
  * vue异步组件
  * es提案的import()
  * webpack的require ensure()
* Vuex的理解及使用场景
* Vuex核心概念
  * State
  * Getters
  * Mutations
  * Actions
  * Modules
* 脚手架搭建Vue全家桶项目
* 服务端渲染SSR
  * 首屏渲染 & SEO 问题
  * Nuxt.js





## Node.js

* 什么是 Node.js
* [CommonJS、AMD 和 CMD](https://heptaluan.github.io/2017/02/03/JavaScript/05/)
* 事件循环 && EventEmitter
* 创建简单的服务器
* [module.exports 和 exports](http://heptaluan.github.io/2018/06/05/Node/04/)
* [session 和 cookie](http://heptaluan.github.io/2017/11/26/HTTP/02/)
* [Stream](http://heptaluan.github.io/2018/07/12/Node/01/)
  * Readable 和 Writable
  * Duplex 和 transform
  * 背压（back pressure）
  * 流式数据处理
  * Browserify 和 Gulp 设计机制
* 模块
  * [co](http://heptaluan.github.io/2018/07/22/Node/02/)
* Express
  * request && response对象属性和方法
  * GET && POST请求
  * 静态文件 static
  * 路由中req, res对象中的属性
  * 对中间件的理解
  * 常用中间件
    * body-parser
    * cookie-parser
* Koa2
  * 对 Koa2 的理解
  * 与 Express 的区别
  * 理解核心对象
    * Application
    * Context
    * Request
    * Response
  * 常见中间件
  * 中间件的概念
    * koa-body
    * koa-bodyparse
    * koa-multer
    * koa-router
    * koa-static
    * koa-compose
    * Koa2路由的使用
  * ...







## 浏览器 && HTTP 协议 

* 从输入 URL 到页面加载的全过程
* [浏览器缓存](http://heptaluan.github.io/2017/12/12/HTTP/04/)
* 重绘 && 回流
* [域名发散与收敛](http://heptaluan.github.io/2017/12/01/HTTP/03/)
* [字符编码](http://heptaluan.github.io/2017/12/24/Essay/01/)
  * ASCII
  * UTF-8
  * GBK/GB2312
* 常见浏览器及其内核
----
* [HTTP 与 TCP（三次握手、四次挥手）](http://heptaluan.github.io/2018/05/05/HTTP/05/)
* HTTP 常见方法与状态码
* [http 2.0](http://heptaluan.github.io/2018/05/09/HTTP/06/)
* 方法
  * GET
  * POST
  * PUT
  * HEAD
  * DELETE
* 状态码
  * 1xx 信息类
  * 2xx 成功类
  * 3xx 重定向
  * 4xx 客户端错误
  * 5xx 服务端错误
* 长连接与管线化
* Etag && Expires && Cache-control等理解
* 兼容版原生 Ajax
* Fetch
* Axios
* Flyio
* ...











## 数据库

* [Windows 下的 MySQL 安装](http://heptaluan.github.io/2018/03/22/MySQL/03/)
* [缓存穿透和缓存雪崩](http://heptaluan.github.io/2018/03/03/MySQL/01/)
* [MySQL 基本增删改查](http://heptaluan.github.io/2018/03/23/MySQL/04/)
* [使用 Python 操作 MySQL](http://heptaluan.github.io/2018/03/29/MySQL/05/)
* [Sequelize 与 MySQL](http://heptaluan.github.io/2018/03/31/MySQL/06/)
* MonogoDB
* Redis
* ...
