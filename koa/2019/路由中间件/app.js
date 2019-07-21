const Koa = require('Koa')
const fs = require('fs')
const Router = require('koa-router')

const app = new Koa()

// 子路由一
let home = new Router()
home.get('/', async (ctx) => {
  ctx.body = `
    <ul>
      <li><a href="/page/index">index</a></li>
      <li><a href="/page/404">404</a></li>
    </ul>
  `
})

// 子路由二
let page = new Router()
page.get('/404', async (ctx) => {
  ctx.body = `404 page`
}).get('/index', async (ctx) => {
  ctx.body = `index page`
})

// 挂载所有路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

// 加载路由中间价
app.use(router.routes(), router.allowedMethods())

app.listen(7777)