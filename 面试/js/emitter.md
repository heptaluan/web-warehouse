`JavaScript` 中的事件模型

----

简单来说，即一个类或是一个模块，有两个函数，一个 `bind` 一个 `trigger`，分别实现绑定事件和触发事件

核心需求就是可以对某一个事件名称绑定多个事件响应函数，然后触发这个事件名称时，依次按绑定顺序触发相应的响应函数

```js
var Emitter = function () {
    this._listeners = {};
};

// 注册事件
Emitter.prototype.on = function (eventName, callback) {
    var listeners = this._listeners[eventName] || [];
    listeners.push(callback);
    this._listeners[eventName] = listeners;
}

// 触发事件
Emitter.prototype.emit = function (eventName) {
    var args = Array.prototype.slice.apply(arguments).slice(1),
        listeners = this._listeners[eventName],
        self = this;

    if (!Array.isArray(listeners)) return;

    listeners.forEach(function (callback) {
        try {
            callback.apply(this, args);
        } catch (e) {
            console.error(e);
        }
    });
}

// 实例对象
var emitter = new Emitter();

emitter.on("event2", function (arg1, arg2) {
    console.log("get event2", arg1, arg2);
})

emitter.on("event1", function (arg1, arg2) {
    console.log("get event1", arg1, arg2);
})

console.log("emit event");

emitter.emit("event2", "arg1", "arg2");
emitter.emit("event1", "arg1", "arg2");
```