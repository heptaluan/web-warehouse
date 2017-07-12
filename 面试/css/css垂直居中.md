`css` 垂直居中的几种方式


----



## position

通过改变元素的 ```top``` 位置来实现居中

```css
div {
    position: relative;
    top: 50%;
    margin-top: - 1/2 * 元素的高度;
}
```

也可以使用 ```css3``` 提供的 ```transform``` 来实现

```css
div {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
```


## flex

也可以使用 ```css3``` 的弹性布局（```flex```）

```css
body {
    display: flex;
    align-items: center;  /* 定义 body 元素垂直居中 */
    justify-content: center;  /* 定义 body 里面的元素垂直居中 */
}

div {
    width: 100px;
    height: 100px;
    border: 1px solid red;
}
```


## 文本内容居中

#### 单行文本

如果是单行文本，只需要设置其容器的 ```height``` 和 ```line-height``` 并使其相等即可

```css
div {
    height: 20px;
    line-height: 20px;
}
```

#### 多行文本

如果文本容器高度不限定，使用 ```padding``` 即可

如果父容器高度固定，文本可能是一行或者多行，这时候可以把文字当作图片来处理，使用 ```display``` 属性

```css
/* 外层 div */
.wrap {
    display: table-cell;
    vertical-align: middle;
}

/* 内部 div */
div {
    display:inline-block;
    font-size: （n）px;
    vertical-align:middle;
}
```

另外一种方式

```css
.wrap {
    display:table;
}

.div {
    display:table-cell;
    vertical-align:middle;
}
```