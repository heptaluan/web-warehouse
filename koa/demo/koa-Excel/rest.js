module.exports = {
    APIError: function (code, message) {
        this.code = code || "internal:unknown_error";
        this.message = message || "";
    },
    restify: (pathPrefix) => {
        // rest-api 前缀，默认为 /api/
        pathPrefix = pathPrefix || "/api/";
        return async (ctx, next) => {
            // 是否是 rest-api 前缀
            if (ctx.request.path.startsWith(pathPrefix)) {
                // 绑定 rest() 方法
                ctx.rest = (data) => {
                    ctx.response.type = "application/json";
                    ctx.response.body = data;
                }
                try {
                    await next();
                } catch (e) {
                    // 返回错误
                    ctx.response.status = 400;
                    ctx.response.type = "application/json";
                    ctx.response.body = {
                        code: e.code || "internal:unknown_error",
                        message: e.message || ""
                    };
                }
            } else {
                await next();
            }
        };
    }
};