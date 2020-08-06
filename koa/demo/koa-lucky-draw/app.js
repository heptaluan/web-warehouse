const Koa = require('koa')
const app = new Koa()
const static = require('koa-static')

app.use(async (ctx, next) => {

  if (ctx.url === '/chou') {

    // 假设 一等奖概率为 1%  参数为 1
    // 二等奖概率为 1.5%  参数为 2
    // 三等奖概率为 2%  参数为 3
    var n = Math.random()

    if (n < 0.01) {
      ctx.response.body = '1'
    } else if (n < 0.025) {
      ctx.response.body = '2'
    } else if (n < 0.045) {
      ctx.response.body = '3'
    } else {
      ctx.response.body = '0'
    }

  } else {
    await next()
  }
})

app.use(static('./static'))

app.listen(3000)

function random(n, m) {
  return Math.floor(Math.random() * (m - n) + n)
}