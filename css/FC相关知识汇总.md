一开始浅显的以为盒子模型就那么回事，了解了相关知识以后才发现水深不见底，这里也只浅显的了解一下 BFC、IFC、GFC 和 FFC 等的一些入门知识，想深入了解的可以见下面的规范，里面有详细的描述

FC 的全称是：Formatting Contexts，是 [W3C CSS2.1 规范](https://www.w3.org/TR/CSS2/) 中的一个概念，它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用

在深入展开 FC 相关知识前，我们先来了解一下盒模型

## 盒子模型的结构

![盒子模型](http://images2015.cnblogs.com/blog/347002/201603/347002-20160317004252474-1628947975.png)

盒子模型其实就是由以下 4 个盒子组成：

* content box：必备，由 content area 和 4 条 content/inner edge 组成

* padding box：可选，由 padding 和 4 条 padding edge 组成，若 padding 宽度设置为 0，则 padding edge 与 content edage 重叠

* border box：可选，由 border 和 4 条 border edge 组成，若 border 宽度设置为 0，则 border edge 与 padding edage 重叠

* margin box：可选，由 margin 和 4 条 margin/outer edge 组成，若 margin 宽度设置为 0，则 margin edge 与 border edage 重叠

一般所说的盒模型有两种情况，一个是标准盒子模型，另一种是怪异盒子模型（IE 盒子模型），两者的区别就在于计算 width 和 height 的时候是否包含 padding/margin/border

块级元素会自动生成一个块级盒 block-level box，这是块级盒 block-level-box 的盒模型构成，它表明的是块级盒自身的结构构成

从上面可以看出，margin、border、padding、content 分别定义了元素四种边，然后每种类型的边的四条边定义了一个盒子，分别是 content box、padding box、border box、margin box，而决定块盒在包含块中与相邻块盒的垂直间距的便是 margin-box，这个 margin-box 是始终存在的，即使它的 margin 为 0

比如一个元素 ```<div></div>```，会生成一个块级的元素，同时元素也生成了一个块级盒子，如果不设置 div 的 margin 值，但是仍然可以在浏览器生成的 computed style 中看到它的 margin 值是为 0 的

特别需要注意的是：当 ```<div></div>``` 标签被浏览器解析后会生成 div 元素并添加到 document tree 中，但 CSS 作用的对象并不是 document tree，而是根据 document tree 生成的 render tree，而盒子模型就是 render tree 的节点

* CSS 作用的是盒子（box）而不是元素（element）

* JS 无法直接操作盒子

Box（盒子模型）是 CSS 布局的对象和基本单位，直观点来说，就是一个页面是由很多个 Box 组成的

元素的类型和 display 属性，决定了这个 Box 的类型，不同类型的 Box，会参与不同的 Formatting Context（一个决定如何渲染文档的容器），因此 Box 内的元素会以不同的方式渲染

#### Formatting context

Formatting context 是 W3C CSS2.1 规范中的一个概念

它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用

最常见的 Formatting context 有 Block fomatting context（BFC）和 Inline formatting context（IFC）

CSS2.1 中只有 BFC（Block Formatting Contexts） 和 IFC（Inline Formatting Contexts）（关于 BFC 与 IFC 内容见列表）, CSS3 中还增加了 GFC（GridLayout Formatting Contexts） 和 FFC（Flex Formatting Contexts）

----

----

## BFC

BFC 直译为 "块级格式化上下文"，它是一个独立的渲染区域，只有 Block-level box 参与， 它规定了内部的 Block-level Box 如何布局，并且与这个区域外部毫不相干

BFC 是一块渲染区域，那这块渲染区域到底在哪，它又是有多大，而这些则由生成 BFC 的元素决定（即哪些元素会生成 BFC）

* 根元素，即 HTML 元素

* float 属性不为 none

* overflow 的值不为 visible

* position 为 absolute 或 fixed

* display 为 inline-block, table-cell, table-caption, flex, inline-flex

  * 关于 display：table，之所以可以生成 BFC，主要原因在于 table 会默认生成一个匿名的 table-cell，正是这个匿名的 table-cell 生成了BFC


## IFC

IFC 直译为 "内联格式化上下文"，IFC 的 line box（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的 padding/margin 影响）

IFC 中的 line box 一般左右都贴紧整个 IFC，但是会因为 float 元素而扰乱，float 元素会位于 IFC 与 line box 之间，使得 line box 宽度缩短

同个 ifc 下的多个 line box 高度会不同， IFC 中时不可能有块级元素的，当插入块级元素时（如 p 中插入 div ）会产生两个匿名块与 div 分隔开，即产生两个 IFC，每个 IFC 对外表现为块级元素，与 div 垂直排列


## GFC

GFC 直译为 "网格布局格式化上下文"，当为一个元素设置 display 值为 grid 的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器（grid container）上定义网格定义行（grid definition rows）和网格定义列（grid definition columns）属性各在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间

GFC 同 table 类似，同样是一个二维的表格，但GridLayout会有更加丰富的属性来控制行列，控制对齐以及更为精细的渲染语义和控制


## FFC

FFC 直译为"自适应格式化上下文"，display 值为 flex 或者 inline-flex 的元素将会生成自适应容器（flex container）

可惜这个属性只有谷歌和火狐支持，Flex Box 由伸缩容器和伸缩项目组成，通过设置元素的 display 属性为 flex 或 inline-flex 可以得到一个伸缩容器

设置为 flex 的容器被渲染为一个块级元素，而设置为 inline-flex 的容器则渲染为一个行内元素

伸缩容器中的每一个子元素都是一个伸缩项目，伸缩项目可以是任意数量的，伸缩容器外和伸缩项目内的一切元素都不受影响，简单地说，Flexbox 定义了伸缩容器内伸缩项目该如何布局