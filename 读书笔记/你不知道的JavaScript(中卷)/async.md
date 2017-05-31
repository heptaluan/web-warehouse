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