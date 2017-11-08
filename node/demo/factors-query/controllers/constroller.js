var math = require("../models/math.js");
var file = require("../models/file.js")

// 如果访问的首页，渲染 index.ejs
exports.showIndex = function (req, res) {
    res.render("index")
}

// 如果访问的详情页面，渲染 result.ejs
exports.showResult = function (req, res) {

    // 获得 number
    var number = req.params.number;

    // 记录先后时间，用于计算渲染时间
    var t1 = new Date();

    file.read(number, function(resultArr) {
        // -1 表示文件暂时还不存在
        if (resultArr == -1) {
            var resultArr = math.cale(number);
            file.save(number, resultArr);
        }

        var t2 = new Date();

        res.render("result", {
            "number": number,
            "resultArr": resultArr,
            "during": t2 - t1
        })
    })
}