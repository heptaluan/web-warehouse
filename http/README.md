## http 协议

http 协议是 超文本传输协议（Hyper Text Transfer Protocol）的缩写，是用于从万维网服务器传输超文本到本地浏览器的传送协议

http 是一个基于 TCP/IP 通信协议来传递数据（html文件，图片，查询结果等）

## http 工作原理

http 协议工作于 客户端-服务端 架构为上，浏览器作为 http 客户端通过 url 向 http 服务端（即 web 服务器）发送请求

web 服务器有：Apache服务器，IIS服务器等

web 服务器根据接收到的请求后，向客户端发送响应信息

http 默认端口号为 80，也是也可以更改为 8080 等其他端口

#### http 三点注意事项：

* http 是无链接：无连接的含义是限制每次连接只处理一个请求，服务器处理完客户的请求，并收到客户的应答后，即断开连接，采用这种方式可以节省传输时间

* http 是媒体独立的：这意味着，只要客户端和服务器知道如何处理的数据内容，任何类型的数据都可以通过 http 发送，客户端以及服务器指定使用适合的 mime-type 内容类型

* http 是无状态：http 协议是无状态协议，无状态是指协议对于事物处理没有记忆能力，缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大，另一方面，在服务器不需要先前信息的时候它的应答就较快

下图展示了 http 协议通信流程：

