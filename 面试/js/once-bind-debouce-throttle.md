

## once

原理是利用闭包的特性，传递参数，执行完一次以后就自动解除绑定

```js
function once(dom, event, callback) {

    var handle = function () {
        callback();
        dom.removeEventListener(event, handle);
    }

    dom.addEventListener(event, handle)
    
}
```

## bind

实现原理见：[Function.prototype.bind()](http://hanekaoru.com/?p=1522)

```js
if (!Function.prototype.bind) {
 
    Function.prototype.bind = function (oThis) {
 
        if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }
 
        var aArgs = Array.prototype.slice.call(arguments, 1),

            fToBind = this,
 
            fNOP = function () { },
             
            fBound = function () {

                return fToBind.apply(this instanceof fNOP
                    ? this
                    : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));

            };
      
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
 
        return fBound;
        
    };
}

```


## debounce

在某些场景下，比如拖拽（```mousemove```），窗口大小调整（```resize```）等事件，触发频率比较高，若稍处理函数很复杂的话，就需要较多的运算执行时间，响应速度跟不上触发频率，往往会出现延迟，导致假死或者卡顿感

这种情况下就出现了函数节流（```throttle```），和其类似的就是 ```debounce``` 函数，这两个函数的目的都是为了解决上述问题

#### 原理

比如每天上班大厦底下的电梯，把电梯完成一次运送，类比为一次函数的执行和响应，假设电梯有两种运行策略 ```throttle``` 和 ```debounce``` ，超时设定为 ```15``` 秒，不考虑容量限制

* ```throttle``` 策略的电梯，保证如果电梯第一个人进来后，```15``` 秒后准时运送一次，不等待，如果没有人，则待机

* ```debounce``` 策略的电梯，如果电梯里有人进来，等待 ```15``` 秒，如果有人进来，```15``` 秒等待重新计时，直到 ```15``` 秒超时，开始运送

#### debounce

```js
// 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 time，handle 才会执行
// debounce(time, handle)

var debounce = function (time, handle) {

    var last

    return function () {
        var ctx = this, args = arguments
        clearTimeout(last)
        last = setTimeout(function () {
            handle.apply(ctx, args)
        }, time)
    }
    
}
```


#### throttle

```js
// 频率控制 返回函数连续调用时，handle 执行频率限定为 次/time
// throttle(time, handle)

var throttle = function (time, handle) {

    var last = 0;

    return function () {
        var curr = +new Date();
        if (curr - last > time) {
            handle.apply(this, arguments)
        }
        last = curr;
    }

}
```