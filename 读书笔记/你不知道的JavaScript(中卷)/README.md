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

- 上面的方法不仅可以用于数字变量，也可以用于数字常量（会被优先识别为数字常量的一部分，然后才是对象属性访问运算符）

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

- ES6 中提供了 Number.EPSILON 来比较两个数字是否相等

- 比如比较 0.1 + 0.2 和 0.3 是否相等，通常设置一个误差范围值（2^-52）

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

#### 值和引用

- 简单值（即标量基本类型值，scalar primitive）总是通过值复制的方式来赋值 / 传递，包括 undefined，boolean，number，string，null 和 ES6 中的 Symbol

- 复合值（compound value）-- 对象（包括数组和封装对象）和函数，则总是通过引用复制的方式来赋值 / 传递



## 第三章 原生函数

#### 内部属性 [[class]]

- 通过构造函数（比如 new String("abc") ）创建出来的是封装了基本类型值（比如 "abc"）的封装对象（注意区分）

- 所有 typeof 返回值为 "object" 的对象（如数组）都包含一个内部属性 [[class]]（可以使用 Object.prototype.toString() 查看）

- 多数情况下，对象的内部 [[class]] 属性和创建该对象的内建原生构造函数相对应（null 和 undefined 原生构造函数并不存在，但是值仍为 null 和 undefined）

#### 封装对象

- 基本类型值没有 .length，.toString() 这样的属性和方法，需要通过封装对象才能访问，JavaScript 会自动为基本类型值包装一个封装对象

- 需要注意，boolean 类型的封装对象（比如 new Bollean(false)）为真值，即总是返回 true

#### 拆封

- 使用 valueOf() 方法来进行拆封（隐式拆封）

#### 原生函数作为构造函数

- 构造函数 Array() 不要求必须带 new 关键字（Array(1, 2, 3) 和 new Array(1, 2, 3) 效果是一样的）

- Array 构造函数只带一个参数的时候，该参数会被作为数组的预设长度，而不是充当数组中的一个元素

- 永远不要创建和使用空单元数组（[ , , , ]）

- 创建包含 undefined 单元的数组（非"空单元"），使用 Array.apply(null, { length: 3 });

#### 原生原型

- 原生构造函数有自己的 .prototype 对象，例如将字符串值封装为字符串对象后，就能访问 String.prototype 中定义的方法



## 第四章 强制类型转换

- 将值从一种类型转换为另一种类型称为类型转换（type casting，显式），隐式的情况称为强制类型转换（coercion）

- 强制类型转换总是返回标量基本类型值（字符串，数字，布尔），不会返回对象和函数

- 类型转换（显式）发生在静态类型语言的编译阶段，而强制类型转换则发生在动态类语言的运行时（runtime）

#### ToString

- 对普通对象来说，除非自行定义，否则 toString() 返回内部属性 [[class]] 的值，如 "[object, Object]"

- 将对象强制类型转换为 string 是通过 ToPrimitive 抽象操作来完成的

- 数组默认的 toString() 方法经过了重新定义，将所有单元字符串化以后再使用 "," 连接起来

```js
var a = [1, 2, 3];

a.toString();  // "1,2,3"
```

#### JSON 字符串化

- JSON 字符串格式化（JSON.stringify()）和 toString() 的效果基本相同，只不过序列化的结果总是字符串

- JSON.stringify() 在对象中遇到 undefined，function，symbol 时会自动将其忽略，在数组中则会返回 null（保证单元位置不变）

```js
JSON.stringify( undefined );  // undefined

JSON.stringify( function(){} );  // undefined

JSON.stringify( [1, undefined, function(){}, 4] ); // [1, null, null, 4]

JSON.stringify( {a: 2, b: function(){} } );  // { a: 2 }
```

- 包含循环引用的对象执行 JSON.stringify() 会出错

- 如果需要对含有非法 JSON 值的对象做字符串化，需要定义 toJSON() 方法来返回一个安全的 JSON 值

