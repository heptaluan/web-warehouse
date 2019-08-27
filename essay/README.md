一些比较常见的面试题，知识点之类的，类似于知识复习大纲

主要是一些小知识点，用于查缺补漏，篇幅较长内容都已经移至个人博客

详情可见 [heptaluan's blog](https://heptaluan.github.io/)

----


## [JavaScript](https://github.com/heptaluan/blog/blob/master/essay/js/00.md)

* 使用 `new` 的时候发生了什么
* 浏览器中的各种长度
* `parseInt`
* 数组常用的方法和其返回值
* `clientWidth`, `offsetWidth`, `scrollWidth`
* 自由变量到作用域链
* `ES6` 的一些新方法
* 关于 `'use strict'`
* 检测是否有元素被隐藏
* 鼠标长按事件
* 如何快速判断 `DOM` 元素位于 `viewport` 以外
* `TS` 当中报错 `Property 'style' does not exist on type 'Element'`
* `table` 表单中的 `.rows` 属性
* `offsetLeft` 与 `style.left` 的区别
* 如何判断鼠标滚动方向和绑定鼠标滚轮事件
* `JavaScript` 判断滚动条方向
* `setTimeout(function(){}, 0)`



## [算法/正则/其他](https://github.com/heptaluan/blog/blob/master/essay/arithmetic/00.md)

* `[1, 2, 3, 4, 5] => [1, 2, 3, 4, 5, 1, 4, 9, 16, 25]`
* 生成一个 `20 X 12` 的表格，并且设定指定格子的背景颜色
* 常见的数组的几种复制方法
* 数组操作 - 生成一个 `m` 长度，内容都为 `n` 的数组
* 生成 `20` 个 `40 - 80` 之间的随机数，并排序和乱序
* 取两个数组的差集
* `JavaScript` 常用方法汇总
* `JavaScript` 获得随机 `unicode` 字符
* 提取数字中的整数部分
* 转化一个数字数组为 `function` 数组（每个 `function` 都弹出相应的数字）
* 给 `object` 数组进行排序（排序条件是每个元素对象的属性个数）
* 实现如下语法的功能 `var a = (5).plus(3).minus(6)`
* 实现如下语法的功能 `var a = add(2)(3)(4)`
* 将数组转为字典对象
* 从列表当中删除掉指定项
* 查找列表当中指定的项
* 生成一个随机验证码
* 多少秒后自动跳转
* 拖拽函数
* 运动函数
* 连续运动函数
* 获取元素距离浏览器距离
* 判断图片是否存在
* 判断图片是否加载完成
* 实现一个休眠函数
* 利用 `canvas` 图片缓存（`lazyloadImage`）
* 设置元素 `CSS3` 相关变换属性
* 判断上传文件大小及类型
* 判断浏览器类型
* 判断移动端机型
* 点击 `div` 以外的地方，隐藏该 `div`
* 计算渐变色
* 获取当前元素所有最终使用的 `CSS` 属性值
* 获取元素的 `Class`
* 获取一个随机的颜色
* 查询/获取字符串的 `code` 值
* 时间间隔天数计算
* 移动光标到内容末尾
* 记忆函数
* 返回 `str` 中出现次数最多的字符
* 人名币值转换
* 移动端适配（`rem`）
* 正则中的 `test()` 与 全局选项 `/g`
* 输入框过滤
* `GIT` 和 `SVN` 的区别
* 面向对象的五大基本原则




## [jQuery](https://github.com/heptaluan/blog/blob/master/essay/jquery/00.md)

* `jQuery` 的 `DOM` 操作原理
* `jQuery` 选择器原理
* `jQuery` 插件中的 `return this.each()`
* `jQuery` 中的 `this` 和 `$(this)`
* `jQuery` 的链式操作是如何实现的
* `$.fn.each()` 和 `Array.prototype.forEach()`
* 使用原生 `JavaScript` 来替代 `jQuery`



## [Angular](https://github.com/heptaluan/blog/blob/master/essay/angular/00.md)

* 自定义属性指令中的 `ElementRef` 与 `Renderer` 的作用
* 自定义结构指令中的 `TemplateRef` 与 `ViewContainerRef` 的作用
* 注入服务的两种方式的区别
* `*ngFor`
* `:host`
* `[routerLink]` 的参数是一个数组而不是一个字符串
* 在指令当中监听用户的输入
* 利用 `Attribute` 装饰器，获取指令宿主元素上的自定义属性的值
* `Directive` 与 `Component` 的关系
* 双向绑定
* `Reactive Form` 使用步骤
* 在构造函数中是获取不到输入属性的值
* 在 `ES6` 或 `TypeScript` 中的 `Class` 是不会自动提升的
* 在 `Root Component` 中无法使用 `ng-content`
* 创建结构指令当中的 `{ $implicit: 'value' }`
* 依赖注入中，配置完服务后，为什么还需要在组件的构造函数当中进行类型声明
* 为什么在构造函数中，非 `Type` 类型的参数只能用 `@Inject(Something)` 的方式注入
* 服务当中的 `@Injectable()` 是必须的么
* 在构造函数中，`Type` 类型的参数是否可以使用 `@Inject(Type)` 的方式注入
* 如何引入第三方类库
* `constructor` 与 `ngOnInit` 的应用场景
* `Angular` 中使用 `[innerHtml]` 时内容被转义
* `Angular` 中 `forwardRef` 的作用
* `@Component` 中 `@` 的作用
* 导入 `BrowserModule` 还是 `CommonModule`
* 如果两次导入同一个模块会怎么样
* `Angular` 中的 `ngOnChanges`
* `effect` 和 `reducer` 的区别
* 如何剔除路由当中的 `#`（`HTML5 History` 模式），使用 `hash` 模式



## [Vue](https://github.com/heptaluan/blog/blob/master/essay/vue/00.md)

* 数组替换
* 对象更改检测注意事项
* `Vue` 当中的 `is` 属性
* `methods` 和 `computed` 的区别
* `$nextTick` 的作用
* 组件之间传参
* `Vue` 循环中的 `key` 的作用



## [React](https://github.com/heptaluan/blog/blob/master/essay/react/00.md)

* `React` 的特点
* 在什么情况下你会优先选择使用 `Class Component` 而不是 `Functional Component`
* `Element` 与 `Component` 的区别
* `ajax` 请求应当放置于哪一个生命周期当中
* `shouldComponentUpdate` 的作用
* `props.children` 和 `props.children.map`
* `React` 中的事件处理逻辑
* `createElement` 与 `cloneElement` 的区别
* `setState` 函数的第二个参数的作用
* 受控组件与非受控组件
* `React` 中 `keys` 的作用
* `React` 中 `refs` 的作用
* 调用 `setState` 之后发生了什么？
* 根据生成的组件完成其相关类的定义



## [HTML/CSS](https://github.com/heptaluan/blog/blob/master/essay/css/00.md)

* `WEB` 标准以及 `W3C` 的理解与认识
* 文档类型（`DOCTYPE`）有哪些，含义是什么
* `html` 和 `body` 的区别
* 盒子模型
* `Bootstrap` 中的栅格系统
* `FC`
* 水平居中
* 元素与文本垂直居中
* 响应式布局
* `CSS` 中的原生变量
* `calc()`
* `absolute` 的 `containing block`（容器块）计算方式跟正常流有什么不同？
* `IE` 中的 `CSS hack`
* 如何检测改浏览器是否支持某个 `CSS3` 的特性
* 移动端全屏背景
* 移动端原生控件样式 `-webkit-appearance`
* 清除选中样式
* 媒体查询
* `input、placeholder` 和 `textarea` 默认显示颜色修改


## [http](https://github.com/heptaluan/blog/blob/master/essay/http/00.md)

* `cookie / csrf / xss`
* `SEO`
* 网络协议的分层结构