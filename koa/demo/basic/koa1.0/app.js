// 利用 generator 实现异步是简单了不少，但是 generator 的本意并不是异步（promise 才是）
var koa = require("koa");
var app = koa();

app.use("./test", function * () {
    
    yield doReadFile1();

    var data = yield doReadFile2();

    this.body = data;
    
})

app.listen(3000)
