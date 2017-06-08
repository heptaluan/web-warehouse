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

比如 ```<div></div>``` 标签被浏览器解析后会生成 div 元素并添加到 document tree 中，但 CSS 作用的对象并不是 document tree，而是根据 document tree 生成的 render tree，而盒子模型就是 render tree 的节点

两点特别需要注意的地方：

* CSS 作用的是盒子（box）而不是元素（element）

* JS 无法直接操作盒子