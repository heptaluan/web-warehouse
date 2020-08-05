---
title: 使用 Python 操作 MySQL
date: 2018-03-29
categories: MySQL
tags: MySQL
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/05.jpg
---

这里默认数据库帐号为 `root`，密码为空，使用的数据库为 `testdb`

<!--more-->



## 新建数据库表

首先创建一个名为 `testdb` 的数据库，用于后续操作

```python
mysql> create database testdb;

mysql> show databases;

+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| test               |
| testdb             |
+--------------------+
```

然后我们就可以使用 `python` 来操作这个数据库了

```python
import pymysql

# 打开数据库连接，使用 cursor() 方法来得到一个游标对象
db = pymysql.connect('localhost', 'root', '', 'testdb')
cursor = db.cursor()

# 定义需要执行的 sql 语句
sql = '''
create table users(
  first_name char(20) not null,
  last_name char(20),
  age int,
  sex char(1),
  income float
)
'''

# 使用 execute() 方法执行 SQL
cursor.execute(sql)

# 关闭数据库连接
db.close()
```



执行完该操作以后，我们就可以再次查看数据库来得到相应结果



```python
mysql> use testdb;

mysql> show tables;

+------------------+
| Tables_in_testdb |
+------------------+
| users            |
+------------------+

mysql> desc users;

+------------+----------+------+-----+---------+-------+
| Field      | Type     | Null | Key | Default | Extra |
+------------+----------+------+-----+---------+-------+
| first_name | char(20) | NO   |     | NULL    |       |
| last_name  | char(20) | YES  |     | NULL    |       |
| age        | int(11)  | YES  |     | NULL    |       |
| sex        | char(1)  | YES  |     | NULL    |       |
| income     | float    | YES  |     | NULL    |       |
+------------+----------+------+-----+---------+-------+
```







## 插入数据

使用 `python` 来执行数据插入操作

```python
import pymysql

# 打开数据库连接，使用 cursor() 方法来得到一个游标对象
db = pymysql.connect('localhost', 'root', '', 'testdb')
cursor = db.cursor()

# 定义需要执行的 sql 语句
sql = '''
insert into users values('AAA', 'aaaaa', '22', 'M', 2000)
'''

try:
  # 执行 SQL 语句
  cursor.execute(sql)
  # 提交到数据库执行
  db.commit()
except:
  # 如果发生错误，则执行回滚操作
  db.rollback()

# 关闭数据库连接
db.close()
```

执行完成以后可以进入到数据库中来进行查看

```python
mysql> select * from users;

+------------+-----------+------+------+--------+
| first_name | last_name | age  | sex  | income |
+------------+-----------+------+------+--------+
| AAA        | aaaaa     |   22 | M    |   2000 |
+------------+-----------+------+------+--------+
```

然后我们使用同样的方式多插入几条数据，以便用于后面的查询操作，最后结果如下

```python
+------------+-----------+------+------+--------+
| first_name | last_name | age  | sex  | income |
+------------+-----------+------+------+--------+
| AAA        | aaaaa     |   22 | M    |   2000 |
| AAA        | aaaaa     |   21 | M    |   2200 |
| BBB        | bbbbb     |   26 | M    |   4000 |
| CCC        | ccccc     |   28 | M    |   6000 |
+------------+-----------+------+------+--------+
```







## 数据库查询操作

`python` 查询数据库主要会用到两个方法，使用 `fetchone()` 方法来获取单条数据, 使用 `fetchall()` 方法获取多条数据

* `fetchone()`: 该方法获取下一个查询结果集，结果集是一个对象

* `fetchall()`: 接收全部的返回结果行

* `rowcount`: 这是一个只读属性，并返回执行 `execute()` 方法后影响的行数



比如我们来查询收入大于等于 `2200` 的所有数据

```python
import pymysql

# 打开数据库连接，使用 cursor() 方法来得到一个游标对象
db = pymysql.connect('localhost', 'root', '', 'testdb')
cursor = db.cursor()

# 定义需要执行的 sql 语句
sql = '''
select * from users where income >= 2200
'''

try:
  # 执行 SQL 语句
  cursor.execute(sql)
  
  # 获取所有的记录列表
  results = cursor.fetchall()

  # 循环打印
  for row in results:
    print("fname=%s,lname=%s,age=%d,sex=%s,income=%d" % (row[0], row[1], row[2], row[3], row[4] ))
except:
  # 如果发生错误，则抛出一个错误
  print ("Error: unable to fetch data")

# 关闭数据库连接
db.close()
```

执行以后可以看到控制台输出

```python
fname=AAA,lname=aaaaa,age=21,sex=M,income=2200
fname=BBB,lname=bbbbb,age=26,sex=M,income=4000
fname=CCC,lname=ccccc,age=28,sex=M,income=6000
```






## 数据库更新操作

更新操作用于更新数据表的的数据，以下实例将 `TESTDB` 表中 收入大于等于 `2200` 数据的 `AGE` 字段递增 `1`

