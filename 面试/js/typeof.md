判断变量类型也需要分情况讨论

----

## 原始值

在 ```JS``` 中有 ```5``` 种原始类型：字符串，数字，布尔值，```null``` 和 ```undefined```，如果你希望检测一个值是否为原始类型，最佳选择是使用 ```typeof``` 运算符

```js
对于字符串，typeof 返回 "string"

对于数字，typeof 返回 "number"

对于布尔值，typeof 返回 "boolean"

对于undefined，typeof 返回 "undefined"
```

还有一个原始值 ```null```，一般不用于检测语句，但有一个例外，如果所期望的值真的是 ```null```，则可以直接和 ```null``` 进行比较，这时应当使用 ```"==="``` 或者 ```"!=="``` 来和 ```null``` 进行比较

```js
var element = document.getElementById("myDiv");
 
if (element !== null) {
    element.classList.add("found");
}
```


## 引用值

在 ```JS``` 中除了原始值之外的值都是引用，有这几种内置的引用的类型：```Object```, ```Array```, ```Error```, ```Date```

```typeof``` 运算符在判断这些引用类型的时候就显得力不从心，因为所有的对象都会返回 ```"object"```

```js
console.log(typeof {});  // "object"
 
console.log(typeof []);  // "object"
 
console.log(typeof new Date());  // "object"
 
console.log(typeof new RegExp());  // "object"
```

所以，在检测某个引用值的类型的最好的方法是使用 ```instanceof``` 运算符：

```js
// 检测日期
if (value instanceof Date) {
    console.log(value.getFullYear());
}
 
// 检测正则表达式
if (value instanceof RegExp) {
    if (value.test(anotherValue)) {
        console.log("Matches");
    }
}
 
// 检测 Error
if (value instanceof Error) {
    throw value;
}
```

默认情况下，每个对象都继承自 ```Object```，因此每个对象的 ```value instanceof Object``` 都会返回 ```true```

```js
var now = new Date();
 
console.log(now instanceof Date);    // true
console.log(now instanceof Object);    // true
```

正因为这个原因，使用 ```value instanceof Object``` 来判断对象是否属于某个特定类型的做法并非最佳

在 ```JS``` 中检测自定义类型的时候，最好的做法就是使用 ```instanceof``` 运算符，这也是唯一的方法，但是也有例外（跨 ```frame```）


## 函数检测

检测函数最好的方法是使用 ```typeof``` ，因为它可以跨 ```frame``` 使用

```js
function myFunc () {}
 
// 推荐，返回的是 function
console.log( typeof myFunc === "function" );  // true
```


## 数组检测

```ES5``` 中将 ```Array.isArray()``` 正式的引入，唯一的目的就是检测一个值是否为数组

```js
function isArray (value) {
    if (typeof Array.isArray === "function") {
        return Array.isArray(value);
    } else {
        return Object.prototype.toString.call(value) === "[object Array]";
    }
}
```


## 属性检测

判断属性是否存在的最好的方法是使用 ```in``` 运算符，```in``` 运算符仅仅会简单的判断属性是否存在，而不会去读属性的值，如果实例对象的属性存在，或者继承自对象的原型，```in``` 运算符都会返回 ```true```

```js
var object = {
    count: 0,
    related: null
};
 
// 推荐
if ("count" in object) {
    // ...
}
 
// 不推荐
if (object["count"]) {
    // ...
}
```

如果你只想检查实例对象的某个属性是否存在，则使用 ```hasOwnProperty()``` 方法

所以在判断实例对象是否存在的时候，推荐使用 ```in``` 运算符，只有在需要判断实例属性的时候才会用到 ```hasOwnProperty()```



## 总结

* 原始值（字符串，数字，布尔值，```undefined```）  --  ```typeof```

* 引用值（```Date```，```RegExp```，```Error```）  --  ```instanceof```

* 函数  --  ```typeof```

* 数组  --  ```isArray```

* 属性检测（是否存在）  --  ```in``` / ```hasOwnProperty()```



