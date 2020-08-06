// 集成 nunjucks
// 作用是给 ctx 对象绑定一个 render(view, model) 的方法，这样，后面的 Controller 就可以调用这个方法来渲染模板了

/**
 * 
 *  几点注意：
 * 
 *  变量 env 就表示 Nunjucks 模板引擎对象，它有一个 render(view, model) 方法，正好传入 view 和 model 两个参数，并返回字符串
 * 
 *  创建 env 需要的参数可以查看文档获知。我们用 autoescape = opts.autoescape && true 这样的代码给每个参数加上默认值
 *  最后使用 new nunjucks.FileSystemLoader('views') 创建一个文件系统加载器，从 views 目录读取模板
 * 
 * 
 */

const nunjucks = require('nunjucks')

function createEnv(path, opts) {

  var autoescape = opts.autoescape === undefined ? true : opts.autoescape,
    noCache = opts.noCache || false,
    watch = opts.watch || false,
    throwOnUndefined = opts.throwOnUndefined || false,
    env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader(path, {
        noCache: noCache,
        watch: watch,
      }), {
      autoescape: autoescape,
      throwOnUndefined: throwOnUndefined
    })

  if (opts.filters) {
    for (var f in opts.filters) {
      env.addFilter(f, opts.filters[f])
    }
  }

  return env

}

function templating(path, opts) {

  // 创建 nunjucks 对的 event 对象
  var env = createEnv(path, opts)

  return async (ctx, next) => {
    // 给 ctx 绑定 render 函数
    ctx.render = function (view, model) {
      // 把 render 后的内容赋值给 response.body
      ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}))
      // 设置 Content-Type
      ctx.response.type = 'text/html'
    }
    // 继续处理请求
    await next()
  }

}

module.exports = templating