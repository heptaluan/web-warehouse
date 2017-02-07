## Set

数据结构 Set，类似于数组，但是它的成员都是唯一的，没有重复的值

```js
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
    console.log(i);  // 2 3 5 4
}
```

通过以上结果可知，Set 结构不会添加重复的值

Set 函数可以接受一个数组（或类似数组的对象）作为参数，用来初始化

```js
// 实例一
var set = new Set([1, 2, 3, 4, 4]);

[...set];  // 1, 2, 3, 4

// 实例二
var items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);

items.size;  // 5

// 实例三
function divs () {
    return [...document.querySelectorAll("div")];
}

var set = new Set(divs());

set.size;

// 类似与

divs().forEach(div => set.add(div));

set.size; 

// 这也是一种新的数组去重的方式
[...new Set(array)]
```

需要注意的几点：

* 向 Set 加入值的时候，不会发生类型转换，所以 5 和 "5" 是两个不同的值

* Set 内部判断两个值是否不同，类似于精确相等运算符（===），主要的区别是 NaN 等于自身

* 两个对象总是不相等的
