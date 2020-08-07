var express = require('express')
var app = express()

app.use(function (req, res, next) {
  console.log(1)
  next(new Error('abc'))
})

app.use(function (req, res, next) {
  console.log(2)
  res.status(200).end()
})

// 错误处理
app.use(function (err, req, res, next) {
  console.log(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3000)