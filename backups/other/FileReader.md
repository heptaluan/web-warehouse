---
title: FileReader 接口
date: 2018-08-04
categories: JavaScript
tags: JavaScript
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/35.jpg
---

`FileReader` 接口主要是将文件读入内存，并提供相应的方法，来读取文件中的数据

比如比较常见的上传预览就可以使用这个 `API` 来实现

<!--more-->

一个简单的示例如下：

```js
var result = document.getElementById('result');
var file = document.getElementById('file');

// 判断浏览器是否支持 FileReader 接口
if (typeof FileReader == 'undefined') {
  result.InnerHTML = '<p>你的浏览器不支持 FileReader 接口！</p>';
  // 使选择控件不可操作
  file.setAttribute('disabled', 'disabled');
}

function readAsDataURL() {
  var file = document.getElementById('file').files[0];

  // 检验是否为图像文件
  if (!/image\/\w+/.test(file.type)) {
    alert('格式不正确！');
    return false;
  }

  // 将文件以 Data URL 形式读入页面
  var reader = new FileReader();
  reader.readAsDataURL(file);

  // 在 onload 函数当中进行逻辑操作
  reader.onload = function (e) {
    var result = document.getElementById('result');
    // 显示文件
    result.innerHTML = '<img src= ' + e.target.result + ' >'
  }
}
```

```html
<p>
  <input type='file' id='file' />
  <input type='button' value="读取图像" onclick="readAsDataURL()" />
</p>

<div id='result' name='result'></div>
```

预览完成后就可以上传到服务器了：

```js
$('#submitBtn').submit(function () {
  if ($('#upload_file').val()) {
    $('#upload_btn').attr('disabled', true);
    $('.tip').html('正在上传中，请稍候...');
    $(this).ajaxSubmit({
      type: 'post',
      url: url,
      success: function (data) {
        // ...
        $('#upload_btn').attr('disabled', false);
        $('.tip').html('');
      }

    });
  }
  // 不刷新页面
  return false;
});
```

## 方法和事件

```js
// 方法
abort                           // 中断读取

readAsText(file, [encoding])    // 将文件读取为文本该方法有两个参数，其中第二个参数是文本的编码方式，默认值为 UTF-8
                                // 这个方法非常容易理解，将文件以文本方式读取，读取的结果即是这个文本文件中的内容

readAsBinaryString(file)        // 将文件读取二进制码通常我们将它传送到后端，后端可以通过这段字符串存储文件

readAsDataURL(file)             // 将文件读取为 DataURL 将文件读取为一串Data URL字符串，
                                // 将小文件以一种特殊格式的URL地址直接读入页面，小文件指图像与html等格式的文件


// 事件
onabort         //  数据读取中断时触发

onerror         //  数据读取出错时触发

onloadstart     //  数据读取开始时触发

onload          //  数据读取成功完成时触发

onloadend       //  数据读取完成时触发，无论成功失败
```


## 分段读取文本信息（slice）

有的时候，一次性将一个大文件读入内存，并不是一个很好的选择（如果文件太大，可能直接导致浏览器崩溃），更稳健的方法是分段读取

`HTML5 File Api` 提供了一个 `slice` 方法，允许分片读取文件内容

文件一旦开始读取，无论成功或失败，实例的 `result` 属性都会被填充，如果读取失败，则 `result` 的值为 `null` ，否则即是读取的结果，绝大多数的程序都会在成功读取文件的时候，抓取这个值

```js
function readBlob(start, end) {
  var files = document.getElementById('file').files;

  if (!files.length) {
    alert('请选择文件');
    return false;
  }

  var file = files[0],
    start = parseInt(start, 10) || 0,
    end = parseInt(end, 10) || (file.size - 1);

  var r = document.getElementById('range'),
    c = document.getElementById('content');

  var reader = new FileReader();
  reader.onloadend = function (e) {
    if (this.readyState == FileReader.DONE) {
      c.textContent = this.result;
      r.textContent = 'Read bytes: ' + (start + 1) + ' - ' + (end + 1) + ' of ' + file.size + ' bytes';
    }
  };

  // 兼容
  var blob;
  if (file.webkitSlice) {
    blob = file.webkitSlice(start, end + 1);
  } else if (file.mozSlice) {
    blob = file.mozSlice(start, end + 1);
  } else if (file.slice) {
    blob = file.slice(start, end + 1);
  }

  reader.readAsBinaryString(blob);

};

document.getElementById('file').onchange = function () {
  readBlob(10, 100);
}
```


