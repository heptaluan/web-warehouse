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