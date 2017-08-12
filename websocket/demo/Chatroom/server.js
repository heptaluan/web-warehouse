var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
	res.send(`<h1>Wclcome</h1>`)
})

// 在线用户
var onlineUsers = {};

// 当前在线人数
var onlineCount = 0;

io.on("connection", (socket) => {

	console.log(`新用户登入`);

	// 监听用户加入
	socket.on("login", (obj) => {

		// 将新加入用户的唯一标识当作 socket 的名称，用作退出标识
		socket.name = obj.userid;

		// 检查在线列表，如果不在里面就加入
		if (!onlineUsers.hasOwnProperty(obj.userid)) {
			onlineUsers[obj.userid] = obj.username;
			onlineCount++;
		}

		// 向所有客户端广播用户加入
		io.emit("login", { onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj });

		console.log(`${obj.username} 加入了聊天室`);

	});

	// 监听用户退出
	socket.on("disconnect", () => {
 
		// 将退出的用户从在线列表中删除
		if (onlineUsers.hasOwnProperty(socket.name)) {

			// 退出用户的信息
			var obj = { userid: socket.name, username: onlineUsers[socket.name] };

			// 删除
			delete onlineUsers[socket.name];
			onlineCount--;

			// 向所有客户端广播用户退出
			io.emit("logout", { onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj });

			console.log(`${obj.username} 退出了聊天室`);

		}
	});

	// 监听用户发布聊天内容
	socket.on("message", (obj) => {

		// 向所有客户端广播发布的消息
		io.emit("message", obj);
		console.log(`${obj.username} 说：${obj.content}`);
		
	});

});

http.listen(3000, () => { console.log(`listening on *:3000`) });
