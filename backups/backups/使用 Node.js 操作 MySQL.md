---
title: 使用 Node.js 操作 MySQL
date: 2018-09-05
categories: Node.js
tags: Node.js
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/05.jpg
---

首先需要安装 `Node.js` 的 `mysql` 模块

```js
$ npm install --save mysql
```

`mysql` 模块是 `Node.js` 操作 `mysql` 的引擎，可以在 `Node.js` 环境下对 `mysql` 数据库进行建表，增、删、改、查等操作

<!--more-->

使用 `Node.js` 来操作 `mysql` 一般有两种方式，一种是直接连接，还一种就是使用连接池

我们先来看看直接连接

## 直接连接 mysql

首先先创建一个数据库，然后建立一张表，方便我们后面使用 `Node.js` 来进行操作

```js
create table user(
  uid int not null primary key auto_increment,
  uname varchar(100) not null,
  pwd varchar(100) not null
)engine=myisam default charset=utf8;

// 结果如下 ===>

+---------------------+
| Tables_in_nodemysql |
+---------------------+
| user                |
+---------------------+

+-------+--------------+------+-----+---------+----------------+
| Field | Type         | Null | Key | Default | Extra          |
+-------+--------------+------+-----+---------+----------------+
| uid   | int(11)      | NO   | PRI | NULL    | auto_increment |
| uname | varchar(100) | NO   |     | NULL    |                |
| pwd   | varchar(100) | NO   |     | NULL    |                |
+-------+--------------+------+-----+---------+----------------+
```

然后就可以来写我们的 `Node.js` 程序了，新建一个 `app.js`：

```js
// 首先调用 mysql 模块
var mysql = require('mysql');

// 创建一个 connection 对象
var connection = mysql.createConnection({
  host: 'localhost',      // 主机
  user: 'root',           // mysql 用户名
  password: 'root',       // mysql 密码
  database: 'nodemysql',  // 使用哪个数据库
  port: '3306'            // 端口号，mysql 默认为 3306
});

// 创建一个连接
connection.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`connection connect success!`)
})
```

连接成功以后就可以来执行相关的 `mysql` 操作了

```js
// 插入数据
var userAddSql = 'insert into user(uname, pwd) values(?, ?)';
var param = ['张三', 'pwd1'];

connection.query(userAddSql, param, function (err, res) {
  if (err) {
    console.log(`insert err, ${err.message}`);
    return;
  }
  console.log(`insert success!`)
})

// 执行查询
connection.query('select * from user', function (err, res) {
  if (err) {
    console.log(err)
    return;
  }
  console.log(`the solution is ${res[0].uname}`)
})

// 关闭连接
connection.end(function (err) {
  if (err) {
    console.log(err.toString());
    return;
  }
  console.log(`end success!`)
})
```

需要注意一点：如果在执行查询的时候如果有限定条件（`where` 一类）的话，需要这样来写

```js
connertion.query('select * from user where uid = ?', [1], function (err, res) {
  // ... 
})
```

如果以上操作都成功的话，就可以在数据库中看到我们插入的数据了

```js
+-----+-------+------+
| uid | uname | pwd  |
+-----+-------+------+
|   1 | 张三  | pwd1 |
+-----+-------+------+
```

以上就是直接连接 `mysql` 的方法了，在使用这种方式的时候，有一个地方需要注意

> 一个事件就有一个从开始到结束的过程，数据库会话操作执行完后，就需要关闭掉，以免占用连接资源

不过一般情况下，这种使用直接连接的方式比较少见，用的最多的就是连接池的方式，使用连接池连接的话比直连要效率很多，下面来看看具体怎么实现


## 连接池连接 mysql

操作数据库是很复杂的读写过程，不只是一个会话，如果直接用会话操作，就需要每次会话都要配置连接参数，所以这时候就需要连接池管理会话

首先需要安装 `mysql` 支持，然后需要安装 `mysqlpool` 模块

```js
// 安装 mysql 支持
$ npm install mysql --save

// 安装 mysqlpool 模块
$ npm install node-mysql --save
```

我们可以新建一个 `pool.js` 把我们连接数据库的操作独立成一个单独的模块

```js
// 调用 mysql 模块
var mysql = require('mysql');

function OptPoll() {

  // 建立一个变量，用于检测是否连接过
  this.flag = true;

  this.pool = mysql.createPool({
    host: 'localhost',      // 主机
    user: 'root',           // mysql 用户名
    password: 'root',       // mysql 密码
    database: 'nodemysql',  // 使用哪个数据库
    port: '3306'            // 端口号，mysql 默认为 3306
  })

  this.getPool = function () {
    if (this.flag) {
      // 监听 connection 事件
      this.pool.on('connention', function (connection) {
        connection.query('set session auto_increment_increment = 1');
        this.flag = false;
      })
    }
    return this.pool;
  }
}

module.exports = OptPoll;
```

然后新建一个 `app.js` 导入之前的 `pool`，然后来执行插入，查询等操作

```js
var OptPool = require('./pool');

var optPool = new OptPool();
var pool = optPool.getPool();

// 从连接池中获取一个连接
pool.getConnection(function (err, conn) {

  // 插入
  var userAddSql = 'insert into user(uname, pwd) values(?, ?)';
  var param = ['李四', 'pwd2'];
  conn.query(userAddSql, param, function (err, res) {
    if (err) {
      console.log(`insert err ${err.message}`)
      return;
    }
    console.log(`insert success!`)
    // 如果在这里就放回连接池，后续在执行此操作会报错，原因见最下方
    // conn.release();
  })

  // 查询
  conn.query('select * from user', function (err, res) {
    if (err) {
      console.log(`query ${err}`)
      return;
    }
    console.log(res[1].uname);
    // 最后一步操作在放回连接池
    conn.release();
  })
})
```

操作成功后可以在数据库中看到：

```js
+-----+-------+------+
| uid | uname | pwd  |
+-----+-------+------+
|   1 | 张三  | pwd1 |
|   2 | 李四  | pwd2 |
+-----+-------+------+
```

需要注意一点：在上述操作的最后一步有一个放回连接池的操作

如果之前已经调用过，即在插入操作中调用过，然后在查询的过程中又再一次的调用，那么就会直接报错

这是因为连接已经被放回连接池了，不能在操作了，为了确保不报错，在拿到连接池之后（`pool.getConnection`），直到最后一步操作的时候再使用 `conn.release()` 来放回连接池






## async/await 封装

由于 `mysql` 模块的操作都是异步操作，每次操作的结果都是在回调函数中执行，现在有了 `async/await`，就可以用同步的写法去操作数据库，如下

```js
const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'my-database',
  port: '3306'
});

let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = { query }
```

使用也很简单，如下

```js
const { query } = require('./query')

async function selectAllData() {
  let sql = 'SELECT * FROM my-table'
  let dataList = await query(sql)
  return dataList
}

async function getData() {
  let dataList = await selectAllData()
  console.log(dataList)
}

getData()
```
