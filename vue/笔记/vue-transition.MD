## vue 过渡效果

在 vue2.x 之前，使用动画一般都给需要运动的元素一个 transition 自定义属性，然后指定为 fade，即：

```js
<p transition="fade"></p>
```

然后再去 css 当中设置一系列的动画属性

```css
.fade-transition {...}
.fade-enter {...}
.fade-leave {...}
```

但是在 2.0 之后，动画效果变成了使用 transition **组件**的形式

```js
<transition>

    运动元素（元素， 属性， 路由...）

</transition>
```

一个简单的示例

```js
// html
<transition name="fade">
    <p v-show="show"></p>
</transition>

// css
// 默认的 p 的状态
// 需要注意的是，如果没有设置 .fade-leave，那么其设置的属性就为运动完成后的最终状态
// 比如将其设置为 100px 并且不设置 fade-leave，那么此时在元素运动到 300px 之后会回复到 100px 的状态
p {
    width: 300px;
    height: 300px;
    background: red;
}

----

// 动画运动的时间是必须要设置的
.fade-enter-active, .fade-leave-active {
    transition: all 1s ease;
}

.fade-enter, .fade-leave {
    opacity: 0;
    width: 100px;
    height: 100px;
}

.fade-enter-active {
    opacity: 1;
    width: 300px;
    height: 300px;
}

.fade-leave-active {
    opacity: 0;
    width: 100px;
    height: 100px;
}
```

简单来说，动画其实分为四步

```js
// 比如设置运动状态为透明度度的变化（0  ==>  1  ==>  0）

// 初始状态（元素即将开始运动的状态，这个时候透明度一般为 0）
.fade-enter  ==> 

// 变化为什么样子（当元素开始运动的时候，这个时候是由透明度 0 ==> 1 的过程）
.fade-enter-active  ==>  

// 元素运动完成后的状态（此时元素的透明度为 1，然后即将再次变为 0）
.fade-leave  ==>  

// 最终变成的样子（元素离开或是消失的时候，此例中为透明度变成 0）
.fade-leave-active
```

核心步骤是二，四两步，.fade-leave 理论上不写也是可以实现动画效果的，但是官方推荐加上