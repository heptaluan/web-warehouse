// 控制器拆分功能，负责 读取/写入 文件
var fs = require("fs");

exports.save = function (number, resultArr) {
    fs.writeFile("./data/" + number + ".txt", JSON.stringify(resultArr))
}

exports.read = function (number, callback) {
    fs.readFile("./data/" + number + ".txt", function(err, data) {
        // 如果文件不存在，传递一个 -1 用作标记
        if (err) {
            callback(-1);
            return;
        }

        // 否则直接格式化数据传递过去
        callback(JSON.parse(data))
    })
}