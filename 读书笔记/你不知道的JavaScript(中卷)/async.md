## 异步

- JavaScript 程序总是至少分为两个块：第一块现在运行，下一块将来运行，以响应某个事件，尽管程序是一块一块执行的，但是所有这些块共享对程序作用域和状态的访问，所以对状态的修改都是在之前累积的修改之上进行的

- 一旦有事件需要运行，事件轮询就会运行，直到队列清空，事件循环的每一轮称为一个 tick，用户交互、IO和定时器会向事件队列中加入事件

- 任意时刻，一次只能从队列中处理一个事件，执行事件的时候，可能直接或间接地引发一个或多个后续事件

- 并发是指两个或多个事件链随事件发展交替执行，以至于从更高的层次来看，就像是同时在运行（尽管任意时刻只处理一个事件）

- 通常需要对这些并发执行的 "进程"（有别于操作系统中的进程概念）进行某种形式的交互协调，比如需要确保执行顺序或者需要防止竞态出现，这些 "进程" 也可以通过把自身分割成更小的块，以便其他 "进程" 插入进来

## Promise

先来看一个简单的示例：

```js
function add (x, y) {
    // Promise.all() 接收一个 promise 数组并返回一个新的 promise
    // 这个 promise 等待数组中所有 promise 完成
    // 然后将接收到的 x 和 y 相加
    // then 中的 values 来自于之前的消息数组
    return Promise.all([x, y]).then(function (values) {
        return values[0] + values[1]
    })
}

// add 返回值为 promise
// 链式调用来获取最后的输出值
add(fromX(), fromY()).then(function (sum) {
    console.log(sum)
}, function (err) {
    console.log(err)
})
```

- 从外部来看，由于 Promise 封装了依赖于时间的状态 -- 等待底层值的完成或拒绝，所以 Promise 本身与时间无法的，因此，Promise 可以按照可预测的方式组成（组合），而不用关心时序或底层的结果

- 另外，一旦 Promise 决议，它就永远保持在这个状态，此时它就称为了不变值（immutable value），可以根据需求多次查看

- 再次强调，Promise 决议后就是**外部不可变**的值，我们可以安全地把这个值传递给第三方，并确信它不会被有意无意的修改（特别是对于多方查看同一个 Promise 决议的情况）


#### 链式流

- 每次你对 Promise 调用 then()，它都会创建并返回一个新的 Promise，我们可以将其链接起来

- 在完成或拒绝处理函数内部，如果返回一个值或抛出一个异常，新返回的（可链接的） Promise 就相应地决议

- 如果完成或拒绝处理函数就返回一个 Promise，它将会被展开，这样一来，不管它的决议值是什么，都会成为当前 then() 返回的链接 Promise 的决议值


## Promise 模式

#### Promise.all([...])

- Promise.all([...]) 接收一个参数，是一个数组，通常由 Promise 实例组成，从 Promise.all([...]) 调用返回的 promise 会收到一个完成消息，这是一个由所有传入 Promise 的完成消息组成的数组，与指定的顺序一致（与完成顺序无关）

- 从 Promise.all([...]) 返回的主 promise 在且仅在所有的成员 promise 都完成后才会完成，如果这些 promise 中有任何一个被拒绝的话，主 Promise.all([...]) 的 promise 都会立即被拒绝，并丢弃来自其他所有 promise 的全部结果

- 永远要记住为每个 promise 关联一个 拒绝/错误处理 处理函数，特别是从 Promise.all([...]) 返回的哪一个

#### Promise.race([...])

- Promise.race([...]) 也接受单个数组参数，这个数组由一个或多个 Promise 组成

- 与 Promise.all([...]) 类似，一旦有任何一个 Promise 决议完成，Promise.race([...]) 都会完成，一旦有任何一个 Promise 决议为拒绝，它就会拒绝

- 要注意，永远不要传递空数组，如果你传入了一个空数组，主 Promise.race([...]) Promise 永远不会决议，而不是立即决议

## Promise API 概览

#### new Promise(..)

- 揭示构造器（revealing constructor） Promise(..) 必须与 new 一起使用，而且必须提供一个被同步/立即调用的回调函数

- 这个函数被传入两个回调函数，它们作为 promise 的解析能力。我们通常将它们标识为 resolve(..) 和 reject(..)