![img](http://www.runoob.com/wp-content/uploads/2013/11/cgiarch.gif)


## http 消息结构

http 是基于 客户端/服务端（C/S）的架构模型，通过一个可靠的链接来交换信息，是一个无状态的 请求/响应 协议

一个 http "客户端" 是一个应用程序（web 浏览器或其他任何客户端），通过连接到服务器达到向服务器发送一个或多个 http 的请求的目的

一个 http "服务器" 同样也是一个应用程序（通常是一个 web 服务，如 Apache Web 服务器或者 IIS 服务器等），通过接收客户端的请求并向客户端发送 http 响应数据

http 使用统一资源标识符（URL）来传输数据和建立连接


## 客户端请求消息

客户端发送一个 http 请求到服务器的请求消息包括以下格式：请求行（request line），请求头部（header），空行和请求数据四个部分组成，如下图所示：

![img](http://www.runoob.com/wp-content/uploads/2013/11/2012072810301161.png)



## 客户端响应消息

http 响应也由四个部分组成：状态行，消息报头，空行和响应正文

![img](http://www.runoob.com/wp-content/uploads/2013/11/httpmessage.jpg)


## 实例

一个典型的使用 GET 来传递数据的实例：

客户端请求：

```html
GET /hello.txt HTTP/1.1
User-Agent: curl/7.16.3 libcurl/7.16.3 OpenSSL/0.9.7l zlib/1.2.3
Host: www.example.com
Accept-Language: en, mi
```

服务端响应：

```js
HTTP/1.1 200 OK
Date: Mon, 27 Jul 2009 12:28:53 GMT
Server: Apache
Last-Modified: Wed, 22 Jul 2009 19:15:56 GMT
ETag: "34aa387-d-1568eb00"
Accept-Ranges: bytes
Content-Length: 51
Vary: Accept-Encoding
Content-Type: text/plain
```

输出结果：

```js
Hello World! My payload includes a trailing CRLF.
```



## http 请求方法

HTTP1.0 定义了三种请求方法： GET, POST 和 HEAD方法

HTTP1.1 新增了五种请求方法： OPTIONS, PUT, DELETE, TRACE 和 CONNECT 方法



## http 状态码

* 1**	信息，服务器收到请求，需要请求者继续执行操作

* 2**	成功，操作被成功接收并处理

* 3**	重定向，需要进一步的操作以完成请求

* 4**	客户端错误，请求包含语法错误或无法完成请求

* 5**	服务器错误，服务器在处理请求的过程中发生了错误




## Content-Type

* text/plain

* text/html

* text/css

* image/jpeg

* image/png

* image/svg+xml

* audio/mp4

* video/mp4

* application/javascript

* application/pdf

* application/zip

* application/atom+xml

这些数据类型总称为 ```MIME type```，每个值包括一级类型和二级类型，之间用斜杠分隔

关于 ```MIME type```：

* 可以自定义类型，```application/vnd.debian.binary-package```

* 也可以在尾部使用分号，添加参数，```Content-Type: text/html; charset=utf-8```

* 客户端请求的时候，可以使用 Accept 字段声明可以接受哪些数据格式，```Accept: */* ```

* 不仅可以用在 http 协议，也可以用在 html 网页中 ```<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />```


## http/1.0 缺点

http/1.0 版本主要的缺点是，每个 TCP 连接只能发送一个请求，发送数据完毕，连接就关闭，如果还需要请求其他资源，就必须再新建一个连接

为了解决这个问题，有些浏览器在请求的时候，使用了一个非标准的 ```Connection``` 字段：

```js
Connection: keep-alive
```

这个字段要求服务器不关闭 TCP 连接，以便其他请求复用，服务器同样回应这个字段：

```js
Connection: keep-alive
```


## http/1.1

1.1 版本的最大的变化，就是引入了持久连接（persistent connection），即 TCP 连接默认不关闭，可以被多个请求复用，不用声明 ```Connection: keep-alive```

客户端和服务器发现对方一段时间没有活动，就可以主动关闭连接，不过，规范的做法是，客户端在最后一个请求的时候，发送 ```Connention: clos```，明确要求服务器关闭 TCP 连接


## 管道机制

1.1 版本还引入了管道机制（pipelining），即在同一个 TCP 连接里面，客户端可以同时发送多个请求

例如客户端需要请求两个资源。以前的做法是，在同一个 TCP 连接里面，先发送 A 请求，然后等待服务器做出回应，收到后再发出 B 请求。管道机制则是允许浏览器同时发出 A 请求和 B 请求，但是服务器还是按照顺序，先回应 A 请求，完成后再回应 B 请求


## http/1.1 缺点

虽然 1.1 版允许复用 TCP 连接，但是同一个 TCP 连接里面，所有的数据通信是按次序进行的。服务器只有处理完一个回应，才会进行下一个回应。要是前面的回应特别慢，后面就会有许多请求排队等着。这称为"队头堵塞"（Head-of-line blocking）

为了避免这个问题，只有两种方法：一是减少请求数，二是同时多开持久连接


## http/2

主要涉及二进制帧，多路复用，请求优先级，流量控制，服务器端推送以及首部压缩等新改进

#### 二进制协议

http/1.1 版本的头信息肯定是文本（ASCII编码），数据体可以是文本，也可以是二进制，http/2 则是一个彻底的二进制协议，头信息和数据体都是二进制，并且统称为 "帧"(frame)，头信息帧 和 数据帧

在二进制分帧层中， HTTP/2 会将所有传输的信息分割为更小的消息和帧（frame）,并对它们采用二进制格式的编码 ，其中 HTTP1.x 的首部信息会被封装到 HEADER frame，而相应的 Request Body 则封装到 DATA frame 里面

HTTP/2 通信都在一个连接上完成，这个连接可以承载任意数量的双向数据流

总结：

* 单连接多资源的方式，减少服务端的链接压力,内存占用更少,连接吞吐量更大

* 由于 TCP 连接的减少而使网络拥塞状况得以改善，同时慢启动时间的减少,使拥塞和丢包恢复速度更快

#### 多工

http/2 复用 TCP 连接，在一个连接里，客户端和浏览器都可以同时发送多个请求或回应，而且不用按照顺序一一对应，这样就避免了"队头堵塞"

例如在一个 TCP 连接里面，服务器同时收到了 A 请求和 B 请求，于是先回应 A 请求，结果发现处理过程非常耗时，于是就发送 A 请求已经处理好的部分， 接着回应 B 请求，完成后，再发送 A 请求剩下的部分

这样双向的、实时的通信，就叫做多工（Multiplexing）


#### 数据流（连接共享）

因为 http/2 的数据包是不按顺序发送的，同一个连接里面连续的数据包，可能属于不同的回应。因此，必须要对数据包做标记，指出它属于哪个回应

http/2 将每个请求或回应的所有数据包，称为一个数据流（stream）。每个数据流都有一个独一无二的编号。数据包发送的时候，都必须标记数据流 ID，用来区分它属于哪个数据流

另外还规定，客户端发出的数据流，ID 一律为奇数，服务器发出的，ID 为偶数

数据流发送到一半的时候，客户端和服务器都可以发送信号（RST_STREAM帧），取消这个数据流。1.1 版取消数据流的唯一方法，就是关闭 TCP 连接。这就是说，http/2 可以取消某一次请求，同时保证 TCP 连接还打开着，可以被其他请求使用

http/2 里的每个 stream 都可以设置又优先级（Priority）和依赖（Dependency）。优先级高的 stream 会被 server 优先处理和返回给客户端，stream 还可以依赖其它的 sub streams（优先级和依赖都是可以动态调整的）

客户端还可以指定数据流的优先级。优先级越高，服务器就会越早回应


#### 头信息压缩

http 协议不带有状态，每次请求都必须附上所有信息。所以，请求的很多字段都是重复的，比如 Cookie 和 User Agent，一模一样的内容，每次请求都必须附带，这会浪费很多带宽，也影响速度

http/2 对这一点做了优化，使用了专门为首部压缩而设计的 [HPACK](http://http2.github.io/http2-spec/compression.html) 算法，引入了头信息压缩机制（header compression）。一方面，头信息使用 gzip 或 compress 压缩后再发送

另一方面，客户端和服务器同时维护一张头信息表，所有字段都会存入这个表，生成一个索引号，以后就不发送同样字段了，只发送索引号，这样就提高速度了


#### 服务器推送

http/2 允许服务器未经请求，主动向客户端发送资源，这叫做服务器推送（server push）

常见场景是客户端请求一个网页，这个网页里面包含很多静态资源。正常情况下，客户端必须收到网页后，解析 html 源码，发现有静态资源，再发出静态资源请求。其实，服务器可以预期到客户端请求网页后，很可能会再请求静态资源，所以就主动把这些静态资源随着网页一起发给客户端了


参考：

[HTTP2讲解](http://www.kancloud.cn/kancloud/http2-explained/49812)

[HTTP/2 资料汇总](https://imququ.com/post/http2-resource.html#comments)

[http2 explained](https://daniel.haxx.se/http2/)

[Hypertext Transfer Protocol Version 2 (HTTP/2)](http://httpwg.org/specs/rfc7540.html)





