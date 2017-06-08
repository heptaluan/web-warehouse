## BFC

BFC 直译为 "块级格式化上下文"，它是一个独立的渲染区域，只有 Block-level box 参与， 它规定了内部的 Block-level Box 如何布局，并且与这个区域外部毫不相干


#### BFC 的生成

既然 BFC 是一块渲染区域，那这块渲染区域到底在哪，它又是有多大，而这些则由生成 BFC 的元素决定（即哪些元素会生成 BFC）

* 根元素，即 HTML 元素

* float 属性不为 none

* overflow 的值不为 visible

* position 为 absolute 或 fixed

* display 为 inline-block, table-cell, table-caption, flex, inline-flex

  * 关于 display：table，之所以可以生成 BFC，主要原因在于 table 会默认生成一个匿名的 table-cell，正是这个匿名的 table-cell 生成了BFC

#### BFC 布局规则

主要有下面几点：

* 普通流中的块元素（Box）独占一行，然后从上往下一个接一个的排布（垂直方向），相邻元素间会有外边距折叠（垂直方向的距离由 margin 决定，属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠）

* 每个元素的 margin box 的左边， 与包含块 border box 的左边相接触（对于从左往右的格式化，否则相反）（即使存在浮动也是如此）

* BFC 的区域不会与 float box 重叠

* BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素（反之也如此）

* 计算 BFC 的高度时，浮动元素也参与计算


#### BFC 作用

有了上面这些规则，我们就可以来解决平常遇到过的一些问题


**两列布局**

先看下面代码

```html
<style>
body {
    width: 300px;
    position: relative;
}

.aside {
    width: 100px;
    height: 150px;
    float: left;
    background: #f66;
}

.main {
    height: 200px;
    background: #fcc;
}
</style>
<body>
    <div class="aside"></div>
    <div class="main"></div>
</body>
```

效果如下：

![bfc](http://p1.qhimg.com/d/inn/4055c62a/4dca44a927d4c1ffc30e3ae5f53a0b79.png?_=3674372)

根据规则可知，虽然存在浮动的元素 aslide，但 main 的左边依然会与包含块的左边相接触

BFC 不会与 float box 重叠，所以我们可以将 main 生成为 BFC 即可

```css
.main {
    overflow: hidden;
}
```

当触发 main 生成 BFC 后，这个新的 BFC 不会与浮动的 aside 重叠，这样就可以生成一个简单的两列布局

效果如下：

![bfc](http://p6.qhimg.com/t01077886a9706cb26b.png?_=3674372)


**高度坍塌**

这个也是一个比较常见的问题，即内部元素设置了浮动以后，外面包裹的容器，比如 div 的高度会发生坍塌，代码如下：

```html
<style>
.par {
    border: 5px solid #fcc;
    width: 300px;
}

.child {
    border: 5px solid #f66;
    width:100px;
    height: 100px;
    float: left;
}
</style>
<body>
    <div class="par">
        <div class="child"></div>
        <div class="child"></div>
    </div>
</body>
```

效果如下：

![bfc](http://p1.qhimg.com/t016035b58195e7909a.png?_=3674372)

发生这种情况的原因是因为内部的 child 元素使用了 float，使其脱离了文档流，故父元素的高度自然就没有了

解决办法有很多，原理只需要将父元素触发为 BFC 即可

```css
.par {
    overflow: hidden;
}
```

效果如下：

![bfc](http://p2.qhimg.com/t016bbbe5236ef1ffd5.png?_=3674372)


**margin 重叠**

代码如下：

```html
<style>
p {
    color: #f55;
    background: #fcc;
    width: 200px;
    line-height: 100px;
    text-align:center;
    margin: 100px;
}
</style>
<body>
    <p>Haha</p>
    <p>Hehe</p>
</body>
```

效果如下：

![bfc](http://p5.qhimg.com/t01b47b8b7d153c07cc.png?_=3674372)

在控制台中审查元素可知，两个 p 之间的距离为 100px，发送了 margin 重叠，根据规则可知，属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠

解决办法也很简单，我们可以给其中任意一个元素包裹一层容器，并触发该容器生成 BFC，那么此时的两个子元素就不属于同一个 BFC，所以就不会发生 margin 重叠的现象了

```html
<style>
.wrap {
    overflow: hidden;
}
p {
    color: #f55;
    background: #fcc;
    width: 200px;
    line-height: 100px;
    text-align:center;
    margin: 100px;
}
</style>
<body>
    <p>Haha</p>
    <div class="wrap">
        <p>Hehe</p>
    </div>
</body>
```

效果如下：

![bfc](http://p3.qhimg.com/t0118d1d2badbb00521.png?_=3674372)

通过以上几个例子可以看出，同规则一样，BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素（反之也如此）

因为 BFC 内部的元素和外部的元素绝对不会互相影响，因此当 BFC 外部存在浮动时，它不应该影响 BFC 内部 Box 的布局，BFC 会通过变窄，而不与浮动有重叠

同样的，当 BFC 内部有浮动时，为了不影响外部元素的布局，BFC 计算高度时会包括浮动的高度，同样，避免 margin 重叠也是这样的一个道理


参考：

[W3C CSS2.1 规范](https://www.w3.org/TR/CSS2/)

[什么是BFC](http://web.jobbole.com/84808/)

[BFC的理解](http://www.jianshu.com/p/76484dff1cb5)

[深入理解BFC](http://www.cnblogs.com/xiaohuochai/p/5248536.html)

   


   

    

    