`box-sizing` 有哪些取值，分别有什么含义

----


```box-sizing``` 属性用于更改用于计算元素宽度和高度的默认的 ```CSS``` 盒子模型，可以使用此属性来模拟不正确支持 ```CSS``` 盒子模型规范的浏览器的行为

```js
// 不是继承属性
// 还有一个可选参数 padding-box，因为只有 firefox 实现了这个值，在 firefox 50 中将被删除
box-sizing: content-box（初始值） | border-box;
```

#### content-box

默认值，标准盒子模型，```width``` 与 ```height``` 只包括内容的宽和高，不包括边框（```border```），内边距（```padding```），外边距（```margin```）

尺寸计算公式：```width = 内容的宽度```，```height = 内容的高度```，宽度和高度都不包含内容的边框（```border```）和内边距（```padding```）

#### border-box

width 和 height 属性包括内容，内边距和边框，但不包括外边距

维度计算为：

```js

width = border + padding + 内容的  width

height = border + padding + 内容的 height

```

> 还有一个仅在 `firefox` 中实现的取值 `padding-box`，但是已经被废弃