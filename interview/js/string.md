常见的字符串算法

----

### 短横变驼峰

比如将 `border-color` 变为 `borderColor`

一般常见的有两种方式

* 先使用 `split()` 方法将字符串分割为数组，然后遍历数组，将除去第一项之外的每一项的首字母变为大写（`toUpperCase()`），然后在使用 `join()` 方法还原为字符串

```js
var str = "border-right-color"

toHump(str, "-")

function toHump(str, separator) {
    if (!(typeof str == "string")) {
        throw new Error(`str need to be a string`)
    };
    var strArr = str.split(separator);
    for (var i = 1; i < strArr.length; i++) {
        strArr[i] = strArr[i][0].toUpperCase() + strArr[i].slice(1)
    }
    return strArr.join("")
}
```

* 另一种方式就是使用正则表达式

```js
var str = "border-right-color"

toHump(str)

function toHump(str) {
    return str.replace(/\-(\w)/g, function(match, $1) {
        return $1.toUpperCase();
    })
}
```

----


### 千位分隔符

同样有两种方式

* 利用 `slice()` 方法，每隔三位一分离

```js
thousandSeparator(12345)

function thousandSeparator(num) {

    if (!(typeof num == "number")) {
        throw new Error(`num need to be a number`)
    };

    // 转换为字符串方便计算位数
    num = num.toString();
    var start = -3;
    var end = -Math.ceil(num.length / 3) * 3;

    // 第一次分隔不能添加第二个参数 slice(-3)
    // 所以先将其添加进数组
    var result = [num.slice(-3)]

    for (var i = start - 3; i >= end; i -= 3) {
        result.unshift(num.slice(i, i + 3))
    }

    return result.join(",");
}
```

* 另一种是同样的使用正则表达式

```js
// 使用 commafy(1234567.90)
function commafy(num) {
    return num && num
        .toString()
        // 也可以使用正则 /\B(?=(\d{3})+$)/g
        .replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
            return $1 + ",";
        });
}
```

正则中的 `(?=)` 语法表示捕获，位置描述，简单来说就是过滤匹配中的内容

比如上面的匹配了 `(\d)`，然后过滤出什么样子的数字，后面就是描述（`\.` 表示任意单字符）

上面的正则简单来说就是匹配数字（`(\d)`），然后匹配什么样的数字（使用 `(?=)` 来描述）

`(\d{3})+` 表示有三个或多个三个连续的数字（`+` 表示一个或多个）
