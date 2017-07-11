在有序（无序）列表中插入 ```3``` 个，```300``` 个，```3000``` 个 ```li```，并绑定事件

```html
<ul id="list"></ul>
```

----

## 插入 3 个 li

```js
// ...

for (var i = 0; i < 3; i++) {
    var item = document.createElement("li");
    item.innerText = i + 1;
    item.addEventListener("click", function () {
        alert(this.innerText)
    }, false)
    body.appendChild(item)
}

// ...
```

## 插入 300 个 li

这个时候可以使用事件委托

```js
// ...

for (var i = 0; i < 300; i++) {
    var item = document.createElement("li");
    item.innerText = i + 1;
    ul.appendChild(item)
}

ul.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        alert(target.innerHTML)
    }
}, false)

// ...
```

## 插入 3000 个 li

当数据量很大的时候，这个时候可以使用 fragment + requestAnimationFrame 来分批插入数据

目的是减少 DOM 操作次数、缩短循环时间，每次插入的时机是在页面重新渲染之前

```js
var total = 3000;

// 每次插入多少
var listSize = 4;

// 分多少次插入
var listCount = total / listSize;

// 已经完成的批次
var listDone = 0; 

function appendItems () {
    var fragment = document.createDocumentFragment();

    for (let i = 0; i < listSize; i++) {
        var item = document.createElement("li");
        item.innerText = (listSize * listDone + i) + 1;
        fragment.appendChild(item) 
    }

    // 每批次只修改一次 DOM
    ul.appendChild(fragment)

    listDone += 1;
    listAppend()
}

function listAppend () {
    if (listDone < listCount) {
        window.requestAnimationFrame(appendItems);
    }
}

listAppend()

ul.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        alert(this.innerHTML)
    }
}, false)
```
