数组操作 - 生成一个 `m` 长度，内容都为 `n` 的数组

----

## 方法一

利用 `for` 循环，生成指定内容的数组

```js
function creatAry(m, n) {

    var ary = [];

    function aryPush(m, n) {
        if (ary.length == m) return ary;
        ary.push(n);
        return aryPush(m, n);
    }
    
    return (aryPush(m, n))
}
```

## 方法二

利用 `fill` 填充数组

```js
function creatAry (m, n) {
    return new Array(m).fill(n)
}
```