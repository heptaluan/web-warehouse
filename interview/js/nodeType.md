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

用来获取子节点，注意，返回的是一个类数组对象

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


### parentNode

parentNode 属性表示父节点，任何节点的 parentNode 的 nodeType 一定为 1，也就是说父节点一定是标签节点


### previousSibling 和 nextSibling

表示 上/下 一个兄弟节点，需要注意的是，其可能是 文本/注释 节点，而原生 JS 当中并没有提供 prevAll()，nextAll()，siblings() 等方法

如果不存在 上/下 兄弟节点，返回 null，所以可以利用这个特性来写一个方法

```js
// prev
function getRealPrev(elem) {
    // 原理就是遍历 elem 节点的前面，直到返回第一个 nodeType 为 1 的节点
    var o = elem;

    // 循环遍历，将循环的结果再次赋予 o，依次向上查询
    while(o = o.previousSibling) {
        if (o.nodeType == 1) {
            return o;
        }
        return null;
    }
}

// next
function getRealNext(elem) {
    // 原理就是遍历 elem 节点的后面，直到返回第一个 nodeType 为 1 的节点
    var o = elem;

    // 循环遍历，将循环的结果再次赋予 o，依次向下查询
    while(o = o.nextSibling) {
        if (o.nodeType == 1) {
            return o;
        }
        return null;
    }
}

// prevAll
function getRealprevAll(elem) {
    // 原理就是遍历 elem 节点的前面，直到返回第一个 nodeType 为 1 的节点
    var o = elem;
    var result = [];

    // 循环遍历，将循环的结果再次赋予 o，依次向上查询
    // 如果不存在上一个节点，则会返回 null，便自动停止循环
    while(o = o.previousSibling) {
        if (o.nodeType == 1) {
            result.unshift(o)
        }
        return result;
    }
}

// nextAll
function getRealnextAll(elem) {
    // 原理就是遍历 elem 节点的后面，直到返回第一个 nodeType 为 1 的节点
    var o = elem;
    var result = [];    

    // 循环遍历，将循环的结果再次赋予 o，依次向下查询
    // 如果不存在下一个节点，则会返回 null，便自动停止循环
    while(o = o.nextSibling) {
        if (o.nodeType == 1) {
            result.push(o)
        }
        return result;
    }
}
```