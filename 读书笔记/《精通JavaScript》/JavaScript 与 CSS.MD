## JavaScript 与 CSS

一个获取元素的真实、最终的 CSS 样式属性值的函数

```js
// 获取指定元素（elem）的样式属性（name）
function getStyle (elem, name) {

    // 如果属性存在于 style 中，那么它已经被设置了（并且是当前的）
    if (elem.style[name]) {
        return elem.style[name]

    // 否则尝试 IE 的方法
    } else if (elem.currenyStyle) {
        return elem.currenyStyle[name];

    // 或者 W3C 的方法，如果存在的话
    } else if (document.defaultView && document.defaultView.getComputedStyle) {

        // 它使用的是通用的 text-align 的样式规则而非 textAlign
        name = name.replace(/([A-Z])/g, "-$1");
        name = name,toLowerCase();

        // 获取样式对象并获取属性（存在的话）值
        var s = document.defaultView.getComputedStyle(elem, "");
        return s && s.getPropertyValue(name);

    // 否则，同的其他浏览器
    } else {
        return null;
    }
}
```