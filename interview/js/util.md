## 解析 url 为字典对象

使用方式 `getQueryObject(url).userId`

```js
function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  var search = url.substring(url.lastIndexOf("?") + 1);
  var obj = {};
  var reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, function (rs, $1, $2) {
    var name = decodeURIComponent($1);
    var val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}
```


## 随机验证码

使用方式 `createCode()`

```js
function createCode() {
  var code = new Array();
  var codeLength = 4;
  var checkCode = document.getElementById("checkCode");
  checkCode.value = "";
  var selectChar = new Array(2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D',
    'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
  for (var i = 0; i < codeLength; i++) {
    var charIndex = Math.floor(Math.random() * 32);
    code += selectChar[charIndex];
  }
  if (code.length != codeLength) {
    createCode();
  }
  checkCode.value = code;
}
```


## 导航菜单下拉隐藏上拉显示

使用方式 `scrollHide($("#header"))`

```js
function scrollHide(obj) {
  var scroll = 0;
  // 获取导航长宽
  var width = obj.width();
  var height = obj.height();

  $(window).scroll(function () {
    var current = $(window).scrollTop();
    if (current > scroll) {
      // 向下
      slideOutUp(obj);
    } else {
      // 向上
      slideInDown(obj);
    }
    if (current > 0) {
      $("body").css("padding-top", height + "px");
    } else {
      $("body").css("padding-top", 0);
    }
    scroll = current;
  })

  function slideInDown(ele) {
    if (ele.css("display") == "block") {
      return;
    }
    ele.show();
    ele.animate({
      opacity: 1,
      top: 0
    }, 500)
  }

  function slideOutUp(ele) {
    if (ele.css("display") == "none") {
      return;
    }
    ele.animate({
      opacity: 0,
      top: 0 - height + "px"
    }, 500)
  }
}
```



## 自动跳转

多少秒后自动跳转（内部需要获取 `id`），使用方式 `jumpTo(60, url)`

```js
function jumpTo(secs, url) {
  var obj = document.getElementById("obj");
  obj.innerHTML = secs + "秒后自动跳转……";
  if (--secs > 0) {
    setTimeout("jumpTo(" + secs + ")", 1000);
  } else {
    window.location = url;
  }
}
```



## iframe 高度自适应

使用方式，`<iframe id="myFrameId" onload="iframeHeight()"></iframe>`

```js
function iframeHeight() {
  var ifm = document.getElementById("myFrameId");
  var subWeb = document.frames ? document.frames["myFrameId"].document : ifm.contentDocument;
  if (ifm != null && subWeb != null) {
    ifm.height = subWeb.body.scrollHeight;
    ifm.width = subWeb.body.scrollWidth;
  }
}
```



## 利用 localStorage 存储/读取数据

```js
function saveKey() {
  /*
  const STORAGE_KEY = "my-key"
  export default {
      // 读取 getItem
      fetch() {
          return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
      },
      // 保存 setItem
      save(items) {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      }
  }
  */
}
```




## 拖拽函数

使用方式 `$(obj).drag()`

```js
$.fn.drag = function () {
  //  定义拖拽函数
  //  父元素内部的子元素的拖拽
  //  父元素需要指定高度
  var $this = $(this);
  var parent = $this.parent();
  var pw = parent.width();
  var ph = parent.height();
  var thisWidth = $this.width() + parseInt($this.css('padding-left'), 10) + parseInt($this.css('padding-right'), 10);
  var thisHeight = $this.height() + parseInt($this.css('padding-top'), 10) + parseInt($this.css('padding-bottom'), 10);
  var x, y, positionX, positionY;
  var isDown = false;
  var randY = parseInt(Math.random() * (ph - thisHeight), 10);
  var randX = parseInt(Math.random() * (pw - thisWidth), 10);
  parent.css({
    "position": "relative",
    "overflow": "hidden"
  });
  $this.css({
    "cursor": "move",
    "position": "absolute"
  }).css({
    top: randY,
    left: randX
  }).mousedown(function (e) {
    // 如果有多个拖拽元素，当其中一个 mousedown 的时候，当前 div 的 zIndex 为 1，其余的为 0
    parent.children().css({
      "zIndex": "0"
    });
    $this.css({
      "zIndex": "1"
    });
    //然后设置允许拖拽，设置其的position
    isDown = true;
    x = e.pageX;
    y = e.pageY;
    positionX = $this.position().left;
    positionY = $this.position().top;
    return false;
  });
  $(document).mouseup(function (e) {
    isDown = false;
  }).mousemove(function (e) {
    var xPage = e.pageX;
    var moveX = positionX + xPage - x;
    var yPage = e.pageY;
    var moveY = positionY + yPage - y;
    //判断边界
    if (isDown == true) {
      $this.css({
        "left": moveX,
        "top": moveY
      });
    } else {
      return;
    }
    if (moveX < 0) {
      $this.css({
        "left": "0"
      });
    }
    if (moveX > (pw - thisWidth)) {
      $this.css({
        "left": pw - thisWidth
      });
    }
    if (moveY < 0) {
      $this.css({
        "top": "0"
      });
    }
    if (moveY > (ph - thisHeight)) {
      $this.css({
        "top": ph - thisHeight
      });
    }
  });
};
```



## 运动函数

改变元素位置/透明度等，使用方式 `move(this, "opacity", 30) / move(this, width, 300px)`

