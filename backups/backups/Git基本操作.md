---
title: Git 基本操作
date: 2017-12-29
categories: Essay
tags: Essay
toc: true
thumbnail: https://gitee.com/heptaluan/backups/raw/master/cdn/cover/03.jpg
---

> 小贴士：使用 `git help log / add / commit...` 可以查看相关命令的操作方式

<!--more-->

## 安装/初始化

安装过程就省略了，官网直接下载，直接下一步下一步就行，没有什么特别需要注意的地方，安装完成后首先需要设置用户和地址

```js
git config --global user.name 'name'

git congig --global user.email 'email'
```

然后新建一个文件夹用作 `git` 仓库，再初始化这个 `git` 仓库

```js
git init  // 初始化

pwd       // 显示当前目录

ls        // 显示当前目录文件
```

然后添加文件到 `git` 仓库

```js
git add 文件名        // 添加文件，可以反复添加多次

git commit -m '描述'  // 提交文件到仓库
```




#### git add 的各种区别

```js
git add -A    // 添加所有改动

git add *     // 添加新建文件和修改，但是不包括删除

git add .     // 添加新建文件和修改，但是不包括删除

git add -u    // 添加修改和删除，但是不包括新建文件


// 在 commit 前撤销 add:

git reset <file> // 撤销提交单独文件

git reset        // unstage all due changes

// add / commit 前撤销对文件的修改:

git checkout -- README.md  // 注意, add 添加后(同 commit 提交后)就无法通过这种方式撤销修改
```




## 版本管理


#### 查看工作区状态

使用

```js
git status  // 查看工作区状态
```

如果出现如下警告：

```js
warning: CRLF will be replaced by LF in readme.txt.
The file will have its original line endings in your working directory.
```

可以使用：

```js
git config core.autocrlf false
```

