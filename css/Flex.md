关于 ```Flex``` 布局，由于平时接触的比较少，待用到的时候再来深入学习，阮一峰老师的两篇文章已经介绍的很详细了，各个 ```API``` 的介绍和对应的 ```demo``` 都很齐全

* [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool)

* [Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

* [Flex 布局示例](http://static.vgee.cn/static/index.html)

----

这里做一些简单的记录，遇到坑的时候在来填

----

```Flexbox``` 布局常用于小的应用程序组件之中，而 [CSS Grid](http://www.w3cplus.com/blog/tags/355.html) 布局模块将应用于大规模的布局之中

```Flex``` 是 ```Flexible Box``` 的缩写，意为 "弹性布局"，用来为盒状模型提供最大的灵活性，设为 ```Flex``` 布局以后，子元素的 ```float```、```clear``` 和 ```vertical-align``` 属性将失效

任何一个容器都可以指定为 ```Flex``` 布局

```css
#box{
    display: flex;
    width: 500px;
    height: 300px;
    border: 10px solid red;
}
```

有六个属性设置在 ```box``` **父容器**上，来控制子元素的显示方式

* ```flex-direction```   设置主轴对齐方式  默认 ```row``` 是从 ```x```轴从左到右

* ```flex-wrap```   子元素换行的方式  默认 ```nowrap``` 

* ```flex-flow```   ```flex-direction```和```flex-wrap```的简写 默认row nowrap

* ```justify-content```   子元素的对齐方式  默认 ```flex-start```  左对齐

* ```align-items```  

* ```align-content```

有六个属性设置在**子元素**项目上

* ```order```

* ```flex-grow```

* ```flex-shrink```

* ```flex-basis```

* ```flex```

* ```align-self```

----

#### 两个是官方提供的文档

[CSS弹性盒子布局](https://www.w3.org/TR/css-flexbox/)

[Flexbox - model](https://www.w3.org/TR/css-flexbox/#box-model)

----

#### 中文文档

[CSS 伸缩盒布局模组 - 中/英版本](https://www.w3.org/html/ig/zh/css-flex-1/)

----

#### flexbox 下的一些 BUG/坑

[Flexbugs](https://github.com/philipwalton/flexbugs)

[使用Flexbox碰到了什么样的坑？](https://www.zhihu.com/question/29924791)

----

#### 参考资料

[Flex布局](http://www.cnblogs.com/module/p/5578533.html)

[一劳永逸的搞定 flex 布局](http://blog.csdn.net/magneto7/article/details/70854472)

[A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

[A Visual Guide to CSS3 Flexbox Properties](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties)

[What The FlexBox?!](https://flexbox.io/#/auth/f795d7620aa45b7c4c3d220d74952565)

[flex - CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex?v=example)

[Flexbox adventures](https://chriswrightdesign.com/experiments/flexbox-adventures/)

[探索Flexbox](http://www.w3cplus.com/css3/flexbox-adventures.html)

[Flexbox，更优雅的布局](https://segmentfault.com/a/1190000002490633)

[flex | CSS-Tricks](https://css-tricks.com/almanac/properties/f/flex/)