```js
function move(obj, attr, iTarget) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var cur = 0;
    if (attr == "opacity") {
      cur = parseFloat(css(obj, attr)) * 100;
    } else {
      cur = parseInt(css(obj, attr));
    }
    var speed = (iTarget - cur) / 6;
    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
    if (cur == iTarget) {
      clearInterval(obj.timer);
    } else {
      if (attr == "opacity") {
        obj.style.filter = "alpha(opacity:" + (cur + speed) + ")";
        obj.style.opacity = (cur + speed) / 100;
      } else {
        obj.style[attr] = cur + speed + "px";
      }
    }
  }, 30);
};

function css(obj, attr){
  if(obj.currentStyle){
    return obj.currentStyle[attr];
  } else {
    return getComputedStyle(obj, false)[attr];
  }
}
```





## 连续运动函数

不停改变元素 / 类似 `CSS3` 动画实现效果，使用方式 `act(div, "width", 0, callback)`

可以嵌套使用，连续运动（类似 `Animate` 的回调）

```js
act(div, "width", 0, function () {
  act(div, "width", x + 100, function () {
    span.style.display = "block";
    span.style.right = x + 100 + "px";
  });
});

act(div, "left", (this.offsetLeft + 100));
```

函数如下所示

```js
function act(obj, attr, target, fn) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var stop = true;
    var cur = parseInt(css(obj, attr));
    var speed = (target - cur) / 8;
    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
    if (cur != target) {
      stop = false;
      obj.style[attr] = speed + cur + "px";
    }
    if (stop) {
      clearInterval(obj.timer);
      obj.timer = null;
      fn && fn();
    }
  }, 30);
}
```




## 获取元素距离浏览器距离

分为顶部和左边

```js
// left
var getElementLeft = function (element) {
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }
  return actualLeft;
}

// top
var getElementTop = function (element) {
  var actualTop = element.offsetTop;
  var current = element.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  return actualTop;
}
```



## 判断图片是否存在

```js
function CheckImgExists(imgurl) {
  var ImgObj = new Image();
  ImgObj.src = imgurl;
  // 没有图片，则返回 -1  
  if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
    return true;
  } else {
    return false;
  }
}
```


## 判断图片是否加载完成

```js
var preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    var image = new Image();
    image.onload = resolve;
    image.onerror = reject;
    image.src = path;
  });
};
```


## 休眠函数

使用方式 `sleep(10000)`

```js
function sleep(milliSeconds) {
  var startTime = new Date().getTime();
  while (new Date().getTime() < startTime + milliSeconds);
}
```



## 利用 canvas 图片缓存（lazyloadImage）

使用方式 `renderCvs(当前需要展示的列表)`

原理就是把图片的 `data-src` 取出来，然后放到 `canvas` 上面，同时把 `canvas` 上图片的数据取出来，然后缓存和显示

```js
var renderCvs = function (parent, max) {
  var lazyloadImage = $(".lazyload", parent);
  if (lazyloadImage.length < 1) {
    return;
  }
  var max = max || lazyloadImage.length;
  for (var i = 0; i < max; i++) {
    var imgId = lazyloadImage[i];
    var imageCache = GET(imgID);
    if (imageCache) {
      lazyloadImage[i].src = imageCache;
      continue;
    }
    var img = new Image();
    img.index = i;
    img.id = imgId;
    img.crossOrigin = "anonymous";
    img.load = function () {
      var _this = this;
      var zCvs = $("#" + this.id);
      var domCvs = zCvs[0];
      domCvs.src = this.src;
      zCvs.removeClass("lazyload");
      try {
        // 创建一个 canvas
        var cvs = document.createElement("canvas");
        cvs.style.display = "none";
        document.body.appendChild(cvs);
        // 把要画的图片画到画布上
        var rcvs = cvs.getContext("2d");
        cvs.width = 140;
        cvs.height = 108;
        rcvs.drawImage(this, 0, 0, 140, 108);
        // 缓存
        setTimeout(function () {
          // 取得的 data 是一个 base64 位的字符串
          var data = cvs.toDataURL();
          // SET(_this.id,data);
          localStorage.setItem(_this.id, data);
          document.body.removeChild(cvs);
        }, 200);
      } catch (ex) {
        // ...
      }
    }
    img.src = lazyloadImage[i].getAttribute("data-src");
  }
}
```



## 设置元素 CSS3 相关变换属性

即动态设置 `transform`，使用方式 `setCss3(div, { transform: "rotate(45deg)", transform-origin: "0 0" });`

如果想应用于动画效果，只需要将其放置在 `setInterval()` 当中即可

```js
function setCss3(obj, attrObj) {
  for (var i in attrObj) {
    var newi = i;
    // 若匹配不到符合元素，indexOf 是返回 -1，大于 0 即表示存在的时候
    if (newi.indexOf("-") > 0) {
      var num = newi.indexOf("-");
      // transform-origin 相关属性在 JS 中是 transformOrigin
      newi = newi.replace(newi.substr(num, 2), newi.substr(num + 1, 1).toUpperCase());
    }
    obj.style[newi] = attrObj[i];
    // 同上，webkitTransform
    newi = newi.replace(newi.charAt(0), newi.charAt(0).toUpperCase());
    obj.style["webkit" + newi] = attrObj[i];
    obj.style["moz" + newi] = attrObj[i];
    obj.style["o" + newi] = attrObj[i];
    obj.style["ms" + newi] = attrObj[i];
  }
}
```



## 判断上传文件大小及类型

使用方式 `CheckFile("file元素")`