```js
var o = {}

var a = {
    b: 42,
    c: o,
    d: function () {}
}

// 在 a 中创建一个循环引用
o.e = a;

// 循环引用在这里会产生错误
JSON.stringify(a);

// 自定义 JSON 序列化
// 此方法应该 返回一个能够被字符串化的安全的 JSON 值
// 而不是 返回一个 JSON 字符串
a.toJSON = function () {
    // 序列化的时候仅包含 b
    return { b: this.b }
}

JSON.stringify(a);  // { "b": 42 }
```

* JSON.stringify() 并不强制类型转换

  * 字符串，数字，布尔值和 null 的 JSON.stringify() 规则与 toString() 基本相同

  * 如果传递给 JSON.stringify() 的对象中定义了 toJSON 方法，那么该方法会在字符串化之前调用，以便将对象转换为安全的 JSON 值


#### ToNumber

- 抽象操作 ToNumber ==> true 转换为 1，false 转换为 0，undefined 转换为 NaN，null 转化为 0

- 对象（包括数组）会首先被转换为相应的基本类型，如果返回的是非数字的基本类型，则再遵守以上规则将其强制转化为数字

* 为了将值转换为相应的基本类型，定义了抽象操作 ToPrimitive

  * 首先检查该值是否有 valueOf() 的方法，如果有并且返回基本类型值，就使用该值进行强制类型转换为这个原始值

  * 如果没有，则调用 toString 方法，如果 toString 方法返回的是原始值（如果存在），则对象转换为这个原始值

  * 如果 valueOf 和 toString 方法均没有返回原始值，则抛出 TypeError 异常

- 使用 Object.create(null) 创建的对象 [[prototype]] 属性为空，并且没有 valueOf() 和 toString() 方法，因此无法进行强制类型转换


#### ToBoolean

* JavaScript 中的值可以分为两类

  * 可以被强制类型转换为 false 的值

  * 其他（被强制类型转换为 true 的值）


* 定义了抽象操作 ToBoolean，以下都为假值

  * undefined

  * null

  * false

  * +0, -0, NaN

  * ""

* 假值的布尔强制类型转换结果为 false，可以理解为，除以上列表外都是真值（truthy）

* 包装类型，封装了假值的对象为真值

```js
var a = new Boolean( false )

var b = new Number( 0 )

var c = new String( "" )

var d = new Boolean( a && b && c );  // true
```

* 字符串也都是真值

```js
var a = "false";
var b = "0";
var c = "''";

var d = [];
var e = {};
var f = function () {}

var d = new Boolean( a && b && c && d && e && f );  // true
```


## 隐式强制类型转换

#### Symbol

- 关于 Symbol（符号），ES6 允许从符号到字符串的**显式**强制类型转换，然而**隐式**强制类型转换会直接报错

- 符号不能够被强制类型转换为数字 （显式和隐式都会产生错误），但是可以被强制类型转换为布尔值（隐式和显式结果都为 true）（好在一般不会用到它的强制类型转换）

#### 字符串和数字之间隐式强制类型转换

* 如果某个操作是字符串或者能够通过以下步骤转换为字符串的话，+ 运算符将进行拼接操作

  * 如果其中一个操作数是对象（包括数组），则首先对其调用 ToPrimitive 抽象操作

  * 再调用 [[DefaultValue]] 以数字作为上下文

  * 与 ToNumber 抽象操作处理对象的方式一样，因为数组的 valueOf() 操作无法得到简单基本类型值，于是转用 toString() 

  * 简单来说，如果 + 的其中一个操作是字符串（或者通过以上步骤可以得到字符串），则执行字符串拼接，否则执行数字加法

* a + "" 与 String(a) 有一个区别

  * a + "" 会对 a 调用 valueOf() 方法（ToPrimitive），然后通过 ToString 抽象操作符将返回值转换为字符串

  * 而 toString(a) 则是直接调用 ToString()

  * 但是，但是 a 如果是对象而非数字，并且自定义了 valueOf 和 toString 方法，那么结果就不一样了（一般不会遇到这么坑爹的情况）

