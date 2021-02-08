---
title: HTML 知识梳理
date: 2020-06-29
categories: HTML
tags: HTML
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/01.webp
---

最近打算从新的梳理一下自己所掌握的前端知识，因为博客当中记录的内容大部分都是东一块，西一块互不相关，或者说联系比较少，构成不了体系，所以在这里，打算整体的梳理一遍，也算是构建构建属于自己的前端知识体系，所以这里也算是起始点，就先从 `HTML` 开始梳理，路还很遥远，一步一步来，更多详细内容可见 [前端知识体系整理](https://heptaluan.github.io/target/)

<!--more-->

本章当中主要内容包括以下这些，`HTML` 内容可能不算太多，但是以后会慢慢更新

* `Web` 标准
* 文档类型（`DOCTYPE`）
* `HTML5` 标签新特性
* `href/src` 与 `link/@import`
* `HTML` 和 `body` 的区别
* `alt` 与 `title` 的区别
* `meta` 标签有哪些属性，作用是什么
* 渐进增强与优雅降级



## WEB 标准

在平常开发过程中，我们可能会经常听到说开发网页要遵循 `Web` 标准来进行，那么到底什么是 `Web` 标准呢？其实简单来说，`Web` 标准不是某一个标准，而是一系列标准的集合，网页主要由三部分组成

* 结构（`Structure`）
* 表现（`Presentation`）
* 行为（`Behavior`）

对应的标准也分三方面

* 结构化标准语言主要包括 `XHTML` 和 `XML`
* 表现标准语言主要包括 `CSS`
* 行为标准主要包括对象模型 `ECMAScript` 等

看到这里你可能会有一个问题，我们常见的不是 `HTML` 吗，为什么这里是 `XHTML` 和 `XML`，关于这点，我们下面会进行介绍



#### Web 标准计划

在 `Web` 发展的早期，浏览器各自为政，技术无一致实现，这直接损害了设计师、开发者、用户和行业的利益，为了解决这些问题，[Web 标准计划](https://www.webstandards.org/about/mission/zh-simplified/index.html)（`Web Standards Project，WaSP`） 于 `1998` 年成立，目标便是促进核心的 `Web` 标准的推广，鼓励浏览器对标准的支持，为大家寻求一条简单而便利之路

> 如果想了解所有浏览器的相关技术标准，可以参考 [Web Standards Project, WaSP](https://platform.html5.org/)，从中能了解到健全发展的 `Web` 技术生态



#### Web 标准组织

说到 `Web` 标准，就不得不提制定这些标准的组织，这些标准不单只是由一个组织来制定，多个组织各自负责相关的技术领域

**[W3C（World Wide Web Consortium）](https://www.w3.org/)**

`W3C` 组织为 `Web` 开发领域提出了很多建议，比如为 `XHTML`、`XML`、`DOM`、`CSS` 和 `Web API` 等技术实现提出了建议，你可能会注意到为什么说是提出建议，而不是标准呢？

那是因为 `W3C` 自认为不是标准组织，他们只是组织了 `Web` 相关领域的专家，这些专家组成一支工作小组，工作小组就如何实现 `Web` 技术提出建议，尽管 `W3C` 对其建议的实现方案没有任何强制权力，但他们大多数的建议都被视为事实上的标准

`W3C` 组织关注 `DOM`、`CSS`、`HTTP`、媒体、性能、安全、图形学、可访问性和用户隐私等方方面面的技术，在 [All Standards and Drafts](https://www.w3.org/TR/) 当中可以搜索相关技术 ，从 `W3C` 组织成员的 [工作手册](https://www.w3.org/2018/Process-20180201/) 可以看到，一项技术从提出到成为标准，需要经过四个阶段

![](https://gitee.com/heptaluan/backups/raw/master/cdn/html/00-01.png)

1. `WD`（`Working Drafts`）草案阶段
2. `CR`（`Candidate Recommendation`）候选阶段
3. `PR`（`Proposed Recommendation`）提议阶段
4. `REC`（`W3C Recommendation`）正式建议阶段




**[WHATWG（The Web Hypertext Application Technology Working Group）](https://whatwg.org/)**

`WHATWG` 工作小组成立于 `2004` 年，起因是 `W3C` 组织对 `HTML` 不再感兴趣，转而关注 `XHTML` 技术，部分 `W3C` 成员对此行为不满，因此他们决定建立一个新组织推动 `HTML` 发展，制定相关标准，如今 `HTML5` 技术能发展起来，也是得助于 `WHATWG` 小组

`WHATWG` 小组因 `HTML` 而生，负责的 `Web` 标准主要是 `HTML` 相关技术，也涉猎一些 `Web API`，比如 [HTML](https://html.spec.whatwg.org/multipage/)、[DOM](https://dom.spec.whatwg.org/)、[浏览器兼容性](https://compat.spec.whatwg.org/)、[XHR](https://xhr.spec.whatwg.org/)、[Fetch](https://fetch.spec.whatwg.org/)、[Storage](https://storage.spec.whatwg.org/) 和 [URL](https://url.spec.whatwg.org/) 等标准

> 在 [WHATWG Standards](https://spec.whatwg.org/) 可以查看所有标准 

`WHATWG` 组织没有明确说明，一项技术成为标准要经过哪些阶段，他们实行的是现行标准（`Living Standard`），标准由相关负责人维护升级，并由开发者或浏览器厂商提议将新功能加入标准，这一协作过程通过 [Github](https://github.com/whatwg) 的 `Issues` 来讨论

如果仔细看 `WHATWG` 和 `W3C` 制定的标准，会发现有些标准互有重叠，两个组织都有制定相同的技术标准，比如 `DOM` 标准，有一些标准会在开头说明，该标准已经不由我们来维护，请查看某某组织的最新标准，但是其他一些标准并没有这样的说明，至于参考哪一个标准，可以查看 `MDN` 相关技术文档下附加的标准规范链接



**[ECMA](http://www.ecma.ch/)**

`ECMA` 组织负责很多与信息化相关的技术标准，其中应用最广的就是 `TC39` 委员会负责的 [ECMAScript](https://tc39.es/ecma262/) 标准，这标准的实现就是 `JavaScript`，通过 `TC39` 成员的 [工作手册](https://tc39.es/process-document/) 可以看出，每一项对 `ECMAScript` 标准的更新，需要经过五个阶段

1. `Strawman`（`Stage 0`）提案纳入考虑中
2. `Proposal`（`Stage 1`）明确提案的好处，以及可能带来的风险
3. `Draft`（`Stage 2`）使用正式的规范语言描述语法和语义
4. `Candidate`（`Stage 3`）根据使用者反馈进行改良
5. `Finished`（`Stage 4`）准备正式加入 `ECMAScript` 标准

现在正在进行的提案可以在仓库 [tc39 proposals](https://github.com/tc39/proposals) 查看，从中能够学习到最新的语法并参与讨论


**[IETF](https://www.ietf.org/)**

`IETF`（`The Internet Engineering Task Force`）组织主要负责制定互联网基础架构的标准，比如 `TCP/IP` 和 `FTP` 协议


**[The Unicode Consortium](https://www.unicode.org/)**

`The Unicode Consortium` 组织负责 `Unicode` 标准，正如他们所说，我们为每个字符提供一个唯一的编号，无论平台是什么，无论程序是什么，无论语言是什么


#### 总结

其实对于一般 `Web` 开发来说，我们用不上晦涩难懂的标准文档，但学习标准我们可以收获很多，比如解决一些棘手的问题，获取第一手学习资源，全面深入地理解相关技术，了解技术的发展前沿





## 文档类型

`DOCTYPE` 是 `Document Type`（文档类型）的简写，用来说明你用的 `XHTML` 或者 `HTML` 是什么版本，在 `HTML 4.01` 中，`<!DOCTYPE>` 声明引用 `DTD`（文档类型定义，里面包含了文档的规则），因为 `HTML 4.01` 基于 `SGML`，`DTD` 规定了标记语言的规则，这样浏览器才能来解释你页面的标识，并正确地呈现内容

`DTD` 可声明三种类型，分别表示严格版本、过渡版本以及基于框架的 `HTML` 文档，注意 `HTML5` 中的 `DOCTYPE` 之所以可以简单的写为 `<!DOCTYPE html>`，是因为 `HTML5` 不是基于 `SGML` 的，所以不需要引用后面的 `DTD`

#### 作用

简单来说，就是声明文档的解析类型（`document.compatMode`），避免浏览器的怪异模式，`document.compatMode` 分为两种

* `BackCompat`，怪异模式，浏览器使用自己的怪异模式解析渲染页面
* `CSS1Compat`，标准模式，浏览器使用 `W3C` 的标准解析渲染页面

这个属性会被浏览器识别并使用，但是如果你的页面没有 `DOCTYPE` 的声明，那么 `compatMode` 默认就是 `BackCompat`，如果你的页面添加了 `<!DOCTYPE html>` 那么，那么就等同于开启了标准模式，那么浏览器就按照 `W3C` 的标准解析渲染页面，这样一来，你的页面在所有的浏览器里显示的就都是一个样子了



## HTML5 标签新特性

主要分为以下这些

* 标签，新增语义化标签（`aside/figure/section/header/footer/nav` 等），增加多媒体标签 `video` 和 `audio`，使得样式和结构更加分离
* 属性，增强表单，主要是增强了 `input` 的 `type` 属性，`meta` 增加 `charset` 以设置字符集，`script` 增加 `async` 以异步加载脚本
* 存储，增加 `localStorage`、`sessionStorage` 和 `indexedDB`，引入了 `application cache` 对 `Web` 和应用进行缓存
* `API`，增加拖放 `API`、地理定位、`SVG` 绘图、`Canvas` 绘图、`Web Worker`、`WebSocket`


## href/src 与 link/@import

`href`（`hyperReference`）即超文本引用，当浏览器遇到 `href` 时，会并行的地下载资源，不会阻塞页面解析，例如我们使用 `<link>` 引入 `CSS`，浏览器会并行地下载 `CSS` 而不阻塞页面解析，因此我们在引入 `CSS` 时建议使用 `<link>` 而不是 `@import`

```html
<link href="style.css" rel="stylesheet" />
```

`src`（`resource`）即资源，当浏览器遇到 `src` 时，会暂停页面解析，直到该资源下载或执行完毕，这也是 `script` 标签之所以放底部的原因

```html
<script src="cdn.js"></script>
```

`link` 和 `@import` 的区别如下

* 从属关系区别
  * `@import` 是 `CSS` 提供的语法规则，只有导入样式表的作用
  * `link` 是 `HTML` 提供的标签，不仅可以加载 `CSS` 文件，还可以定义 `RSS`、`rel` 连接属性等
* 加载顺序区别
  * 加载页面时，`link` 标签引入的 `CSS` 被同时加载（并行下载）
  * `@import` 引入的 `CSS` 将在页面加载完毕后被加载，如果网速慢的话，可能会导致页面的样式混乱
* 兼容性区别
  * `@import` 是 `CSS2.1` 才有的语法，故只可在 `IE5+` 才能识别
  * `link` 标签作为 `HTML` 元素，不存在兼容性问题
* DOM 可控性区别
  * 可以通过 `JavaScript` 操作 `DOM` ，插入 `link` 标签来改变样式，由于 `DOM` 方法是基于文档的，无法使用 `@import` 的方式插入样式

权重差异，这一块单独拿出来进行介绍，因为存在一定的争议，按一般的理解来说，`CSS` 中的权重，一般指的是选择器的优先级，即

```js
!important > 内联 > ID > 类 > 标签/伪类/属性选择 > 伪对象 > 通配符 > 继承
```

但是在网上看到有关于 `link` 引入的样式权重大于 `@import` 引入的样式这样的讨论，不过经过实际操作验证发现存在问题，如果分别把 `@import` 的样式放置在 `link` 的前面和后面测试，结果发现前面的被后面的 `link` 所覆盖，所以说这个说法是不完善的，在《`CSS` 权威指南》中写道

> `@import` 一定要写在除 `@charset` 外的其他任何 `CSS` 规则之前，如果置于其它位置将会被浏览器忽略，而且，在 `@import` 之后如果存在其它样式，则 `@import` 之后的分号是必须书写，不可省略的

那么这里又会存在一个小问题，在加载页面的时候，`link` 标签引入的 `CSS` 是会先于 `@import` 引入的 `CSS` 加载，那么 `link` 标签引入的样式又怎会把 `@import` 引入的样式层叠掉呢？个人简单的理解是，可以把 `@import` 这种导入 `CSS` 文件的方式理解成一种替换，`CSS` 解析引擎在对一个 `CSS` 文件进行解析时

如在文件顶部遇到 `@import`，将被替换为该 `@import` 导入的 `CSS` 文件中的全部样式，其虽然后被加载，却会在加载完毕后置于样式表顶部，最终渲染时自然会被下面的同名样式层叠



## html 和 body 的区别

根据标准定义，`<html>` 是文档的根元素，`<head>`、`<body>` 是 `<html>` 唯一的两个子元素，`<head>` 才是和 `<body>` 相对照、需要加以区别的元素，因此，`<html>` 和 `<body>` 是父子关系，在 `HTML` 文档中，`:root` 选择符对应 `<html>` 元素

> `:root` 选择符（伪类）的优先级大于 `HTML` 选择符

两个常见问题

#### background-color

将 `background-color` 应用到 `<body>` 以后，即便 `<body>` 里的元素没有占满视口，背景颜色也会蔓延到整个视口，这时给 `HTML` 设置 `background-color` 可以解决这个问题

#### height: 100%

一般比较常见的是设置 `html, body { height: 100% }`，这样做是为了兼容各个浏览器

* 处于混杂模式时，`body` 以窗口为高度参照，`body` 设置为 `100%` 就可以使得页面和窗口一样高，`body` 里面的嵌套 `div` 也可以扩展到窗口高度，这样的话可以使布局适应浏览器窗口大小
* 当处于标准模式时，`body` 以 `HTML` 标签为高度参照，`HTML` 标签才以窗口为参照，所以仅仅 `body 100%`，并不能使它的子 `div` 也为 `100%` 来占据整个屏幕，还要设置 `html 100%` 使得 `HTML` 获得窗口大小才行


## meta 标签有哪些属性，作用是什么

`meta` 标签用于描述网页的元信息，如网站作者、描述、关键词等，`meta` 通过 `name=xxx` 和 `content=xxx` 的形式来定义信息，常用设置如下

#### charset

`charset` 用于定义 `HTML` 文档的字符集

```html
<meta charset="UTF-8" >
```

#### http-equiv

`http-equiv` 可用于模拟 `HTTP` 请求头，可设置过期时间、缓存、刷新

```html
<meta http-equiv="expires" content="Wed, 20 Jun 2019 22:33:00 GMT" >
```

它的参数有以下这些比较常用的

* `expires`，指定过期时间
* `progma`，设置 `no-cache` 可以禁止缓存
* `refresh`，定时刷新
* `set-cookie`，可以设置 `Cookie`
* `X-UA-Compatible`，使用浏览器版本
* `apple-mobile-web-app-status-bar-style`，针对 `WebApp` 全屏模式，隐藏状态栏/设置状态栏颜色


#### viewport

`viewport` 视口，用于控制页面宽高及缩放比例

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" >
```

移动设备上的 `viewport` 就是设备的屏幕上能用来显示我们的网页的那一块区域，移动设备上的浏览器都会把自己默认的 `viewport` 设为 `980px` 或 `1024px`（也可能是其它值，这个是由设备自己决定的）

![](https://gitee.com/heptaluan/backups/raw/master/cdn/html/00-02.png)

这个时候，我们就需要利用 `meta` 标签对 `viewport` 进行控制，各个属性值如下

* `width`，设置 `layout viewport` 的宽度，为一个正整数，或字符串 `width-device`（手机的屏幕分辨率）
* `initial-scale`，初始缩放比例，取值范围为 `1 ~ 10`
* `maximum-scale/minimum-scale`，允许用户缩放的最大/小比例
* `height`，设置 `layout viewport` 的高度，这个属性对我们并不重要，很少使用
* `user-scalable`，是否允许用户进行缩放，值为 `no` 或 `yes`, `no` 代表不允许，`yes` 代表允许

另外安卓中还支持 `target-densitydpi` 这个私有属性，它表示目标设备的密度等级，作用是决定 `CSS` 中的 `1px` 代表多少物理像素

> 当 `target-densitydpi = device-dpi` 时，`CSS` 中的 `1px` 会等于物理像素中的 `1px`

以后将会被『废弃』，所以避免使用

```js
target-densitydpi  // 值可以为一个数值或 high-dpi 、 medium-dpi、 low-dpi、 device-dpi 这几个字符串中的一个
```

但是在 `iphone` 和 `ipad` 上，无论你给 `viewport` 设的宽的是多少，如果没有指定默认的缩放值，则 `iphone` 和 `ipad` 会自动计算这个缩放值，以达到当前页面不会出现横向滚动条（或者说 `viewport` 的宽度就是屏幕的宽度）的目的



## 渐进增强与优雅降级

渐进增强和优雅降级这两个概念是在 `CSS3` 出现之后火起来的，由于低级浏览器不支持 `CSS3`，但是 `CSS3` 特效太优秀不忍放弃，所以在高级浏览器中使用 `CSS3`，而在低级浏览器只保证最基本的功能，二者的目的都是关注不同浏览器下的不同体验，但是它们侧重点不同，所以导致了工作流程上的不同

* 渐进增强（`Progressive Enhancement`），一开始就针对低版本浏览器进行构建页面，完成基本的功能，然后再针对高级浏览器进行效果、交互、追加功能达到更好的体验
* 优雅降级（`Graceful Degradation`），一开始就构建站点的完整功能，然后针对浏览器测试和修复，比如一开始使用 `CSS3` 的特性构建了一个应用，然后逐步针对各大浏览器进行 `hack` 使其可以在低版本浏览器上正常浏览

其实渐进增强和优雅降级并非什么新概念，只是旧的概念换了一个新的说法，在传统软件开发中，经常会提到『向上兼容』和『向下兼容』的概念，渐进增强相当于向上兼容，而优雅降级相当于向下兼容，向下兼容指的是高版本支持低版本的或者说后期开发的版本支持和兼容早期开发的版本，向上兼容的很少

#### 主要区别

优雅降级和渐进增强只是看待同种事物的两种观点，优雅降级和渐进增强都关注于同一网站在不同设备里不同浏览器下的表现程度，关键的区别则在于它们各自关注于何处，以及这种关注如何影响工作的流程

优雅降级观点认为应该针对那些最高级、最完善的浏览器来设计网站，而将那些被认为过时或有功能缺失的浏览器下的测试工作安排在开发周期的最后阶段，并把测试对象限定为主流浏览器（如 `IE` 等）的前一个版本，在这种设计范例下，旧版的浏览器被认为仅能提供简陋却无妨（`poor, but passable`）的浏览体验，你可以做一些小的调整来适应某个特定的浏览器，但由于它们并非我们所关注的焦点，因此除了修复较大的错误之外，其它的差异将被直接忽略，

渐进增强观点则认为应关注于内容本身，内容是我们建立网站的诱因，有的网站展示它，有的则收集它，有的寻求，有的操作，还有的网站甚至会包含以上的种种，但相同点是它们全都涉及到内容，这使得渐进增强成为一种更为合理的设计范例，这也是它立即被 `Yahoo!` 所采纳并用以构建其 [分级式浏览器支持](http://developer.yahoo.com/yui/articles/gbs/)（`Graded Browser Support`）策略的原因所在




## 参考

* [web-standards-and-organizations](https://shixinz.com/posts/web-standards-and-organizations.html)

