// MD5 值

// 引入依赖
var express = require('express')
var utility = require('utility')

// 建立 express 实例
var app = express()

app.get('/', function (req, res) {
  // 从 req.query 中取得 q 参数
  // 如果是 post 传过来的 body 数据，则存在于 req.body 里面
  // （express默认不处理 body 中的信息，需要引入 body-parser 中间件才会处理）
  var q = req.query.q
  // 调用 utility.md5 方法，得到 md5 之后的值（相关库有很多，可自行选择）
  var md5Value = utility.md5(q)
  res.send(md5Value)
})

app.listen('3000', function (req, res) {
  console.log('app is running at port 3000')
})

// -----------------------------------------------------------------------------

// sha1 值

// 引入依赖
var express = require('express')
var sha1 = require('sha1')

// 建立 express 实例
var app = express()

app.get('/', function (req, res) {
  var q = req.query.q
  var sha1 = sha1(q)
  res.send(sha1)
})

app.listen('3000', function (req, res) {
  console.log('app is running at port 3000')
})
