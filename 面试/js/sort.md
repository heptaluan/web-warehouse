```js
// 最常见的 - sort
arr.sort(function (a, b) {
    // b - a 则相反
    return a - b;
})


// 冒泡排序（比较相邻的元素，如果第一个比第二个大，就交换他们两个）
function bubbleSort(arr) {

    var i = arr.length, j;

    while (i > 0) {
        for (j = 0; j < i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
        i--;
    }

    return arr;
    
}


// 快速排序
// 找基准（一般是以中间项为基准）然后遍历数组，小于基准的放在 left，大于基准的放在 right，最后递归调用
function quickSort (arr) {

    // 如果数组 <=1，则直接返回
    if (arr.length <= 1) { return arr; }

    var pivotIndex = Math.floor(arr.length / 2);
    // 找基准，并把基准从原数组删除
    var pivot = arr.splice(pivotIndex, 1)[0];

    // 定义左右数组
    var left = [];
    var right = [];

    // 比基准小的放在 left，比基准大的放在 right
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] <= pivot) {
            left.push(arr[i]);
        }
        else {
            right.push(arr[i]);
        }
    }
    
    // 递归
    return quickSort(left).concat([pivot], quickSort(right));

}



// 插入排序
// 每步将一个待排序的对象，按其排序码大小，插入到前面已经排好序的一组对象的适当位置上，直到对象全部插入为止
function insertSort(array) {

    var i = 1,
        j, step, key, len = array.length;

    for (; i < len; i++) {

        step = j = i;
        key = array[j];

        while (--j > -1) {
            if (array[j] > key) {
                array[j + 1] = array[j];
            } else {
                break;
            }
        }

        array[j + 1] = key;
    }

    return array;
}
```