```js
var a = {
    valueOf: function () { return 42 },
    toString: function () { return 2 }
}

a + "";  // 42

String(a);  // 2
```

- ```-``` 是数字减法运算符，因此 a - 0 会将 a 强制类型转换为数字（也可以使用 a / 1 和 a * 1）


#### && 和 ||

* && 和 || 运算符的返回值不一定是布尔类型，而是两个操作数其中一个的值

  * || 和 && 首先会对 第一个操作数 执行条件判断，如果其值不是布尔，就先进行 ToBoolean 强制类型转换，然后在执行条件判断

  * 对于 ||：如果条件判断结果为 true 就返回第一个操作数的值，如果为 false 就返回第二个操作数的值

  * && 则相反，如果条件判断结果为 true，就返回第二个操作数的值，如果为 false 就返回第一个操作数的值



#### == 和 ===

- == 允许在相等比较中进行强制类型转换，而 === 不允许（== 检查值是否相等，=== 检查值和类型是否相等的说法不准确）

* 字符串 和 数字 之间的比较（字符串 ==> 数字）

  * 如果 type(x) 是数字，type(y) 是字符串，则返回 x == ToNumber(y) 的结果

  * 如果 type(x) 是字符串，type(y) 是数字，则返回 ToNumber(x) == y 的结果

* 其他类型 和 布尔类型 之间的比较（布尔 ==> 数字）

  * 如果 type(x) 是布尔类型，则返回 ToNumber(x) == y 的结果

  * 如果 type(y) 是布尔类型，则返回 x == ToNumber(y) 的结果

* null 和 undefined 之间的比较

  * 如果 x 是 null，y 是 undefined，则结果为 true

  * 如果 x 是 undefined，y 是 null，则结果为 true

* 对象 和 非对象 之间的比较（对象 ==> ToPrimitive(对象)）

  * 如果 type(x) 是字符串或数字，type(y) 是对象，则返回 x == ToPrimitive(y) 的结果

  * 如果 type(x) 是对象，type(y) 是字符串或数字，则返回 ToPrimitive(x) == y 的结果


#### 极端情况

```js
[] == ![]         // true

"" == "0"         // false

2 == [2]          // true
"" == [null]      // true

0 == "\n"         // true
0 == ""           // true
0 == "0"          // true
"0" == false      // true

fasle == "false"  // false

"true" == true    // false
42 == "42"        // true
"foo" == ["foo"]  // true

// 七种比较少见的情况
"0" == false;    // true

false == 0       // true

false == ""      // true

false == []      // true

"" == 0          // true

"" == []         // true

0 == []          // true
```

- 如果两边的值中有 true 或者 false，千万不要使用 ==

- 如果两边的值中有 [], "" 或者 0，尽量不要使用 ==


#### 抽象关系比较

- 如果比较双方都是字符串，则按照字母顺序来进行比较

```js
// a 和 b 并没有转换为数字，因为 ToPrimitive 返回的是字符串
// 所以这里比较的是 "42" 和 "043" 两个字符串
var a = ["42"];  
var b = ["043"];  

a < b;  // false


var a = [4, 2];     // ==> 转换后为 4, 2
var b = [0, 4, 3];  // ==> 转换后为 0, 4, 3

a < b;  // false


var a = { b: 42 }  // ==> 转换后 a 为 [object, Object]
var b = { b: 43 }  // ==> 转换后 b 为 [object, Object]

a < b;  // false

// 但是

a == b;  // false

a > b;  // false

a <= b;  // true
a >= b;  // true
```

- JavaScript 中 <= 是 不大于 的意思（即 !(a > b) 处理为 !(b < a)），同理，a >= b 处理为 b <= a

- 相等比较有严格相等（===），关系比较却没有所谓的 "严格关系比较"，避免发生隐式类型转换，只能确保 a 和 b 为相同的类型