```js
function CheckFile(obj) {
  var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
  var fileSize = 0;
  var array = new Array('gif', 'png', 'jpg', 'mp4', 'ogg');  // 可以上传的文件类型  
  if (isIE && !obj.files) {
    var filePath = obj.value;
    var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
    var file = fileSystem.GetFile(filePath);
    fileSize = file.Size;
  } else {
    fileSize = obj.files[0].size;
  }
  var size = fileSize / 1024;
  if (size > 1000) {
    alert("附件不能大于10M");
  }
  if (obj.value == '') {
    alert("请选择要上传的文件!");
    return false;
  } else {
    // 判断文件类型
    var fileContentType = obj.value.match(/^(.*)(\.)(.{1,8})$/)[3];
    var isExists = false;
    for (var i in array) {
      if (fileContentType.toLowerCase() == array[i].toLowerCase()) {
        isExists = true;
        return true;
      }
    }
    if (isExists == false) {
      obj.value = null;
      alert("上传文件类型不正确!");
      return false;
    }
    return false;
  }
}
```



## placeholder 兼容 IE

使用方式 `jQuery("input[placeholder]"").placeholder();`

原理就是利用 `span` 来达到模拟的效果，样式可以在下方 `placeholder.css({...})` 中自行调整

```js
jQuery.fn.placeholder = function () {
  var i = document.createElement("input"),
    placeholdersupport = "placeholder" in i;
  if (!placeholdersupport) {
    var inputs = jQuery(this);
    inputs.each(function () {
      var input = jQuery(this),
        text = input.attr("placeholder"),
        pdl = 0,
        height = input.outerHeight(),
        width = input.outerWidth(),
        placeholder = jQuery('<span class="phTips">' + text + "</span>");
      try {
        pdl = input.css("padding-left").match(/\d*/i)[0] * 1;
      } catch (e) {
        pdl = 5;
      }
      placeholder.css({
        "margin-left": -(width - pdl), "height": height, "line-height": height + "px",
        "position": "absolute", "color": "#cecfc9", "font-size": "12px"
      });
      placeholder.click(function () {
        input.focus();
      });
      if (input.val() != "") {
        placeholder.css({ display: "none" });
      } else {
        placeholder.css({ display: "inline" });
      }
      placeholder.insertAfter(input);
      input.keyup(function (e) {
        if (jQuery(this).val() != "") {
          placeholder.css({ display: "none" });
        } else {
          placeholder.css({ display: "inline" });
        }
      });
    });
  }
  return this;
};
```



## 判断浏览器类型

```js
// 方法一
var ie = !-[1,];
var FF = !!navigator.userAgent.match(/firefox/i);
var PC = !navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
var Mobile = !!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
if (ie) {
  // ...
}

// 方法二
var Sys = {};
var ua = navigator.userAgent.toLowerCase();
var s;
(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

// 应用
function getScrollTop() {
  var xsun = document.documentElement.scrollTop;
  if (Sys.chrome) {
    xsun = document.body.scrollTop;
  }
  return xsun;
}

function setScrollTop(value) {
  if (Sys.chrome) {
    document.body.scrollTop = value;
  } else {
    document.documentElement.scrollTop = value;
  }
}
```



## 判断移动端机型

```js
// 方法一
if (navigator.userAgent.match(/Android/i)) {
  // Android 方法
  jsInterface.javaFunction4()
} else if ((navigator.userAgent.indexOf('iPhone') != -1)) {
  // IOS 方法名
  // test();  
} else { }

// 方法二
if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) { }
```




## 点击 div 以外的地方，隐藏该 div

一般使用在弹出层当中，比如点击弹出层之外的地方隐藏弹出层

原理为点击该层的时候，阻止事件冒泡

```js
window.onload = function () {
  document.onclick = function (e) {
    $("layer").style.display = "none";
  }

  $("btn").onclick = function (e) {
    $("layer").style.display = "block";
    e = e || event; stopFunc(e);
  }

  $("layer").onclick = function (e) {
    e = e || event; stopFunc(e);
  }
}

function $(id) {
  return document.getElementById(id);
}

function stopFunc(e) {
  e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
}
```

也可以使用下面这种方式，即点击空白区域关闭弹窗

原理为判断点击事件发生在区域外的条件是

1. 点击事件的对象不是目标区域本身

2. 事件对象同时也不是目标区域的子元素


```js
$(document).mouseup(function(e){
  var _con = $(' 目标区域 ');   // 设置目标区域
  if (!_con.is(e.target) && _con.has(e.target).length === 0) { // Mark 1
    // some code
  }
});
```






## textarea 高度自适应

页面的 `html` 搭建如下

```html
<div id="textarea" class="expandingArea ">
  <pre><span></span><br></pre>
  <textarea placeholder="标题" maxlength="45"></textarea>
</div>
```

应用为

```js
var areas = document.getElementById("textarea");

makeExpandingArea(areas);
```

代码如下

```js
function makeExpandingArea(container) {
  var area = container.getElementsByTagName("textarea")[0];
  var span = container.getElementsByTagName("span")[0];
  if (area.addEventListener) {
    area.addEventListener("input", function () {
      span.textContent = area.value;
    }, false);
    span.textContent = area.value;
  } else if (area.attachEvent) {
    area.attachEvent("onpropertychange", function () {
      var html = area.value.replace(/\n/g, "<br/>");
      span.innerText = html;
    });
    var html = area.value.replace(/\n/g, "<br/>");
    span.innerText = html;
  }
  // IE 9
  if (window.VBArray && window.addEventListener) {
    area.attachEvent("onkeydown", function () {
      var key = window.event.keyCode;
      if (key == 8 || key == 46) span.textContent = area.value;
    });
    // 处理粘贴
    area.attachEvent("oncut", function () {
      span.textContent = area.value;
    });
  }
  container.className += "active";
}
```





## textarea 高度自适应

和上面那个的区别是这个一个超出限定范围后自动出现滚动条，应用方式如下

```html
<textarea id="txt" rows="5" cols="50" onkeyup="autoResize()" style="overflow-y:hidden;"></textarea>
```

函数定义如下

