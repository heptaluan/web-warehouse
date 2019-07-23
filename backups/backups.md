## Webpack 4.x

* Webpack配置文件常见选项
  * 入口文件-entry
  * 出口文件-output
  * 模块-module
  * 插件-plugins
  * 模式-mode
  * 开发服务器-devServer
  * 解析-resolve
  * 源码调试-sourceMap
* 常用Loader
  * 处理CSS文件
    * css-loader style-loader less less-loader node-sass sass-loader stylus stylus-loader
  * 添加CSS3前缀
    * postcss-loader autoprefixer
  * 处理ES6文件及更高级语法
    * babel-loader @babel/core @babel/preset-env @babel/runtime  @babel/plugin-proposal @babel/plugin-proposal-class-properties  @babel/plugin-transform-runtime
  * 处理图片、字体等文件
    * file-loader url-loader html-withimg-loader
* 常用Plugin
  * 生成HTML文件 Html-webpack-plugin
  * 删除dist目录 clean-webpack-plugin
  * 压缩css文件 optimize-css-assets-webpack-plugin
  * 压缩js文件 uglifyjs-webpack-plugin
  * 复制目录插件 copyWebpackPlugin
  * 添加版权声明 bannerPlugin
  * 提取css文件 mini-css-extract-plugin extract-text-webpack-plugin
* Webpack 优化
  * noParse 不去解析某依赖包中的依赖关系 jquery
  * IgnorePlugin 加载某依赖时，忽略某文件 moment
  * DllPlugin、DllRederencePlugin 动态链接库 react
  * Tree-Sharking、 Scope-Hosting
* 引入依赖
  * expose-loader 暴露到window上
  * providePlugin 给每个模块都注入
  * externals选项 CDN引入 不打包
* 定义环境变量 DefinePlugin
* 不同环境 【common、dev、prod】
* 多线程打包 happypack
* 抽离公共代码
* 懒加载 & 热加载
* 打包单页&多页应用
* Webpack跨域 & watch用法
* 优化构建速度
* 分析打包结果
* Webpack & Grunt & Gulp的区别
* 手写loader
* 手写plugin
* 手写简易版的webpack
  * babylon 将源码转换成AST
  * @babel/traverse 遍历节点
  * @babel/types 替换节点
  * @babel/generator 将替换好的节点生成
* 理解Tapable



## Vue

* MVC & MVVM的理解
* Virtual DOM的理解
* 数据双向绑定 & 组件化
* Vue常见API
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



## ReactNative

* 搭建RN环境 & Weex环境
* Flexbox布局
* 导航间数据传递
* 公共组件的封装
* 常用组件
  * 列表组价 FlatList (上拉刷新、下拉加载)
  * 数据存储组件 AsyncStorage
  * 提示符组件 ActivityIndicator
  * 滚动组件组件 ScrollView
  * 状态栏组件 StatusBar
  * 加载网页组件 WebView
  * 动画组件 Animated
  * 样式组件 StyleSheet
  * 获取屏幕组件 Dimensions
* RN项目常用第三依赖
  * 图片缩略图
    * react-native-image-picker
    * react-naitve-progress
    * react-native-image-resizer
  * 导航
    * react-navigation
    * react-native-router-flux
  * 启动屏
    * react-native-splash-screen
  * 微信 & 支付宝支付
    * react-native-wechat
    * react-native-yunpeng-alipay
  * 热更新
    * react-native-code-push
* 视图组件库
  * antd-mobile-rn
* RN项目安卓 & IOS打包