至于出现原因，详细见：[git 如何避免 'warning: LF will be replaced by CRLF' 提示？](https://www.zhihu.com/question/50862500)

提交前的时候可以查看具体修改了哪些内容，使用

```js
git diff            // 工作区 和 暂存区 的比较

git diff --cached   // 暂存区 和 分支 的比较

// 还有下面这个
// HEAD 参数是可变的，也就是可以将工作区的内容与版本库里指定的任意版本比较
// 比如 git diff 345et6 --<file>
git diff HEAD --<file>  
```



#### 版本回退

可以使用 `git log` 命令来查看历史记录

```js
git log
```

如果感觉输出信息太多，可以使用 `--pretty=oneline` 参数（使其一行显示）

```js
git log --pretty=oneline
```

回退到上一个版本，使用 `reset` 命令

```js
git reset --hard HEAD^
```

如果回退到前两个版本，可以使用 `HEAD^^` 或者 `Head~2`，依次类推

```js
git reset --hard Head^^

git reset --hard HEAD~2
```

如果回退版本后，在使用 `git log` 后就查看不到之前最新版本的信息了

这个时候可以使用下面命令指定回到之前某个版本（`4cda21` 这个就是之前使用 `git log` 查看的版本号，只需要前面几位即可，`git` 会去自动查找）

```js
git reset --hard 4cda21
```

但是如果找不到之前的版本号，可以使用下面命令来查看提交过的每一次命令

```js
git reflog
```



#### 小小总结


* 回退/更新 到指定的版本，使用 `git reset --hard commit_id`

* 回退前，使用 `git log`

* 向跳转到指定版本，使用 `git reflog` 查看历史提交记录，确定跳转版本





#### 工作区和暂存区

简单来说，就是先提交修改的文件到暂存区，然后**再一次性提交暂存区的所有修改**

`add` 的作用就是把工作区的更新到暂存区，而 `commit` 则是把缓冲区更新到仓库

把文件往 `git` 仓库中添加的时候，是分两步执行的：

1. 首先使用 `git add` 把文件添加进去，实际上就是把文件修改添加到暂存区

2. 然后使用  `git commit` 提交修改，实际上就是把暂存区的所有文件提交到当前分支



因为我们在创建 `git` 版本库的时候，`git` 自动为我们创建了唯一一个 `master` 分支，所以， `git commit` 就是往 `master` 分支上提交更改

需要注意的是：如果修改文件后，没有使用 `git add` 将修改放入暂存区，那么在 `commit` 的时候只会把暂存区的修改提交

简单总结就是：每次修改不 `add` 到暂存区，就不会加入到 `commit` 中



#### 撤销修改

主要使用下面这两个命令

```js
// 撤销对工作区修改
// 这个命令是以最新的存储时间节点（add 和 commit）为参照，覆盖工作区对应文件 file
// 这个命令改变的是工作区
git checkout -- file

// 清空 add 命令向暂存区提交的关于 file 文件的修改（Ustage）
// 这个命令仅改变暂存区，并不改变工作区，这意味着在无任何其他操作的情况下，工作区中的实际文件同该命令运行之前无任何变化
git reset HEAD -- file
```

在没有推送到远程仓库之前的撤销主要分为以下几种：

* 修改了文件，想直接撤销（这个时候还没有 `add`），使用 `git checkout -- file`

* 修改了文件，但是又 `add` 到了暂存区，这个时候想放弃修改，可以使用 `git reset HEAD file` 可以把暂存区的修改撤销掉

* 如果已经 `commit`，想要撤销修改，这个时候就可以使用版本回退（`git reset --hard HEAD^`）

一个额外的需求，希望彻底的舍弃本地未 `push` 的 `commit`

因为通过像 `git reset` 这样的操作，如果 `push` 了远程仓库是看不到被你舍弃的 `commit`

但是在本地还是可以通过 `reflog` 来找到，解决办法就是：

这个时候就需要先 `reset`，然后 `push`，再去把本地的库删掉，重新 `clone` 即可


#### 删除修改

一般情况，可以直接在文件管理器中把没用的文件删了，或者使用 `rm` 命令：

```js
rm test.html
```

这个时候分为两种情况：

一个就是确定要删除文件

```js
// 确认删除
// 也可以直接使用这个命令，包含了上面的 rm 操作
git rm test.html

// 然后提交
git commit
```

另外一个就是如果删错了，可以使用 `checkout` 撤销修改

```js
git checkout -- test.html
```

如果删除后想恢复，需要注意的是会丢失最后一次提交后修改的内容（即修改了以后没有提交直接删除的话，会丢失掉修改的内容）



## 分支管理

我们每次提交，`git` 都会把它们串成一条时间线，这条时间线就是一个分支，即 `master`

`HEAD` 严格来说不是指向提交，而是指向 `master`，`master` 才是指向提交的，所以 `HEAD` 指向的就是当前分支

```js
        master -- HEAD
          |
          |
○ -- ○ -- ○      <== 主分支（master）
```

每次提交，`master` 分支都会向前移动一步

```js
             master -- HEAD
               |
               |
○ -- ○ -- ○ -- ○      <== 主分支（master）
```

当我们创建新的分支，比如名称为 `test`，这个时候 `git` 会新建了一个名为 `test` 的指针指向 `master` 相同的提交

然后再把 `HEAD` 指向 `test`，表示当前分支在 `test` 上


```js
             master 
               |
               |
○ -- ○ -- ○ -- ○      <== 主分支（master）
               |
               |
             test -- HEAD
```

这个时候开始，对于工作区的修改和提交都是针对 `test` 分支了，每提交一次，`test` 分支就前进一步，而 `master` 保持不变

```js
             master
               |
               |
○ -- ○ -- ○ -- ○ -- ○ -- ○     <== 主分支（master）
                         |
                         |
                        test -- HEAD
```

当 `test` 分支上的工作完成以后，就可以直接把 `master` 指向 `test`，即把 `test` 合并到 `master` 上，这样就完成了合并

```js
                       master -- HEAD
                         |
                         |
○ -- ○ -- ○ -- ○ == ○ == ○     <== 主分支（master）
                         |
                         |
                        test 
```

合并完成后，可以选择删除掉 `test` 分支，这样就仅剩一条 `master` 分支了

```js
                       master -- HEAD
                         |
                         |
○ -- ○ -- ○ -- ○ == ○ == ○     <== 主分支（master）
```


#### 操作分支

首先创建并切换到 `test` 分支

```js
// 创建并切换到 test 分支，-b 命令表示创建并且切换
git checkout -b test
```

相当于下面两条命令

```js
git branch test 

git checkout test  // 切换分支
```

使用下面命令可以查看当前分支，并且会列出所有的分支，当前分支前面会标一个 `*` 号

```js
git branch
```

这个时候修改文件，然后 `add` 和 `commit` 以后在切换回 `master` 分支会发现看不到我们修改的内容，因为这一次的提交是在 `test` 分支上

此时状态如下

```js
git add test.txt

git commit -m 'xxx'

git checkout master

git branch

// ---------------------------------------------

                  master -- HEAD
                    |
                    |
○ -- ○ -- ○ -- ○ -- ○ == ○     <== 主分支（master）
                         |
                         |
                        test 
```

这个时候就需要合并分支了

```js
git merge test  // 用于合并 指定的分支 到 当前的分支
```

合并之后再次查看文件内容就会发现，现在 `master` 分支和 `test` 分支最新提交是完全一样的了

需要注意控制台当中的 `Fast-forward` 提示，指的是这次合并是 '快进模式'，即直接把 `master` 指向 `test` 当前的提交

这时候就可以放心删除 `test` 分支了

```js
git baranch -d test
```

分支操作总结如下：

```js
git branch            // 查看分支

git branch <name>     // 创建分支

git checkout <name>   // 切换分支

git branch -b <name>  // 创建 + 切换 分支

git merge <name>      // 合并某分支到当前分支 

git barnch -d <name>  // 删除分支  
```


#### 冲突解决

如果在发生合并的时候发生冲突，类似下面：

```js
$ git merge test1
Auto-merging test.txt
CONFLICT (content): Merge conflict in test.txt
Automatic merge failed; fix conflicts and then commit the result.
```

这个时候就需要手动解决冲突以后再次提交，使用 `git status` 命令可以告诉我们冲突的文件：

```js
#  ...
#
#       both modified:      test.txt
#
#  ...
```

`git` 使用 `<<<<<<<`，`=======`，`>>>>>>>` 标记出不同分支的内容，修改以后在保存提交

```js
git add test.txt

git commit -m 'xxxxx'
```

合并完成后就可以删除掉 `test1` 分支了

* 使用 `git log --graph` 命令可以查看分支合并图

* 在手动修改冲突文件以后（其实不改也行就是确认一下），再次 `add and commit`，系统就确认那个是最新（`merge` 后）的版本了



#### 分支管理

一般在合并分支的时候，`git` 会默认优先使用 `Fast forward` 模式，但这种模式下删除分支后，会丢掉分支信息

这个时候就可以使用 `--no-ff` 参数，这时的 `git` 会在 `merge` 的时候生成一个新的 `commit` 记录，这样一来就可以从分支历史上看到所有的分支信息了

```js
// --no-ff 参数，表示禁用 Fast forward
// 又因为合并要创建一个新的 commit，所以加上 -m 参数，把描述写进去
git merge --no-ff -m 'msg' test  
```


#### Bug 分支

在 `git` 中，每个 `bug` 都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除

但是如果手头上的工作还没有完成，还没法提交，这个时候就可以用到 `stash` 功能，可以把工作区临时 '储存' 起来，等 `bug` 修改完毕了在来继续工作

解决完 `bug` 之后，可以使用 `git stash list` 来查看之前储存的工作区

想要恢复有两种方式

* 一种是使用 `git stash apply` 来恢复，但是恢复后，`stash` 内容并没有删除，需要再次使用 `git stash drop` 来删除

* 另外一种是使用 `git stash pop`，在恢复的同时把 `stash` 的内容也删除了

这个时候再用 `git stash list` 查看，就看不到任何 `stash` 内容了

简单来说就是：

* 在分支 `test` 正常开发，这时有一个 `bug` 需要解决，需要先把 `test` 分支储存起来（`stash`）

* 在 `master` 下新建一个 `issue-bug01` 分支，解决 `bug`，成功后在 `master` 下合并 `issue-bug01`

* 然后在 `test` 下合并 `master`，这样才会同步里面的 `bug` 解决方案

* 然后恢复 `test`（`stash pop`），这时系统自动合并，会提示有冲突，因为储存了之前 `test` 中的东西，此时需要手动去解决冲突

* 冲突解决完成后，继续开发 `test`，最后 `add commit`，最后的最后，在 `master` 下合并完成后的 `test` 分支



```js
// 当前正在 test 分支开发，需要 bug 先保存起来
git stash

// 去 master 分支建立 bug 分支
git checkout master

git checkout -b issue-bug01

// 然后去修改 bug
git add xxx / git commit -m 'xxxx'

// master 合并
git checkout master

git merge --no-ff -m 'merge-issue-bug01' issue-bug01

// test 合并
git checkout test

git merge --no-ff -m 'merge-test' master

git stash pop

// 这时会提示冲突，去文件手动改正
#       Auto-merging xxx
#       CONFLICT (content): Merge conflict in xxx

// 完成后继续开发分支 test
git add xxx

git comit -m 'xxx'

// 分支完成后合并
git checkout master

git merge --no-ff -m 'merge-test' test

// 最后删除分支
git branch -d test

```



#### 多人协作

工作模式通常是这样：

* 首先可以试图使用 `git push origin branch-name` 推送自己的修改

* 如果推送失败，则因为远程分支比你的本地更新，需要先用 `git pull` 拉取最新版本（如果有冲突，则解决冲突，并在本地提交）

* 没有冲突或者解决掉冲突后，再用 `git push origin branch-name` 推送就能成功

* 如果 `git pull` 提示 `no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令 `git branch --set-upstream branch-name origin/branch-name`




## 标签管理


#### 创建标签

```js
// 创建标签，默认是打在最新的 commit 上
git tag <name>  // git tag v1.0

// 查看所有标签
git tag 


// 如果之前忘记打标签
git tag <name> <commit_id>  // git tag v0.9 0e3s452


// 标签不是按时间顺序排列的，而是按字母顺序
// 查看标签信息
git show <tag_name>         // git show v0.9

// 还可以创建带有说明的标签，-a 指定标签名，-m 指定说明文字
git tag -a v0.9 -m 'xxxx'
```


#### 标签操作

```js
// 删除标签
git tag -d v1.0
```

默认创建的标签只会存储在本地，不会自动推送到远程，所以，打错的标签可以在本地安全删除

如果要推送标签

```js
// 推送标签到远程
git push origin <tagname>  // git push origin v1.0

// 或者一次性的推送全部尚未推送到远程的本地标签
git push origin --tags
```

如果标签已经推送到远程，还是想要删除的话：

```js
// 需要先从本地删除
git tag -d v1.0

// 然后再从远程删除，删除的命令也是 push，格式如下
git push origin :refs/tags/v1.0
```