```python
import pymysql

# 打开数据库连接，使用 cursor() 方法来得到一个游标对象
db = pymysql.connect('localhost', 'root', '', 'testdb')
cursor = db.cursor()

# 定义需要执行的 sql 语句
sql = '''
update users set age = age + 1 where income >= 2200
'''

try:
  # 执行 SQL 语句
  cursor.execute(sql)
  # 提交到数据可
  db.commit()
except:
  # 否则执行回滚操作
  db.rollback()

# 关闭数据库连接
db.close()
```

查询后可以看到结果

```python
mysql> select * from users;

+------------+-----------+------+------+--------+
| first_name | last_name | age  | sex  | income |
+------------+-----------+------+------+--------+
| AAA        | aaaaa     |   22 | M    |   2000 |
| AAA        | aaaaa     |   22 | M    |   2200 |
| BBB        | bbbbb     |   27 | M    |   4000 |
| CCC        | ccccc     |   29 | M    |   6000 |
+------------+-----------+------+------+--------+
```








## 数据库删除操作

删除操作用于删除数据表中的数据，以下实例将删除 `TESTDB` 表中 收入小于 `2200` 的记录

```python
import pymysql

# 打开数据库连接，使用 cursor() 方法来得到一个游标对象
db = pymysql.connect('localhost', 'root', '', 'testdb')
cursor = db.cursor()

# 定义需要执行的 sql 语句
sql = "delete from users where income < '%d'" % (2200)

try:
  # 执行 SQL 语句
  cursor.execute(sql)
  # 提交到数据可
  db.commit()
except:
  # 否则执行回滚操作
  db.rollback()

# 关闭数据库连接
db.close()
```

查询后可以看到结果

```python
mysql> select * from users;

+------------+-----------+------+------+--------+
| first_name | last_name | age  | sex  | income |
+------------+-----------+------+------+--------+
| AAA        | aaaaa     |   22 | M    |   2200 |
| BBB        | bbbbb     |   27 | M    |   4000 |
| CCC        | ccccc     |   29 | M    |   6000 |
+------------+-----------+------+------+--------+
```






## 执行事务

事务机制可以确保数据一致性，事务应该具有四个属性：原子性、一致性、隔离性、持久性（通常称为 `ACID` 特性）

* 原子性（`atomicity`）：一个事务是一个不可分割的工作单位，事务中包括的诸操作要么都做，要么都不做

* 一致性（`consistency`）：事务必须是使数据库从一个一致性状态变到另一个一致性状态，一致性与原子性是密切相关的

* 隔离性（`isolation`）：一个事务的执行不能被其他事务干扰，即一个事务内部的操作及使用的数据对并发的其他事务是隔离的，并发执行的各个事务之间不能互相干扰

* 持久性（`durability`）：持续性也称永久性（`permanence`），指一个事务一旦提交，它对数据库中数据的改变就应该是永久性的，接下来的其他操作或故障不应该对其有任何影响

`Python DB API` 的事务提供了两个方法 `commit` 和 `rollback`

```python
# ...
try:
   # 执行SQL语句
   cursor.execute(sql)
   # 向数据库提交
   db.commit()
except:
   # 发生错误时回滚
   db.rollback()
```

对于支持事务的数据库，在 `Python` 数据库编程中，当游标建立之时，就自动开始了一个隐形的数据库事务

`commit()` 方法游标的所有更新操作，`rollback()` 方法回滚当前游标的所有操作，每一个方法都开始了一个新的事务






## 错误处理

`DB API` 中定义了一些数据库操作的错误及异常

|异常|描述|
|-|-|
|`Warning`|当有严重警告时触发，例如插入数据是被截断等等，必须是 `StandardError` 的子类|
|`Error`|警告以外所有其他错误类，必须是 `StandardError` 的子类|
|`InterfaceError`|当有数据库接口模块本身的错误（而不是数据库的错误）发生时触发， 必须是 `Error` 的子类|
|`DatabaseError`|和数据库有关的错误发生时触发， 必须是 `Error` 的子类|
|`DataError`|当有数据处理时的错误发生时触发，例如：除零错误，数据超范围等等， 必须是 `DatabaseError` 的子类|
|`OperationalError`|指非用户控制的，而是操作数据库时发生的错误，例如：连接意外断开、 数据库名未找到、事务处理失败、内存分配错误等等操作数据库是发生的错误， 必须是 `DatabaseError` 的子类|
|`IntegrityError`|完整性相关的错误，例如外键检查失败等，必须是 `DatabaseError` 子类|
|`InternalError`|数据库的内部错误，例如游标（`cursor`）失效了、事务同步失败等等， 必须是 `DatabaseError` 子类|
|`ProgrammingError`|程序错误，例如数据表（`table`）没找到或已存在、`SQL` 语句语法错误、 参数数量错误等等，必须是 `DatabaseError` 的子类|
|`NotSupportedError`|不支持错误，指使用了数据库不支持的函数或 `API` 等，例如在连接对象上 使用 `rollback()` 函数，然而数据库并不支持事务或者事务已关闭，必须是 `DatabaseError` 的子类|

