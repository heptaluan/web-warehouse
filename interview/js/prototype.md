原型链

----


每一个构造函数都有一个属性叫做 `prototype`，指向一个对象，当这个构造函数被 `new` 的时候，它的每一个实例的 `__proto__` 属性都会指向这个属性

每一个函数天生都有 `prototype` 属性，指向一个空对象，也就是说，不需要去手动的定义这个属性

```js
function People(name, age) {
    this.name = name;
    this.age = age;
}

var man = new People("小明", 20);

People.prototype === man.__proto__;  // true
```

如上，这时的 `People.prototype` 是 `People` 构造函数的 "原型"，`People.prototype` 则是 `man` 的 "原型对象"

当 `man` 身上没有某个属性或者方法的时候，它会沿着 `__proto__` 属性依次向上查询

总结如下：

* 任何函数都有 `prototype`，是一个空对象（也有特殊情况，比如 `Object.create(null)`）

* `prototype` 的值是一个对象，这个函数 new 出来的实例对象的 `__proto__` 是指向这个函数的 `prototype` 的