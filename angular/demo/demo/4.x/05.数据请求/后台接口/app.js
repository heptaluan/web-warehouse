const express = require('express')
const app = express()
const cors = require('cors')
var bodyParser = require('body-parser')


app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('首页')
})

app.post('/login', (req, res) => {
  console.log(req.body)
  res.json({
    'msg': '提交成功'
  })
})

app.listen(8080, () => {
  console.log(`app is running at port 8080`)
})