var express = require('express')

// 生成一个 express 实例 app
var app = express()

// 挂载了一个根路由控制器
app.get('/', function (req, res) {
  res.send('hello world')
})

// 监听 3000 端口并启动程序
app.listen('3000', function () {
  console.log('app is running at port 3000')
})
