var OptPool = require("./pool");

var optPool = new OptPool();
var pool = optPool.getPool();

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