```js
function autoResize() {
  // 最小高度
  var minRows = 5;
  // 最大高度，超过则出现滚动条
  var maxRows = 12;
  var t = document.getElementById("txt");
  if (t.scrollTop == 0) {
    t.scrollTop = 1;
  }
  while (t.scrollTop == 0) {
    if (t.rows > minRows)
      t.rows--;
    else
      break;
    t.scrollTop = 1;
    if (t.rows < maxRows) {
      t.style.overflowY = "hidden";
    }
    if (t.scrollTop > 0) {
      t.rows++;
      break;
    }
  }
  while (t.scrollTop > 0) {
    if (t.rows < maxRows) {
      t.rows++;
      if (t.scrollTop == 0) t.scrollTop = 1;
    } else {
      t.style.overflowY = "auto";
      break;
    }
  }
}
```




## 修正 IOS/安卓 下拍照图片角度偏移（旋转）问题

几个涉及到的方法 `getImgData(img（图片的 base64）, dir（exif 获取的方向信息）, next（回调方法，返回校正方向后的 base64）)`

这里使用的是 `exif.js`，基本逻辑如下

```js
// 获取上传文件
var file = document.getElementById("input[file]").files[0];

// 利用 EXIF 读取图片信息
// 然后在配合下面的 getImgData() 函数修正图片旋转问题
var orientation;
EXIF.getData(file, function () {
  orientation = EXIF.getTag(this, "Orientation");
});

var reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = function (e) {

getImgData(this.result, orientation, function (data) {
  // 修正后的 base64
  console.log(data)
});
    
}
```

> 如果图片服务器使用的是阿里云的，就不会有这个问题（因为阿里云的图片平台会自动校正这个问题）

```js
function getImgData(img, dir, next) {
  var image = new Image();
  image.onload = function () {
    var degree = 0, drawWidth, drawHeight, width, height;
    drawWidth = this.naturalWidth;
    drawHeight = this.naturalHeight;
    // 改变一下图片大小
    var maxSide = Math.max(drawWidth, drawHeight);
    if (maxSide > 1024) {
      var minSide = Math.min(drawWidth, drawHeight);
      minSide = minSide / maxSide * 1024;
      maxSide = 1024;
      if (drawWidth > drawHeight) {
        drawWidth = maxSide;
        drawHeight = minSide;
      } else {
        drawWidth = minSide;
        drawHeight = maxSide;
      }
    }
    // 创建画布
    var canvas = document.createElement('canvas');
    canvas.width = width = drawWidth;
    canvas.height = height = drawHeight;
    var context = canvas.getContext('2d');
    // 判断图片方向，重置 canvas 大小，确定旋转角度，iphone 默认的是 home 键在右方的横屏拍摄方式
    switch (dir) {
      // iphone 横屏拍摄，此时 home 键在左侧
      case 3:
        degree = 180;
        drawWidth = -width;
        drawHeight = -height;
        break;
      // iphone 竖屏拍摄，此时 home 键在下方(正常拿手机的方向)
      case 6:
        canvas.width = height;
        canvas.height = width;
        degree = 90;
        drawWidth = width;
        drawHeight = -height;
        break;
      // iphone 竖屏拍摄，此时 home 键在上方
      case 8:
        canvas.width = height;
        canvas.height = width;
        degree = 270;
        drawWidth = -width;
        drawHeight = height;
        break;
    }
    // 使用 canvas 旋转校正
    context.rotate(degree * Math.PI / 180);
    context.drawImage(this, 0, 0, drawWidth, drawHeight);
    // 返回校正图片
    next(canvas.toDataURL("image/jpeg", .8));
  }
  image.src = img;
}
```



## 图片自定义裁剪大小上传

使用的是 `cropper` 插件，主要方法为 `convertToData(url, canvasdata, cropdata, callback)`，基本逻辑如下

> 需要注意的一点就是，区域裁剪需要放到 `image.onload = function () { ... }` 中

```js
// 获取图片
var $image = $("img");

// 等待图片加载完成后在进行裁剪
$image.on("load", function () {

  // 裁剪框容器位置居中，如果图片过大，加上限定范围
  if ($image.height() > $(window).height()) {
    $("imgWrap").height($(window).height())
  } else {
    // 默认居中，可自行调整
    $("imgWrap").css({
      left: 0,
      top: $(window).height() / 2 - $("imgWrap").height() / 2
    })
  }

  // 裁剪，获取裁剪参数 x 坐标，y 坐标，width，height
  $image.cropper({
    aspectRatio: 16 / 9,  // 裁剪比例
    guides: false,
    autoCropArea: 1,
    zoomable: false,
    crop: function (data) {
      // 阿里云的图片处理的坐标不能有小数点，否则会报错
      // 阿里云图片预览的话需要对应的裁剪坐标参数来得到裁剪后的图片
      var coord = "x_" + data.x.toFixed(0) + ",y_" + (data.y.toFixed(0)) + ",w_" + (data.width).toFixed(0) + ",h_" + (data.height).toFixed(0);
    }
  });
})

// 点击裁剪按钮后获取到裁剪信息
$("#btn").on("click", function () {
  // 获取参数
  var src = $image.eq(0).attr("src");
  var canvasdata = $image.cropper("getCanvasData");
  var cropBoxData = $image.cropper('getCropBoxData');
  // 调用 convertToData() 方法，获取裁剪后的 base64 即为最终裁剪后的数据
  convertToData(src, canvasdata, cropBoxData, function (basechar) {
    $("#newImg").attr("src", basechar).show();
  });
})

//  url          图片的 url 地址
//  canvasdata   利用 cropper 获取  var canvasdata = $image.cropper("getCanvasData");
//  cropBoxData  同上              var cropBoxData = $image.cropper('getCropBoxData');
//  callback     回调函数
function convertToData(url, canvasdata, cropdata, callback) {
  var cropw = cropdata.width;    // 剪切的长
  var croph = cropdata.height;   // 剪切的宽 
  var imgw = canvasdata.width;   // 图片缩放或则放大后的高 
  var imgh = canvasdata.height;  // 图片缩放或则放大后的高 
  var poleft = canvasdata.left - cropdata.left;  // canvas 定位图片的左边位置 
  var potop = canvasdata.top - cropdata.top;     // canvas 定位图片的上边位置 

  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext('2d');

  canvas.width = cropw;
  canvas.height = croph;

  var img = new Image();
  img.src = url;

  img.onload = function () {
    
    this.width = imgw;
    this.height = imgh;

    // canvas 与 图片 的裁剪之间的关系位置 
    ctx.drawImage(this, poleft, potop, this.width, this.height);

    // 这里的 1 是处理图片的清晰度（0 - 1）之间,当然越小图片越模糊,处理后的图片大小也就越小 
    var base64 = canvas.toDataURL('image/jpg', 1);

    // 回调 base64 字符串 
    callback && callback(base64)      
  }
}
```



