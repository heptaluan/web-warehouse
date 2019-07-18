const Koa = require('Koa')
const app = new Koa()
const log = require('./logger')

app.use(log())

app.use((ctx) => {
  ctx.body = ctx
}).listen(7777)