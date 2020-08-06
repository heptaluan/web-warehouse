var http = require('http'),
  fs = require('fs'),
  html = fs.readFileSync('./ajax.html', 'utf8')

http.createServer(function (req, res) {
  switch (req.url) {
    // 当请求根目录 / 时，返回这个 HTML 文件
    case '/':
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(html)
      break
    // 当请求 /date 时，返回当前时间
    case '/date':
      var date = new Date()
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.write(date.toString())
      break
  }
  res.end()
}).listen(3000)
