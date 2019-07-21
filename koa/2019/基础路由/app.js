const Koa = require('Koa')
const fs = require('fs')

const app = new Koa()

// 渲染函数
function render(page) {
  return new Promise((resolve, reject) => {
    fs.readFile(`./views/${page}`, 'binary', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

// 根据 URL 获取 HTML 内容
async function route(url) {
  let view = '404.html'
  switch (url) {
    case '/':
      view = 'index.html'
      break;
    case '/index':
      view = 'index.html'
      break;
    case '/404':
      view = '404.html'
      break;
    default:
      break;
  }
  return await render(view)
}

app.use(async (ctx) => {
  ctx.body = await route(ctx.url)
}).listen(7777)