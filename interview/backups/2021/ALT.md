---
title: ALT 与 TITLE 的区别
date: 2016-10-10
categories: JavaScript
tags: JavaScript
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/02.webp
---

首先需要明确一下概念，`alt` 是 `HTML` 标签的『属性』，而 `title` 既是 `HTML` 的『标签』，又是 `HTML`『属性』

<!--more-->

## ALT 属性

最常见用在 `<img>` 标签上，一般来说，`alt` 属性是一个非必需的属性，但是建议对于图片元素来说，最好加上 `alt` 属性，它用于在图像无法显示或者用户禁用图像显示时，代替图像显示在浏览器中的内容

强烈推荐在文档的每个图像中都使用这个属性，这样即使图像无法显示，用户还是可以看到关于丢失了什么东西的一些信息，而且对于残疾人来说，`alt` 属性通常是他们了解图像内容的唯一方式，而如果是对于那些装饰性的图片来说，可以使用空的值来进行表示，而不是使用不相关的替换文字


#### 用法

`alt` 属性只能用在 `img`，`area` 和 `input` 元素中（包括 `applet` 元素），对于 `input` 元素，`alt` 属性意在用来替换提交按钮的图片，比如

```html
<input type="image" src="test.gif" alt="提交" />
```


## TITLE 属性

`title` 属性规定关于元素的额外信息，这些信息通常会在鼠标移到元素上时显示一段工具提示文本（`tooltip text`），`title` 属性有一个很好的用途，即为链接添加描述性文字，特别是当连接本身并不是十分清楚的表达了链接的目的，这样就使得访问者知道这些链接将会带他们到什么地方，而不是加载一个可能完全不感兴趣的页面，另外一个潜在的应用就是为图像提供额外的说明信息，比如日期或者其他非本质的信息

#### 用法

`title` 属性可以用在除了 `base`，`basefont`，`head`，`HTML`，`meta`，`param`，`script` 和 `title`『之外的所有标签，但是并不是必须的』


## TITLE 标签

`<title>` 元素可定义文档的标题，浏览器会以特殊的方式来使用标题，并且通常把它放置在浏览器窗口的标题栏或状态栏上，同样，当把文档加入用户的链接列表或者收藏夹或书签列表时，标题将成为该文档链接的默认名称

> `<title>` 标签是 `<head>` 标签中唯一要求包含的东西


## 易于混淆的部分

通常容易搞错的是 `title` 和 `alt` 这两个属性同时用于 `img` 标签的时候，在旧版本的 `IE` 浏览器中，鼠标经过图像时显示的提示文字是 `alt` 的内容，而忽略了 `title` 属性，因此，如果想在 `IE` 中显示 `title` 的内容，要么 `title` 属性和 `alt` 一致，要么 `alt` 内容为空，不过在新版的 `IE`（`IE8` 及以上）中，已不会出现这种情况了

> 另外，当 `a` 标签内嵌套 `img` 标签时，起作用的是 `img` 的 `title` 属性


## SEO

`alt` 标签属于图片中的属性标签，完整的图片属性应该包含 `src`，`alt`，`title` 三种属性，虽然 `alt` 标签不是直接的排名因素，但是在图片中加入 `alt` 标签利于搜索引擎解读图片的内容，并在一定程度上提升关键词排名的效果，使用 `alt` 属性还具有搜索引擎优化效果，因为搜素引擎是无法直接读取图像的信息的，`alt` 可以为其提供文字信息所以对搜索引擎比较友好

图片描述最好是用简短的语句，描述这张图片的内容，如果是链接，则描述链接的作用，并带上关键词，不好的习惯是每张图片都没有 `alt` 标签，而不可取的是，对于每个标签都采用关键词堆砌，这样就有可能会导致被视为垃圾网站

> `alt` 标签是一个通用术语，而不是写法，实际上 `alt` 是 `img` 标签中的一个替代文本属性，简单点来说 `alt` 标签就是用来描述图像内容的意思
