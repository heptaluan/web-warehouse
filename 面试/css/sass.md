## 变量

```css
$color: red;

h1#box {
    color: $color;
}

#sidebar {
    background: $color;
}
```

## 嵌套 & 多层级

```css
ol.nav {
    float: left;
    li {
        float: left;
        a {
            color: $color;
        }
        &.current {
            font-weight: bold;
        }
    }
}
```

## 混合器

```css
@mixin li-list {
    li {
        float: left;
        margin-right: 10px;
    }
}

#header ul.nav {
    @include li-list;
    float: right;
}

#footer ul.nav {
    @include li-list;
    float: left;
}

<!-- 应用变量 -->
@mixin li-list($spacing: 20px) {
    li {
        float: left;
        margin-right: $spacing;
    }
}

#header ul.nav {
    @include li-list;
    float: right;
}

#footer ul.nav {
    @include li-list(20px);
    float: left;
}
```

## 继承

在 ```sass``` 中，选择器继承可以让选择器继承另一个选择器的所有样式，并联合声明，使用选择器的继承，要使用关键词 ```@extend```，后面紧跟需要继承的选择器

```css
h1 {
    font-size: 12px;
    color: red;
}

.bar {
    @extend h1;
    border: 1px solid blue;
}
```

* ```extend``` 不可以继承选择器序列

```css
<!-- 不能这么使用 -->
.A .B {
    color: red;
}
 
.C {
    @extend .A .B;
}
```

* 继承在指令中是有作用域问题的，继承是无法使在指令如(```@media```)之外的选择器继承的，要是继承就只能写在指令中

```css
<!-- 无法继承 -->
.one {  
    height:300px;  
}  
@media print {  
    .two {  
        @extend .one;  
        width:300px;  
    }  
}  

<!-- 改为 -->
@media print {  
    .one {  
        height:300px;  
    }  
    .two {  
        @extend .one;  
        width:300px;  
    }  
}  
```

#### 选择器继承

```css
.error {
    border: 1px solid #f00;
    background: #fdd;
}
 
.error.intrusion {
    font-size: 1.2em;
    font-weight: blod;
}
 
.badError {
    @extend .error;
    border-width: 3px;
}
```


## @at-root

可以用来跳出选择器嵌套的。默认所有的嵌套，继承所有上级选择器，但有了这个就可以跳出所有上级选择器

```css
.parent-1 {
    background: #f00;

    @at-root {
        .child1 {
            width: 300px;
        }

        .child2 {
            width: 400px;
        }
    }
}
```


## @at-root (without: ...)

默认 ```@at-root``` 只会跳出选择器嵌套，而不能跳出 ```@media```，如果要跳出这种，则需使用 ```@at-root (without: media)```。语法的关键词：```all```（表示所有），```rule```（表示常规 ```css```），```media```（表示 ```media```）。我们默认的 ```@at-root``` 其实就是 ```@at-root (without:rule)```

```css
// 跳出父级元素嵌套
@media print {
    .parent1 {
        color: #f00;

        @at-root .child1 {
            width: 200px;
        }
    }
}

// 跳出 media 嵌套，父级有效
@media print {
    .parent2 {
        color: #f00;

        @at-root (without: media) {
            .child2 {
                width: 200px;
            }
        }
    }
}

// 跳出 media 和父级
@media print {
    .parent3 {
        color: #f00;

        @at-root (without: all) {
            .child3 {
                width: 200px;
            }
        }
    }
}
```