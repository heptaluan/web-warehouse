个人工具方法类库集合

----

----

----

### 常用工具 & 方法

----

----

----

```js
/* tab 切换 （类似于 jQuery 的 siblings() 方法） 【 obj 为父级元素 】 */
function tab(obj) {
    for (var i = 0; i < obj.length; i++) {
        obj[i].onclick = function () {
            for (var i = 0; i < obj.length; i++) {
                obj[i].className = "";
            }
            obj.className = "active"
        }
    }
}
```

----

```js
/* 解析 url 为字典对象 【 getQueryObject(url).userId 】 */
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

----

```js
/* 随机验证码 【 createCode() 】 */
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

----

```js
/* 导航 下拉隐藏 上拉显示 【 scrollHide($("#header")) 】 */
function scrollHide(obj) {

    // 导航
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

----

```js
/* 多少秒后自动跳转（内部需要获取 id） 【 jumpTo(60, "url地址") 】 */
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

----

```js
/* iframe 高度自适应 【 <iframe id="myFrameId" onload="iframeHeight()"></iframe> 】 */
function iframeHeight() {

    var ifm = document.getElementById("myFrameId");
    var subWeb = document.frames ? document.frames["myFrameId"].document : ifm.contentDocument;

    if (ifm != null && subWeb != null) {
        ifm.height = subWeb.body.scrollHeight;
        ifm.width = subWeb.body.scrollWidth;
    }

}
```

----

```js
/* 保存 / 读取 key（备用） 【 saveKey() 】 */
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

----

```js
/* 拖拽函数 【 $(obj).drag() 】 */
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
        //如果有多个拖拽元素，当其中一个mousedown的时候，当前div的zIndex为1，其余的为0
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

----

```js
/* 运动函数（改变元素位置/透明度等） 【 move(this, "opacity", 30) / move(this, width, 300px) 】 */
function move(obj, attr, iTarget) {

    // 注意，依赖下方的 css 方法（获取css）

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
```

----

