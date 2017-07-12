`call` 和 `apply` 哪个速度更快一些

----


通常来说，`call` 是要比 `apply` 快一些的，至于为什么，这就要看它们在被调用之后发生了什么

## Function.prototype.apply (thisArg, argArray)

1. 如果 `IsCallable（Function）` 为 `false`，即 `Function` 不可以被调用，则抛出一个 `TypeError` 异常

2. 如果 `argArray` 为 `null` 或未定义，则返回调用 `Function` 的 `[[Call]]` 内部方法的结果，提供 `thisArg` 和一个空数组作为参数

3. 如果 `Type（argArray）` 不是 `Object`，则抛出 `TypeError` 异常

4. 获取 `argArray` 的长度，调用 `argArray` 的 `[[Get]]` 内部方法，找到属性 `length`， 赋值给 `len`

5. 定义 `n` 为 `ToUint32（len）`

6. 初始化 `argList` 为一个空列表

7. 初始化 `index` 为 `0`

8. 循环迭代取出 `argArray`，重复循环 `while（index < n）`

  * 将下标转换成 `String` 类型，初始化 `indexName` 为 `ToString(index)`

  * 定义 `nextArg` 为 使用 `indexName` 作为参数调用 `argArray` 的 `[[Get]]` 内部方法的结果

  * 将 `nextArg` 添加到 `argList` 中，作为最后一个元素

  * 设置 `index ＝ index＋1`

9. 返回调用 `Function` 的 `[[Call]]` 内部方法的结果，提供 `thisArg` 作为该值，`argList` 作为参数列表


## Function.prototype.call (thisArg [ , arg1 [ , arg2, .. ] ] )

* 如果 `IsCallable（Function）` 为 `false`，即 `Function` 不可以被调用，则抛出一个 `TypeError` 异常

* 定义 `argList` 为一个空列表

* 如果使用超过一个参数调用此方法，则以从 `arg1` 开始的从左到右的顺序将每个参数附加为 `argList` 的最后一个元素

* 返回调用 `func` 的 `[[Call]]` 内部方法的结果，提供 `thisArg` 作为该值，`argList` 作为参数列表


## 总结

由于 `apply` 中定义的参数格式（数组），使得被调用之后需要做更多的事，需要将给定的参数格式改变（步骤 `8` 中所示）， 同时也有一些对参数的检查（步骤 `2`），而在 `call` 中却是不必要的

另外在 `apply` 中不管有多少个参数，都会执行循环，也就是步骤 `6 - 8`，而在 `call` 中也就是对应步骤 `3` ，是有需要才会被执行