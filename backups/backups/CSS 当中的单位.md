---
title: CSS 当中的单位
date: 2019-08-04
categories: CSS
tags: CSS
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/11.jpg
---


我们先来看看比较常见的三个单位 `px`，`em`，`rem` 的区别

<!--more-->

* `px` -- 相对长度单位，也是用的最多的一种单位，像素 `px` 是相对于显示器屏幕分辨率而言的

* `em` -- 值并不是固定的，会继承父级元素的字体大小，代表倍数

* `rem` -- 值并不是固定的，是 `CSS3` 新增的一个相对单位（简单记法，`r` 是 `root` 的缩写），相对于根元素 `<html>` 的字体大小，也代表倍数


## em

`em` 的使用是相对于其父级的字体大小的（继承），即倍数，浏览器的默认字体高都是 `16px`，未经调整的浏览器显示 `1em = 16px`

但是有一个问题，如果设置 `1.2em` 则变成 `19.2px`，问题是 `px` 表示大小时数值会忽略掉小数位的

而且 `1em = 16px` 的关系不好转换，因此，常常人为地使 `1em = 10px` 这里要借助字体的 `%` 来作为桥梁

因为默认时字体 `16px = 100%`，则有 `10px = 62.5%`，所以首先在 `body` 中全局声明 `font-size = 62.5% = 10px`

也就是定义了网页 `body` 默认字体大小为 `10px`，由于 `em` 有继承父级元素字体大小的特性，如果某元素的父级没有设定字体大小，那么它就继续了 `body` 默认字体大小 `1em = 10px`

但是由于 `em` 是相对于其父级字体的倍数的，当出现有多重嵌套内容时，使用 `em` 分别给它们设置字体的大小往往要重新计算

比如说你在父级中声明了字体大小为 `1.2em`，那么在声明子元素的字体大小时设置 `1em` 才能和父级元素内容字体大小一致，而不是`1.2em`（避免 `1.2 * 1.2 = 1.44em`）

```html
<span>
  outer
  <span>inner</span> 
</span>
```

```css
body {
  font-size: 62.5%;
}

span {
  font-size: 1.6em;
}
```

结果

外层 `<span>` 为 `body` 字体 `10px` 的 `1.6` 倍，即 `16px`

内层 `<span>` 为外层内容字体 `16px` 的 `1.6` 倍，即 `25px`（也有可能是 `26px`，不同浏览器取舍小数不同）

明显地，内部 `<span>` 内的文字受到了父级 `<span>` 的影响，基于这点，在实际使用中给我们的计算带来了很大的不便

> 有一个比较普遍的误解，认为 `em` 单位是相对于父元素的字体大小，事实上，根据 [W3 标准](https://www.w3.org/TR/css3-values/#font-relative-lengths) ，它们是相对于使用 `em` 单位的元素的字体大小
>
> 父元素的字体大小可以影响 `em` 值，但这种情况的发生，纯粹是因为继承



## rem

`rem` 转化为像素大小取决于**页面根元素**的字体大小，即 `html` 元素的字体大小

比如默认的 `html` 的 `font-size` 属性为 `16px`，那么想设置 `12px` 的文字就是 `12 / 16 = 0.75(rem)`

`rem` 的原理布局的本质是等比缩放，一般是基于宽度

假设将屏幕宽度分为 `100` 份，每份宽度是 `1rem`，`1rem` 的宽度是 `屏幕宽度 / 100`

然后子元素设置 `rem` 单位的属性， 通过改变 `html` 元素的字体大小，就可以设置子元素的实际大小

仍然是上面的例子，`CSS` 改为

```css
html {
  font-size: 62.5%;
}

span {
  font-size: 16px;
  font-size: 1.6rem;
}
```

结果：内外 `<span>` 的内容均为 `16px`

> 有时候会遇到 `rem` 布局加载闪烁的问题，这时可以使用媒体查询设置默认根元素字体大小，或者调整对应闪烁元素的长度



## vh 和 vw

在 `CSS3` 当中引入了所谓的视窗单位，它允许我们更接近浏览器窗口来定义大小，如下图

![](https://gitee.com/heptaluan/backups/raw/master/cdn/css/15.png)

* 在桌面端，视窗指的是在桌面端，指的是浏览器的可视区域

* 而在移动端，它涉及3个视窗

  * `Layout Viewport`（布局视窗）
  
  * `Visual Viewport`（视觉视窗）
  
  * `Ideal Viewport`（理想视窗）

而视窗单位中的视窗

* 桌面端指的是浏览器的可视区域

* 移动端指的就是 `Viewport` 中的 `Layout Viewport`

![](https://gitee.com/heptaluan/backups/raw/master/cdn/css/16.png)

比如说我们有一个 `1000px * 800px` 的视窗（`Viewport`）

* `vw` —— `1vw = 视窗宽度的 1%`，即 `50vw = 500px`

* `vh` —— `1vh = 视窗高度的 1%`，即 `50vh = 400px`

* `vmin` —— `vmin` 的值是当前 `vw` 和 `vh` 中较小的值，在我们的例子里因为是横向模式，所以 `50vmin = 400px`

* `vmax` —— 大尺寸的百分比，`50vmax = 500px`

![](https://gitee.com/heptaluan/backups/raw/master/cdn/css/17.png)

这里我们发现视窗宽高都是 `100vw／100vh`，很类似百分比单位，但是 `vw` 和 `%` 之间是有区别的

* `%`	大部分相对于祖先元素，也有相对于自身的情况比如（`border-radius`、`translate` 等）

* `vw/vh`	则相对于视窗的尺寸

从对比中我们可以发现，`vw` 单位与百分比类似，但是这里的 `vw` 更像是理想的百分比单位，任意层级元素，在使用 `vw` 单位的情况下，`1vw` 都等于视图宽度的百分之一

在移动端使用过程中，`vw` 和 `vh` 都是根据视窗来确定实际像素的，但是视窗上的宽度和高度比例不一定是 `1:1` 的

而且一般来说，`vh` 和 `vw` 不用同时使用，使用 `vw` 一般就满足移动端适配的要求了

#### vw 单位换算

同样的，如果要将 `px` 换算成 `vw` 单位，很简单，只要确定视图的窗口大小（布局视窗）

如果我们将布局视窗设置成分辨率大小，比如对于 `iphone 6/7 375*667` 的分辨率，那么 `px` 可以通过如下方式换算成 `vw`

```console
1px = (1 / 375) *100 vw
```

#### 兼容性

![](https://gitee.com/heptaluan/backups/raw/master/cdn/css/18.png)


从上图可以发现，绝大多数的浏览器支持 `vw` 单位，但是 `ie 9-11` 不支持 `vmin` 和 `vmax`

考虑到 `vmin` 和 `vmax` 单位不常用，`vw` 单位在绝大部分高版本浏览器内的支持性很好

但是 `opera` 浏览器整体不支持 `vw` 单位，如果需要兼容 `opera` 浏览器的布局，不推荐使用 `vw`




## 参考

[CSS3 的 REM 设置字体大小](https://www.w3cplus.com/css3/define-font-size-with-css3-rem)

[别说你懂 CSS 相对单位](https://zhuanlan.zhihu.com/p/39270696)