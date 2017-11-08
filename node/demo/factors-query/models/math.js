exports.cale = function (number) {
    var resultArr = [];
    for (var i = 1; i <= number; i++) {
        if (number % i == 0) {
            resultArr.push(i)
        }
    }
    return resultArr;
}