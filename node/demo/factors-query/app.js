var express = require('express')
var app = express()
var constroller = require('./controllers/constroller.js')

// 设置模版引擎
app.set('view engine', 'ejs')

// 处理对应请求，指向对应的 constroller
app.get('/', constroller.showIndex)
app.get('/:number', constroller.showResult)

// 静态资源路由
app.use(express.static('public'))

app.listen(3000)