```js
/* 连续运动函数（不停改变元素 / 类似 CSS3 动画实现效果） 【 act(div, "width", 0, callback) 】*/
/**
 * --------------------------------
 * 
 *  连续运动（类似 Animate 的回调）
 *  act(div, "width", 0, function () {
 *      act(div, "width", x + 100, function () {
 *          span.style.display = "block";
 *          span.style.right = x + 100 + "px";
 *      });
 *  });
 *
 *  act(div, "left", (this.offsetLeft + 100));
 * 
 * --------------------------------
 * 
 */
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


----

```js
/* 获取元素距离浏览器 顶部/左端 的距离 【 element - 元素名称 】 */
{
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
}
```

----

```js
/* 判断图片是否存在 【 img 的 url 地址 】 */
function CheckImgExists(imgurl) {

    var ImgObj = new Image();
    ImgObj.src = imgurl;

    //没有图片，则返回-1  
    if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
        return true;
    } else {
        return false;
    }

}
```

----

```js
/* 判断图片是否加载完成 */
var preloadImage = function (path) {
    return new Promise(function (resolve, reject) {
        var image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = path;
    });
};
```

----

```js
/* 休眠函数（sleep） 【 sleep(10000) 】 */
function sleep(milliSeconds) {

    var startTime = new Date().getTime();

    while (new Date().getTime() < startTime + milliSeconds);

}
```

----

```js
/* 利用 canvas 图片缓存（lazyloadImage） 【 renderCvs(当前需要展示的列表) 】*/
/**
 * --------------------------------
 * 
 *  原理就是把图片的 data-src 取出来，然后放到 canvas 上面
 * 
 *  同时把 canvas 上图片的数据取出来，然后缓存和显示
 * 
 *  应用元素 - lazyloadImage （需要缓存的图片列表，具体位置可自行设置）
 * 
 * --------------------------------
 * 
 */
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

                //创建一个 canvas
                var cvs = document.createElement("canvas");
                cvs.style.display = "none";
                document.body.appendChild(cvs);

                //把要画的图片画到画布上
                var rcvs = cvs.getContext("2d");
                cvs.width = 140;
                cvs.height = 108;
                rcvs.drawImage(this, 0, 0, 140, 108);


                //缓存
                setTimeout(function () {

                    //取得的data是一个base64位的字符串
                    var data = cvs.toDataURL();

                    //SET(_this.id,data);
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

----

```js
/* 设置元素 CSS3 相关变换属性（transform） 【 transform 】*/
/**
 * --------------------------------
 * 
 *  setCss3(div, { transform: "rotate(45deg)", transform-origin: "0 0" });
 * 
 *  动画效果应用 - 放置在 setInterval() 中即可
 * 
 * --------------------------------
 * 
 */
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

----

```js
/* 判断上传文件大小及类型 【 CheckFile("file元素") 】 */
function CheckFile(obj) {

    var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
    var fileSize = 0;
    var array = new Array('gif', 'png', 'jpg', 'mp4', 'ogg');  //可以上传的文件类型  

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

----

```js
/* placeholder 兼容 IE 【 jQuery("input[placeholder]"").placeholder(); 】*/
/**
 * --------------------------------
 * 
 *  原理 - 利用 span 模拟实现效果
 * 
 *  样式可以在下方 placeholder.css({...}) 中调整
 * 
 * --------------------------------
 * 
 */
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

----

```js
/* 判断浏览器类型 【 括号利于代码折叠，使用时去掉即可 】*/
{

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

}
```

----

```js
/* 判断移动端机型 【 安卓 还是 IOS 】*/
{

    if (navigator.userAgent.match(/Android/i)) {

        // Android 方法
        jsInterface.javaFunction4()

    } else if ((navigator.userAgent.indexOf('iPhone') != -1)) {

        // IOS 方法名
        // test();  

    } else { }

}
```

----

```js
/* 当点击 div 以外的地方，隐藏该 div （比如弹出层，点击弹出层之外的地方隐藏弹出层） 【 e.stopPropagation() 】 */
/**
 * --------------------------------
 * 
 *  原理 - 点击该层的时候 阻止事件冒泡
 * 
 *  样式可以在下方 placeholder.css({...}) 中调整
 * 
 * --------------------------------
 * 
 */
{
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
}
```

----

```js
/* textarea 高度自适应 【 makeExpandingArea(areas) 】 */
/**
 * --------------------------------
 * 
 *  页面布局：
 * 
 *  需要注意的是 #textarea 的 class后有一个空格（否则添加的 class 会连在一起）
 *  <div id="textarea" class="expandingArea ">
 *      <pre><span></span><br></pre>
 *      <textarea placeholder="标题" maxlength="45"></textarea>
 *  </div>
 * 
 *  应用：
 * 
 *  var areas = document.getElementById("textarea");
 * 
 *  makeExpandingArea(areas);
 * --------------------------------
 * 
 */
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

    // IE9
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

----

```js
/* textarea 高度自适应（和上面那个的区别是这个一个超出限定范围后自动出现滚动条） 【 autoResize() 】 */
/**
 * --------------------------------
 * 
 *  应用：
 * 
 *  <textarea id="txt" rows="5" cols="50" onkeyup="autoResize()" style="overflow-y:hidden;"></textarea>
 * 
 * 
 * --------------------------------
 * 
 */
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

----

```js
/* 修正 IOS/安卓 下拍照图片角度偏移（旋转）问题 【 getImgData(img（图片的 base64）, dir（exif 获取的方向信息）, next（回调方法，返回校正方向后的 base64）) 】 */
/**
 * --------------------------------
 * 
 *  这里使用的是 exif.js
 * 
 *  var file = document.getElementById("input[file]").files[0];
 *  
 *  // 配合下面的 getImgData() 函数修正图片旋转问题
 *  var orientation;
 *  EXIF.getData(file, function () {
 *      orientation = EXIF.getTag(this, "Orientation");
 *  });
 *  
 *  var reader = new FileReader();
 *  
 *  reader.readAsDataURL(file);
 *  
 *  reader.onload = function (e) {
 *  
 *      getImgData(this.result, orientation, function (data) {
 *          // 修正后的 base64
 *          console.log(data)
 *      });
 *      
 *  }
 * 
 *  说多一句，如果图片服务器使用的是阿里云的，就不会有这个问题（因为阿里云的图片平台会自动校正这个问题）
 * 
 * --------------------------------
 * 
 */
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

----

```js
/* 图片自定义裁剪大小上传 【 convertToData(url, canvasdata, cropdata, callback) 】 */
/**
 * --------------------------------
 * 
 *  需要注意的一点就是，区域裁剪需要放到 image.onload = function () { ... } 中
 * 
 * --------------------------------
 * 
 */
{

    // 图片裁剪
    var $image = $("img");

    // 图片加载完成后在进行裁剪
    $image.on("load", function () {

        // 裁剪框容器位置居中，如果图片过大，加上限定范围
        if ($image.height() > $(window).height()) {
            $("imgWrap").height($(window).height())
        } else {
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

    // 点击后获取到裁剪信息
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


    /**
     * --------------------------------
     * 
     *  url          图片的 url 地址
     * 
     *  canvasdata   利用 cropper 获取  var canvasdata = $image.cropper("getCanvasData");
     * 
     *  cropBoxData  同上              var cropBoxData = $image.cropper('getCropBoxData');
     * 
     *  callback     回调函数
     * 
     * --------------------------------
     * 
     */
    function convertToData(url, canvasdata, cropdata, callback) {

        var cropw = cropdata.width; // 剪切的长
        var croph = cropdata.height; // 剪切的宽 
        var imgw = canvasdata.width; // 图片缩放或则放大后的高 
        var imgh = canvasdata.height; // 图片缩放或则放大后的高 

        var poleft = canvasdata.left - cropdata.left; // canvas 定位图片的左边位置 
        var potop = canvasdata.top - cropdata.top; // canvas 定位图片的上边位置 

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

            // 这里的 1 是处理图片的清晰度（0-1）之间,当然越小图片越模糊,处理后的图片大小也就越小 
            var base64 = canvas.toDataURL('image/jpg', 1);

            callback && callback(base64)      // 回调 base64 字符串 

        }
    }

}
```

----

```js
/* 禁止换行（回车键，移动端软键盘上的换行键位同样有效） 【 checkEnter(e) 】 */
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

----

```js
/* base64 格式 转为 blob 格式 【 ... 】 */
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

----

```js
/* ajax 搜索操作（search） 【 search("Hello World", console.log, console.error) 】 */
function search(term, onload, onerror) {

	var xhr, results, url;
	url = "url/search?q=" + term;

	xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);

	xhr.onload = function(e) {
		if (this.status === 200 && this.readyState == 4) {
			results = JSON.parse(this.responseText);
			onload(results);
		}
	};

	xhr.onerror = function(e) {
		onerror(e);
	};

	xhr.send();

}
```

----

```js
/* ajax 搜索操作（search）【Promise 版本（使用方法同上）】 */
function search(term, onload, onerror) {

	var url = "url/search?q=" + term;
	var xhr = new XMLHttpRequest();
	var result;

	var p = new Promise(function(resolve, reject) {

		xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);

		xhr.onload = function(e) {
		xhr.open("GET", url, true);

		xhr.onload = function(e) {
            if (this.status === 200 && this.readyState == 4) {
                results = JSON.parse(this.responseText);
                resolve(results);
            };
        }

        xhr.onerror = function(e) {
            reject(e);
        };

        xhr.send();
        
	});

	return p;

}
```

----

----

----

### 获取数据相关

----

----

----

```js
/* 获取当前元素所有最终使用的 CSS 属性值 【 css(obj, attr) 】 */
function css(obj, attr) {

    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, null)[attr];
    }

}
```

----

```js
/* 获取元素的 Class 【 getClass(div, "div_list") 】 */
/**
 * --------------------------------
 * 
 *  var div = getClass(div, "div_list")
 * 
 *  document.all 是页面内所有元素的一个集合
 * 
 *  例如：document.all(0) 表示页面内第一个元素
 * 
 * --------------------------------
 * 
 */
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

----

```js
/* 获取一个随机的颜色 【 randColor() 】 */
function randColor() {

    return "rgb(" + Math.ceil(255 * Math.random()) + "," + Math.ceil(255 * Math.random()) + "," + Math.ceil(255 * Math.random()) + ")";

}
```

----

```js
/* 获取当前时间 【 getTime() 】*/
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

----

```js
/* 查询 & 获取 字符串的 code 值 【 name 需要查询的字符串 】 */
function getParameterByName(name) {

    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),

        results = regex.exec(location.search);

    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));

}
```

----

```js
/* 序列化时间戳 【 timestamp(1487904182000) 】*/
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

----

```js
/* 时间间隔天数计算 【 DateDiff(s1, s2) 】*/
function dateDiff(sDate1, sDate2) {

    // s1 = "2017-09-30"
    // s2 = "2017-10-08"

    var aDate, oDate1, oDate2, iDays;

    aDate = sDate1.split("-")
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])    //转换为12-12-2012格式

    aDate = sDate2.split("-")
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])

    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)    // 把相差的毫秒数转换为天数

    return iDays

}
```

----

----

----

### 移动端

----

----

----

```js
/* 滑动底部加载更多 【 ... 】 */

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
```

----

```js
/* 遮罩层下禁止滑动 【 禁止滑动 】 */