```js
var p = new Promise(function (resolve, reject) {
    // `resolve(..)` 给 解析/完成 的 promise
    // `reject(..)` 给拒绝的 promise
});
```

#### Promise.resolve(..) 和 Promise.reject(..)

- 一个用于创建已被拒绝的 Promise 的简便方法是 Promise.reject(..)，所以这两个 promise 是等价的

- 与 Promise.reject(..) 相似，Promise.resolve(..) 通常用来创建一个已完成的 Promise

```js
var p1 = new Promise( function(resolve,reject){
    reject( "Oops" );
} );

var p2 = Promise.reject( "Oops" );
```

#### then(..) 和 catch(..)

- 每个 Promise 实例（不是 Promise API 名称空间）都有 then(..) 和 catch(..) 方法，它们允许你为 Promise 注册成功或拒绝处理器

- 一旦 Promise 被解析，它们中的一个就会被调用，但不是都会被调用，而且它们总是会被异步地调用

- then(..) 接收两个参数，第一个用于完成回调，第二个用户拒绝回调。如果它们其中之一被省略，或者被传入一个非函数的值，那么一个默认的回调就会分别顶替上来。默认的完成回调简单地将值向下传递，而默认的拒绝回调简单地重新抛出（传播）收到的拒绝理由

- catch(..) 仅仅接收一个拒绝回调作为参数，而且会自动的顶替一个默认的成功回调，换句话说，它等价于 then(null, ..)

#### Promise.all([ .. ]) 和 Promise.race([ .. ])

- 再次强调，如果一个空的 array 被传入 Promise.all([ .. ])，它会立即完成，但 Promise.race([ .. ]) 却会永远挂起，永远不会解析


## Promise 限制

#### 顺序的错误处理

- 如果你构建一个不包含错误处理器的 Promise 链，这个链条的任意位置发生的任何错误都将沿着链条向下无限传播，直到被监听为止（通过在某一步上注册拒绝处理器）

#### 单独的值

- Promise 只能有一个单独的完成值或一个单独的拒绝理由

- 通常的建议是构建一个包装值（比如object或array）来包含这些多个消息

```js
function foo(bar, baz) {
    var x = bar * baz;

    // 将两个promise返回
    return [
        Promise.resolve(x),
        getY(x)
    ];
}

Promise.all(
    foo(10, 20)
)
.then(function (msgs) {
    var x = msgs[0];
    var y = msgs[1];

    console.log(x, y);
});
```

- 利用 ES6 的解构会更方便一些

```js
Promise.all(
    foo(10, 20)
)
.then(function (msgs) {
    var [x, y] = msgs;

    console.log(x, y);    // 200 599
});
```

#### 单次解析

- Promise 的一个最固有的行为之一就是，一个 Promise 只能被解析一次（成功或拒绝）

- 对于多数异步用例来说，你仅仅取用这个值一次，所以这工作的很好



## 生成器

* 先来看一个简单的示例：

  * it = foo() 运算并没有执行生成器 *foo()，而知识构造了一个迭代器（iterator），这个迭代器会控制它的执行

  * 第一个 it.next() 启动了生成器 *foo()，并运行了 *foo() 第一行的 x++

  * *foo() 在 yield 语句处暂停，在这一点上第一个 it.next() 调用结束，此时 *foo() 仍在运行并且是活跃的，但处于暂停状态

  * 然后依次查看 x 的值（此时为 2），调用 bar() 后再次查看 x 的值（此时为 3）

  * 最后的 it.next() 调用从暂停处恢复了生成器 *foo() 的执行，并运行 console.log(x)，输出结果为 3

```js
var x = 1;

function *foo() {
    x++;
    yield;
    console.log(x);
}

function bar () {
    x++;
}

// 构造一个迭代器 it 来控制这个生成器
var it = foo();

// 这里启动 foo
it.next();
x;

bar();

x;
it.next();
```

* 生成器就是一类特殊的函数，可以一次或多次启动和暂停，并不一定非得要完成


#### 输入和输出

* 生成器函数是一个特殊的函数，但是，它仍然是一个函数，可以接受参数，也可以返回值

```js
function *foo(x, y) {
    return x * y;
}

var it = foo(4, 5);

var res = it.next();

console.log(res.value)  // 20
```

