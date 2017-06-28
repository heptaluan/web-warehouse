在有序（无序）列表中插入 ```3``` 个，```300``` 个，```3000``` 个 ```li```，并绑定事件

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
    body.appendChild(item)
}

ul.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        alert(target.innerHTML)
    }
}, false)

// ...
```