/// <reference path="./typings/index.d.ts" />

var http = require('http')
var fs = require('fs')
var url = require('url')

// 创建服务器
http.createServer(function(req, res) {

  // 解析请求
  var pathname = url.parse(req.url).pathname

  console.log(`Request for ${pathname}`)

  // 从文件系统当中读取请求的文件内容
  // 这里需要使用同步读取当前文件夹下的 index.html
  // 返回的内容为 html 的 body 当中的内容
  fs.readFile(pathname.substr(1), function(err, data) {
    if (err) {
      console.error(err)
      res.writeHead(404, { 'Content-Type': 'text/html' })
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(data.toString())
    }
    res.end()
  })

}).listen(8080)

console.log('Server running');