* 生成器 *foo() 并没有像普通函数一样实际运行，事实上，我们只是创建了一个迭代器对象，把它赋给一个变量 it，用于控制生成器

* 然后调用 it.next() 指示生成器 *foo() 从当前位置开始继续运行，停在下一个 yield 处或者直到生成器结束

* next() 的调用结果是一个对象，它有一个 value 属性，持有从 *foo() 返回的值（如果有的话），yield 会导致生成器在执行过程中发送一个值，有点类似于中间的 return


#### 多个迭代器

- 每次构建一个迭代器，实际上就隐式构建了生成器的一个实例，通过这个迭代器来控制的是这个生成器的实例

```js
function *foo () {
    var x = yield 2;
    z++;
    var y = yield (x * z);
    console.log(x, y, z);
}

var z = 1;

var it1 = foo();
var it2 = foo();

var val1 = it1.next().value;  // 2  <== yield 2
var val2 = it2.next().value;  // 2  <== yield 2

// 调用 next() ==> x * z ==> x 为 (val2 * 10) / z 为 2（z++）  ==> 结果为 2 * 10 * 2 
val1 = it1.next( val2 * 10 ).value;  // 40

// 再次调用 next() ==> x * z ==> x 为 (val1 * 5) / z 为 3（z++）  ==> 结果为 40 * 5 * 3
val2 = it2.next( val1 * 5 ).value;  // 600

it1.next( val2 / 2 );  // 300 ==> x: 20, y: 300（600 / 2 然后发送出去）, z: 3
it2.next( val1 / 4 );  // 10  ==> x: 200, y: 10 （40 / 4），z: 3
```

- *foo() 两个实例同时启动，两个 next() 分别从 yield 2 语句得到值为 2

- val2 * 10 也就是 2 * 10，发送到第一个生成器实例 it1，因此 x 的值 为 20，z 从 1 递增到 2，然后 20 * 2 通过 yield 发出，将 val1 的值设为 40

- val1 * 5 也就是 40 * 5，发送到第二个生成器实例 it2，因此 x 的值为 200，z 从 2 递增到 3，然后 200 * 3 通过 yield 发出，将 val2 的值设为 600

- val2 / 2 也就是 600 / 2，发送到第一个生成器实例 it1，因此 y 的值为 300，然后打印 x y z（20， 300， 3）

- val1 / 4 也就是 40 / 4，发送到第二个生成器实例 it2，因此 y 的值为 10，然后打印 x y z（200， 10， 3）



## 迭代器

- 迭代器是一个定义良好的接口，用于从一个生产者一步步得到一系列值，JavaScript 迭代器接口，与多语言类似，就是每次想要从生产者得到下一个值的时候调用 next()

- 可以为我们的数字序列生成器实现标准的迭代器接口：

```js
var something = (function () {

    var nextVal;

    return {
        // for .. of 需要
        // [ .. ] 语法被称为 计算属性名，在对象术语定义中指指定一个表达式并用这个表达式的结果作为属性的名称
        // 将 something 的值（迭代器 something 的接口）也构建成一个 iterable
        // 现在它既是 iterable 也是 迭代器，然后我们把 something 传给 for..of 循环
        // for..of 循环期望 something 是 iterable，于是它寻找并调用它的 Symbol.iterable 函数
        // 我们将这个函数定义为就是简单的 return this，也就是把自身返回 
        [Symbol.iterator]: function () { return this },
        next: function () {
            if (nextVal === undefined) {
                nextVal = 1;
            } else {
                nextVal = (3 * nextVal) + 6;
            }

            return { done: false, value: nextVal }

        }
    }

})()

something.next();  // 1
something.next();  // 9
something.next();  // 33
something.next();  // 105
```

- next() 调用返回一个对象，这个对象有两个属性，done 是一个 boolean 值，标识迭代器的完成状态，value 中放置迭代值

- 需要注意的是，如果使用 for..of 来循环这个迭代器，记得要在里面放上 break，因为这个迭代器总是返回 done: false

- 许多 JavaScript 的内建数据结构（ES6 开始），比如 array，也有默认的迭代器

```js
var a = [1, 3, 5, 7, 9]

for (var v of a) {
    console.log(v)
}

// 1, 3, 5, 7, 9
```

之前例子上的 something 对象叫做 迭代器，因为它的结构中有一个 next() 方法，而与其紧密相关的一个术语是 iterable（可迭代），即指一个包含可以在其值上迭代的迭代器的对象

