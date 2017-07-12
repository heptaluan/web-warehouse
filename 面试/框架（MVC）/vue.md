相关问题

* ```vue``` 响应式原理


----

## vue 响应式原理

可以参考官方文档，[深入响应式原理](https://vuefe.cn/v2/guide/reactivity.html)，讲的很详细了

小小的总结：

简单来说，原理就是：把一个普通 ```Javascript``` 对象传给 ```Vue``` 实例的 ```data``` 选项，```Vue``` 将遍历此对象所有的属性，并使用 ```Object.defineProperty``` 把这些属性全部转为 ```getter/setter```

每个组件实例都有相应的 ```watcher``` 实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 ```setter``` 被调用时，会通知 ```watcher``` 重新计算，从而致使它关联的组件得以更新

需要注意的是：```Vue``` 会在**初始化实例时**对属性执行 ```getter/setter``` 转化过程，所以属性必须在 ```data``` 对象上存在才能让 ```Vue``` 转换它，这样才能让它是响应的

```js
// `vm.a` 是响应的
var vm = new Vue({
    data:{
        a:1
    }
})

// `vm.b` 是非响应的
vm.b = 2
```

由于 ```Vue``` 不允许动态添加根级响应式属性，所以你必须在初始化实例前声明根级响应式属性，这也是为什么建议只要使用到的属性，最好都在 ```data``` 中先声明，哪怕是空值

```js
var vm = new Vue({
    data: {
        // 声明 message 为一个空值字符串
        message: ''
    },
    template: '<div>{{ message }}</div>'
})

// 之后设置 `message` 
vm.message = 'Hello!'
```

如果你在 ```data``` 选项中未声明 ```message```，```Vue``` 将警告你渲染函数在试图访问的属性不存在