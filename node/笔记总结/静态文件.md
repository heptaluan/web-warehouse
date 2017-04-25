## 利用 Express 托管静态文件

### app.use(express.static(__dirname + '/public'));

你肯定在你的app文件中这么用过它：

```js
app.use(express.static(__dirname + '/public'));  // 设置静态文件目录
```

亦或是

```js

// 或者运用 path 模块的 join 方法效果是和前面是等价的，注意这里要引入 path 模块
app.use(express.static(path.join(__dirname, 'public')));  // 和上面是一样的

```

同注释里说明的一样，这里的作用是帮助我们设置静态资源目录

### 静态资源文件

静态资源文件通俗的可以理解成对于不同的用户来说，内容都不会变化的文件。比如不管是谁访问，他们所接收到的看到的图片、css文件和前端 javascript 文件都是一样的，我们称这类文件为**静态资源文件**。

### app.use

app.use 是用来给 path 注册中间函数的，这个 path 默认是 '/'，也就是处理任何请求，同时要注意的是他会处理 path 下的子路径，比如如果设置 path 为 '/hello'，那么当请求路径为 '/hello/'， '/hello/a', '/hello/b' 这样的请求都会交给中间函数处理的。

### express.static

通过 Express 内置的 ```express.static``` 可以方便地托管静态文件，例如图片、CSS、JavaScript 文件等。

将静态资源文件所在的目录作为参数传递给 ```express.static``` 中间件就可以提供静态资源文件的访问了。例如，假设在 public 目录放置了图片、CSS 和 JavaScript 文件，你就可以：

```js
app.use(express.static('public'));
```

现在，public 目录下面的文件就可以访问了。

```js
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

需要注意的是：Express 会在静态资源目录（例如 public）下查找文件，所以不需要把静态目录作为 URL 的一部分。

如果你的静态资源存放在多个目录下面，你可以多次调用 express.static 中间件：

```js

app.use(express.static('public'));
app.use(express.static('files'));

```

Express 将会按照你设置静态资源目录的顺序来查找静态资源文件。

为了给静态资源文件创建一个虚拟的文件前缀(实际上文件系统中并不存在) ，可以使用 ```express.static``` 函数指定一个虚拟的静态目录，就像下面这样：

```js
app.use('/static', express.static('public'));
```

现在你可以使用 /static 作为前缀来加载 public 文件夹下的文件了。

```js
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

然而，你提供给 ```express.static``` 函数的路径是一个相对node进程启动位置的相对路径。如果你在其他的文件夹中启动 express app，更稳妥的方式是使用静态资源文件夹的绝对路径： 

```js
app.use('/static', express.static(__dirname + '/public'));
```
