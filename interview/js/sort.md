常见的数组排序方式

----


## 第一种 sort

也是比较常见的一种方式

```js
arr.sort(function (a, b) {
    // b - a 则相反
    return a - b;
})
```

## 第二种 冒泡排序

比较相邻的元素，如果第一个比第二个大，就交换他们两个

```js
function bubbleSort(arr) {

    // i 表示所需循环的趟数
    // j 表示这一趟需要比较的次数
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
```


## 第三种 快速排序

找基准（一般是以中间项为基准）然后遍历数组，小于基准的放在 ```left```，大于基准的放在 ```right```，最后递归调用

```js
function quickSort (arr) {

    // 如果数组 <=1，则直接返回
    if (arr.length <= 1) { return arr; }

    // 以中间点为基准
    var pivotIndex = Math.floor(arr.length / 2);
    
    // 利用 splice() 方法得到基准值，用于最后的拼接还原
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
```

## 第四种 插入排序

每步将一个待排序的对象，按其排序码大小，插入到前面已经排好序的一组对象的适当位置上，直到对象全部插入为止

```js
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


----


### 扩展：对象排序

```js
var arr = [
    {"x": 30, "y": 15, "z": 22},
    {"x": 15, "y": 35, "z": 21},
    {"x": 12, "y": 55, "z": 82}
]

arr.sort(function(a, b) {
    return a.x > b.x
})

console.log(arr)
```



