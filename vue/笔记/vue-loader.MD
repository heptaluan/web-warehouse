从头开始手动搭建一个简单的脚手架，了解一下 webpack 在项目中的使用

大致目录结构如下：

```js
├── index.html           根本件，最后用于展示 <app></app> 组件
├── main.js              入口文件
├── App.vue              vue 文件
├── pacjage.json         工程配置文件（依赖，配置）
├── webpack.config.js    webpack 配置文件  
```

首先需要先安装 webpack 和 webpack-dev-server，然后再配置一下 webpack，首先先简单的指定一下入口和出口文件

```js
// webpack.config.js
module.exports = {
	// 入口文件
	entry: './app/index.js',

	// 出口文件
	output: {
		filename: 'bundle.js',
		// 当前路径
		path: __dirname
	}
};
```

然后就可以在我们的 index.html 中引入出口文件中指定的 js，这个时候可以先运行测试一下，如果想直接在命令行使用类似 ```npm run dev``` 命令的话，就需要配置一下 package.json 文件

需要注意，json 文本内部不能添加注释，这里只是标注一下

```js
{
	"name": "app",
	"version": "1.0.0",
	"description": "",
	"main": "main.js",
    // 设置 scripts 即可
    // --inline 自动刷新
    // --hot 热载
    // --port 设定端口（在端口被占用的情况下可以利用这个参数来指定，默认的为 8080）
	"scripts": {
		"dev": "webpack-dev-server --inline --hot"
	},
	"keywords": [],
	"author": "",
	"license": "ISC",
	"devDependencies": {
		"webpack": "^2.5.1",
		"webpack-dev-server": "^2.4.5"
	}
}
```

然后就可以使用 ```npm run dev``` 命令来启动服务了，如果成功的话，可以在控制台看到类似 ```Project is running at http://localhost:8080/```，这个时刻打开浏览器访问 ```http://localhost:8080/``` 就可以看到效果了