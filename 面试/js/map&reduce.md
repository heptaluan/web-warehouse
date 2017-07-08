## map

由于 ```map()``` 方法定义在 ```javascript``` 的 ```Array``` 中，比如我们有一个函数 ```f(x)=x2```，要把这个函数作用在一个数组 ```[1, 2, 3, 4, 5, 6, 7, 8, 9]``` 上，我们调用 ```Array``` 的 ```map()``` 方法，传入我们自己的函数，就得到了一个新的 ```Array``` 作为结果：

```js
function pow(x) {
    return x * x;
}

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]
```

再比如，把 ```Array``` 的所有数字转为字符串：

```js
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.map(String); // ['1', '2', '3', '4', '5', '6', '7', '8', '9']
```

## reduce

```Array``` 的 ```reduce()``` 把一个函数作用在这个 ```Array``` 的 ```[x1, x2, x3...]``` 上，这个函数必须接收两个参数，```reduce()``` 把结果继续和序列的下一个元素做累积计算，其效果就是：

```js
[x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)
```

比方说对一个 ```Array``` 求和，就可以用 ```reduce``` 实现：

```js
var arr = [1, 3, 5, 7, 9];

arr.reduce(function (x, y) {
    return x + y;
}); // 25
```

要把 ```[1, 3, 5, 7, 9]``` 变换成整数 ```13579```，```reduce()``` 也能派上用场：

```js
var arr = [1, 3, 5, 7, 9];
arr.reduce(function (x, y) {
    return x * 10 + y;
}); // 13579
```

利用 ```reduce()``` 求积

```js
function product(arr) {
     return arr.reduce(function(x, y){ return x * y})
}
```