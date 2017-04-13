#### Symbol

在 ES5 中的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法，新方法的名字就有可能与现有方法**产生冲突**

ES6 引入了一种新的原始数据类型 ```Symbol```，表示独一无二的值

它是 JavaScript 语言的**第七种**数据类型（其余六种是 Undefined、Null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object））

```Symbol``` 值通过 ```Symbol``` 函数生成，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 ```Symbol``` 类型

凡是属性名属于 ```Symbol``` 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突

```js
// 变量 s 就是一个独一无二的值
let s = Symbol();

// typeof 运算符的结果，表明变量 s 是 Symbol 数据类型，而不是字符串之类的其他类型
typeof s
// "symbol"
```

需要注意的是：```Symbol``` 函数前不能使用 ```new``` 命令，否则会报错。这是因为生成的 ```Symbol``` 是一个原始类型的值，不是对象。也就是说，由于 ```Symbol``` 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型

```Symbol``` 函数可以接受一个字符串作为参数，表示对 ```Symbol``` 实例的描述

```js
var s1 = Symbol("foo");
var s2 = Symbol("bar");

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"
```

上面代码中，```s1``` 和 ```s2``` 是两个 ```Symbol``` 值，如果不加参数，它们在控制台都输出 ```symbol()```，而加上参数之后，就可以分别开来

如果 ```Symbol``` 的参数是一个对象，就会调用该对象的 ```toString``` 方法，将其转为字符串，然后才生成一个 ```Symbol``` 值

```js
const obj = {
    toString() {
        return "abc";
    }
};
const sym = Symbol(obj);
sym // Symbol(abc)
```

注意，```Symbol``` 函数的参数只是表示对当前 ```Symbol``` 值的描述，因此相同参数的 ```Symbol``` 函数的返回值是不相等的。

```js
// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();

s1 === s2 // false

// 有参数的情况
var s1 = Symbol("foo");
var s2 = Symbol("foo");

s1 === s2 // false
```

上面代码中，```s1``` 和 ```s2``` 都是 ```Symbol``` 函数的返回值，而且参数相同，但是它们是不相等的。

```Symbol``` 值不能与其他类型的值进行运算

```js
var sym = Symbol("My symbol");

"your symbol is " + sym
// TypeError: can"t convert symbol to string
`your symbol is ${sym}`
// TypeError: can"t convert symbol to string
```

但是，```Symbol``` 值可以显式转为字符串

```js
var sym = Symbol("My symbol");

String(sym) // "Symbol(My symbol)"
sym.toString() // "Symbol(My symbol)"
```

也可以转为布尔值，但是不能转为数值

```js
var sym = Symbol();

Boolean(sym) // true
!sym  // false

if (sym) {
    // ...
}

Number(sym) // TypeError
sym + 2 // TypeError
```


#### 作为属性名的 Symbol

由于每一个 Symbol 的值都是不相等的，这意味着 Symbol 值可以作为标识符，yongyu对象的属性名，能保证不会出现同名的属性

```js
var mySymbol = symbol();

// 第一种
var a = {};
a[mySymbol] = "Hello";

// 第二种
var a = {
    [mySymbol]: "Hello"
};

// 第三种
var a = {};
Object.defineProperty(a, mySymbol, { value: "Hello" });

a[mySymbol]  // "Hello"
```

注意，```Symbol``` 值作为对象属性名时，不能用点运算符

同理，在对象的内部，使用 ```Symbol``` 值定义属性时，```Symbol``` 值必须放在方括号之中

```js
let s = Symbol();

let obj = {
    // 如果 s 不放在方括号中，该属性的键名就是字符串 s，而不是 s 所代表的那个 Symbol 值
    [s]: function (arg) { ... }
};

obj[s](123);

// 也可以写成

let obj = {
    [s] (arg) {
        // ...
    }
}
```

有一点需要注意，```Symbol``` 值作为属性名时，该属性还是公开属性，不是私有属性



#### 属性名的遍历

```Symbol``` 作为属性名，该属性不会出现在 ```for...in```、```for...of``` 循环中，也不会被 ```Object.keys()```、```Object.getOwnPropertyNames()```、```JSON.stringify()``` 返回。但是，它也不是私有属性，有一个 ```Object.getOwnPropertySymbols``` 方法，可以获取指定对象的所有 ```Symbol``` 属性名

```Object.getOwnPropertySymbols``` 方法返回一个数组，成员是当前对象的所有用作属性名的 ```Symbol``` 值

```js
var obj = {}
var a = Symbol("a");
var b = Symbol("b");

obj[a] = "Hello";
obj[b] = "World";

var objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols;  // [Symbol(a), Symbol(b)]
```

需要注意的是，使用 ```for...in``` 循环、```Object.getOwnPropertyNames``` 方法得不到 ```Symbol``` 属性名，需要使用 ```Object.getOwnPropertySymbols``` 方法

有一个新的 API，```Reflect.ownKeys``` 方法可以返回所有类型的键名，包括常规键名和 ```Symbol``` 键名

```js
let obj = {
    [Symbol("my_key")]: 1,
    enum: 2,
    nonEnum: 3
}

Reflect.ownKeys(obj);  // ["enum", "nonEnum", Symbol(my_key)]
```

由于以 ```Symbol``` 值作为名称的属性，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法

```js
var size = Symbol("size");

class Collection {
    constructor() {
        this[size] = 0;
    }

    add(item) {
        this[this[size]] = item;
        this[size]++;
    }

    static sizeOf(instance) {
        return instance[size];
    }
}

var x = new Collection();
Collection.sizeOf(x) // 0

x.add("foo");
Collection.sizeOf(x) // 1

Object.keys(x) // ["0"]
Object.getOwnPropertyNames(x) // ["0"]
Object.getOwnPropertySymbols(x) // [Symbol(size)]
```

对象 ```x``` 的 ```size``` 属性是一个 ```Symbol``` 值，所以 ```Object.keys(x)```、```Object.getOwnPropertyNames(x)``` 都无法获取它


待续...