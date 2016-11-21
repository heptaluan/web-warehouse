Node.js 学习笔记记录

各种知识点，Demos的集合汇总

参考 [《Node.js 包教不包会》](https://github.com/hanekaoru/node-lessons)





## lesson1 

### 一个简单的 express 应用

#### 安装 express

```
$ mkdir lesson1 && cd lesson1
# 这里没有从官方 npm 安装，而是使用了大淘宝的 npm 镜像
$ npm install express --registry=https://registry.npm.taobao.org
```

#### 实现

新建一个 app.js

```js
// 引入 express 模块，并将其赋予变量 "express"
var express = require("express");

// 调用 express 实例，它是一个函数，不带参数调用的时候，会返回一个 express 实例
// 将这个变量赋予 app 变量
var app = express();

// app 本身有很多方法，其中包括最常用的 get，post，put/patch，delete，
// 这里调用 get 方法，为我们的 "/" 路径指定一个 haneler 函数

// haneler 函数会接收 req 和 res 两个对象，他们分别是请求的 request 和 response

// request 中包含了浏览器传来的各种信息，比如 query，body，headers等，都可以通过 req 对象访问到
// res 对象，我们一般不从里面获取信息，二十通过它来定制我们向浏览器输出的信息，比如 header 信息，例如想要向浏览器输出的内容

// 这里我们调用它的 #send 方法，像浏览器输出一个字符串

app.get("/", function (req, res) {
    res.send("hello world!");
})

// 定义好我们 app 的行为之后，让它监听本地的 3000 端口
// 这里的第二个函数是个回调函数，会在 listen 动作成功后执行，我们这里执行了一个命令行输出操作，告诉我们监听动作已完成。

app.listen("3000", function () {
    console.log("app is listening at port 3000");
})

```

补充知识：

#### 端口

端口的作用：通过端口来区分出同一电脑内不同应用或者进程，从而实现一条物理网线(通过分组交换技术-比如internet)同时链接多个程序 [Port_(computer_networking)](https://en.wikipedia.org/wiki/Port_(computer_networking))

#### URL

[RFC1738](http://www.ietf.org/rfc/rfc1738.txt) 定义的url格式笼统版本<scheme>:<scheme-specific-part>， scheme有我们很熟悉的http、https、ftp，以及著名的ed2k，thunder。






## lesson2

### 使用外部模块

#### $ npm init

初始化，生成一份最简单的 package.json 文件

#### $ npm install xxx xxx xxx --save

--save 参数的作用，就是会在你安装依赖的同时，自动把这些依赖写入 package.json

app.js

```js
// 引入依赖
var express = require("express");
var utility = require("utility");

// 建立 express 实例
var app = express();

app.get("/", function (req, res) {
    // 从 req.query 中取得 q 参数
    // 如果是 post 传过来的 body 数据，则存在于 req.body 里面
    // （express默认不处理 body 中的信息，需要引入 body-parser 中间件才会处理）
    var q = req.query.q;

    // 调用 utility.md5 方法，得到 md5 之后的值（相关库有很多，可自行选择）
    var md5Value = utility.md5(q);

    res.send(md5Value);

})

app.listen("3000", function (req, res) {
    console.log("app is running at port 3000")
})
```

需要注意的是，路径后面需要添加参数，即 ?q=abcdefg

若是不传入 q 参数时，req.query.q 取到的值是 undefined，utility.md5 直接使用了这个空值，导致下层的 crypto 抛错。







## lesson3

###简单爬虫

#### superagent

是一个 http 方面的库，可以发起 get 或 post 请求


#### cheerio

Node.js 版的 jquery

app.js

```js
var express = require("express");
var superagent = require("superagent");
var cheerio = require("cheerio");

var app = express();

app.get("/", function (req, res, next) {
    // 用 superagent 去抓取 https://cnodejs.org 的内容
    superagent.get("https://cnodejs.org")
    .end(function (err, sres) {
        if (err) {
            return next(err);
        }

        // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
        // 就可以得到一个实现了 jquery 接口的变量，我们习惯性的将它命名为 "$"

        var $ = cheerio.load(sres.text);
        var items = [];
        $('#topic_list .topic_title').each(function (index, element) {
            var $element = $(element);
            var $author = $(".user_avatar img");
            items.push({
                title: $element.attr("title"),
                href: $element.attr("href"),
                author: $author.attr("title")
            })
        })

        res.send(items)
    })
})

app.listen("3000", function (req, res) {
    console.log("app is running at port 3000")
})
```




## lesson4

### 使用 eventproxy 控制并发

app.js

```js
var eventproxy = require("eventproxy");
var superagent = require("superagent");
var cheerio = require("cheerio");

var url = require("url");

var cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl).end(function (err, res) {
    if (err) {
        return console.error(err);
    }

    var topicUrls = [];
    var $ = cheerio.load(res.text);

    // 获取首页所有链接
    $("#topic_list .topic_title").each(function (index, element) {
        var $element = $(element);

        // href 原本是 /topic/542acd7d5d28233425538b04
        // 利用 url.resolve(from, to) 拼接成完整的 'https://cnodejs.org/topic/581b0c4ebb9452c9052e7acb'
        var href = url.resolve(cnodeUrl, $element.attr("href"));
        topicUrls.push(href);
        
    })

    console.log(topicUrls);
})

```

获取到地址以后，就需要挨个全部抓取一遍即可，假设我们不使用 eventproxy 也不使用计数器

```js
$.get("http://data1_source", function (data1) {
    // something
    $.get("http://data2_source", function (data2) {
        // something
        $.get("http://data3_source", function (data3) {
            // something
            var html = fuck(data1, data2, data3);
            render(html);
        });
    });
});
```

其实以上这些数据，是可以并行去获取的，相互之间并不依赖，所以可以改用计数器来写

```js
(function () {
    var count = 0;
    var result = {};

    $.get('http://data1_source', function (data) {
        result.data1 = data;
        count++;
        handle();
    });
    $.get('http://data2_source', function (data) {
        result.data2 = data;
        count++;
        handle();
    });
    $.get('http://data3_source', function (data) {
        result.data3 = data;
        count++;
        handle();
    });

    function handle() {
        if (count === 3) {
            var html = fuck(result.data1, result.data2, result.data3);
            render(html);
        }
    }
})();
```

这里就要请出我们的主角eventproxy了， 它就起到了这个计数器的作用，它来帮你管理到底这些异步操作是否完成，完成之后，它会自动调用你提供的处理函数，并将抓取到的数据当参数传过来。

```js
var ep = new eventproxy();

// 监听了三个事件，分别是 data1_event, data2_event, data3_event
// 每次当一个源的数据抓取完成时，就通过 ep.emit() 来告诉 ep 自己，某某事件已经完成了。
// 当三个事件未同时完成时，ep.emit() 调用之后不会做任何事；当三个事件都完成的时候，就会调用末尾的那个回调函数，来对它们进行统一处理。
ep.all('data1_event', 'data2_event', 'data3_event', function (data1, data2, data3) {
    var html = fuck(data1, data2, data3);
    render(html);
});

$.get('http://data1_source', function (data) {
    ep.emit('data1_event', data);
});

$.get('http://data2_source', function (data) {
    ep.emit('data2_event', data);
});

$.get('http://data3_source', function (data) {
    ep.emit('data3_event', data);
});

```

eventproxy 提供了不少其他场景所需的 API，但最最常用的用法就是以上的这种，即：

1. 先 var ep = new eventproxy(); 得到一个 eventproxy 实例。
2. 告诉它你要监听哪些事件，并给它一个回调函数。ep.all('event1', 'event2', function (result1, result2) {})。
3. 在适当的时候 ep.emit('event_name', eventData)。

得到了一个长度为 40 的 topicUrls 数组，里面包含了每条主题的链接。接下来要发出 40 个并发请求。

```js
// 得到 topicUrls 之后

// 创建一个 eventproxy 的实例
var ep = new eventproxy();

// 命令 ep 重复监听 topicUrls.length 次（在这里也就是 40 次） `topic_html` 事件再行动
ep.after('topic_html', topicUrls.length, function (topics) {
    // topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair

    topics = topics.map(function (topicPair) {
        var topicUrl = topicPair[0];
        var topicHtml = topicPair[1];
        var $ = cheerio.load(topicHtml);
        return ({
            title: $('.topic_full_title').text().trim(),
            href: topicUrl,
            comment1: $('.reply_content').eq(0).text().trim(),
        });
    });

    console.log('final:');
    console.log(topics);
});

topicUrls.forEach(function (topicUrl) {
    superagent.get(topicUrl)
        .end(function (err, res) {
            console.log('fetch ' + topicUrl + ' successful');
            ep.emit('topic_html', [topicUrl, res.text]);
        });
});
```




## lesson5

### 使用 async 控制并发

在之前的代码中，我们一次性发出了 40 个 并发请求出去，某些网站可能会因为你发的并发连接数太多而当你是在恶意请求，会把你的 IP 封掉，所以我们需要控制一定的数量，比如并发10个，然后慢慢抓完这 40 条数据

这次使用的是  async 的 mapLimit(arr, limit, iterator, callback) 接口

### 并发连接数控制

额外提一点：关于 eventproxy 和 async

当你需要去多个源(一般是小于 10 个)汇总数据的时候，用 eventproxy 方便；当你需要用到队列，需要控制并发数，或者你喜欢函数式编程思维时，使用 async。大部分场景是前者，所以我个人大部分时间是用 eventproxy 的。

首先伪造一个 fetchUrl(url, callback) 函数

```js

fetchUrl('http://www.baidu.com', function (err, content) {
    // do something with `content`
});

```

作用是调用它的时候，它会返回 http://www.baidu.com 的页面内容回来。

当然，我们这里只是测试

```js

// 并发连接数的计数器
var concurrencyCount = 0;

var fetchUrl = function (url, callback) {

    // delay 的值在 2000 以内，是个随机的整数
    var delay = parseInt((Math.random() * 10000000) % 2000, 10);

    concurrencyCount++;

    console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');

    setTimeout(function () {
        concurrencyCount--;
        callback(null, url + ' html content');
    }, delay);

};

// 伪造一组链接

var urls = [];

for (var i = 0; i < 40; i++) {
    urls.push("www.baodu.com_" + i)
}

// 然后我们使用 async.mapLimit 来并发抓取，并获取结果。
async.mapLimit(urls, 5, function (url, callback) {
    fetchUrl(url, callback);
}, function (err, result) {
    console.log("final: ");
    console.log(result);
} )

```

运行以后可以发现，并发链接数是从 1 开始增长的，增长到 5 时，就不再增加。当其中有任务完成时，再继续抓取。并发连接数始终控制在 5 个。



## lesson6

### 学习使用 mocha，should，istanbul

测试框架 mocha : http://mochajs.org/

断言库 should : https://github.com/tj/should.js

测试率覆盖工具 istanbul : https://github.com/gotwarlost/istanbul

简单 Makefile 的编写 : http://blog.csdn.net/haoel/article/details/2886

遇到坑回来再填

相关知识点：

-g 与 非-g 的区别

就是安装位置的区别，g 是 global 的意思。如果不加的话，则安装 mocha 在你的项目目录下面；如果加了，则这个 mocha 是安装在全局的，如果 mocha 有可执行命令的话，那么这个命令也会自动加入到你系统 $PATH 中的某个地方



## lesson7

### 浏览器端测试：mocha，chai，phantomjs

学习使用测试框架 mocha 进行前端测试 : http://mochajs.org/

了解全栈的断言库 chai: http://chaijs.com/

了解 headless 浏览器 phantomjs: http://phantomjs.org/

同上，遇到坑回来再填

相关知识点：

### 前端脚本的单元测试

上一篇的内容都是针对后端环境中 node 的一些单元测试方案，出于应用健壮性的考量，针对前端 js 脚本的单元测试也非常重要。而前后端通吃，也是 mocha 的一大特点。

首先，前端脚本的单元测试主要有两个困难需要解决。

1. 运行环境应当在浏览器中，可以操纵浏览器的DOM对象，且可以随意定义执行时的 html 上下文。

2. 测试结果应当可以直接反馈给 mocha，判断测试是否通过。


### npm i --save 与 npm i --save-dev 的区别

**--save-dev** 是你开发时候依赖的东西，是对开发环境所需依赖的声明(构建工具，测试工具)

**--save** 是你发布之后还依赖的东西，是对生产环境所需依赖的声明(开发应用中使用的框架，库)

比如，你写 ES6 代码，如果你想编译成 ES5 发布那么 babel 就是 devDependencies。
如果你用了 jQuery，由于发布之后还是依赖 jQuery，所以是 dependencies。

正常使用 npm install 时，会下载 dependencies 和 devDependencies 中的模块，当使用 npm install --production 或者注明 NODE_ENV 变量值为 production 时，只会下载 dependencies中的 模块。






## lesson8

### 测试用例：supertest

同上，6、7、8说的都是测试相关的知识，遇到坑回来再填

相关知识点： 

### supertest

supertest 是 superagent 的孪生库。作者是 tj

为什么说 supertest 是 superagent 的孪生库呢，因为他们的 API 是一模一样的。superagent 是用来抓取页面用的，而 supertest，是专门用来配合 express （准确来说是所有兼容 connect 的 web 框架）进行集成测试的。

将使你有一个 app: var app = express();，想对它的 get 啊，post 接口啊之类的进行测试，那么只要把它传给 supertest：var request = require('supertest')(app)。之后调用 requset.get('/path') 时，就可以对 app 的 path 路径进行访问了。它的 API 参照 superagent 的来就好了：http://visionmedia.github.io/superagent/ 。


### 关于 cookie 持久化

有两种思路

1. 在 supertest 中，可以通过 var agent = supertest.agent(app) 获取一个 agent 对象，这个对象的 API 跟直接在 superagent 上调用各种方法是一样的。agent 对象在被多次调用 get 和 post 之后，可以一路把 cookie 都保存下来。

```js

var supertest = require('supertest');
var app = express();
var agent = supertest.agent(app);

agent.post('login').end(...);
// then ..
agent.post('create_topic').end(...); // 此时的 agent 中有用户登陆后的 cookie

```

2. 在发起请求时，调用 .set('Cookie', 'a cookie string') 这样的方式。

```js

var supertest = require('supertest');
var userCookie;

supertest.post('login').end(function (err, res) {
        userCookie = res.headers['set-cookie']
    });
// then ..

supertest.post('create_topic').set('cookie', userCookie).end(...)


```


## lesson9

### 正则表达式 

《正则表达式30分钟入门教程》：http://deerchao.net/tutorials/regex/regex.htm

《正则表达式之：零宽断言不『消费』》：http://fxck.it/post/50558232873

测试你自己写的正则表达式：http://refiddle.com/ 

同上，挖坑，遇到再来填

需要注意的地方:

1. js 中，对于四种零宽断言，只支持 零宽度正预测先行断言 和 零宽度负预测先行断言 这两种。

2. js 中，正则表达式后面可以跟三个 flag，比如 /something/igm。

他们的意义分别是，

* i 的意义是不区分大小写

* g 的意义是，匹配多个

* m 的意义是，是 ^ 和 $ 可以匹配每一行的开头。

```js
/a/.test('A') // => false
/a/i.test('A') // => true

'hello hell hoo'.match(/h.*?\b/) // => [ 'hello', index: 0, input: 'hello hell hoo' ]
'hello hell hoo'.match(/h.*?\b/g) // => [ 'hello', 'hell', 'hoo' ]

'aaa\nbbb\nccc'.match(/^[\s\S]*?$/g) // => [ 'aaa\nbbb\nccc' ]
'aaa\nbbb\nccc'.match(/^[\s\S]*?$/gm) // => [ 'aaa', 'bbb', 'ccc' ]

```

与 m 意义相关的，还有 \A, \Z 和 \z

他们的意义分别是：

* \A  字符串开头(类似^，但不受处理多行选项的影响)
* \Z  字符串结尾或行尾(不受处理多行选项的影响)
* \z  字符串结尾(类似$，但不受处理多行选项的影响)

在 js 中，g flag 会影响 String.prototype.match() 和 RegExp.prototype.exec() 的行为

String.prototype.match() 中，返回数据的格式会不一样，加 g 会返回数组，不加 g 则返回比较详细的信息

```js

> 'hello hell'.match(/h(.*?)\b/g)
[ 'hello', 'hell' ]

> 'hello hell'.match(/h(.*?)\b/)
[ 'hello',
  'ello',
  index: 0,
  input: 'hello hell' ]

```

RegExp.prototype.exec() 中，加 g 之后，如果你的正则不是字面量的正则，而是存储在变量中的话，特么的这个变量就会变得有记忆！！

```js

> /h(.*?)\b/g.exec('hello hell')
[ 'hello',
  'ello',
  index: 0,
  input: 'hello hell' ]
> /h(.*?)\b/g.exec('hello hell')
[ 'hello',
  'ello',
  index: 0,
  input: 'hello hell' ]


> var re = /h(.*?)\b/g;
undefined
> re.exec('hello hell')
[ 'hello',
  'ello',
  index: 0,
  input: 'hello hell' ]
> re.exec('hello hell')
[ 'hell',
  'ell',
  index: 6,
  input: 'hello hell' ]
>

```

3. **.** 是不可以匹配 \n 的。如果我们想匹配的数据涉及到了跨行，比如下面这样的。

```js
var multiline = require('multiline');

var text = multiline.stripIndent(function () {

/*
    head
    ```
    code code2 .code3```
    ```
    foot
*/

});

```

如果我们想把两个 ``` 中包含的内容取出来，应该怎么办？

直接用 . 匹配不到 \n，所以我们需要找到一个原子，能匹配包括 \n 在内的所有字符。

这个原子的惯用写法就是 [\s\S]

```js

var match1 = text.match(/^```[\s\S]+?^```/gm);
console.log(match1) // => [ '```\ncode code2 code3```\n```' ]

// 这里有一种很骚的写法，[^] 与 [\s\S] 等价
var match2 = text.match(/^```[^]+?^```/gm)
console.log(match2) // => [ '```\ncode code2 .code3```\n```' ]

```


## lesson10

### benchmark 测试哪个方法更快

benchmark 库：https://github.com/bestiejs/benchmark.js 

简单测试：

有一个字符串 var number = '100'，我们要将它转换成 Number 类型的 100。

+, parseInt, Number，哪个方法更快

```js

var int1 = function (str) {
  return +str;
};

var int2 = function (str) {
  return parseInt(str, 10);
};

var int3 = function (str) {
  return Number(str);
};

```

然后照着官方的模板写 benchmark suite：

```js
var number = '100';

// 添加测试
suite
.add('+', function() {
  int1(number);
})
.add('parseInt', function() {
  int2(number);
})
.add('Number', function () {
  int3(number);
})
// 每个测试跑完后，输出信息
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// 这里的 async 不是 mocha 测试那个 async 的意思，这个选项与它的时间计算有关，默认勾上就好了。
.run({ 'async': true });

```

直接运行： $ node main.js

可以看到，parseInt 是最快的。


