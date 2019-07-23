算是一个大的汇总仓库吧，囊括了平时瞎捣鼓的绝大部分东西，还有一些笔记啊，杂七杂八的知识点，面试题之类的

内容比较多的的部分都单独摘选出来放到博文当中了，详细可见 ==> [heptaluan's blog](HTTPs://heptaluan.github.io/)

权当是记录自己成长的过程吧，欢迎拍砖，如果觉得内容还不错，可以点颗 `Star` 支持一下：）

反正就是提醒自己有事没事刷一刷（~~而不是闲的时候刷知乎，QQ群斗图~~）

路还很遥远，一步一步来，每天进步一点点

----

----

无意中看到一篇文章，[《一个程序员的成长之路》]([图片]HTTPs://mp.weixin.qq.com/s/zWPjfHiYxx0HH9lE99Yijw)，触动很大，感悟颇多，也想了许多

虽然工作已经好几年了，也是一直在从事着前端开发的工作，但是发现能真正沉淀下来的东西很少

所以打算在这里从新整理了一下目前所掌握的前端知识体系，也算是对自己这几年的工作以来的一个总结

然后针对自己比较薄弱的地方努力去攻克，争取做到先有广度，后有深度，与君共勉

目前主要技术栈方向为 [Angular](https://angular.cn/) 和 [Node.js](http://nodejs.cn/)




## HTML

* 对 WEB 标准以及 W3C 的理解与认识
* HTML5 新特性与语义化
* 行内元素与块级元素
* [ALT 与 TITLE 的区别](https://heptaluan.github.io/2017/01/10/JavaScript/02/)
* 渐进增强与优雅降级的理解及区别
* cookie、sessionStorage、localStorage 原理与区别
* ...





## CSS3

* [浮动原理与解决办法](https://heptaluan.github.io/2016/11/09/CSS/01/)
* CSS 盒模型
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
  * 类型判断（typeof && instanceof）
  * 判断包装字符串（new String()）
  * 判断空对象
* this 的理解
* [基本类型，引用类型](https://heptaluan.github.io/2017/02/22/JavaScript/06/)
* [作用域与变量对象](https://heptaluan.github.io/2017/01/18/JavaScript/03/)
* [事件与事件流](https://heptaluan.github.io/2016/11/14/JavaScript/01/)
* 构造函数、实例、原型、原型链、继承
  * 类式继承
  * 原型继承
  * Object.create()
* 对象深浅拷贝
  * JSON.parse() && JSON.stringify()
* 原生 ajax
* 函数柯里化、高阶函数
* bind、call、apply 用法及实现
* 字符串、数组、对象、日期等的属性与方法
* 浏览器对象
  * Window 对象
  * History 对象
  * Location 对象
  * Screen 对象
* offset，scroll，client
* Event 事件
* JavaScript 并发模型
 * Event Loop
 * 运行机制
 * 进程与线程
 * 宏任务与微任务
* 原生 DOM 增删改查
* 常见的模块化
* 作用域、闭包与立即执行函数等
* 同步与异步
* 对象的遍历
  * Object.keys()
  * for...in
  * Object.getOwnPropertyNames()
  * Reflect.ownKeys()
  * for...of
* ...






## ES6

* let 与 const
* 异步解决方案
  * 回调函数
  * Promise
  * Generator
  * Async/Await
* 箭头函数
* 模块化（export && import）
* 解构赋值（主要：数组和对象）
* 数组、字符串、函数、日期等扩展方法
* 默认值、扩展运算符
* 数组 forEach、some、every、map、filter、reducer 等方法的使用
* Proxy
* ...








## jQuery

* window.onload 事件和 jQuery ready 函数有何不同
* jQuery 源码
  * jQuery.fn.init()
  * jQuery.each
  * jQuery.extend() 和 jQuery.fn.extend()
  * jQuery.buildFragment(args, nodes, scripts)
  * jQuery.clean(elems, context, fragment, scripts)
  * jQuery.noConflict([removeAll])
  * jQuery.isFunction(obj)， jQuery.isArray(obj)
  * jQuery.type(obj)
  * jQuery.isWindow(obj)
  * jQuery.isNumeric(value)
  * jQuery.isPlainObject(object)
  * jQuery.makeArray(obj)
  * jQuery.inArray(value, array[, fromIndex])
  * jQuery.merge(first, second)
  * jQuery.grep(array, function(elementOfArray, indexInArray)[, invert])
* jQuery 动画
* jQuery 中的 deferred 对象
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

* :host 和 ::ng-deep
* Angular-CLI
* 依赖注入
* 装饰器
* 管道
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





## Node.js

* 什么是 Node.js
* [CommonJS、AMD 和 CMD](https://heptaluan.github.io/2017/02/03/JavaScript/05/)
* 事件循环 && EventEmitter
* 创建简单的服务器
* 模块化
  * exports
  * module.exports
* 核心模块
  * npm
  * path
  * fs
  * buffer
  * stream
  * HTTP && HTTPS
  * tcp
  * process
* ...





## Express

* request && response对象属性和方法
* GET && POST请求
* 静态文件 static
* 路由中req, res对象中的属性
* 对中间件的理解
* 常用中间件
  * body-parser
  * cookie-parser
* ...







## Koa2

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
* 浏览器缓存
* 重绘 && 回流
* 常见浏览器及其内核
* HTTP 请求与响应对象
* TCP 三次握手、四次挥手
* HTTP 常见方法与状态码
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








## 算法

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
* ...








## 数据库

* MySql
  * Mysql 安装
  * Mysql 常见增删改查
  * python 连接 Mysql
  * Node 连接 Mysql
* MonogoDB
  * MonogoDB 安装
  * MonogoDB 常见增删改查
  * mongoose
  * Node 连接 MonogoDB
* Redis
  * Redis 安装
  * Redis 支持的数据类型
    * String
    * List
    * Set
    * Sorted Set
    * Hash
    * Node使用Redis
* ...
