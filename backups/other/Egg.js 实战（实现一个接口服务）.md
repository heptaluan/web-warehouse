---
title: Egg.js 实战（实现一个接口服务）
date: 2019-11-01
categories: Node.js
tags: Node.js
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/18.jpg
---

之前我们已经了解过 `koa.js` 相关知识，今天我们来看看如何使用 `egg.js` 来实现一个接口服务

`egg.js` 是一个基于 `koa.js` 的框架，所以它应当属于框架之上的框架，它继承了 `koa.js` 的高性能优点，同时又加入了一些**约束与开发规范**，来规避 `koa.js` 框架本身的开发自由度太高的问题

<!--more-->

`koa.js` 是一个比较基层的框架，它本身没有太多约束与规范，自由度非常高，每一个开发者实现自己的服务的时候，代码风格都可以能不太一样

而 `egg.js` 为了适应企业开发，加了一些开发时的规范与约束，从而解决 `koa.js` 这种自由度过高而导致不适合企业内使用的缺点，`egg.js` 便在这种背景下诞生

关于 `egg.js` 更多的特性，这里我们只做简单介绍，更多的可以参考官网 [egg.js](https://eggjs.org/zh-cn/)



## 需求

需求比较简单，只需要实现一个接口服务即可

简单来说就是实现一个连接数据库，查询数据库里的数据并且提供一个 `http` 接口服务

下面我们来看看如何实现


## 实现

首先安装 `egg.js`，根据官方文档提供的方法即可

```js
$ npm init egg --type=simple

$ npm i

$ npm run dev
```

> 但是这里有一个需要注意的地方，如果想要使用 `npm init egg` 命令，`npm` 的版本需要 `>= 6.1.0`

启动成功以后，我们先来建立一张表，用于我们的后续操作，使用的 `SQL` 如下

```js
CREATE TABLE `Tab_User_Info` (
  id  INT(100) AUTO_INCREMENT PRIMARY KEY,
  name  VARCHAR(50)   NOT NULL COMMENT '姓名',
  uid   VARCHAR(50)    NOT NULL,
  sex tinyint(2) DEFAULT 1 COMMENT '1男2女',
  age tinyint(2) DEFAULT 1,
  description VARCHAR(50)  DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT = 'test user';

INSERT INTO Tab_User_Info (`name`, uid, sex, age, description) VALUES
  ( 'zhangsan', 'uid123', 1, 24, 'this is boy' ),
  ( 'lisi', 'uid124', 2, 24, 'this is girl' ),
  ( 'wangwu', 'uid125', 1, 26, 'this is test user' ),
  ( 'zhaoliu', 'uid126', 2, 44, 'this is test user5' ),
  ( 'test01', 'uid127', 2, 64, 'this is test user4' ),
  ( 'test02', 'uid128', 1, 14, 'this is test user2' ),
  ( 'test03', 'uid129', 2, 4, 'this is test user9' );
```

完成后结果如下

```js
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| test               |
+--------------------+
2 rows in set (0.00 sec)

mysql> use test;
Database changed

mysql> show tables;
+----------------+
| Tables_in_test |
+----------------+
| tab_user_info  |
+----------------+
1 row in set (0.00 sec)

mysql> select * from tab_user_info;
+----+----------+--------+------+------+--------------------+---------------------+---------------------+
| id | name     | uid    | sex  | age  | description        | createdAt           | updatedAt           |
+----+----------+--------+------+------+--------------------+---------------------+---------------------+
|  1 | zhangsan | uid123 |    1 |   24 | this is boy        | 2019-11-12 17:51:38 | 2019-11-12 17:51:38 |
|  2 | lisi     | uid124 |    2 |   24 | this is girl       | 2019-11-12 17:51:38 | 2019-11-12 17:51:38 |
|  3 | wangwu   | uid125 |    1 |   26 | this is test user  | 2019-11-12 17:51:38 | 2019-11-12 17:51:38 |
|  4 | zhaoliu  | uid126 |    2 |   44 | this is test user5 | 2019-11-12 17:51:38 | 2019-11-12 17:51:38 |
|  5 | test01   | uid127 |    2 |   64 | this is test user4 | 2019-11-12 17:51:38 | 2019-11-12 17:51:38 |
|  6 | test02   | uid128 |    1 |   14 | this is test user2 | 2019-11-12 17:51:38 | 2019-11-12 17:51:38 |
|  7 | test03   | uid129 |    2 |    4 | this is test user9 | 2019-11-12 17:51:38 | 2019-11-12 17:51:38 |
+----+----------+--------+------+------+--------------------+---------------------+---------------------+
7 rows in set (0.00 sec)
```



## 连接数据库

首先安装 `mysql` 插件 `egg-mysql`

```js
$ npm install egg-mysql --save
```

接下来修改目录下的配置文件，开启 `mysql` 插件，更多的配置参数可以参考官方文档 [egg-mysql](https://github.com/eggjs/egg-mysql#configuration)

```js
// app/config/plugin.js
module.exports = {
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
};


// app/config/config.default.js
const mysql = {
  // 单数据库信息配置
  client: {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'test',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};

return {
  mysql
};
```


## 路由

然后再来实现路由

```js
// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/user/list', controller.user.list);
  router.get('/user/find', controller.user.find);
};
```



## 服务

然后我们来添加两个服务，一个 `searchAll()` 方法和一个 `find(id)` 方法

```js
// app/service/user.js
'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async searchAll() {
    const users = await this.app.mysql.select('tab_user_info');
    return { users };
  }

  async find(id) {
    const user = await this.app.mysql.get('tab_user_info', { id });
    return { user };
  }
}

module.exports = UserService;
```



## 控制器

我们之前设定了两个服务，现在就建立一个对应的控制器来进行使用

```js
// app/controller/user.js
'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async list() {
    const { ctx } = this;
    try {
      const userList = await ctx.service.user.searchAll();
      ctx.body = {
        success: true,
        data: userList,
      };
    } catch (error) {
      ctx.body = {
        success: false,
        error,
      };
    }
  }

  async find() {
    const { ctx } = this;
    try {
      if (!ctx.query.id) throw new Error('缺少参数');
      const userList = await ctx.service.user.find(ctx.query.id);
      ctx.body = {
        success: true,
        data: userList,
      };
    } catch (error) {
      ctx.body = {
        success: false,
        error,
      };
    }
  }
}

module.exports = UserController;
```


## 验证

下面我们就可以在浏览器当中访问 `http://127.0.0.1:7001/user/list` 来访问我们的接口

就可以发现已经将数据库当中所有的列表信息展示了出来，如果想针对单独的 `id` 进行查询，只需要访问 `find` 接口，然后传递参数即可，例如 `http://127.0.0.1:7001/user/find?id=7`

逻辑很简单，当路由匹配到我们对应访问的地址的时候（`/user/list`）就回去调用我们对应的控制器（`controller.user.list`）

然后在控制器当中又回去访问我们之前定义的服务来进行数据库的数据查询