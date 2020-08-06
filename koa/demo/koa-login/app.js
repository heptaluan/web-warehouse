const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const controller = require('./controller')
const templating = require('./templating')

const app = new Koa()

// 这里定义了一个常量 isProduction，它判断当前环境是否是 production 环境。如果是，就使用缓存，如果不是，就关闭缓存
// 在开发环境下，关闭缓存后，我们修改 View，可以直接刷新浏览器看到效果，否则，每次修改都必须重启 Node 程序
// Node.js 在全局变量 process 中定义了一个环境变量 env.NODE_ENV，我们在开发的时候，环境变量应该设置为 development，而部署到服务器时，环境变量应该设置为 production。在编写代码的时候，要根据当前环境作不同的判断。

// 注意：生产环境上必须配置环境变量 NODE_ENV = 'production'，而开发环境不需要配置，实际上 NODE_ENV 可能是 undefined，所以判断的时候，不要用 NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'

// 第一个 middleware 记录 url 以及页面执行时间
app.use(async (ctx, next) => {
  var start = new Date().getTime(),
    execTime
  await next()
  execTime = new Date().getTime() - start
  ctx.response.set(`Time: ${execTime}ms`)
})

// 第二个 middleware 处理静态文件
if (!isProduction) {
  let staticFiles = require('./static-files')
  app.use(staticFiles('/static/', __dirname + '/static'))
}

// 第三个 middleware 处理 POST 请求
app.use(bodyParser())

// 第四个 middleware 负责给 ctx 加上 render() 来使用 nunjucks（渲染）
app.use(templating('views', {
  noChche: !isProduction,
  watch: !isProduction
}))

// 最后一个 处理 url 路由
app.use(controller())

app.listen(3000)
console.log(`app is running at port 3000`)