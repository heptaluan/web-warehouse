---
title: Sequelize 与 MySQL
date: 2018-03-31
categories: MySQL
tags: MySQL
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/06.jpg
---

`MySQL` 安装过程就略过了，推荐安装 `5.6` 版本，安装见 [Windows 下的 MySQL 安装汇总](https://heptaluan.github.io/2018/03/22/MySQL/03/)

基于 `koa.js`，相关源码可以见 [koa-Sequelize](https://github.com/heptaluan/koa-demo/tree/master/koa-Sequelize)

<!--more-->


## 访问 MySQL

当安装好了 `MySQL` 以后，访问 `MySQL` 数据库只有一种方法，就是通过网络发送 `SQL` 命令，`MySQL` 服务器执行后返回结果

启动和关闭方式如下

* 启动 `MySQL` 服务 `net start mysql`

* 关闭 `MySQL` 服务 `net stop mysql`

* 退出 `MySQL` 命令行 `exit`

可以使用 `mysql -u root -p` 来连接本地数据库（没有指定 `--host` 参数，所以我们连接到的是 `localhost`）

```js
// 注意有个分号
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
+--------------------+
1 row in set (0.00 sec)
```

对于 `Node.js` 程序，访问 `mysql` 也是通过网络发送 `sql` 命令给 `mysql` 服务器（通常称为 `mysql` 驱动程序）


## ORM

在使用 `Node.js` 来处理关系型操作数据库时，为了方便，通常都会选择一个合适的 `ORM`（`Object Relationship Model`）框架，毕竟直接操作 `SQL` 比较繁琐，通过 `ORM` 框架，我们可以使用面向对象的方式来操作表，这里主要介绍 `Sequelize`

更多关于 `Sequelize` 内容可参考 [Sequelize](https://github.com/heptaluan/full-stack/blob/master/Sequelize.MD)

选择 `Sequelize` 的原因：只要 `API` 返回 `promise`，就可以用 `await` 调用

## 用 Sequelize 查询 pets 表

```js
// 因为 Sequelize 返回的对象是 Promise，所以我们可以用 then() 和 catch() 分别异步响应成功和失败
Pet.findAll().then(function (pets) {
  for (let pet in pets) {
    console.log(`${pet.id}: ${pet.name}`)
  }
}).catch(function (err) {
  // err
})
```

可以改用 `ES7` 的 `await()` 来调用

```js
var pets = await Pet.findAll();
```

但是 `await` 有一个限制，必须在 `async` 函数中调用，所以修改为

```js
(async () => {
    var pets = await Pet.findAll()
})();
```


## 实战

我们可以在 `test` 数据库中创建一个 `pets` 表：

```js
grant all privileges on test.* to 'root'@'%' identified by 'root';

use test;

create table pets (
  id varchar(50) not null,
  name varchar(100) not null,
  gender bool not null,
  birth varchar(10) not null,
  createdAt bigint not null,
  updatedAt bigint not null,
  version bigint not null,
  primary key (id)
) engine=innodb;
```

* 第一条 `grant` 命令是创建 `mysql` 的用户名和口令，并赋予操作 `test` 数据库的所有权限

* 第二条 `use` 命令把当前库切换为 `test`

* 创建 `pets` 表

然后新建 `config.js` 用以配置 `mysql`

```js
var config = {
  database: 'test',   // 使用的数据库名
  username: 'root',
  password: 'root', 
  host: 'localhost',  // 主机名
  port: 3306          // mysql 默认 3306
}

module.exports = config;
```


下面就可以在 `app.js` 中操作数据库了，在操作之前需要两件准备工作

第一步，创建一个 `sequelize` 对象实例

```js
const Sequelize = require('sequelize');
const config = require('./config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
});
```

第二步，定义模型 `Pet`，告诉 `Sequelize` 如何映射数据库表

```js
var Pet = sequelize.define("pet", {
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
```

* 使用 `sequelize.define()` 定义 `model` 的时候，传入 `pet`，默认的表名就是 `pets`

* 第二个参数指定列名和数据类型，如果是主键，需要更详细的指定

* 第三个参数是额外配置，我们传入 `{timestamps: false }` 是为了关闭 `Sequelize` 的自动添加 `timestamp` 功能（自动化）


然后添加数据，有两种方式，第一种是使用 `promise`：

```js
var now = Date.now();

Pet.create({
  id: "g-" + now,
  name: "abc",
  gander: false,
  birth: "2002-02-02",
  createdAt: now,
  updatedAt: now,
  version: 0
}).then(function (p) {
  console.log(`created:` + JSON.stringify(p))
}).catch(function (err) {
  console.log(`err: ` + err)
})
```

第二种方式是使用 `await`：

```js
(async () => {
  var dog = await PageTransitionEvent.create({
    id: 'd-' + now,
    name: 'def',
    gender: false,
    birth: '2003-03-03',
    createdAt: now,
    updatedAt: now,
    version: 0
  })
  console.log(`created: ` + JSON.stringify(dog))
})();
```

#### 查询数据

```js
(async () => {
  var pets = await pets.findAll({
    where: {
      name: "abc"
    }
  });
  console.log(`find ${pets.length} pets`);
  for (let p of pets) {
    console.log(JSON.stringify(p));
  }
})()
```

#### 更新数据

```js
(async () => {
  var p = await queryFromSomewhere();
  p.gender = true;
  p.updatedAt = Date.now();
  p.version ++;
  await p.save();
})()
```

#### 删除数据

```js
(async () => {
  var p = await queryFromSomewhere();
  await p.destory();
})()
```

## model

我们把通过 `sequelize.define()` 返回的 `Pet` 称为 `Model`，它表示一个数据模型

通过 `Pet.findAll()` 返回的一个或一组对象称为 `Model` 实例，每个实例都可以直接通过 `JSON.stringify` 序列化为 `JSON` 字符串，只是多了一些由 `Sequelize` 添加的方法，比如 `save()`（更新） 和 `destory()`（删除）

步骤总结如下

* 通过某个 `model` 对象的 `findAll()` 方法获取实例

* 如果要更新实例，先对实例属性赋予新值，在调用 `save()` 方法

* 如果要删除实例，直接调用 `destory()` 方法

需要注意的是：`findAll()` 方法可以接收 `where`，`order`这些参数，这和将要生成的 `SQL` 语句是对应的
