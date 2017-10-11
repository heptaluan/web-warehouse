生成一个 20 X 12 的表格，并且设定指定格子的背景颜色


----


核心代码如下

```html
<style>
	td {
		border: 1px solid red;
		margin: 10px;
		width: 20px;
		height: 20px;
	}
</style>

<body>

	<table id="box"></table>

	<script>
		"use strict";

		var table = document.getElementById("box");

		var result = [];
		for (var i = 0; i < 20; i++) {
			var temp = [];
			var tr = document.createElement("tr");
			for (var j = 0; j < 12; j++) {
				var td = document.createElement("td");
				tr.appendChild(td);
				temp.push(td);
			}
			result.push(temp);
			table.appendChild(tr);
		}

		// 这个表示第三行第三列的表格颜色为红色
		// 因为下标是从 0 开始的
		result[2][2].style.background = "red";
	</script>
</body>
```