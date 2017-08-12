const path = require("path");
const mime = require("mime");
const fs = require("mz/fs");

// url: 类似 "/static/"
// dir: 类似 __dirname + "/static"

function staticFiles(url, dir) {

    return async(ctx, next) => {

        let rpath = ctx.request.path;

        // 判断是否以指定的 url 开头
        if (rpath.startsWith(url)) {

            // 获取文件完整路径
            let fp = path.join(dir, rpath.substring(url.length));

            console.log(`fp: ${fp}`)

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