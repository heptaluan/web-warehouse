## vertical-align

vertical-align 用来设置垂直对齐方式，所有垂直对齐的元素都会影响行高

它的取值方式有很多种

> 注意：IE7-浏览器中 vertical-align 的百分比值不支持小数行高，且取 baseline、middle、text-bottom 等值时与标准浏览器在展示效果不一样，常用的解决办法是将行内元素设置 display: inline-block 

```js
baseline        // 元素的基线与父元素的基线对齐

sub             // 降低元素的基线到父元素合适的下标位置

super           // 升高元素的基线到父元素合适的上标位置

bottom          // 把对齐的子元素的底端与行框底端对齐

text-bottom     // 把元素的底端与父元素内容区域的底端对齐

top             // 把对齐的子元素的顶端与行框顶端对齐

text-top        // 把元素的顶端与父元素内容区域的顶端对齐

middle          // 元素的中垂点与父元素的基线加 1/2 父元素中字母X的高度对齐

px              // 元素相对于基线 上/下 偏移 px

x%              // 相对于元素的 line-height 值

inherit         // 从父元素继承属性的值
```

综合一些常用情况，简单来说就是：

* 对齐操作必定涉及操作元素和参考系元素，而 vertical-align 的值全是指参考系元素的位置，而操作元素则以 baseline 或 linebox 上中下作对齐

* 默认对齐方式为 baseline，数量值均是相对于 baseline 而言

* 仅对 inline-level 和 table-cell 元素有效（详细见 IFC）

有的时候会遇到 inline-block 底部会有空隙的问题

inline-block 元素在块级元素中留空隙就是因为图像的默认垂直对齐方式是**基线**对齐（基线对齐在原理上图像底边与匿名文本大写英文字母X的底边对齐）

而匿名文本是有行高的，所以X的底边距离行框有一段距离，这段距离就是图像留出的空隙

常用的解决办法

* display: block，因为垂直对齐方式只能作用于替换元素和行内元素，更改为块级元素，会使垂直对齐方式失效

* 设置父级的 line-height: 0，这样使匿名文本与行框的距离为 0

* 使用 vertical-align: top/middle/bottom
```