$("body").bind("touchmove", function (event) { event.preventDefault() });



/* 遮罩层下开启滑动 【 开启滑动 】 */

$("body").unbind("touchmove");
```

----

```js
/* 设置页面 rem 比例 【 rem 】 */
(function () {
    var clientWidth = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;

    if (clientWidth > 640) clientWidth = 640;

    document.documentElement.style.fontSize = clientWidth * 1 / 16 + "px";

    return clientWidth * 1 / 16;
})();
```

----

```js
/* 元素失去焦点隐藏 iphone 的软键盘 【 ... 】*/
{
    //判断是否为苹果
    var isIPHONE = navigator.userAgent.toUpperCase().indexOf('IPHONE') != -1;

    if (isIPHONE) {
        var input = new objBlur('input');
        input = null;
    }

    // 元素失去焦点隐藏iphone的软键盘
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
}
```

----

----

----

### 光标 & Range 对象

----

----

----

```js
/* 定位光标，在光标位置插入内容 【 insertHtmlAtCaret('<img src="..">') 】 */
/**
 * --------------------------------
 * 
 *  正常使用是可以成功插入，但是存在一个 BUG
 * 
 *  即富文本框内不存在光标的时候（比如插入图片/表情等按钮在文本框之外，点击之后便会失去焦点）
 * 
 *  这个时候是默认插入到输入框最前面
 * 
 *  解决办法可以 在输入框失去焦点的时候 保存光标的位置，然后插入的时候在设置光标位置
 * 
 * --------------------------------
 * 
 */
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

