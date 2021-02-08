---
title: CSS 知识梳理
date: 2020-07-12
categories: CSS
tags: CSS
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/19.webp
---

接上回 [HTML 知识梳理](https://heptaluan.github.io/2020/06/29/HTML/00/)，还是接着之前的节奏，继续梳理 `CSS` 相关知识点，更多详细内容可见 [前端知识体系整理](https://heptaluan.github.io/target/)

<!--more-->

本章当中主要内容包括以下这些

* 盒子模型
* 样式来源与层叠规则（层叠权重值）
* 伪类与伪元素
* 经典布局
* `BFC`
* 清除浮动的方法
* `float/display/position/z-index/line-height/vertical-align`





## 盒子模型

盒子模型，英文即 `Box Model`，无论是 `div`、`span` 还是 `a` 标签都是盒子，但是图片、表单元素一律看作是文本，它们并不是盒子，这个很好理解，比如说一张图片里并不能放东西，它自己就是自己的内容

盒模型尺寸基准有两种，分别是默认的标准盒子模型和 `IE` 盒子模型，如下图

![](https://gitee.com/heptaluan/backups/raw/master/cdn/css/19-01.png)

在 `CSS` 盒子模型（`Box Model`）规定了元素处理元素的几种方式

* `width/height`，内容的宽度、高度（不是盒子的宽度、高度）
* `padding`，内边距
* `border`，边框
* `margin`，外边距

`CSS` 盒模型和 `IE` 盒模型的区别如下

* 在标准盒子模型中，`width` 和 `height` 指的是内容区域的宽度和高度，增加内边距、边框和外边距不会影响内容区域的尺寸，但是会增加元素框的总尺寸（对应着 `box-sizing` 当中的的 `content-box`）
* `IE` 盒子模型中，`width` 和 `height` 指的是内容区域加上 `border` 和 `padding` 的宽度和高度（对应着 `box-sizing` 当中的的 `border-box`）

其实这里存在一个小故事，就是在早期的时候，`IE` 与 `W3C` 针对盒模型的定义是各执一词的，但是多年过去以后，`W3C` 感觉还是 `IE` 的那个模型比较好，但已经回不去了，所以就添加了一个 `box-sizing` 的属性来支持 `IE` 的盒子模型，也就是利用 `box-sizing` 的两个取值 `content-box` 和 `border-box` 来调整盒模型，具体使用方式可以参考下面这个 `MDN` 上面的示例

<iframe width="100%" height="355px" frameborder="0" src="https://interactive-examples.mdn.mozilla.net/pages/css/box-sizing.html"></iframe>






## 样式来源与层叠规则

`CSS` 即所谓的层叠样式表，就是浏览器对多个样式来源进行叠加，最终确定结果的过程，之所有有层叠的概念，是因为有多个样式来源，具体为下面五种

* `<div style=""></div>` 属性样式
* `<style></style>` 内部样式
* `<link>` 引用样式
* 浏览器用户自定义样式
* 浏览器默认样式（指的一些浏览器自带功能，比如字体的放大缩小，用户在这里设置了字体和字号以后，它们会覆盖掉浏览器默认的样式）

上面三个可以利用程序来控制（比如 `CSS` 文件，行内样式等），后面两个则是浏览器的行为，由于样式的来源不同，浏览器在加载样式时，需要计算出最终的样式值，这里的规则就是，浏览器会让后面的样式覆盖前面的样式（行内的话同样适用），例如下面这两种，即相同选择器在层叠时，后加载的覆盖前加载的

```css
<div style="color:red; color:blue;"></div>

p {
  color: red;
  color: blue;
}
```

这里就涉及到了一个选择器优先级的概念，更为具体的内容可以参考 [样式的层叠权重值](https://heptaluan.github.io/2019/04/16/CSS/18/)，包含的内容如下

* `CSS` 权重的介绍
* 选择器权重值的计算
* 特殊的 `!important`
* 关于 `inherit`





## 伪类与伪元素

可以参考之前已经整理好的博文 [伪类与伪元素](https://heptaluan.github.io/2018/11/25/CSS/04/)，主要内容包括以下各部分

* 伪类与伪元素的介绍
* 伪元素是使用单冒号还是双冒号
* 如何获取和更改伪元素的值





## 经典布局

详细的可以参考之前已经整理好的博文 [CSS 常见布局方式](https://heptaluan.github.io/2019/09/12/CSS/11/)，主要内容包括以下各部分

* [文档流布局](https://heptaluan.github.io/demos/css/文档流布局.html)
* [浮动布局](https://heptaluan.github.io/demos/css/浮动布局.html)
* [定位布局](https://heptaluan.github.io/demos/css/定位布局.html)
* [圣杯布局](https://heptaluan.github.io/demos/css/圣杯布局.html)
* [双飞翼布局](https://heptaluan.github.io/demos/css/双飞翼布局.html)
* [网格布局](https://heptaluan.github.io/demos/css/网格布局.html)
* `flex` 布局






## BFC

平常经常听闻的 `BFC` 其实只是 `FC`（`Formatting Contexts`）当中的一种，其它的还有 `IFC`（`Inline Formatting Contexts`），`GFC`（`GridLayout Formatting Contexts`），`FFC`（`Flex Formatting Contexts`）等，详细的可以参考以下之前已经整理好的博文

* [BFC](https://heptaluan.github.io/2018/12/03/CSS/06/)
  * 盒子模型的结构
  * `Formatting Contexts`
  * `GFC`
  * `FFC`
  * `BFC`
  * `BFC` 的生成
  * `BFC` 的应用
* [IFC](https://heptaluan.github.io/2018/12/05/CSS/07/)
  * `IFC` 定义
  * 注意事项
  * 影响效果
* [IE 中的 haslayout](https://heptaluan.github.io/2018/10/12/CSS/08/)
  * `haslayout` 定义
  * 触发 `layout`
  * 解决的问题








## float、display、position、z-index、line-height、vertical-align

关于 `CSS` 当中的这些属性，之前都抽时间算是比较深入的了解了一番，具体链接和内容可以参考下方

* [CSS 当中的 float](https://heptaluan.github.io/2018/11/28/CSS/05/)
  * 特性
  * 包裹性
  * 块状化
  * 作用机制
* [CSS 当中的 display](https://heptaluan.github.io/2018/11/29/CSS/13/)
  * `none/visibility`
  * `inline/block/inline-block`（`lock-level`）
* [CSS 当中的 position](https://heptaluan.github.io/2018/11/30/CSS/14/)
  * 包含块
  * 偏移属性
  * 绝对定位
  * 格式化
  * `auto`
  * 相对定位/固定定位/粘性定位
* [CSS 当中的 line-height](https://heptaluan.github.io/2018/12/10/CSS/15/)
  * `x`、`x-height` 以及 `ex`
  * 行内框盒子模型
  * 行高、行距
  * 替换元素
  * 取值
  * `line-height` 与图片的表现
* [CSS 当中的 vertical-align](https://heptaluan.github.io/2019/01/08/CSS/16/)
  * `vertical-align`
  * 线类（`baseline/top/middle`）
  * 文本类（上标下标类/数值百分比类）
  * `vertical-align` 起作用的前提
  * `vertical-align` 与 `line-height` 的关系
  * 关于边界和 `baseline`（`inline/inline-block/line-box`）
  * `line-box` 的 `baseline` 的移动问题
  * 使用场景
* [CSS 当中的 z-index](https://heptaluan.github.io/2019/02/02/CSS/17/)
  * 层叠上下文
  * 如何形成层叠上下文？
  * 层叠上下文如何影响层叠
  * 不含 `z-index` 元素如何层叠
  * 浮动的块元素如何层叠
  * `z-index` 如何影响层叠


