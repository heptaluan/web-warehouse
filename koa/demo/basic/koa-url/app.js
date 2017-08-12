// 处理 url
const Koa = require("koa");

const app = new Koa();

app.use(async (ctx, next) => {
    if (ctx.request.path == "/") {
        ctx.response.body = "index.page";
    } else {
        await next();
    }
})

app.use(async (ctx, next) => {
    if (ctx.request.path == "/test") {
        ctx.response.body = "test.page"
    } else {
        await next();
    }
})

app.use(async (ctx, next) => {
    if (ctx.request.path ==  "error") {
        ctx.response.body = "error.page"
    } else {
        await next();
    }
})

// 箭头 3000 端口
app.listen(3000);

console.log("app started at port 3000")
