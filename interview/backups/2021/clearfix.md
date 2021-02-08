---
title: 清除浮动之 clearfix 的原理和方法
date: 2016-11-17
categories: CSS
tags: CSS
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/01.webp
---

`CSS` 的 `float`（浮动），会使元素向左或向右移动，其周围的元素也会重新排列，但是本质上来说，`float` 一般是用于图像的，比如文字环绕图片的效果，但它在布局时一样非常有用，下面是一些需要注意的地方

<!--more-->

* 元素的水平方向浮动，意味着元素只能左右移动而不能上下移动
* 一个浮动元素会尽量向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止
* 浮动元素之后的元素将围绕它
* 浮动元素之前的元素将不会受到影响


## 问题的由来

有这样一种情形，在一个容器（`container`）中，有两个浮动的子元素

```html
<div>
  <div style="float:left;width:45%;"></div>
  <div style="float:right;width:45%;"></div>
</div>
```

在浏览器中一运行，就会出现意想不到的结果，实际视图是子元素显示在父容器的『外部』

## 问题的原因与浮动定位有关

在 `CSS` 规范中，浮动定位『不属于』正常的页面流（`page flow`），是『独立定位』的，所以，只含有浮动元素的父容器，在显示时不考虑子元素的位置，就当它们不存在一样，这就造成了显示出来，父容器好像空容器一样，但是解决的方法有很多种，下面我们就一种一种来看


## 解决方法一，添加空元素

经典的解决方法，就是在浮动元素下方添加一个非浮动元素

```html
<div>
  <div style="float:left;width:45%;"></div>
  <div style="float:right;width:45%;"></div>
  <div style="clear:both;"></div>
</div>
```

原理是父容器现在必须考虑非浮动子元素的位置，而后者肯定出现在浮动元素下方，所以显示出来，父容器就把所有子元素都包括进去了，这种方法比较简单，但是要在页面中增加冗余标签，违背了语义的原则

## 解决方法二，浮动的父容器

另一种思路是，索性将父容器也改成浮动定位，这样它就可以带着子元素一起浮动了

```html
<div style="float:left;">
  <div style="float:left;width:45%;"></div>
  <div style="float:right;width:45%;"></div>
</div>
```

这种方法不用修改 `HTML` 代码，但是缺点在于父容器变成浮动以后，会影响到后面元素的定位，而且有时候，父容器是定位死的，无法变成浮动

## 解决方法三，浮动元素的自动 clearing

让父容器变得可以自动清理（`clearing`）子元素的浮动，从而能够识别出浮动子元素的位置，不会出现显示上的差错，要做到这点，只要为父容器加上一条 `'overflow: hidden'` 的 `CSS` 语句就行了，至于为什么加上 `'overflow: hidden'` 就可以解决此类问题，可以参考 [块格式化上下文| MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

```html
<div style="overflow: hidden;">
  <div style="float:left;width:45%;"></div>
  <div style="float:right;width:45%;"></div>
</div>
```

这种方法的缺点主要有二个，一个是 `IE6` 不支持，另一个是一旦子元素的大小超过父容器的大小，就会出显示问题

## 解决方法四，通过 CSS 添加子元素

那么我们能不能通过 `CSS` 语句添加子元素呢，这样就不用修改 `HTML` 代码了，答案是可以的，我们知道 `CSS` 语句中有一个 `:after` 伪选择符，就可以在父容器的尾部自动创建一个子元素，这正好符合我们的需要

```css
.clearfix:after {
  content: '';
  display: block;
  height: 0;
  clear: both;
}
```

解释如下

* `clearfix` 是父容器的 `class` 名称
* `content: ''` 是在父容器的结尾处放一个空白字符
* `height: 0` 是让这个这个空白字符不显示出来
* `display: block` 和 `clear: both` 则是确保这个空白字符是非浮动的独立区块

需要注意 `:after` 选择符 `IE6` 不支持，也就是说上面的这段代码在 `IE6` 中无效，这怎么办？针对于这种情况，我们添加一条 `IE6` 的独有命令 `zoom: 1` 就行了，这条命令的作用是激活父元素的 `hasLayout` 属性，让父元素拥有自己的布局，`IE6` 会读取这条命令，其他浏览器则会直接忽略它

## 最终代码

```css
.clearfix:after {
  content: '';
  display: block;
  height: 0;
  clear: both;
}

.clearfix {
  zoom: 1;
}
```

## 什么是 hasLayout

`IE` 使用 `layout` 概念来控制元素的尺寸和位置，如果一个元素有 `layout`，它就有自身的尺寸和位置，如果没有，它的尺寸和位置由最近的拥有布局的祖先元素控制，在默认情况下，拥有 `Layout` 的元素有以下这些

```html
<html>, <body>
<table>, <tr>, <th>, <td>
<img>
<hr>
<input>, <button>, <select>, <textarea>, <fieldset>, <legend>
<iframe>, <embed>, <object>, <applet>
<marquee>
```

> 注意，`<p>` 和 `<div>` 默认不拥有 `Layout`

凡是具有以下 `CSS` 属性的元素，也会拥有布局

```css
.element {
  float: left | right;
  display: inline-block;
  width: any value other than 'auto';
  height: any value other than 'auto';
  zoom: any value other than 'normal';        /* IE 专用属性 */
  writing-mode: tb-rl;                        /* IE 专用属性 */
  overflow: hidden | scroll| auto;            /* 只对 IE7 及以上版本有效 */
  overflow-x | -y: hidden | scroll | auto;    /* 只对 IE7 及以上版本有效 */
}
```

`hasLayout` 是 `IE` 特有的属性，不是 `CSS` 属性，可以用 `JavaScript` 函数 `hasLayout` 查看一个元素是否拥有 `layout`，如果有，这个函数就返回 `true`，否则返回 `false`，`hasLayout` 是一个只读属性，所以无法使用 `JavaScript` 进行设置



## 参考

* [浮动原理](http://www.w3cfuns.com/blog-5452328-5400604.html)
* [块格式化上下文| MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)