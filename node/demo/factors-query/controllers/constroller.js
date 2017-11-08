var math = require("../models/math.js");
var file = require("../models/file.js")

exports.showIndex = function (req, res) {
    res.render("index")
}

exports.showResult = function (req, res) {
    var number = req.params.number;

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