记录一些 node 操作 mysql 的相关知识

----

----

使用 ```node``` 来操作 ```mysql``` 一般有两种方式，一种是直接连接，还一种就是使用连接池

我们先来看看直接连接

## 直接连接 mysql

首先先创建一个数据库，然后建立一张表，用于后面 ```node``` 来使用：

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

然后就可以来写我们的 ```node``` 程序了，新建一个 ```app.js```：

```js
// 首先调用 mysql 模块
var mysql = require("mysql");

// 创建一个 connection 对象
var connection = mysql.createConnection({
    host: "localhost",      // 主机
    user: "root",           // mysql 用户名
    password: "root",       // mysql 密码
    database: "nodemysql",  // 使用哪个数据库
    port: "3306"            // 端口号，mysql 默认为 3306
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

连接成功以后就可以来执行相关的 ```mysql``` 操作了：

```js
// 插入数据
var userAddSql = "insert into user(uname, pwd) values(?, ?)";
var param = ["张三", "pwd1"];

connection.query(userAddSql, param, function (err, res) {
    if (err) {
        console.log(`insert err, ${err.message}`);
        return;
    }
    console.log(`insert success!`)
})

// 执行查询
connection.query("select * from user", function (err, res) {
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

需要注意一点：如果在执行查询的时候如果有限定条件（```where``` 一类）的话，需要这样来写：

```js
connertion.query("select * from user where uid = ?", [1], function (err, res) {
    // ... 
})
```

如果以上操作都成功的话，就可以在数据库中看到我们插入的数据了：

```js
+-----+-------+------+
| uid | uname | pwd  |
+-----+-------+------+
|   1 | 张三  | pwd1 |
+-----+-------+------+
```

以上就是直接连接 ```mysql``` 的方法了，这种直接连接的方式一般使用的较少，用的最多的就是连接池方式

使用连接池连接的话比直连要效率很多，下面来看看具体怎么实现



## 连接池连接 mysql

首先需要安装 ```mysql``` 支持，然后需要安装 ```mysqlpool``` 模块

```js
// 安装 mysql 支持
$ npm install mysql --save

// 安装 mysqlpool 模块
$ npm install node-mysql --save
```

连接后执行插入，查询等操作

```js
// 从连接池中获取一个连接
pool.getConnection(function (err, conn) {

    // 插入
    var userAddSql = "insert into user(uname, pwd) values(?, ?)";
    var param = ["李四", "pwd2"];
    conn.query(userAddSql, param, function (err, res) {
        if (err) {
            console.log(`insert err ${err.message}`)
            return;
        }
        console.log(`insert success!`)
        // conn.release();  // 放回连接池
    })

    // 查询
    conn.query("select * from user", function (err, res) {
        if (err) {
            console.log(`query ${err}`)
            return;
        }
        console.log(res[1].uname);
        conn.release();  // 放回连接池
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

需要注意一点：在上述操作的最后一步有一个**放回连接池**的操作

如果之前已经调用过，即在插入操作中调用过，然后在查询的过程中又再一次的调用，那么就会直接报错

这是因为连接已经被放回连接池了，不能在操作了，为了确保不报错，在拿到连接池之后（```pool.getConnection```），直到最后一步操作的时候再使用 ```conn.release();``` 来放回连接池