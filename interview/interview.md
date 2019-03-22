




// javascript


介绍一下基本数据类型，Map，Symbol，Set

什么是原型链 ==》 原型链的最顶端（原型链顶部（Object.prototype.__proto__ === null）） ==》 如何创建一个没有原型的对象（Object.create(null)） ==》 类式继承和原型继承

使用 new 的时候发生了什么

this ==》 箭头函数中的 this ==》 函数中返回的函数中的 this



----


如何判断一个对象是否存在（null）（for...in， stringify()， Object.keys()），如何判断一个变量是 string（包装对象 new String，Object.prototype.toString.call(s)， constructor）

addEventListener 最后一个参数 ==》 三个嵌套的 div，最内层的一个元素绑定两个点击事件，一个捕获，一个冒泡，会先执行哪一个

事件捕获和事件冒泡 ==》 低版本的 IE 中，为什么绑定点击事件要绑定到 document 上（因为只能冒泡到 document）

* 如果不是最内层的元素，依然是先捕获后冒泡

* 如果是最内层的元素同时绑定有捕获和冒泡事件，则哪个事件写在前面就先执行哪一个，不再区分捕获或冒泡

* 可以对同一个元素绑定多个事件监听函数，彼此之间不会覆盖，按先后顺序执行

闭包（如何取得异步请求当中的数据）

介绍一下 call 和 apply ==》 哪个速度更快一些（call，因为不存在数组遍历） ==》 第一个参数 ==》 如果传递 null => window，严格模式下不做转换 ==》 bind 简单实现

* function fun() { alert(this) }  fun.call(1); // 1


----

如何监听数组和对象的改变（getter/setter，defineProperties，proxies）

如何克隆一个对象


----

原生 ajax ==》 open() 方法的第三个参数表示采用异步（true）还是同步（false） ==》 post 请求如何发送键值对形式数据（指定 content-type 为 "application/x-www-form-urlencoded"）

同源策略/跨域 ==》 如果是 PUT 或者 DELETE 请求 ==》 promise 和 setTimeout 执行顺序（任务队列【ES6】在事件循环队列之上） ==》 任务队列，then 应当会放到当前 tick 的最后，但是还是在当前 tick 中

settimeout 和 promise 先后顺序

rxjs ==》 三个状态，next，error，complete ==》 Subject

介绍几个操作符 ==》 Subject()


================================================

列表中插入 3，300，3000 个 li，并且绑定点击事件

如何生成一个 m 长度，内容都为 n 的数组

点击其他区域关闭弹窗（回字布局结构）

数组去重

求一个数组中的最大值 ==》 删除一个数组中的指定项

生成 [0, 1, 2, 3 ... N - 1] 的数组


================================================


代码的复用（函数封装, 继承（圣杯模式）, 复制 extend, 混入 mixin, 借用 apply/call）

垃圾回收机制（标记清除，引用计数）

http 状态码（304，302，400，405）

http2（二进制帧，多路复用，请求优先级，流量控制，服务器端推送以及首部压缩）

域名发散与收敛

打包/部署

----

----


================================================

// jquery

$(document).ready() 是个什么函数  ==》 和 window.onload 有什么不同

$.each 和 $(selector).each() 的区别

$(this) 和 this

链式操作是如何实现的

源码有没有了解 ==》 




================================================

// css

盒模型，BFC（触发条件）

position ==》 float + position 以哪个为基准

水平，垂直居中（fit-content）

文字和图片居中对齐（如果文本变成 inline-block）

div 中有一个浮动的 img，高度如何 ==》 img 加上定位属性后高度如何 ==》 外层的 div 也加上浮动后如何

==》 怎么去除浮动 ==》 引起浮动的原因（BFC） ==》 哪些元素可以引起 BFC（IE 中如何触发 layout） ==》 IFC ==》 什么是 hasLayout

flex ==》 取值（0 1 auto） ==》 如何覆盖父元素指定的排列方式（align-self）

em 和 rem 区别

html 和 body 的区别

多行溢出隐藏

三个盒子 一个居左 两个居右 space-between

line-height:150%（先计算） 和 line-height:1.5（子元素）


================================================

// angular

constructor() 和 ngOnInit()（构造函数中，是无法获取输入属性的值）

如何引入第三方库

如果两次导入同一个模块会怎么样

[innerHtml] 时内容被转义

如何保证模块只加载一次（@Optional()，@SkipSelf()）

如何修改组件当前引用的组件样式（:host 和 ::ng-deep）

如何动态加载已经声明的组件 ==》 如何向动态添加的组件传递数据 ==》 如何进行通信 ==》 动态生成的组件，this.componentRef.instance.data 保证 data 是最新的

* ViewChild 获取引用，ComponentFactoryResolver 解析已经声明的组件，createComponent 呈现

组件之间传参的方式

emit() 事件如何变成异步的（true）

[] 和 {{}} 的差异（[attr.property]）

变化检测机制（Default 和 OnPush）




依赖注入 ==》 @Injectable() 是不是必须 ==》 什么情况下使用 @Inject() （非 Type 类型） ==》 Why（只有是 Type 类型的对象，才会被 TypeScript 编译器编译）

==》 那么 Type 类型的参数是否可以使用 @Inject(Type) 的方式注入

注入的时候，如何使用尚未定义的依赖对象类型（先后顺序，forwardRef(() => ...)）

ViewEncapsulation（Native、Emulated、None）

如何手动过滤输入值（this.sanitizer.sanitize(SecurityContext.HTML, "<h1>Sanitize</h1><script>attackerCode()</script>");）

Redux

effect

================================================

// Vue

Vue 的双向数据绑定（响应式）原理是什么？

父子组件之间参数传递 ==》 子组件需要修改 props

methods 和 computed 的区别



================================================

// react

左侧 dispatch 右侧去取，如何保证数据是最新的（concat）

调用 setState 之后发生了什么？



================================================

// Node.js

如何处理静态资源，比如请求了一张图片，怎么操作

如何控制并发（eventproxy，async）  ==》 两者的区别（多个源（小于 10）汇总数据用 eventproxy）

如何介绍 post 请求过来的数据（body-parser）

koa 和 express 区别
