目录列表

----

### Angular 笔记

记录一些工作当中接触到的一些 Angular 相关知识点

[01、Angular 中的 :host 和 ::ng-deep](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/note/01.md)

[02、ExpressionChangedAfterItHasBeenCheckedError](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/note/02.md)

[03、flex 取值（0，1，auto）相关问题](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/note/03.md)

[04、Angular 动态加载](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/note/04.md)

  * 动态加载已经声明的组件

  * 动态创建模块的方式来加载动态创建的组件

  * 相关问题，创建动态组件后调用 `componentRef.instance` 不能更新界面数据

  * `Angular` 中利用指令来指定宿主对象

  * `Angular` 中如何动态添加宿主

  * 如何与动态添加后的组件进行通信

  * 扩展内容可见下方的第八点，`Injector`，可以算是源码剖析了，包含以下内容

    * `Angular Metadata`

    * `Injector` 和 `Injector` 的子类

    * `_NullInjector`（用于表示空的注入器）

    * `ReflectiveInjector`（用于实例化对象和解析依赖，利用其身上的静态方法）

      * `resolveAndCreate()`

      * `resolve()`

        * `Provider[]` 类型

        * `ResolvedReflectiveProvider[]` 接口

          * `ResolvedReflectiveFactory` 类

            * `ReflectiveDependency` 类

              * `ReflectiveKey` 类

        * `resolveReflectiveProviders()` 方法，分为四步

          * 规范化 `Provider`

          * 转化 `NormalizedProvider` 为 `ResolvedReflectiveProvider`

          * 合并已解析的 `Provider`

          * 生成 `ResolvedReflectiveProvider[]`

      * `fromResolvedProviders()`

        * `ReflectiveInjector_`（构造函数，属性，方法）方法主要涉及下面四个

          * 用于创建 `ReflectiveInjector` 注入器

          * 用于获取对象

          * 用于创建对象

          * 用于获取工厂函数依赖对象



### Angular 修仙之路

主要参考 [Angular 4.x 修仙之路](https://segmentfault.com/u/angular4)

包含了 `Angular` 绝大部分内容，干货很多，可以钻研很长一段时间了，感谢作者的无私分享

[01、Http 和路由](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/Angular修仙之路/note/01.md)

[02、数据绑定，@ViewChild()，ng-content，管道，组件间的参数传递，生命周期钩子（变化检测机制）](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/Angular修仙之路/note/02.md)

[03、模版式表单，响应式表单，表单校验](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/Angular修仙之路/note/03.md)

[04、@Input，@Output，Constructor，ngOnInit，WebSocket](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/Angular修仙之路/note/04.md)

[05、HostListener，HostBinding，装饰器](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/Angular修仙之路/note/05.md)

[06、rxjs](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/Angular修仙之路/note/06.md)

[07、依赖注入](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/Angular修仙之路/note/07.md)

[08、Injector](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/Angular修仙之路/note/08.md)





### Angular-Task

这里仅为问题汇总和笔记记录

[00、错误集锦](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/Angular-Task/00.md)

[01、项目结构, flex 布局](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/Angular-Task/01.md)

[02、material](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/Angular-Task/02.md)

[03、Amimation](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/Angular-Task/03.md)

[04、依赖注入](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/Angular-Task/04.md)

[05、Angular 检查机制，ChangeDetection](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/Angular-Task/05.md)

[06、指令，模块](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/Angular-Task/06md)

[07、响应式表单，自定义表单](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/Angular-Task/07.md)

[08、rxjs 常见的操作符](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/Angular-Task/08.md)

[09、rxjs 高阶操作符](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/Angular-Task/09.md)

[10、Observable 的冷和热，Subject](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/Angular-Task/10.md)

[11、Redux](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/Angular-Task/11.md)

[12、Angular 中的测试](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/Angular-Task/12.md)

[12、effect](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/Angular-Task/13.md)




### Angular 4.x

[00、Angular-CLI 脚手架安装目录结构剖析](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/4.x/00.md)

[01、整体架构，@NgModule，模块库，组件](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/4.x/01.md)

[02、属性绑定，数组循环，事件，双向数据绑定](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/4.x/02.md)

[03、get，jsonp，post，rxjs](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/4.x/03.md)

----

### AngularJS 1.5.x

来源 [图灵社区](http://www.ituring.com.cn/tag/32022)

[01、双向绑定，内部指令，表达式](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/1.5.x/01.md)

[02、控制器，构建服务的几种方式和区别](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/1.5.x/02.md)

[03、表单验证，ajax，作用域（Scope），服务实例，依赖注入](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/1.5.x/03.md)

* 自定义指令

  * [01、自定义指令的定义，使用和参数配置](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/1.5.x/04.md)

  * [02、compile 和 link](https://github.com/hanekaoru/WebLearningNotes/blob/master/angular/note/Angular/1.5.x/05.md)
