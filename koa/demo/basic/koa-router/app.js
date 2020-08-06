// 利用 kos-router 来处理 url 映射
const Koa = require('koa')

// 需要注意的是，koa-router 返回的是函数（直接拿到调用后的结果）
// 相当于 
// const fn_router = require('koa-router')
// const touter = fn_router()
const router = require('koa-router')()

const app = new Koa()

// log request URL
app.use(async (ctx, next) => {
  console.log(`process ${ctx.request.method} ${ctx.request.url}...`)
  await next()
})

// add url-router
router.get('/hello/:name', async (ctx, next) => {
  var name = ctx.params.name
  ctx.response.body = `<h1>hello ${name}</h1>`
  await next()
})

router.get('/', async (ctx, next) => {
  ctx.response.body = '<h1>Index</h1>'
})

// add router middleware
app.use(router.routes())

app.listen(3000)

console.log('app start at port 3000')