## 禁止换行

禁止回车键，移动端软键盘上的换行键位同样有效

```js
function checkEnter(e) {
  var et = e || window.event;
  var keycode = et.charCode || et.keyCode;
  if (keycode == 13) {
    if (window.event) {
      window.event.returnValue = false;
    } else {
      e.preventDefault();
    }
  }
}
```


## base64 格式 转为 blob 格式

```js
function dataURItoBlob(base64Data) {
  var byteString;
  if (base64Data.split(",")[0].indexOf("base64") >= 0) {
    byteString = atob(base64Data.split(",")[1]);
  } else {
    byteString = unescape(base64Data.split(",")[1]);
  }
  var mimeString = base64Data.split(",")[0].split(":")[1].split(";")[0];
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}
```




## ajax 搜索操作

使用方式为 `search("Hello World", console.log, console.error)`

```js
function search(term, onload, onerror) {
  var xhr, results, url;
  url = "url/search?q=" + term;
  xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function (e) {
    if (this.status === 200 && this.readyState == 4) {
      results = JSON.parse(this.responseText);
      onload(results);
    }
  };
  xhr.onerror = function (e) {
    onerror(e);
  };
  xhr.send();
}
```

改写为 `promise` 版本，使用和上面是一样的

```js
function search(term, onload, onerror) {
  var url = "url/search?q=" + term;
  var xhr = new XMLHttpRequest();
  var result;
  var p = new Promise(function (resolve, reject) {
    xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function (e) {
      xhr.open("GET", url, true);
      xhr.onload = function (e) {
        if (this.status === 200 && this.readyState == 4) {
          results = JSON.parse(this.responseText);
          resolve(results);
        };
      }
      xhr.onerror = function (e) {
        reject(e);
      };
      xhr.send();
    });
  return p;
}
```


## 计算渐变色

使用方式为 `gradientColor(起始颜色，结束颜色，生成数量)`

```js
// 计算渐变色
gradientColor(startColor, endColor, step) {
  // 转换为 rgb 数组模式
  const startRGB = this.colorToRgb(startColor);
  const startR = startRGB[0];
  const startG = startRGB[1];
  const startB = startRGB[2];

  const endRGB = this.colorToRgb(endColor);
  const endR = endRGB[0];
  const endG = endRGB[1];
  const endB = endRGB[2];

  // 总差值
  const sR = (endR - startR) / step;
  const sG = (endG - startG) / step;
  const sB = (endB - startB) / step;

  var colorArr = [];
  for (var i = 0; i < step; i++) {
    // 计算每一步的 hex 值
    var hex = this.colorToHex('rgb(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i + startG)) + ',' + parseInt((sB * i + startB)) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将 hex 表示方式转换为 rgb 表示方式（这里返回 rgb 数组模式）
colorToRgb(sColor) {
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  var sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    return sColorChange;
  } else {
    return sColor;
  }
};

// 将 rgb 表示方式转换为 hex 表示方式
colorToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = hex < '10' ? 0 + '' + hex : hex;
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }

    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var i = 0; i < aNum.length; i += 1) {
        numHex += (aNum[i] + aNum[i]);
      }
      return numHex;
    }
  } else {
    return _this;
  }
}
```




## 获取当前元素所有最终使用的 CSS 属性值

使用方式为 `css(obj, attr)`

```js
function css(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    return getComputedStyle(obj, null)[attr];
  }
}
```


## 获取元素的 Class

使用方式为 `getClass(div, "div_list")`

```js
function getClass(parent, cls) {
  var res = [];
  if (parent.getElementsByClassName) {
    res = parent.getElementsByClassName(cls);
  } else {
    var reg = new RegExp("\\s+|^" + cls + "\\s+|$"),
      all = parent.all;
    for (var i = 0; i < all.length; i++) {
      if (reg.test(all[i].className)) {
        res.push(all[i]);
      }
    }
  }
  return res;
}
```



## 获取一个随机的颜色

```js
function randColor() {
  return "rgb(" + Math.ceil(255 * Math.random()) + "," + Math.ceil(255 * Math.random()) + "," + Math.ceil(255 * Math.random()) + ")";
}
```


## 获取当前时间

```js
function getTime() {
  var date = new Date();
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  var h = date.getHours();
  var mi = date.getMinutes();
  m = (m < 10) ? '0' + m : m;
  d = (d < 10) ? '0' + d : d;
  h = (h < 10) ? '0' + h : h;
  mi = (mi < 10) ? '0' + mi : mi;
  return y + '-' + m + '-' + d + ' ' + h + ':' + mi;
}
```



## 查询/获取字符串的 code 值

