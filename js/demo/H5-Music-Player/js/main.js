$(function(){

	// 初始化
	var Playing = 0;
	var Player = document.getElementById("play");

	// 设定生成播放条目数量
	var musicLength = 20;

	// 生成播放列表
	List_Ajax();


	// 点击图片 播放/暂停
	$(".cover").click(function(){
		if (Player.paused)
			Play();
		else
			Pause();
	});

	
	$("#list").on("mouseover", "li", function(){
		var _this = $(this);

		//当前项添加hover
		List_Hover(_this);

		//方块移动到当前项
		List_Scroll(_this);
		
		_this.find(".play").click(function(){

			//防止暂停之后切歌图片还是半透明的
			$(".cover").css('opacity',1);

			Playing = _this.index();

			//当前封面
			List_Image(_this);

			//当前项添加高亮
			List_Select(_this);

			//播放当前
			List_Play(_this);
		});

	}).on("mouseout", "li", function(){
		List_Hover($(this));
		$(this).find('*').unbind();
	});


	/*-------------------------- +
  		键盘事件
 	+-------------------------- */
	$(document).bind("keydown", function(e){
		switch (e.which){
			case 13:
				$(".cover").trigger("click");
				return false;
			case 32:
				$(".cover").trigger("click");
				return false;
			case 8:
				Player.currentTime = 0;
				return false;
			case 37:
				Player.currentTime = Player.currentTime - 10;
				return false;
			case 39:
				Player.currentTime = Player.currentTime + 10;
				return false;
			case 38:
				$(".play").parent().eq(Playing - 1).trigger("mouseover").find(".play").trigger("click").parent().trigger("mouseout");
				return false;
			case 40:
				$(".play").parent().eq(Playing + 1).trigger("mouseover").find(".play").trigger("click").parent().trigger("mouseout");
				return false;
		}
	});

	/*-------------------------- +
  		进度条样式
 	+-------------------------- */
	$(".progress").click(function(e){
		var x = (e.offsetX || e.originalEvent.layerX) / $(this).width();
		Player.currentTime = Player.duration * x;
	});

	function Progress(){
		var s = Player.seekable.length * 100;
		var x = Player.currentTime / Player.duration * 100;
		$(".seek-bar").css("width", s + "%");
		$(".play-bar").css("width", x + "%");
	};

	setInterval(function(){ Progress() }, 400);

	$.extend( $.easing,{
		easeOutCubic: function(x, t, b, c, d){
			return c*((t=t/d-1)*t*t + 1) + b;
		}
	});

	/*-------------------------- +
  		点击图片 播放/暂停
 	+-------------------------- */
	function Play(){
		$(".cover").fadeTo(400, 1);
		Player.play();
	};

	function Pause(){
		$(".cover").fadeTo(400, 0.4);
		Player.pause();
	};

	// 设置歌曲封面
	function List_Image(obj){
		$(".cover").stop().fadeOut(200,function(){
			$(this).attr("src", obj.find("img").attr("src")).attr("alt", obj.find("img").attr("alt"));
		}).fadeIn(400);
	};

	// 当前播放项添加高亮
	function List_Select(obj){
		obj.addClass("select").siblings().removeClass("select");
		$("#list").mouseleave(function() {
			List_Scroll(obj);
		});
	};

	/*-------------------------- +
  		播放列表 hover
 	+-------------------------- */
	function List_Hover(obj){
		obj.toggleClass("hover");
	};

	/*-------------------------- +
  		播放列表前面小图标
 	+-------------------------- */
	function List_Scroll(obj){
		var position = obj.index() * obj.outerHeight();
		$("#scroll-box").stop().animate({marginTop: position}, 800, 'easeOutCubic');
	};

	
	// 播放当前选中 <a class="play" value="xxxx.mp3">
	function List_Play(obj){
		var media = encodeURI(obj.find(".play").attr("value"));
		$(Player).attr("src", media).trigger("play");
	};

	/*-------------------------- +
  		AJAX调用
 	+-------------------------- */
	function List_Ajax(){
		$.ajax({
			url: 'music/music.json',
			type: 'GET',
			dataType: 'JSON',
			success: function(List){
				var result = '';
				var index = []
				for (var i in List){
					index.push(i);
				}
				index.sort(function(){ 
					return 0.5 - Math.random() 
				});
				for (i=0; i<musicLength; i++){
					var x = index[i];
					var id = parseInt(i) + 1;
					result += '<li><span class="id">' + (id < 10 ? '0' + id : id) + '.</span><a class="play" href="javascript:" value="' + List[x].Music + '"><img src="' + List[x].Cover + '" alt="' + List[x].Title + ' - ' + List[x].Artist +'"><span class="info">' + List[x].Title + ' - ' + List[x].Artist + '</span></a></li>';
				}
				$("#list ul").hide().html(result).fadeIn();
			}
		});
	};

	//music
	function List_Fresh(){
		$.get("music/music.json", {count: 20 - musicLength}, function(result){
			$("#list ul").append(result);	
		});
	};

})