从 ES6 开始，从一个 iterable 中提取迭代器的方法是：iterable 必须支持一个函数，其名称是专门的 ES6 符号值 Symbol.iterator，调用这个函数的时候，它会返回一个迭代器，通常每次调用会返回一个全新的迭代器（）

- 比如上面的那个例子，我们也可以手工调用这个函数，然后使用它返回的迭代器

```js
var a = [1, 3, 5, 7, 9]

var it = a[Symbol.iterator]();

it.next().value  // 1
it.next().value  // 3
it.next().value  // 5
...

```


#### 迭代器 与 生成器

* 迭代器（Iterator）

  * 迭代器是一个每次访问集合序列中一个元素的对象，并跟踪该序列中迭代的当前位置。在 JavaScript 中迭代器是一个对象，这个对象提供了一个 next() 方法，next() 方法返回序列中的下一个元素

  * 当序列中所有元素都遍历完成时，该方法抛出 StopIteration 异常

  * 迭代器对象一旦被建立，就可以通过显式的重复调用 next()，或者使用 JavaScript 的 for..in 和 forEach 循环隐式调用
  
  * 迭代器可以自定义

    * 1. 迭代一个表示范围(Range)的对象应该一个接一个的返回这个范围包含的数字

    * 2. 一个树的叶子节点可以使用深度优先或者广度优先访问到

    * 3. 迭代一个代表数据库查询结果的对象应该一行一行的返回，即使整个结果集尚未全部加载到一个单一数组

    * 4. 作用在一个无限数学序列(像斐波那契序列)上的迭代器应该在不创建无限长度数据结构的前提下一个接一个的返回结果

    * 5. JavaScript 允许你写自定义迭代逻辑的代码，并把它作用在一个对象上

* 生成器（Generator）

  * 生成器提供了很强大的功能：它允许你定义一个包含自有迭代算法的函数， 同时它可以自动维护自己的状态

  * 生成器是可以作为迭代器工厂的特殊函数，如果一个函数包含了一个或多个 yield 表达式，那么就称它为生成器

  * 当一个生成器函数被调用时，函数体不会即刻执行，它会返回一个 generator-iterator 对象，每次调用 generator-iterator 的 next() 方法，函数体就会执行到下一个 yield 表达式，然后返回它的结果

  * 当函数结束或者碰到 return 语句，一个 StopIteration 异常会被抛出


可以通过生成器实现之前的 something 无限数字序列生产者：

```js
function *something () {

    var nextVal;

    // 一般的程序中不推荐在没有 break/return 等这样的语句的情况下使用（会无限循环）
    // 如果在生成器中有 yield 的话，因为生成器会在每次迭代中暂停，通过 yield 返回到主程序或事件循环队列中
    while (true) {
        if (nextVal === undefined) {
            nextVal = 1;
        } else {
            nextVal = (3 * nextVal) + 6;
        }

        // 生成器会在每个 yield 处暂停，函数 *something () 的状态（作用域）会被保持，即意味着不再需要闭包在调用之间保持变量状态
        yield nextVal;
        
    }
} 
```

现在就可以通过 for..of 来循环

```js
// 不要把 something 当成一个值来使用，我们需要调用 something() 来构造一个生产者供 for..of 循环
for (var v of something()) {
    console.log(v)

    // 不要死循环
    if (v > 500) {
        break;
    }
}
```


#### 停止生成器

- 如果生成器有 try..finally 的话，在 for..of 循环内的 break 会触发 finally 语句

```js
function *something () {

    try {
        // ...
    }

    finally {
        console.log(`cleaning up`)
    }
} 
```

- 也可以在外部通过 return(..) 来手动终止生成器的迭代器实例

```js
var it = something();

for (var v of something()) {

    console.log(v)

    // 不要死循环
    if (v > 500) {

        // 完成生成器的迭代器
        // 调用 it.return() 之后，它会立即终止生成器
        // 它还会把返回的 value 设置为传入的 return(..) 的内容
        // 现在也不需要包含 break 语句了，因为生成器的迭代器已经被设置为 done: true
        // 所以 for..of 循环会在下一个迭代终止
        console.log(it.return("cleaning up").value)

        // 这里不需要 break
    }
}
```