```js
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
```



## 序列化时间戳（格式化时间）

```js
function timestampList(time) {
  var date = new Date(time);
  Y = date.getFullYear() + '-';
  M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return (Y + M + '-' + D + ' ' + h + ':' + m);
}
```




## 时间间隔天数计算

```js
function dateDiff(sDate1, sDate2) {
  // s1 = "2017-09-30"
  // s2 = "2017-10-08"
  // DateDiff(s1, s2)
  var aDate, oDate1, oDate2, iDays;
  aDate = sDate1.split("-")
  oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])      // 转换为 12-12-2012 格式
  aDate = sDate2.split("-")
  oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)  // 把相差的毫秒数转换为天数
  return iDays
}
```


## 滑动底部加载更多

```js
$(window).scroll(function () {
  if ($(this).scrollTop() + $(window).height() >= $(document).height() && $(this).scrollTop()) {
    $.ajax({
      url: url,
      type: "get",
      success: function (data) {
        // ...
      }
    })
  }
});

// 下面是一些相关方法

// 遮罩层下禁止滑动 【 禁止滑动 】
$("body").bind("touchmove", function (event) { event.preventDefault() });

// 遮罩层下开启滑动 【 开启滑动 】
$("body").unbind("touchmove");

// 设置页面 rem 比例 【 rem 】
(function () {
  var clientWidth = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;
  if (clientWidth > 640) clientWidth = 640;
  document.documentElement.style.fontSize = clientWidth * 1 / 16 + "px";
  return clientWidth * 1 / 16;
})();
```



## 元素失去焦点隐藏 iphone 的软键盘

```js
//判断是否为苹果
var isIPHONE = navigator.userAgent.toUpperCase().indexOf('IPHONE') != -1;
if (isIPHONE) {
  var input = new objBlur('input');
  input = null;
}

// 元素失去焦点隐藏 iphone 的软键盘
function objBlur(id, time) {
  if (typeof id != 'string') throw new Error('objBlur()参数错误');
  var obj = document.getElementById(id),
    time = time || 300,
    docTouchend = function (event) {
      if (event.target != obj) {
        setTimeout(function () {
          obj.blur();
          document.removeEventListener('touchend', docTouchend, false);
        }, time);
      }
    };
  if (obj) {
    obj.addEventListener('focus', function () {
      document.addEventListener('touchend', docTouchend, false);
    }, false);
  } else {
    throw new Error('objBlur()没有找到元素');
  }
}
```


## 定位光标，在当前光标位置插入内容

使用方式 `insertHtmlAtCaret('<img src="..">')`

需要注意的是，正常使用是可以成功插入，但是存在一个问题

即富文本框内不存在光标的时候（比如插入图片/表情等按钮在文本框之外，点击之后便会失去焦点），这个时候是默认插入到输入框最前面

解决办法可以 在输入框失去焦点的时候 保存光标的位置，然后插入的时候在设置光标位置

```js
function insertHtmlAtCaret(html) {
  var sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    // 如果 当前选区内容的区域对象 存在
    if (sel.getRangeAt && sel.rangeCount) {
      // 存储 当前选区内容的区域对象
      range = sel.getRangeAt(0);
      range.deleteContents();
      // 创建元素
      var el = document.createElement("div");
      el.innerHTML = html;
      // 创建文档碎片 插入节点位置 并移动光标位置到 最后的 range 位置
      var frag = document.createDocumentFragment(), node, lastNode;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      // 插入
      range.insertNode(frag);
      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
    // 或者直接修改 pasteHTML
  } else if (document.selection && document.selection.type != "Control") {
    document.selection.createRange().pasteHTML(html);
  }
}
```



## 插入内容 & 记录光标最后离开的位置

使用方式为 `insertText(obj, str)`

上面那个方法用于在不失去光标（焦点）插入内容的时候很好用，完善办法就是在失去焦点的时候保存光标的位置

```js
function insertText(obj, str) {
  if (document.selection) {
    var sel = document.selection.createRange();
    sel.text = str;
  } else if (typeof obj.selectionStart === "number" && typeof obj.selectionEnd === "number") {
    var startPos = obj.selectionStart,
      endPos = obj.selectionEnd,
      cursorPos = startPos,
      tmpStr = obj.value;
    obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
    cursorPos += str.length;
    obj.selectionStart = obj.selectionEnd = cursorPos;
  } else {
    obj.value += str;
  }
}
```





## 移动光标到内容末尾

使用方式 `moveEnd(obj)`

```js
// 方法一
function moveEnd(obj) {
  obj.focus();
  var len = obj.value.length;
  if (document.selection) {
    var sel = obj.createTextRange();
    sel.moveStart("character", len);
    sel.collapse();
    sel.select();
  } else if (typeof obj.selectionStart == "number" && typeof obj.selectionEnd == "number") {
    obj.selectionStart = obj.selectionEnd = len;
  }
}

// 方法二
// 定位 input、textarea
function po_Last(obj) {
  // 解决 ff 不获取焦点无法定位问题
  obj.focus();
  // ie11 10 9 ff safari
  if (window.getSelection) {
    // text 字符数
    var max_Len = obj.value.length;
    obj.setSelectionRange(max_Len, max_Len);
    // ie10 9 8 7 6 5
  } else if (document.selection) {
    // 创建 range
    var range = obj.createTextRange();
    // 光标移至最后
    range.collapse(false);
    // 避免产生空格
    range.select();
  }
}

// 定位 div（contenteditable = "true"）
function po_Last_Div(obj) {
  // ie11 10 9 ff safari
  if (window.getSelection) {
    // 解决 ff 不获取焦点无法定位问题
    obj.focus();
    // 创建range
    var range = window.getSelection();
    // range 选择 obj 下所有子内容
    range.selectAllChildren(obj);
    // 光标移至最后
    range.collapseToEnd();
    // ie10 9 8 7 6 5
  } else if (document.selection) {
    // 创建选择对象
    var range = document.selection.createRange();
    // range 定位到 obj
    range.moveToElementText(obj);
    // 光标移至最后
    range.collapse(false);
    range.select();
  }
}
```


