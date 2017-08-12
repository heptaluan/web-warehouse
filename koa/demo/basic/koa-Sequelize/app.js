const Sequelize = require("sequelize");
const config = require("./config");

console.log("init sequelize...");

// 创建一个 sequelize 对象实例
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

// 定义模型 Pet，告诉 Sequelize 如何映射数据库表
var Pet = sequelize.define("pets", {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
        timestamps: false
    });


// 添加数据
var now = Date.now();

// Promise 的方式
Pet.create({
    id: "a-" + now,
    name: "abc",
    gender: false,
    birth: "2022-02-02",
    createdAt: now,
    updatedAt: now,
    version: 0
}).then(function (p) {
    console.log("created." + JSON.stringify(p));
}).catch(function (err) {
    console.log("failed: " + err);
});

// await 方式
(async () => {
    var dog = await Pet.create({
        id: "b-" + now,
        name: "def",
        gender: false,
        birth: "2033-03-03",
        createdAt: now,
        updatedAt: now,
        version: 0
    });
    console.log("created: " + JSON.stringify(dog));
})();

// 更新 save()
(async () => {
    var pets = await Pet.findAll({
        where: {
            name: "abc"
        }
    });
    for (let p of pets) {
        console.log(JSON.stringify(p));
        console.log("update pet...");
        p.gender = true;
        p.updatedAt = Date.now();
        p.version++;
        await p.save();
        if (p.version === 3) {
            await p.destroy();
        }
    }
})();
