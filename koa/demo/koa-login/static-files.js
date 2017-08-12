// 处理静态文件的 middleware（这里只是方便调试）

/**
 * 
 *  几点注意事项：
 * 
 *  Node 官方反对使用 fs.exists()，更推荐使用 fs.stat() 和 fs.access，但官方同时不反对使用 fs.existsSync() 对文件进行判断
 * 
 *  nodejs 处理静态文件只是为了方便调试，部署的时候前端放一个 nginx，用 nginx 处理静态文件
 * 
 *  这里使用的是 mz 的包，并通过 require("mz/fs"); 导入
 *  mz 提供的 API 和 Node.js 的 fs 模块完全相同，但 fs 模块使用回调，而 mz 封装了 fs 对应的函数，并改为 Promise
 *  这样，我们就可以非常简单的用 await 调用 mz 的函数，而不需要任何回调
 * 
 *  也可以使用第三方包来处理静态文件
 * 
 */

const path = require("path");
const mime = require("mime");
const fs = require("mz/fs");

// url: 类似 "/static/"
// dir: 类似 __dirname + "/static"

// 接收两个参数，url前缀 和 一个目录，然后返回一个 async 函数
// 这个 async 函数会判断当前的 url 是否以指定前缀开头，如果是，就把 url 的路径视为文件，并发送文件内容
// 如果不是，这个 async 函数就不做任何事情，而是简单地调用 await next() 让下一个 middleware 去处理请求
function staticFiles(url, dir) {

    return async (ctx, next) => {

        let rpath = ctx.request.path;

        // 判断是否以指定的 url 开头
        if (rpath.startsWith(url)) {

            // 获取文件完整路径
            let fp = path.join(dir, rpath.substring(url.length));

            // 判断文件是否存在
            if (await fs.exists(fp)) {
                // 查找文件的 mime
                ctx.response.type = mime.lookup(rpath);
                // 读取文件内容并赋值给 response.body
                ctx.response.body = await fs.readFile(fp);
            } else {
                // 文件不存在
                ctx.response.status = 404;
            }
        } else {
            // 若不是指定前缀的 url，则继续往下处理（交给下一个 middleware）
            await next();
        }
    };
}

module.exports = staticFiles;