## 双向绑定核心

原理简单来说就是

* `Object.defineProperty` 劫持对象的 `getter`、`setter`，从而实现对数据的监控

  * 主要在 `getter` 和 `setter` 函数里面插入一些处理方法，当对象被读写的时候处理方法就会被执行了

* 发布／订阅者模式 实现数据与视图的自动同步

  * 简单来说就是 `addEventListener` 那一套  

```js
function EventHandle() {
  var events = {};
  this.on = function (event, callback) {
    callback = callback || function () { };
    if (typeof events[event] === "undefined") {
      events[event] = [callback];
    } else {
      events[event].push(callback);
    }
  };
  this.emit = function (event, args) {
    events[event].forEach(function (fn) {
      fn(args);
    });
  };
  this.off = function (event) {
    delete events[event];
  };
}
```




## 函数柯里化

应用

```js
var add1 = add.curry(1)

console.log( (add1(5)) )
```

函数定义如下

```js
// 定义模块
Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
  return this;
}
// 应用模块
Function.method("curry", function () {
  var slice = Array.prototype.slice,
    _this = this,
    args = slice.apply(arguments);
  return function () {
    return _this.apply(null, args.concat(slice.apply(arguments)));
  }
})
// 定义方法 add
var add = function (a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw {
      name: "TypeError",
      message: "add needs numbers"
    };
  }
  return a + b;
}
```




## 记忆函数

```js
var memoizer = function (memo, fundamental) {
  var shell = function (n) {
    var result = memo[n];
    if (typeof result !== "number") {
      result = fundamental(shell, n);
      memo[n] = result;
    }
    return result;
  }
  return shell;
}

/* 利用上面的记忆函数计算阶乘 【 factorial(5) == 120 】*/
var factorial = memoizer([1, 1], function (shell, n) {
  return n * shell(n - 1);
})

/* 利用上面的记忆函数计算斐波那契数列 【 fibonacci(10) == 55 】*/
var fibonacci = memoizer([0, 1], function (shell, n) {
  return shell(n - 1) + shell(n - 2);
})

```



## 返回 str 中出现次数最多的字符

应用 `fineStr(str, 0, [])`

```js
function fineStr(s, n, fs) {
  var f = s.match(/^./)[0];
  var rf = new RegExp(f, "g");
  var nn = s.match(rf).length;
  if (nn == n) fs.push(f);
  if (nn > n) { fs = []; fs.push(f); n = nn }
  s = s.replace(rf, "");
  if (s.length < n) { return ["出现次数最多的字符是：" + fs.join(","), "总次数为：" + n]; }
  return fineStr(s, n, fs);
}
```

## 去除字符串两边空格

应用 `trim(str)`

```js
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
```



## 输入框过滤

文本框只能输入数字代码（小数点也不能输入）

```html
<input onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
```

只能输入数字,能输小数点

```html
<input onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')">

<input name=txt1 onchange="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}">
```

允许输入负数

```js
if (!/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test($(this).val())) {
  // ...
}
```

保留两位小数

```js
$('input').on('keyup', function (event) {

  // 移除左右方向键和后退键位
  var $amountInput = $(this);
  event = window.event || event;
  if (event.keyCode == 37 | event.keyCode == 39 | event.keyCode == 8) {
      return;
  }

  // 先替换掉非数字，除了数字和. 
  $amountInput.val($amountInput.val().replace(/[^\d.]/g, '').
    // 只允许出现一个小数点              
    replace(/^\./g, '').replace(/\.{2,}/g, '.').
    // 小数点最多保留两位
    replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));

});

// 失去焦点的时候，如果最后一位是小数点，则直接剔除（另外还要绑定一个事件）
$(this).val($(this).val().replace(/\.$/g, ''))
```




## 人名币值转换

将数值转为为人名币值（零壹贰叁肆伍陆柒捌玖）

```js
/**
 * changeMoneyToChinese
 * @param  {Number} money 
 * @return {String} chinese
 */
function changeMoneyToChinese(money) {
  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');  // 汉字的数字
  var cnIntRadice = new Array('', '拾', '佰', '仟');   // 基本单位
  var cnIntUnits = new Array('', '万', '亿', '兆');    // 对应整数部分扩展单位
  var cnDecUnits = new Array('角', '分', '毫', '厘');  // 对应小数部分单位
  var cnInteger = '整';  // 整数金额时后面跟的字符
  var cnIntLast = '元';  // 整型完以后的单位
  var maxNum = 999999999999999.9999;  // 最大处理的数字

  var IntegerNum;  // 金额整数部分
  var DecimalNum;  // 金额小数部分
  var ChineseStr = '';  // 输出的中文金额字符串
  var parts;  // 分离金额后用的数组，预定义

  if (money == '') {
    return '';
  }

  money = parseFloat(money);

  if (money >= maxNum) {
    alert('超出最大处理数字');
    return '';
  }

  if (money == 0) {
    ChineseStr = cnNums[0] + cnIntLast + cnInteger;
    return ChineseStr;
  }

  money = money.toString();  // 转换为字符串

  if (money.indexOf('.') == -1) {
    IntegerNum = money;
    DecimalNum = '';
  } else {
    parts = money.split('.');
    IntegerNum = parts[0];
    DecimalNum = parts[1].substr(0, 4);
  }

  // 获取整型部分转换
  if (parseInt(IntegerNum, 10) > 0) {
    var zeroCount = 0, IntLen = IntegerNum.length;
    for (var i = 0; i < IntLen; i++) {

      var n = IntegerNum.substr(i, 1), p = IntLen - i - 1, q = p / 4, m = p % 4;

      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          ChineseStr += cnNums[0];
        }
        // 归零
        zeroCount = 0;
        ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }

      if (m == 0 && zeroCount < 4) {
        ChineseStr += cnIntUnits[q];
      }
    }

    ChineseStr += cnIntLast;
    // 整型部分处理完毕
  }

  // 小数部分
  if (DecimalNum != '') {
    var decLen = DecimalNum.length;
    for (i = 0; i < decLen; i++) {
      n = DecimalNum.substr(i, 1);
      if (n != '0') {
        ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }

  if (ChineseStr == '') {
    ChineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (DecimalNum == '') {
    ChineseStr += cnInteger;
  }

  return ChineseStr;

};
```





