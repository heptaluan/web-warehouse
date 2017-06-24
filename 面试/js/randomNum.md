生成 ```20``` 个 ```40 - 80``` 之间的随机数，并 **排序/乱序**

----

```js
var arr = [];

for (var i = 0; i < 20; i++) {
    arr.push(randomNum(40, 80))
}

// 排序
console.log(arr.sort(function (a, b) {return a - b}))

// 乱序
console.log(arr.sort(function () {return 0.5 - Math.random()}))

// 范围 n ~ m
// 原理为：40 ~ 80 随机数即 40 + (80 - 40) * Math.random
function randomNum (n, m) {
    return parseInt(Math.random() * (m - n) + n)
}
```