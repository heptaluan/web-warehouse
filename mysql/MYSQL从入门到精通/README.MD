## 数据类型

只罗列一些比较常见的

#### 整型

* ```tinynt```

* ```mediumint```

* ```smalliny```

* ```shortint```

* ```int```

* ```integer```

#### 精度类型，可以保留小数

* ```dacimal(m, n)```

#### 日期类型

* ```date```

#### 日期时间类型

* ```datetime```

#### 固定字符串

* ```char(n)```

#### 变长字符串

* ```text```

#### 变长的文本类型

* ```text```

#### 大的文本类型，0 ~ 4G

* ```longtext```

#### 枚举类型（enum("男", "女", "保密")）

* ```enum```


----

#### 查看建立数据库命令的代码

```js
show create database yy;

// ===> 会返回

create database `yy` /*!40100 default character set utf8 */

// <=== 实际上等价于 ===> (/**/ 的意思为在 mysql 4.01 以下不支持多国语言)

create database `yy` default character set utf8;
```

----

## 库的操作

#### 查看所有数据库（查）

```js
show databases;
```


#### 创建数据库（增）

```js
// 常规方式
create databse yy;

// 使用 `` 避免库名
create database `database`;

// 判断数据库 yy 是否存在，如果不存在才创建此数据库，并且设定新数据库的字符集编码为 utf8 格式
create database if not exists yy default character set utf8;
```

#### 删除数据库（删）

```js
drop database yy;

drop database if exists yy;

drop database if exists `yy`;
```


#### 修改数据库（改）

```js
// 设定数据库的默认字符集
alter database yy default character set utf8;
```


## 表的操作

#### 建立表

```js
create table if not exists y1(
    yid int unsigned not null auto_increment,
    yname varchar(30) not null,
    primary key(yid)
)engine = myisam auto_increment = 100 default charset utf8;

```

```if not exists```

* 如果不存在再去创建

```unsigned```

* ```int``` 分为无符号 ```unsigned``` 和有符号 ```signed``` 两种类型，默认为 ```signed```

* 二者的区别就是无符号类型能保存 ```2``` 倍于有符号类型的数据

```not null```

* 表示不为空

```auto_increment```

* 自增加，比如 ```id``` 添加数据后自动变为 ```1234..```


```engine```

* ```engine``` 表示存储引擎，一般分为 ```myisam```，```innodb``` 等，新型数据库一般默认为 ```innodb```，但是我们大部分时候都采用 ```myisam```（若是不涉及事务的话，选用这个速度较快），```innodb``` 一般用于事务（比如票务查询，银行业务转账）

#### 删除表

同库的操作类似

```js
drop table y1;

drop table if exists y1;

// 删除多个表
drop table y1, y2, y3;
```

#### 修改表名（一般用的较少）

```js
rename table y1 to y2;

// <===等价于===>

alter table y2 rename y1;
```

#### 修改表的类型及字段名

```js
// 先查看一下表结构
desc y1;

// ===>

+-------+------------------+------+-----+---------+----------------+
| Field | Type             | Null | Key | Default | Extra          |
+-------+------------------+------+-----+---------+----------------+
| yid   | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| yname | varchar(30)      | NO   |     | NULL    |                |
+-------+------------------+------+-----+---------+----------------+

// 然后来做修改
alter table y1 change yid userid int;

alter table y1 change yname username varchar(30) not null;

// ===>

+----------+-------------+------+-----+---------+-------+
| Field    | Type        | Null | Key | Default | Extra |
+----------+-------------+------+-----+---------+-------+
| userid   | int(11)     | NO   | PRI | 0       |       |
| username | varchar(30) | NO   |     | NULL    |       |
+----------+-------------+------+-----+---------+-------+
```

#### 新增一个字段

```js
// 新增的时候可以指定插入的位置，只需要使用 after 关键字
alter table y1 add usertel tinyint;

alter table y1 add useraddress varchar(50) after username;

// ===>

+-------------+-------------+------+-----+---------+-------+
| Field       | Type        | Null | Key | Default | Extra |
+-------------+-------------+------+-----+---------+-------+
| userid      | int(11)     | NO   | PRI | 0       |       |
| username    | varchar(30) | NO   |     | NULL    |       |
| useraddress | varchar(50) | YES  |     | NULL    |       |
| usertel     | tinyint(4)  | YES  |     | NULL    |       |
+-------------+-------------+------+-----+---------+-------+
```

#### 删除一个字段

```js
alter table y1 drop column usertel;

// ===>

+-------------+-------------+------+-----+---------+-------+
| Field       | Type        | Null | Key | Default | Extra |
+-------------+-------------+------+-----+---------+-------+
| userid      | int(11)     | NO   | PRI | 0       |       |
| username    | varchar(30) | NO   |     | NULL    |       |
| useraddress | varchar(50) | YES  |     | NULL    |       |
+-------------+-------------+------+-----+---------+-------+
```