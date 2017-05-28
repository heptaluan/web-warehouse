记录一些不太熟悉的知识点

----

## 第二章 值

#### 数组

- 使用 delete 运算符可以将单元从数组删除，但是需要注意，单元删除后，数组的 length 属性并不会发生变化

- 如果字符串键值能够被转化成十进制数字的话，它就会被当作数字索引来处理

```js
var a = [];

a["12"] = 45;

a.length = 13;
```


#### 数字

JavaScript 中的 "整数" 就是没有小数的十进制数，所以 42.0 等同于 "整数" 42


#### 数字的语法

- 小数点前面的 0 和 小数点后小数部分最后面的 0 也可以省略

```js
var a = 0.45;
var b = .45;

var c = 42.0;
var d = 42.;  // 这种写法没问题，只是不常见，不推荐
```

- tofixed() 方法可指定小数部分的显示位数，如果指定的小数部分的显示位数多于实际位数就用 0 补齐

```js
var a = 42.59;

a.toFixed(0);  // 43
a.toFixed(1);  // 42.6
a.toFixed(2);  // 42.59
a.toFixed(3);  // 42.590
a.toFixed(4);  // 42.5900
```

- toPrecision() 方法用来指定有效位数的显示位数

```js
var a = 42.59;

a.toPrecision(1);  // 4e+1
a.toPrecision(2);  // 43
a.toPrecision(3);  // 42.6
a.toPrecision(4);  // 42.59
a.toPrecision(5);  // 42.590
```

- 不仅可以用于数字变量，也可以用于数字常量（会被优先识别为数字常量的一部分，然后才是对象属性访问运算符）

```js
// 无效语法，因为 . 会被视为常量 42. 的一部分
42.toFixed(3);  // 出错

// 以下均有效
(42).toFixed(3);  // 42.000
0.42.toFixed(3);  // 0.420
42..toFixed(3);  // 42.000  ==> 第一个 . 会被视为 number 的一部分，第二个才是属性访问运算符

// 需要注意，下面语法也是有效的
42 .toFixed(3);  // 42.000 （注意有个空格）
```

#### 较小的数值

- ES6 中提供了 Number.EPSILON 来比较两个数字是否相等（比如比较 0.1 + 0.2 和 0.3 是否相等，通常设置一个误差范围值）

```js
// ES6 之前
if (!Number.EPSILON) {
    Number.EPSILON = Math.pow(2, -52);
}

// ES6
function numbersCloseEnoughToEqual (n1, n2) {
    return Math.abs( n1 - n2 ) < Number.EPSILON
}

var a = 0.1 + 0.2;
var b = 0.3;

numbersCloseEnoughToEqual(a, b);  // true
numbersCloseEnoughToEqual(a, b);  // true
```

#### 整数检测

- （安全整数）能够 one-by-one 表示的整数，也就是说在 (-2^53, 2^53) 范围内，双精度数表示和整数是一对一的，反过来说，在这个范围以内，所有的整数都有唯一的浮点数表示，这叫做安全整数

- （不安全整数）超过这个范围，会有两个或更多整数的双精度表示是相同的，反过来说，超过这个范围，有的整数是无法精确表示的，只能 round 到与它相近的浮点数（说到底就是科学计数法）表示，这种情况下叫做不安全整数

- 是否是整数

```js
// ES6 之前
if (Number.isInteger) {
    Number.isInteger = function (num) {
        return typeof num == "number" && num % 1 == 0;
    }
}

// ES6
Number.isInteger(42);  // true
Number.isInteger(42.000);  // true
Number.isInteger(42.3);  // false
```

- 是否是安全的整数

```js
// ES6 之前
if (Number.isSafeInteger) {
    Number.isSafeInteger = function (num) {
        return num.isInteger(num) && Math.abs(num) <= Number.MAX_SAFE_INTEGER
    }
}

// ES6
Number.isSafeInteger( Number.MAX_SAFE_INTEGER );  // true
Number.isSafeInteger( Math.pow(2, 53) )  // true
Number.isSafeInteger( Math.pow(2, 53) - 1 )  // false
```