----

```js
/* 插入内容 & 记录光标最后离开的位置 【 insertText(obj, str) 】 */
/**
 * --------------------------------
 * 
 *  上面那个方法用于在不失去光标（焦点）插入内容的时候很好用
 * 
 *  完善办法就是在失去焦点的时候保存光标的位置
 * 
 * --------------------------------
 * 
 */
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

----

```js
/* 移动光标到内容末尾 【 moveEnd(obj) 】 */
/**
 * --------------------------------
 * 
 *  两种方法，选择使用
 * 
 * --------------------------------
 * 
 */
{
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
    //定位 input、textarea
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

}
```

----

----

----

### 算法 & 高阶函数

----

----

----

```js
/* 双向绑定核心 */
/**
 * --------------------------------
 * 
 *  原理：
 * 
 *  1、Object.defineProperty 劫持对象的 getter、setter，从而实现对数据的监控。
 * 
 *    - 主要在 getter 和 setter 函数里面插入一些处理方法，当对象被读写的时候处理方法就会被执行了
 * 
 *  2、发布／订阅者模式 实现数据与视图的自动同步。
 * 
 *    - 简单来说就是 addEventListener 那一套    
 * 
 * --------------------------------
 * 
 */
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

----

```js
/* 函数柯里化 */
/**
 * --------------------------------
 * 
 *  应用 
 * 
 *  var add1 = add.curry(1)
 * 
 *  console.log( (add1(5)) )
 * 
 * --------------------------------
 * 
 */
{
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
}
```

----

```js
/* 记忆函数 【 memoizer 】*/
{
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
}
```

----

----

----

### 正则相关

----

----

----

```js
/* 返回 str 中出现次数最多的字符 【 fineStr(str, 0, []) 】 */
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

----

```js
/* 去除字符串两边空格 【 trim(str) 】 */
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
```
