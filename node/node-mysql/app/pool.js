// 调用 mysql 模块
var mysql = require("mysql");

function OptPoll () {

    // 建立一个变量，用于检测是否连接过
    this.flag = true;

    this.pool = mysql.createPool({
        host: "localhost",      // 主机
        user: "root",           // mysql 用户名
        password: "root",       // mysql 密码
        database: "nodemysql",  // 使用哪个数据库
        port: "3306"            // 端口号，mysql 默认为 3306
    })

    this.getPool = function () {
        if (this.flag) {
            // 监听 connection 事件
            this.pool.on("connention", function (connection) {
                connection.query("set session auto_increment_increment = 1");
                this.flag = false;
            })
        }
        return this.pool;
    }
}

module.exports = OptPoll;
