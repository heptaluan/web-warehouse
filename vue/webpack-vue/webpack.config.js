module.exports = {
	// 入口文件
	entry: "./main.js",

	// 出口文件
	output: {
		filename: "bundle.js",
		// 当前路径
		path: __dirname
	},
	module: {
		rules: [
			// 下面这句的意思是 使用 vue-loader 来处理以 .vue 结尾的文件
			// 如果多个 loader 的话，中间可以使用 ! 来连接，比如 style!css
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			// 规则和上面类似，需要注意的就是多了一个 exclude
			// 意思是 匹配除了 /node_modules/ 和 bower_components 之外的所有 .js 文件
			// 关于 options 选项，如果在根目录下的 .babelrc 配置了，这里就不需要了，两者是一样的
			// 关于 .babelrc 见下方
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						// 先配置一个前置
						presets: ["es2015"],
						// 还需要一个插件来使每次改变的时候，实时编译
						plugins: ["transform-runtime"]
					}
				}
			}

		]
	}
}