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

// <=== 实际上等价于 ===> (在 mysql 4.01 以下不支持多国语言)

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

