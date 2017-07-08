```ajax``` 的一些相关问题

* 原生 ```ajax``` 写法

* ```ajax``` 改为 ```Promise```

* ```ajax``` 中 ```readyState``` 的取值有哪些，分别有什么含义

* ```xhr2```

* 同源策略与跨域

* ```GET``` 与 ```POST``` 区别

* ```xhr``` 的 ```withCredentials``` 属性

----

一些相关知识点：

```IE7+``` 已经内建 ```XMLHttpRequest``` 对象

老版本 ```IE``` 可以使用 ```ActiveX``` 对象（```new ActiveXObject("Microsoft.XMLHTTP")```）

在以下情况中，请使用 ```POST``` 请求：

* 无法使用缓存文件（更新服务器上的文件或数据库）

* 向服务器发送大量数据（```POST``` 没有数据量限制）

* 发送包含未知字符的用户输入时，```POST``` 比 ```GET``` 更稳定也更可靠

```open()``` 方法第三个参数表示 异步 操作（```true```）

----


## 原生 ajax 写法

```js
var xhr = new xhrRequest();

if (xhr) {

    xhr.open("GET", url);

    // 每当 readyState 值改变时，就会触发 onreadystatechange 事件
    // 注意：onreadystatechange 事件会被触发 5 次（0 - 4），对应着 readyState 的每个变化
    xhr.onreadystatechange = function () {

        // readyState 值说明  
        // 0 -- 初始化，xhr 对象已经创建，还未执行 open  
        // 1 -- 载入，已经调用 open 方法，但是还没发送请求  
        // 2 -- 载入完成，请求已经发送完成  
        // 3 -- 交互，可以接收到部分数据  
        // 4 -- OK

        // status 值说明  
        // 200: 成功  
        // 404: Not Found
        // 500: 服务器产生内部错误  
        if (xhr.readyState == 4 && xhr.status == 200) {
            // 响应分为两种
            // responseText -- 获得字符串形式的响应数据（通常是这个）
            // responseXML -- 获得 XML 形式的响应数据
            console.log(xhr.responseText);
        }
    };

    xhr.send();

}

// ---------------------------------------------------

// 如果需要使用 POST 请求发送表单数据，使用 setRequestHeader() 来添加 HTTP 头
// 然后在 send() 方法中添加需要发送的数据

// 在 Form 元素的语法中，EncType 表明提交数据的格式,用 Enctype 属性指定将数据回发到服务器时浏览器使用的编码类型

// application/x-www-form-urlencoded -- 窗体数据被编码为 名称/值 对，这是标准的编码格式
// multipart/form-data -- 窗体数据被编码为一条消息，页上的每个控件对应消息中的一个部分
// text/plain -- 窗体数据以纯文本形式进行编码，其中不含任何控件或格式字符 

xhr.open("POST", url, true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.send(data);
```

如果 ```ajax``` 指定为 ```post``` 但是未设置 ```content-type``` 或未指定键时，由于 ```content-type``` 为 ```text/plain```，动态页并未帮你处理成键值对的形式，所以你得自己使用 ```2``` 进制流数据生成对应的 ```string``` 类型的数据

所以如果要生成键值对形式，你得指定 ```content-type``` 为 ```"application/x-www-form-urlencoded"```


----


## ajax 改为 Promise

```js
function ajax (method, url, data) {

    var xhr = new XMLHttpRequest();

    return new Promise( function (resolve, reject) {

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(xhr.responseText)
            } else {
                reject(xhr.status)
            }
        }

        xhr.open(method, url)
        xhr.send(data)
    })

}

// 使用
var p = ajax("GET", url);

p.then(function (data) {
    console.log(data)
}).catch(function (status) {
    console.log(`Error: ${status}`)
})
```

----

## xhr2

```xhr2``` 于 ```xhr``` 最大的区别在于 ```xhr``` 只支持字符串类型的数据，而 ```xhr2``` 支持任意类型的数据，比如使用 ```xhr2``` 向服务器请求一张图片

```js
var xhr = new XMLHttpRequest();

xhr.open("get", url, true)

// 处理返回内容的类型
xhr.responseType = "bold";

xhr.onload = function (e) {
    if (this.status == 200) {
        var url = window.URL.createObjectURL(this.responseType);
        var img = new Image();
        img.src = url;
        document.body.appendChild(img);
    }
}

xhr.send();
```

#### FormData 接口

简单来说，比起普通的 ```ajax```, 使用 ```FormData``` 的最大优点就是我们可以异步上传一个二进制文件

```js
// 如果带参数使用，比如 new FormData(someForm)，FormData 对象的作用就类似于 jQuery 中的的 serialize() 方法
// 得到的对象就是这个表单元素中所有键值对数据了
function sendForm (form) {
    var data = new FormData(form);

    // 在已知的表单后添加
    data.append({ "user": "123" })
    xhr.send(data);
} 

// 不带参数使用的话，可以使用 append 来添加我们想要的数据，比如常见的表单提交
var data = new FormData();
data.append({ "user": "123" });

var xhr = new XMLHttpRequest();
xhr.open("POST", url, true);
xhr.send(data);
```

