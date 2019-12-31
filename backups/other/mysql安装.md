---
title: Windows 下的 MySQL 安装汇总
date: 2018-03-22
categories: MySQL
tags: MySQL
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/03.jpg
---

这里以 `MySQL 5.6` 版本为基准

<!--more-->

## 下载

首先进入 [MySQL](https://www.mysql.com/) 官网进行下载，根据下图地址依次进入即可

![](https://gitee.com/heptaluan/backups/raw/master/cdn/mysql/01.png)


点进去以后可以发现右边有一个 `MySQL Community Server 5.6 »` 的版本，点击进去选择对应的机器和相应版本

![](https://gitee.com/heptaluan/backups/raw/master/cdn/mysql/02.png)

不需要进行登录，直接点击 `No thanks, just start my download.` 下载即可

![](https://gitee.com/heptaluan/backups/raw/master/cdn/mysql/03.png)

下载完成之后进行解压，这里解压到 `E` 盘，目录文件如下所示

![](https://gitee.com/heptaluan/backups/raw/master/cdn/mysql/04.png)




## 配置

不要急着使用，先来进行配置，依次打开 `计算机 ==> 系统属性 ==> 高级系统配置 ==> 环境变量`

然后选中 `Path` 目录，点击编辑，在末尾处**追加** `E:\mysql\bin;` 即可，注意别漏了 `;` 

这里安装的路径为 `E` 盘下的 `mysql`，可以根据自己实际的位置进行调整

![](https://gitee.com/heptaluan/backups/raw/master/cdn/mysql/05.png)





## 修改配置文件

配置完环境变量之后先不要启动 `mysql`，还需要修改一下配置文件

默认的配置文件是在 `E:\mysql\my-default.ini`，可以自己再建立一个 `my.ini` 文件，拷贝 `my-default.ini` 当中的内容，然后照下图所示进行修改

![](https://gitee.com/heptaluan/backups/raw/master/cdn/mysql/06.png)





## 安装

接下来就可以进行安装了，以管理员身份运行 `cmd`，然后进入 `E:\mysql\bin` 目录，执行

```js
mysqld --install
```

进行安装，若无报错，则会提示安装成功，控制台会显示 `Service successfully installed.` 表示安装成功

如果遇到 `Can't connect to MySQL server on localhost` 错误，则是因为没有以管理员身份运行，重新尝试一下即可

<blockquote>

需要注意：若之前安装过 `mysql`，但由于某种原因未卸载干净，当再次安装 `mysql` 时，会提示此服务已存在

这是可以使用 `sc delete mysql` 命令，删除之前的版本，再执行 `mysqld –install` 命令即可

</blockquote>




## 启动以及登录

使用 `net start mysql` 命令启动 `mysql` 服务，然后使用 `mysql –u root –p` 进行登录即可

需要注意，第一次登录的时候没有密码，直接回车即可

![](https://gitee.com/heptaluan/backups/raw/master/cdn/mysql/07.png)



