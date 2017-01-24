#### Symbol

在 ES5 中的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法，新方法的名字就有可能与现有方法产生冲突

ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值

它是 JavaScript 语言的**第七种**数据类型（其余六种是 Undefined、Null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object））

Symbol 值通过 Symbol 函数生成，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型

凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突

```js
let s = Symbol();

typeof s
// "symbol"
```