使用了 `FileReader` 的 `onloadend` 事件来检测读取成功与否，如果用 `onloadend` 则必须检测一下 `FileReader` 的 `readyState`

因为 `read abort` 时也会触发 `onloadend` 事件，如果我们采用 `onload`，则可以不用检测 `readyState`


另一个分段读取的示例

```js
var bar = document.getElementById('progress-bar');
var progress = document.getElementById('progress');

var input = document.getElementById('file');
var block = 1 * 1024 * 1024; // 每次读取 1M

// 当前文件对象
var file;

// 当前已读取大小
var fileLoaded;

// 文件总大小
var fileSize;

// 每次读取一个 block
function readBlob() {
  var blob;
  if (file.webkitSlice) {
    blob = file.webkitSlice(fileLoaded, fileLoaded + block + 1);
  } else if (file.mozSlice) {
    blob = file.mozSlice(fileLoaded, fileLoaded + block + 1);
  } else if (file.slice) {
    blob = file.slice(fileLoaded, fileLoaded + block + 1);
  } else {
    alert('不支持分段读取！');
    return false;
  }
  reader.readAsBinaryString(blob);
}

// 每个 blob 读取完毕时调用
function loadHandler(e) {
  fileLoaded += e.total;
  var percent = fileLoaded / fileSize;
  if (percent < 1) {
    // 继续读取下一块
    readBlob2();
  } else {
    // 结束
    percent = 1;
  }
  percent = Math.ceil(percent * 100) + '%';
  progress.innerHTML = percent;
  progress.style.width = percent;
}

function fileSelect(e) {
  file = this.files[0];
  if (!file) {
    alert('文件不能为空！');
    return false;
  }
  fileLoaded = 0;
  fileSize = file.size;
  bar.style.display = 'block';
  // 开始读取
  readBlob2();
}

var reader = new FileReader();
// 只需监听 onload 事件

reader.onload = loadHandler;
input.onchange = fileSelect
```


## FileReader 进度条

既然 `FileReader` 是异步读取文件内容，那么就应该可以监听它的读取进度

事实上，`FileReader` 的 `onloadstart` 以及 `onprogress` 等事件可以用来监听 `FileReader` 的读取进度

在 `onprogress` 的事件处理器中，提供了一个 `ProgressEvent` 对象，这个事件对象实际上继承了 `Event` 对象

提供了三个只读属性：`lengthComputable`、`loaded`、`total`，通过以上几个属性，即可实时显示读取进度

```js
interface ProgressEvent : Event {
  readonly attribute boolean lengthComputable;
  readonly attribute unsigned long long loaded;
  readonly attribute unsigned long long total;
};
```

`Ajax` 上传并显示进度条：

```js
function upLoad() {

  var myPic = document.querySelector('myPic').files[0];
  var fd = new FormData();
  fd.append('myPic', myPic);

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      alert(xhr.responseText);
    }
  }

  // 监听附件上传情况
  xhr.upload.onprogress = function () {
    //  evt.loaded  -- 已经上传大小
    //  evt.total   -- 附件总大小
    var loaded = evt.loaded;
    var tot = evt.total;
    var per = Math.floor(100 * loaded / tot);
    var son = document.getElementById('flag');
    flag.innerHTML = per + '%';
    flag.style.width = per + '%';
  }

  var url = '';
  xhr.open('POST', url);
  xhr.send(fd);
}
```


## FormData 对象

`FormData` 对象，可以把 `form` 中所有表单元素的 `name` 与 `value` 组成一个 `queryString`，提交到后台

用 `jQuery` 的方法来说，就是 `serialize` 了，但是在使用 `Ajax` 提交时，这过程就变成人工的了，因此，使用 `FormData` 对象可以减少拼接 `queryString` 的工作量

1. 可以先创建一个空的 `FormData` 对象，然后利用 `append` 方法向该对象添加字段（`key/value`）

