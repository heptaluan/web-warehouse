











## splice() 与 slice()

* `splice()` 方法 用于插入、删除或替换数组的元素
* `slice()` 方法 可提取字符串的某个部分，并以新的字符串返回被提取的部分


## splice

`splice` 的参数： `splice (start, deleteCount, [item1[, item2[, . . . [,itemN]]]])`

* 数组从 `start` 下标开始，删除 `deleteCount` 个元素，并且可以在这个位置开始添加 `n` 个元素
* 当 `start`，`deleteCount` 均为 `0` 的时候，也就是在数组的最前面插入新的元素
* 当参数只有 `start`，`deleteCount` 就是从 `start` 下标开始删除 `deleteCount` 个数组的元素
* 当参数只有 `start` 参数时，就是删除从 `start` 下标起至最后的元素
* 当参数为负的时则该参数规定的是从数组元素的尾部开始算起的位置（`-1` 指的是数组中倒数第一个元素，`-2` 指的是，数组中倒数第二个元素）



#### splice（数组）

```js
var a = ['a', 'b', 'c']

var b = a.splice(1, 1, 'e', 'f')  // a = ['a','e','f','c'], b = ['b']
```



## slice

`slice` 参数：`slice（start，end）`，`slice` 方法，在 `string` 对象和 `array` 对象 的用法上类似

* 对于数组对象来说，`slice` 方法提取从 `start` 下标起以 `end` 下标为结尾的一段元素（但不包括 `end` 下标的元素），然后返回新的数组，对原数组没有任何是影响
* 当参数为负时，则该参数是从数组的末尾索引开始算起，（`-1` 指的是数组中倒数第一个元素，`-2` 指的是数组中倒数第二个元素）
* 当参数为一个参数，当为一个参数时，提取是以 `start` 下标起至末尾的部分元素
* 当 `start` 为 `0` 时， 等于说是克隆一个新的数组，克隆后两个数组进行各自的操作，都互不影响




```js
var clone = array.slice(0)
```

#### slice（数组）

用法：`array.slice(start, end)`

```js
// 如果不传入参数二，那么将从参数一的索引位置开始截取，一直到数组尾
var a = [1, 2, 3, 4, 5, 6]
var b = a.slice(0, 3)   // [1, 2, 3]
var c = a.slice(3)      // [4, 5, 6]

// 如果两个参数中的任何一个是负数，array.length 会和它们相加，试图让它们成为非负数，举例说明
// 当只传入一个参数，且是负数时，length 会与参数相加，然后再截取
var a = [1, 2, 3, 4, 5, 6]
var b = a.slice(-1)     // [6]

// 当只传入一个参数，是负数时，并且参数的绝对值大于数组 length 时，会截取整个数组
var a = [1, 2, 3, 4, 5, 6]
var b = a.slice(-6)     // [1, 2, 3, 4, 5, 6]
var c = a.slice(-8)     // [1, 2, 3, 4, 5, 6]

// 当传入两个参数一正一负时，length 也会先于负数相加后，再截取
var a = [1, 2, 3, 4, 5, 6]
var b = a.slice(2, -3)  // [3]

// 当传入一个参数，大于 length 时，将返回一个空数组
var a = [1, 2, 3, 4, 5, 6]
var b = a.slice(6)　　  // []
```


#### slice（字符串）

用法：`string.slice(start,end)`

```js
var a = 'hello world'
var b = a.slice(0, 7)  // 'hello w'
```


## 附录，借用 concat() 函数进行数组的复制

`concat()` 用于进行数组的合并，使用语法为 `arrayObject.concat(arrayX, arrayX, ..., arrayX)`，`concat()` 用于多个数组的合并，但是返回的结果是一个新的数组，而不再引用用于合并的任何一个数组，可以利用它的这个特性来用一个数组连接空数组或直接不传参数完成 `clone` 的功能

```js
var clone = array.concat()
```