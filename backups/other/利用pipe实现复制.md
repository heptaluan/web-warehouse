---
title: 利用 pipe 实现复制
date: 2017-10-17
categories: Node.js
tags: Node.js
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/07.jpg
---

`Node.js` 的 `fs` 模块并没有提供一个 `copy` 的方法，但我们可以很容易的实现一个，比如

<!--more-->



```js
var source = fs.readFileSync('/path/to/source', { encoding: 'utf8' });

fs.writeFileSync('/path/to/dest', source);
```

这种方式是把文件内容全部读入内存，然后再写入文件，对于小型的文本文件，这没有多大问题，比如 `grunt-file-copy` 就是这样实现的

但是对于体积较大的二进制文件，比如音频、视频文件，动辄几个 `GB` 大小，如果使用这种方法，很容易使内存爆仓

理想的方法应该是读一部分，写一部分，不管文件有多大，只要时间允许，总会处理完成，这里就需要用到流的概念

```js
var fs = require('fs');

var readStream = fs.createReadStream('/path/to/source');
var writeStream = fs.createWriteStream('/path/to/dest');

// 当有数据流出时，写入数据
readStream.on('data', function (chunk) {  
  writeStream.write(chunk);
});

// 当没有数据时，关闭数据流
readStream.on('end', function () {  
  writeStream.end();
});
```

上面的写法有一些问题，如果写入的速度跟不上读取的速度，有可能导致数据丢失

正常的情况应该是，写完一段，再读取下一段，如果没有写完的话，就让读取流先暂停，等写完再继续，于是代码可以修改为

```js
var fs = require('fs');

var readStream = fs.createReadStream('/path/to/source');
var writeStream = fs.createWriteStream('/path/to/dest');

// 当有数据流出时，写入数据
readStream.on('data', function (chunk) {
  // 如果没有写完，暂停读取流
  if (writeStream.write(chunk) === false) {
    readStream.pause();
  }
});

// 写完后，继续读取
writeStream.on('drain', function () {
  readStream.resume();
});

// 当没有数据时，关闭数据流
readStream.on('end', function () {
  writeStream.end();
});
```

或者使用更直接的 `pipe`

```js
// pipe 自动调用了 data, end 等事件
fs.createReadStream('/path/to/source').pipe(fs.createWriteStream('/path/to/dest'));
```


下面是一个完整的复制文件的过程

```js
var fs = require('fs'),
  path = require('path'),
  out = process.stdout;

var filePath = '../小电影.mkv';

var readStream = fs.createReadStream(filePath);
var writeStream = fs.createWriteStream('file.mkv');

var stat = fs.statSync(filePath);
var totalSize = stat.size;

var passedLength = 0;
var lastSize = 0;

var startTime = Date.now();

readStream.on('data', function (chunk) {
  passedLength += chunk.length;
  if (writeStream.write(chunk) === false) {
    readStream.pause();
  }
});

writeStream.on('drain', function () {
  readStream.resume();
});

readStream.on('end', function () {
  writeStream.end();
});

setTimeout(function show() {

  var percent = Math.ceil((passedLength / totalSize) * 100);
  var size = Math.ceil(passedLength / 1000000);
  var diff = size - lastSize;

  lastSize = size;
  out.clearLine();
  out.cursorTo(0);

  out.write('已完成' + size + 'MB, ' + percent + '%, 速度：' + diff * 2 + 'MB/s');

  if (passedLength < totalSize) {
    setTimeout(show, 500);
  } else {
    var endTime = Date.now();
    console.log();
    console.log('共用时：' + (endTime - startTime) / 1000 + '秒。');
  }

}, 500);
```