```js
var myForm = new FormData();

myForm.append('name', 'zhangsan');
myForm.append('name', 'lisi');
myForm.append('num', 222333);  // 数字会被转换成字符串
```

2. 或者可以取得 `form` 元素对象，然后将其作为参数传入 `FormData` 对象中

```js
var myForm = document.querySelector('#myForm');
var formdata = new FormData(myForm);
```

3. 利用 `getFormData` 生成

```js
var myForm = document.querySelector('#myForm');
var formdata = myForm.getFormData();
```

4. 使用 `FormData` 提交表单：

```js
function fsubmit() {
  var data = new FormData($('#myForm')[0]);
  $.ajax({
    url: 'upLoad.html',
    type: 'POST',
    data: data,
    dataType: 'JSON',
    cahce: false,
    processData: false,
    contentType: false,
    success: function () {
      // ...
    }
  })
}
```


## window.URL.createObjectURL

`window.URL.createObjectURL` 的作用是创建一个新的对象 `URL`，该对象 `URL` 可以代表某一个指定的 `File` 对象或 `Blob` 对象

关于 `Bold` 对象，见 [MDN -Bold](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)

大体的意思就是

* `File` 对象，就是一个文件，比如使用 `<input type="file" />` 标签来上传文件，那么里面的每个文件都是一个 `File` 对象

* `Blob` 对象，就是二进制数据，比如通过 `new Blob()` 创建的对象就是 `Blob` 对象.又比如，在 `XMLHttpRequest` 里，如果指定 `responseType` 为 `blob`，那么得到的返回值也是一个 `blob` 对象

```js
objectURL = window.URL.createObjectURL(blob);
// blob 参数是一个 File 对象或者 Blob 对象
// objectURL 是生成的对象 URL 通过这个 URL，可以获取到所指定文件的完整内容

```

每次调用 `createObjectURL` 的时候，一个新的 `URL` 对象就被创建了，即使你已经为同一个文件创建过一个 `URL`

如果你不再需要这个对象，要释放它，需要使用 `URL.revokeObjectURL()` 方法

当页面被关闭，浏览器会自动释放它，但是为了最佳性能和内存使用，当确保不再用得到它的时候，就应该释放它

利用 `window.URL.createObjectURL` 显示图片：

```html
<input type= "file" id= "fileElem" multiple accept= "image/*" 
  style= "display:none" onchange= "handleFiles(this.files)">
<a href="#" id="fileSelect">Select some files</a>

<div id="fileList">
  <p>No files selected!</p>
</div>
```

使用过程如下

```js
window.URL = window.URL || window.webkitURL;

var fileSelect = document.getElementById('fileSelect'),
  fileElem = document.getElementById('fileElem'),
  fileList = document.getElementById('fileList');

fileSelect.addEventListener('click', function (e) {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault(); // prevent navigation to '#'
}, false);

function handleFiles(files) {
  if (!files.length) {
    fileList.innerHTML = '<p>No files selected!</p>';
  } else {
    fileList.innerHTML = '';
    var list = document.createElement('ul');
    fileList.appendChild(list);
    for (var i = 0; i < files.length; i++) {
      var li = document.createElement('li');
      list.appendChild(li);

      var img = document.createElement('img');
      img.src = window.URL.createObjectURL(files[i]);
      img.height = 60;
      img.onload = function () {
        window.URL.revokeObjectURL(this.src);
      }
      li.appendChild(img);
      var info = document.createElement('span');
      info.innerHTML = files[i].name + ': ' + files[i].size + ' bytes';
      li.appendChild(info);
    }
  }
}
```

如果有现成的 `'img'` 标签

```js
function upLoadImg() {
  var myPic = document.getElementById('myPic').files[0];
  document.getElementsByTagName('img')[0].src = window.URL.createObjectURL(myPic);
}
```




## 参考

[leejersey](http://www.cnblogs.com/leejersey/p/4772504.html)

[HTML5 之 FileReader 的使用](http://blog.csdn.net/jackfrued/article/details/8967667)

[JavaScript File API](http://www.ibm.com/developerworks/cn/web/1101_hanbf_fileupload/)



