// 处理登录请求 POST
module.exports = {
    
    "POST /signin": async (ctx, next) => {

        // 使用 ctx.request.body.<name> 拿到 POST 请求的数据        
        var email = ctx.request.body.email || "",
            password = ctx.request.body.password || "";

        if (email === "123@123.com" && password === "123") {
            // 成功的时候渲染成功页面
            ctx.render("signin-ok.html", {
                title: "登录成功",
                name: "张三"
            });
        } else {
            // 失败的时候渲染失败的页面
            ctx.render("signin-failed.html", {
                title: "登录失败"
            });
        }

    }
};
