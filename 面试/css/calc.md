`css3` 中的 `calc()`

----


## calc()

可以理解为一个函数 `function`，使用 `calc()` 给元素的 `border`、`margin`、`pading`、`font-size` 和 `width` 等属性设置动态值，`calc()` 最大的好处就是用在流体布局上，可以通过 `calc()` 计算得到元素的宽度

语法如下，内部可以使用加 （+）、减（-）、乘（*）、除（/）

```css
width: calc(50% + 2em)
```

* 使用 `+`、`-`、`*` 和 `/` 四则运算

* 可以使用百分比、`px`、`em`、`rem`等单位

* 可以混合使用各种单位进行计算

* 表达式中有 `+` 和 `-` 时，其前后必须要有空格，如 `"widht: calc(12%+5em)"` 没有空格的写法是错误的

* 表达式中有 `*` 和 `/` 时，其前后可以没有空格，但建议留有空格

## 实例

```css
.wrap_div {
	width: 300px;
	background: red;
	padding: 3px 0;
}

.div {
	background: red;
	height: 50px;
	padding: 10px;
	border: 5px solid green;
	width:-moz-calc(100% - (10px + 5px) * 2);
	width:-webkit-calc(100% - (10px + 5px) * 2);
	width: calc(100% - (10px + 5px) * 2);
}
```