// 控制器拆分功能，负责计算约数
exports.cale = function (number) {
    var resultArr = [];
    for (var i = 1; i <= number; i++) {
        if (number % i == 0) {
            resultArr.push(i)
        }
    }
    return resultArr;
}