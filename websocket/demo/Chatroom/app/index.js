(function () {

	window.CHAT = {
		
		msgObj: document.getElementById("message"),
		username: null,
		userid: null,
		socket: null,

		// 滚动条保持在底部
		scrollToBottom: function () {
			window.scrollTo(0, this.msgObj.clientHeight);
		},

		// 退出刷新
		logout: function () {
			location.reload();
		},

		// 提交聊天消息内容
		submit: function () {
			var content = document.getElementById("content").value;
			
			if (content != "") {

				var obj = {
					userid: this.userid,
					username: this.username,
					content: content
				};

				this.socket.emit("message", obj);

				document.getElementById("content").value = "";
			}

			return false;
		},

		// 生成随机数 uid
		genUid: function () {
			return new Date().getTime() + "" + Math.floor(Math.random() * 999 + 100);
		},

		// 更新系统消息（用户加入、退出的时候调用）
		updateSysMsg: function (o, action) {
			
			// 当前在线用户列表
			var onlineUsers = o.onlineUsers;
			// 当前在线人数
			var onlineCount = o.onlineCount;
			// 新加入用户的信息
			var user = o.user;
				
			// 更新在线人数
			var userhtml = "";
			var separator = "";

			for (key in onlineUsers) {
		        if (onlineUsers.hasOwnProperty(key)) {
					userhtml += separator + onlineUsers[key];
					separator = '，';
				}
		    }

			document.getElementById("onlinecount").innerHTML = `当前共有 ${onlineCount} 人在线，在线列表：${userhtml}`;
			
			//添加系统消息
			var html = '';
			html += '<div class="msg-system">';
			html += user.username;
			html += (action == 'login') ? ' 加入了聊天室' : ' 退出了聊天室';
			html += '</div>';

			var section = document.createElement("section");

			section.className = "system J-mjrlinkWrap J-cutMsg";
			section.innerHTML = html;

			this.msgObj.appendChild(section);	
			this.scrollToBottom();
		},

		// 第一个界面用户提交用户名
		usernameSubmit: function () {
			var username = document.getElementById("username").value;
			if (username != "") {
				document.getElementById("username").value = "";
				document.getElementById("loginbox").style.display = "none";
				document.getElementById("chatbox").style.display = "block";
				this.init(username);
			}
			return false;
		},

		// 初始化
		init: function (username) {

			this.userid = this.genUid();
			this.username = username;
			
			document.getElementById("showusername").innerHTML = this.username;
	
			this.scrollToBottom();
			
			// 连接 websocket 后端服务器
			this.socket = io.connect("ws://localhost:3000");
			
			// 通知服务器端有用户登录
			this.socket.emit("login", {userid:this.userid, username:this.username});
			
			// 监听新用户登录
			this.socket.on("login", function (o) {
				CHAT.updateSysMsg(o, "login");	
			});
			
			// 监听用户退出
			this.socket.on("logout", function(o){
				CHAT.updateSysMsg(o, "logout");
			});
			
			// 监听消息发送
			this.socket.on("message", function (obj) {

				var isme = (obj.userid == CHAT.userid) ? true : false;
				var contentDiv = `<div> ${obj.content} </div>`;
				var usernameDiv = `<span> ${obj.username} </span>`;
				
				var section = document.createElement("section");

				if (isme) {
					section.className = "user";
					section.innerHTML = contentDiv + usernameDiv;
				} else {
					section.className = "service";
					section.innerHTML = usernameDiv + contentDiv;
				}

				CHAT.msgObj.appendChild(section);
				CHAT.scrollToBottom();	
			});

		}
	};

	// 绑定键盘事件
	document.getElementById("username").onkeydown = function (e) {
		e = e || event;
		if (e.keyCode === 13) {
			CHAT.usernameSubmit();
		}
	};

	document.getElementById("content").onkeydown = function (e) {
		e = e || event;
		if (e.keyCode === 13) {
			CHAT.submit();
		}
	};
})();