## 移动端元素定位

```js
// 在页面 resize 的时候动态计算其坐标
// 对于使用的对象添加 class 为 resize 即可
scaleW = window.innerWidth / 320;
scaleH = window.innerHeight / 480;
var resizes = document.querySelectorAll('.resize');
for (var j = 0; j < resizes.length; j++) {
  resizes[j].style.width = parseInt(resizes[j].style.width) * scaleW + 'px';
  resizes[j].style.height = parseInt(resizes[j].style.height) * scaleH + 'px';
  resizes[j].style.top = parseInt(resizes[j].style.top) * scaleH + 'px';
  resizes[j].style.left = parseInt(resizes[j].style.left) * scaleW + 'px';
}
```

## 移动端适配（rem）

`meta` 设置为 `<meta(name="viewport" content="width=device-width, initial-scale=1.0, user-scalable:no")>`

`designWidth` 为设计稿的实际宽度值，需要根据实际设置，`maxWidth` 为制作稿的最大宽度值，需要根据实际设置

最后面两个参数，一个为设计稿实际宽度，一个为制作稿最大宽度

```js
; (function (designWidth, maxWidth) {
  var doc = document,
    win = window,
    docEl = doc.documentElement,
    remStyle = document.createElement("style"),
    tid;

  function refreshRem() {
    var width = docEl.getBoundingClientRect().width;
    maxWidth = maxWidth || 540;
    width > maxWidth && (width = maxWidth);
    var rem = width * 100 / designWidth;
    remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
  }

  if (docEl.firstElementChild) {
    docEl.firstElementChild.appendChild(remStyle);
  } else {
    var wrap = doc.createElement("div");
    wrap.appendChild(remStyle);
    doc.write(wrap.innerHTML);
    wrap = null;
  }
  // 要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次
  refreshRem();

  win.addEventListener("resize", function () {
    // 防止执行两次
    clearTimeout(tid); 
    tid = setTimeout(refreshRem, 300);
  }, false);

  win.addEventListener("pageshow", function (e) {
    // 浏览器后退的时候重新计算
    if (e.persisted) { 
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    }
  }, false);

  if (doc.readyState === "complete") {
    doc.body.style.fontSize = "16px";
  } else {
    doc.addEventListener("DOMContentLoaded", function (e) {
      doc.body.style.fontSize = "16px";
    }, false);
  }
})(750, 750);
```


## 静态文件处理函数


```js
const path = require("path");
const mime = require("mime");
const fs = require("mz/fs");

// url: 类似 "/static/"
// dir: 类似 __dirname + "/static"

function staticFiles(url, dir) {

  return async (ctx, next) => {

    let rpath = ctx.request.path;

    // 判断是否以指定的 url 开头
    if (rpath.startsWith(url)) {

      // 获取文件完整路径
      let fp = path.join(dir, rpath.substring(url.length));

      // 判断文件是否存在
      if (await fs.exists(fp)) {
        // 查找文件的 mime
        ctx.response.type = mime.lookup(rpath);
        // 读取文件内容并赋值给 response.body
        ctx.response.body = await fs.readFile(fp);
      } else {
        // 文件不存在
        ctx.response.status = 404;
      }
    } else {
      // 若不是指定前缀的 url，则继续往下处理（交给下一个 middleware）
      await next();
    }
  };
}

module.exports = staticFiles;
```

使用方式

```js
// static file support
let staticFiles = require("./static-files");
app.use(staticFiles("/static/", __dirname + "/static"))
```






## nunjucks 模版渲染函数

```js
const nunjucks = require("nunjucks");

function createEnv(path, opts) {

  var autoescape = opts.autoescape === undefined ? true : opts.autoescape,
    noCache = opts.noCache || false,
    watch = opts.watch || false,
    throwOnUndefined = opts.throwOnUndefined || false,
    env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader(path, {
        noCache: noCache,
        watch: watch,
      }), {
        autoescape: autoescape,
        throwOnUndefined: throwOnUndefined
      });

  if (opts.filters) {
    for (var f in opts.filters) {
      env.addFilter(f, opts.filters[f]);
    }
  }

  return env;

}

function templating(path, opts) {

  // 创建 nunjucks 对的 event 对象
  var env = createEnv(path, opts);

  return async (ctx, next) => {
    // 给 ctx 绑定 render 函数
    ctx.render = function (view, model) {
      // 把 render 后的内容赋值给 response.body
      ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
      // 设置 Content-Type
      ctx.response.type = "text/html";
    };
    // 继续处理请求
    await next();
  };

}

module.exports = templating;
```

使用方式

```js
const templating = require("./templating");

// add nunjucks as view
app.use(templating("views", {
    noCache: true,
    watch: true
}))
```