#### upload 属性

```xhr2``` 新增了一个 ```upload``` 属性，并可以为之绑定一个 ```onprogress``` 事件，检测上传的速度

```js
var xhr = new XMLHttpRequest();
xhr.open("POST", url, true);

var body = new FormData();
body.append(data);

xhr.upload.onprogress = function (e) {
    if (e.lengthComputable) {
        document.getElementById("test").innerHTML = (e.loaded / e.total * 100) + "%";
    }
};

xhr.send(body)
```

----


## 同源策略与跨域

#### 同源策略

```JavaScript``` 出于安全方面的考虑，不允许跨域调用其他页面的对象

即 同协议，同端口，同域名

#### CORS

```xhr``` 不能跨越，但 ```xhr2``` 新增了跨源资源共享的能力

在服务器设置一些标头实现真正的跨域 ```ajax``` 请求 可以跨某个域的 ```http``` 标头

```js
Access-Control-Allow-Origin: *
```

可见，跨域能否成功，取决于对方服务器是否愿意给你设置一个正确的 ```Access-Control-Allow-Origin```，决定权始终在对方手中

假设本域是 ```my.com```，外域是 ```sina.com```，只要响应头 ```Access-Control-Allow-Origin``` 为 ```http://my.com```，或者是 ```*```，本次请求就可以成功

这种跨域请求，称之为"简单请求"。简单请求包括 ```GET```、 ```HEAD``` 和 ```POST```（```POST``` 的 ```Content-Type``` 类型，仅限 ```application/x-www-form-urlencoded```、 ```multipart/form-data``` 和 ```text/plain```），并且不能出现任何自定义头（例如， ```X-Custom: 12345``` ），通常能满足 ```90%``` 的需求

对于 ```PUT```、```DELETE``` 以及其他类型如 ```application/json``` 的 ```POST``` 请求，在发送 ```ajax``` 请求之前，浏览器会先发送一个 ```OPTIONS``` 请求（称为 ```preflighted``` 请求）到这个 ```URL``` 上，询问目标服务器是否接受：

```js
OPTIONS /path/to/resource HTTP/1.1
Host: bar.com
Origin: http://my.com
Access-Control-Request-Method: POST
```

服务器必须响应并明确指出允许的 ```Method```：

```js
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://my.com
Access-Control-Allow-Methods: POST, GET, PUT, OPTIONS
Access-Control-Max-Age: 86400
```

浏览器确认服务器响应的 ```Access-Control-Allow-Methods``` 头确实包含将要发送的 ```ajax``` 请求的 ```Method```，才会继续发送 ```ajax```，否则，抛出一个错误


#### document.domain

对于主域相同而子域不同的例子，可以通过设置 ```document.domain``` 的办法来解决。具体的做法是可以在 ```http://www.a.com/a.htm``` l和 ```http://script.a.com/b.html``` 两个文件中分别加上 ```document.domain = "a.com"```

#### jsonp

实质上和 ```xhr``` 对象没有太大关系，其是借助了 ```script``` 标签节点可以跨域去访问，去获取的一个特性

```jsonp``` 的这种原理，只能对 ```GET``` 请求起到效果，即 ```jsonp``` 的方式是不支持 ```POST``` 请求的，这也是 ```jsonp``` 这种方式的局限性

----

## GET 与 POST 区别

* 在客户端，```GET``` 方式在通过 ```URL``` 提交数据，数据在 ```URL``` 中可以看到，```POST``` 方式，数据放在 ```HTTP``` 包的 ```body``` 中

* ```GET``` 方式提交的数据大小有限制（因为浏览器对 ```URL``` 的长度有限制），而 ```POST``` 则没有此限制

* 安全性问题，使用 ```GET``` 的时候，参数会显示在地址栏上，而 ```POST``` 不会，所以如果这些数据是中文数据而且是非敏感数据，那么使用 ```GET```，如果用户输入的数据不是中文字符而且包含敏感数据，那么还是使用 ```POST``` 为好

![get&post](http://hanekaoru.com/wp-content/uploads/2016/04/POSTGET.jpg)


----


## xhr 的 withCredentials 属性

默认情况下，```ajax``` 跨源请求不提供凭据（```cookie```、```HTTP``` 认证及客户端 ```SSL``` 证明等），通过将设置 ```ajax``` 的 ```withCredentials``` 属性设置为 ```true```，可以指定某个请求应该发送凭据，如果服务器接收带凭据的请求，会用下面的 ```HTTP``` 头部来响应

```js
Access-Control-Allow-Credentials: true
```

需要注意：永远不会影响到同源请求

简单来说，在平常开发的时候，身份验证是经常遇到的问题，在**跨域请求**中，默认情况下是不发送验证信息的，要想发送验证信息，需要设置 ```withCredentials``` 属性

```js
var xhr = new XMLHttpRequest();

xhr.open('GET', url, true);
xhr.withCredentials = true;

xhr.send(null);
```
