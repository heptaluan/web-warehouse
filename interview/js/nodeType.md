`JavaScript` 中节点相关属性

----

一些常见的 `nodeType` 值

```js
1 - 普通元素节点，比如 div，p 等

3 - 文本节点

8 - 注释节点

9 - document 节点

10 - 文档 DTD
```


### childNodes

用来获取子节点

```js
var childs = oDiv.childNodes;
```

这里存在一个坑，比如如下

```html
<div>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
</div>
```

当 `div` 中没有文本节点的时候，此时应该为 `4` 个节点，但是 `IE9`，`Chrome`，`FireFox` 会认为存在 `9` 个节点，而 `IE8` 则认为只有 `4` 个节点

**这时因为高级浏览器会把空文本节点也当作为一个节点，标签前后的空文本也会被算作一个节点**

而且对于注释的前后算不算空文本节点，每个浏览器的解释也有不相同，所以我们在使用节点的时候，一定要过滤，比如判断节点的 `nodeType` 是不是 `1`（普通元素节点）

```js
// 得到真正的标签子节点
function getRealChild(elem) {
    var result = [];
    for (var i = 0; i < elem.childNodes.length; i++) {
        if (elem.childNodes[i].nodeType == 1) {
            result.push(elem.childNodes[i]);
        }
    }
    return result;
}
```

另外，如果要改变文本节点的内容（`nodeType` 为 `3`），需要改变其 `nodeValue` 属性

```js
oDiv.childNodes[0].nodeValue = "张三"
```