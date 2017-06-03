## 使用原生 js 来替代 jQuery




#### 获取元素

```js
// jQuery
$(selector)


// Native
function $(el) {
  return document.querySelector(el)
}

// 转换为数组
function $$(el) {
  return Array.prototype.slice.call(document.querySelectorAll(el))
}
```

常用的 ```class```、```id```、属性 选择器都可以使用 ```document.querySelector``` 或 ```document.querySelectorAll``` 替代，区别是

* ```document.querySelector``` 返回第一个匹配的 ```Element```

* ```document.querySelectorAll``` 返回所有匹配的 ```Element``` 组成的 ```NodeList```。它可以通过 ```[].slice.call()``` 把它转成 ```Array```

* 如果匹配不到任何 ```Element```，```jQuery``` 返回空数组 ```[]```，但 ```document.querySelector``` 返回 ```null```，注意空指针异常

但是需要注意的是：

```document.querySelector``` 和 ```document.querySelectorAll``` 性能很差

如果想提高性能，尽量使用 ```document.getElementById```、```document.getElementsByClassName``` 或 ```document.getElementsByTagName```



## DOM 相关

#### 添加元素到匹配的元素集合（数组）

```js
// jQuery
$(selector).add($(newEl))


// Native
$$(selector).push(newEl)
```


#### 添加类名（addClass）

```js
// jQuery
$(el).addClass(className)


// Native
el.classList.add(className)
```


#### 插入元素（after）

```js
// jQuery
$(el).after("<div></div>")


// Native
el.parentNode.insertBefore(newEl, el.nextSibling)
```



#### 插入元素（append）

```js
// jQuery
$(el).append("<div></div>")


// Native
el.appendChild(newEl)
```





#### 插入元素（before）

```js
// jQuery
$(el).before("<div></div>")


// Native
el.parentNode.insertBefore(newEl, el)
```





#### 设置/获取 属性（attr）

```js
// jQuery
$(el).attr("src", "../img/foo.png")


// Native
el.getAttribute("src")

el.setAttribute("src", "../img/foo.png")
```





#### 深度拷贝（close）

```js
// jQuery
$(el).clone()


// Native
el.appendChild(newEl)
```





#### 获得匹配元素集合中每个元素的子元素（content）

```js
// jQuery
$(el).contents()


// Native
el.childNodes
```





#### 设置样式（css）

```js
// jQuery
$(el).css("color", "red")


// Native
el.style.color = "red"

----

// jQuery 多个样式
$(el).css({ color: "red", fontSize: "20px" })

// Native
const cssObj = { color: "red", fontSize: "20px" }
for (let k in cssObj) {
    el.style[k] = cssObj[k]
}
```





#### 清空元素（empty）

```js
// jQuery
$(el).empty()


// Native
el.innerHTML = "";
```





#### 过滤元素（filter）

```js
// jQuery
$(selector).filter(filterFn)


// Native
$$(selector).filter(filterFn)
```





#### 寻找元素（find）

```js
// jQuery
$(el).find(selector)


// Native
el.querySelectorAll(selector)
```




#### 寻找元素（parents）

```js
// jQuery
$(el).parents(selector)


// Native
function parents(el, selector = '*') {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector
    const parentsMatch = []
    while ((el = el.parentElement) !== null) {
        if (matchesSelector.call(el, selector)) {
            parentsMatch.push(el)
        }
    }
    return parentsMatch
}
```





#### 筛选元素（has）

```js
// jQuery
$(selector).has("div")


// Native
$$(selector).filter(el => el.querySelector("div") !== null)
```






#### 筛选元素（next）

```js
// jQuery
$(el).next()


// Native
el.nextElementSibling
```





#### 筛选元素（nextAll）

```js
// jQuery
$(el).nextAll()


// Native
const nextAll = []
while ( (el = el.nextElementSibling) !== null ) {
    nextAll.push(el)
}
```





#### 筛选元素（hasClass）

```js
// jQuery
$(el).hasClass(className)


// Native
el.classList.contains(className)
```





#### 设置 html 内容（html）

```js
// jQuery
$(el).html()


// Native
el.innerHTML
```





#### 获取元素属性，宽高等（innerHeight/innerWidth）

```js
// jQuery
$(el).innerHeight()

// Native
el.clientHeight


// jQuery
$(el).innerWidth()

// Native
el.clientWidth
```





#### 获取元素当前坐标（position）

```js
// jQuery
$(el).position()

// Native
left: el.offsetLeft

top: el.offsetTop
```




#### 删除元素（remove）

```js
// jQuery
$(el).remove()

// Native
el.parentNode.removeChild(el)
```




#### 替换元素（replaceWith）

```js
// jQuery
$(el).replaceWith("<div></div>")

// Native
el.parentNode.replaceChild(newEl, el)

// 标签的话用这个
el.outerHTML = "<div></div>"
```





#### 滚动条位置（scrollTop）

```js
// jQuery
$(el).scrollTop()

$(el).scrollTop(20)

// Native
el.scrollTop

el.scrollTop = 20

// 如果全局对象为 window
document.documentElement.scrollTop = 20

document.body.scrollTop = 20
```





#### 过滤元素（slice）

```js
// jQuery
$(selector).slice(0, 1)


// Native
$$(selector).slice(0, 1)
```




#### 获取文本内容（text）

```js
// jQuery
$(el).text(str)


// Native
el.textContent = str
```




#### class 切换（toggleClass）

```js
// jQuery
$(el).toggleClass(className)


// Native
el.classList.toggle(className)
```



#### 获取元素的值（val）

```js
// jQuery
$(el).val(value)


// Native
el.value = value
```





#### 包裹元素（wrap）

```js
// jQuery
$(el).wrap("<div></div>")

// Native
建议使用 document.createElement + appendChild 来添加元素

// 这样性能很差
el.outerHTML = `<div>${el.outerHTML}</div>`
```





## 通用方法


#### 检查是否某个元素的后代（contains）
```js
// jQuery
$.contains(el, child)


// Native
el !== child && el.contains(child)
```





#### each

用来无缝迭代对象和数组

```js
// jQuery
$.each(array, (index, value) => {})


// Native
array.forEach( (value, index) => {} )
```






#### extend

将两个或更多对象的内容合并到第一个对象

```js
// jQuery
$.extend({}, {a: 1}, {b: 2})  // {a: 1, b: 2}


// ES6
Object.assign({}, {a: 1}, {b: 2});  // {a: 1, b: 2}
```









#### grep

查找满足过滤函数的数组元素（原数组不受影响）

```js
// jQuery
$.grep([10, 11, 3, 4], n => n > 9)


// Native
[10, 11, 3, 4].filter( n => n > 9)
```










#### inArray

在数组长查找指定值并返回它的索引（若没找到，则返回 -1）

```js
// jQuery
$.inArray(item, array)


// Native
array.indexOf(item) > -1

// ES6
array.includes(item)
```














#### makeArray

转换一个类数组对象成为真正的 JavaScript 数组

```js
// jQuery
$.makeArray(arrayLike)


// Native
[].slice.call(arrayLike)

// ES6
Array.from(arrayLike)
```



















#### merge

合并两个数组内容到第一个数组

```js
// jQuery
$.merge(arr1, arr2)


// Native
function merge (...args) {
    return [].concat(...args)
}
```







#### parseJSON

合并两个数组内容到第一个数组

```js
// jQuery
$.parseJSON(str)


// Native
JSON.parse(str)
```








#### proxy

接受一个函数，然后返回一个新函数，并且这个函数始终保持了特定的上下文

```js
// jQuery
$.proxy(fn, context)


// Native
fn.bind(context)
```



待续...

