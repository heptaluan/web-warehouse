// 导入 koa 和 koa 1.x 不同，在 koa2 中，我们导入的是一个 class，因此用大写的 Koa 来表示
const Koa = require('koa')

// 创建一个 Koa 对象表示 web app 本身
const app = new Koa()

// 对于任何请求，app 将调用该异步函数处理请求
app.use(async (ctx, next) => {

  await next()

  // 设置 response 的 Content-Type
  ctx.response.type = 'text/html'

  // 设置 response 的内容
  ctx.response.body = '<h1>hello world</h1>'

})

// 箭头 3000 端口
app.listen(3000)

console.log('app started at port 3000')
