// 首先导入 fs 模块，然后使用 readdirSync 列出文件
// 这里可以用 sync 是因为启动的时候只运行一次，不存在性能问题
const fs = require("fs");

function addMapping(router, mapping) {

    for (var url in mapping) {

        // 如果 url 类似 GET xxx
        if (url.startsWith("GET ")) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
        // 如果 url 类似 POST xxx
        } else if (url.startsWith("POST ")) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
        // 无效的 url 的话
        } else {
            console.log(`invalid URL: ${url}`);
        }

    }

}

function addControllers(router, dir) {

    // 过滤 .js 文件
    fs.readdirSync(__dirname + "/" + dir).filter((f) => {
        return f.endsWith(".js");
    }).forEach((f) => {
        // 导入 js 文件
        let mapping = require(__dirname + "/" + dir + "/" + f);
        addMapping(router, mapping);
    });

}

module.exports = function (dir) {

    // 如果不传参数，扫描目录默认为 controllers
    let controllers_dir = dir || "controllers",
        router = require("koa-router")();

    addControllers(router, controllers_dir);

    return router.routes();
    
};
