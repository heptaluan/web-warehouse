// 相关依赖
const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')

const app = new Koa()

// 必须在 router 之前被注册到 app 对象上
app.use(bodyParser())

// 生成表单，提交到 /signin 下
router.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
    <form action='/signin' method='post'>
        <p>Name: <input name='name' value='koa'></p>
        <p>Password: <input name='password' type='password'></p>
        <p><input type='submit' value='Submit'></p>
    </form>`
})

// 处理表单请求
router.post('/signin', async (ctx, next) => {

  var name = ctx.request.body.name || '',
    password = ctx.request.body.password || ''
  console.log(`signin with name: ${name}, password: ${password}`)

  if (name == 'koa' && password == '123') {
    ctx.response.body = `<h1>hello, ${name}</h1>`
  } else {
    ctx.response.body = `try again`
  }

})


app.use(router.routes())

app.listen(3000)

console.log('app start at port 3000')
