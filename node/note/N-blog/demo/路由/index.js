/*

var express = require('express')
var app = express()

// 当访问根路径时，依然返回 hello, express
app.get('/', function (req, res) {
  res.send('hello, express')
})

// 当访问如 localhost:3000/users/world 路径时，返回 hello, world
// :name 起了占位符的作用
app.get('/users/:name', function (req, res) {
  res.send('hello, ' + req.params.name)
})

app.listen(3000)

*/

// 上面的例子中 所有路由控制函数都放到了 index.js中，不易维护，现在利用 路由 来改造上面的例子

var express = require('express')
var app = express()

// 将 / 和 /users/:name 的路由分别放到了 routes/index.js 和 routes/users.js 中
// 每个路由文件通过生成一个 express.Router 实例 router 并导出，通过 app.use 挂载到不同的路径
var indexRouter = require('./routes/index')
var userRouter = require('./routes/users')

app.use('/', indexRouter)

app.use('/users', userRouter)

app.listen('3000', function (req, res) {
  console.log('app is running at port 3000')
})
