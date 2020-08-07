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

app.listen(3000)