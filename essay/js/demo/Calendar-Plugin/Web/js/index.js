/**
 *=======================================================================
 *
 * @created： by VSC
 * @author： shaobo（http://heptaluan.com/）
 * @version：  2017-02-20
 * 
 * 2017-02-20  大体框架搭建
 * 2017-02-21  日历渲染，生成日历，添加默认参数以及交互事件
 * 2017-02-22  新增单双日历切换
 * 待续...
 * 
 *=======================================================================
 */
function MyDate(options) { 

    this.init(options);    

}

MyDate.prototype.init = function (options) {

    var defaults = {
        box: document.querySelector("#myDate"),  // 日历容器
        year: new Date().getFullYear(),  // 默认为系统年份
        month: new Date().getMonth() + 1, // 默认为系统月份
        calendars: 2  // 传入的日历个数，默认为 2
    }
    
    // 合并参数
    var opts = $.extend({}, defaults, options);

    // 初始化日历（根据参数生成一个还是两个日历）
    if (opts.calendars == 1) {
        this.createCal(opts.box, opts.year, opts.month, opts.calendars);
    } else {
        this.createCalDouble(opts.box, opts.year, opts.month, opts.calendars);
    }

    // 绑定切换点击事件
    this.prev(opts.box, opts.year, opts.month)
    this.next(opts.box, opts.year, opts.month)

    // 绑定选中事件
    this.intervalClick(opts.box);

    // 绑定删除事件
    this.unClick(opts.box, opts.year, opts.month);

}

// 返回传入的 x年-x月 的第一天是星期几
MyDate.prototype.weekDay = function (year, month) {

    var newDay = new Date();
    var days = [7, 1, 2, 3, 4, 5, 6];

    newDay.setFullYear(year);
    newDay.setMonth(month - 1);
    newDay.setDate(1);

    return days[newDay.getDay()];
};

// 返回传入的 x年-x月 的月份共有多少天
MyDate.prototype.monthDay = function (year, month) {

    var newDay = new Date();

    newDay.setFullYear(year);
    newDay.setMonth(month - 1);

    var everyMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // 如果传入的 2月 是闰年的 2月
    if (month == 2) {
        var bissextile = [1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028, 2032, 2036, 2040, 2044, 2048];

        for (var i = 0; i < bissextile.length; i++) {
            if (year == bissextile[i]) {
                everyMonth[1] = 29;
            }
        }
    }

    return everyMonth[month - 1];
};

// 生成单日历
MyDate.prototype.createCal = function (box, year, month, calendars) {

    // 获取当前月总共有多少天
    var allDays = this.monthDay(year, month);

    // 获取当前月第一天星期几
    var firstDay = this.weekDay(year, month);
    
    // 如果为星期一，默认从第一个开始排
    if (firstDay == 7) {
        firstDay = 0;
    }

    // 前置占位符
    var placeholderSpan = "";
    for (var i = 0; i < Number(firstDay) - 1; i++) {
        placeholderSpan += '<span class="placeholderSpan"></span>';
    }

    // 生成日历
    var day = "";
    for (var i = 1; i <= allDays; i++) { 
        day += '<span><i>' + i + '</i></span>'
    }

    var myCalendar = '<div class="Mytime"><span id="prev">←</span><span id="next">→</span>' + 
            '<div class="dateTitle"><em class="year">' + year + '</em> 年 <em class="month">' + month + '</em> 月</div>' + 
            '<div class="dateList"><div class="week">' + 
            '<span>一</span><span>二</span><span>三</span> <span>四</span><span>五</span><span>六</span><span>日</span></div>' + 
            '<div class="day">' + placeholderSpan + day + '</div></div></div> ';
            
    box.innerHTML = myCalendar;

    // 绑定切换事件
    this.prev(box, year, month)
    this.next(box, year, month)

    // 绑定点击事件
    this.intervalClick(box);
    
}

// 生成双日历
MyDate.prototype.createCalDouble = function (box, year, month, calendars) {

    var double = '<div class="first" id="first"></div><div class="last" id="last"></div>';
    box.innerHTML = double;

    var first = document.querySelector("#first");
    var last = document.querySelector("#last");

    // 生成左侧日历
    this.createCal(first, year, month, calendars);

    // 生成右侧日历
    if (month >= 12) {
        this.createCal(last, year + 1, month - 11, calendars);
    } else {
        this.createCal(last, year, month + 1, calendars);
    }
    
    // 绑定切换事件
    this.prev(box, year, month, calendars)
    this.next(box, year, month, calendars)

    // 绑定点击事件
    this.intervalClick(box);

    // 按钮只保留一组
    document.querySelectorAll("#next")[0].style.display = "none"
    document.querySelectorAll("#prev")[1].style.display = "none"  
    
}

// 上一个月点击事件
MyDate.prototype.prev = function (box, year, month, calendars) {

    if (calendars == 2) {

        // 获取事件元素
        var prev = document.querySelector("#prev");
        // 绑定 this
        var _this = this;

        prev.addEventListener("click", function () {

            var y = year;
            var m = month;

            m--;

            if (m == 0) {
                m = 12;
                y = y - 1;
            }

            _this.createCalDouble(box, y, m, calendars);

        }, false)

    } else {
        // 获取事件元素
        var prev = document.querySelector("#prev");
        // 绑定 this
        var _this = this;

        prev.addEventListener("click", function () {

            var y = year;
            var m = month;

            m--;

            if (m == 0) {
                m = 12;
                y = y - 1;
            }

            _this.createCal(box, y, m);

        }, false)
    }

}

// 下一个月点击事件
MyDate.prototype.next = function (box, year, month, calendars) {

    // 获取事件元素
    if (calendars == 2) {
        var next = document.querySelectorAll("#next")[1];
        // 绑定 this
        var _this = this;

        next.addEventListener("click", function () {

            var y = year;
            var m = month;

            m++;

            if (m == 13) {
                m = 1;
                y = y + 1;
            }

            _this.createCalDouble(box, y, m, calendars);

        }, false)
    } else {
        var next = document.querySelectorAll("#next")[0];
        // 绑定 this
        var _this = this;

        next.addEventListener("click", function () {

            var y = year;
            var m = month;

            m++;

            if (m == 13) {
                m = 1;
                y = y + 1;
            }

            _this.createCal(box, y, m);

        }, false)
    }
    

}

// 点击选中事件
MyDate.prototype.intervalClick = function (box) {

    var min, max;   // 选中顺序
    var i = $(box).find("i");
    var lock = true;    // 用以分辨起始位置和结束位置

    // 用于保存起始和介绍位置 i 的 index
    var start = 0;
    var end = 0;

    // 用于记录输出日期
    var todayDay, y, m, s, e;

    // 保存 this
    var _this = this;
    
    i.on("click", function () {

        // 如果是起始位置
        if (lock) {
            
            // 先清空 class
            i.removeClass("start end interval");

            // 为当前项添加 class
            $(this).addClass("start");

            // 获取起始的位置（index）
            start = $(this).index("i");

            // 得到起始日期
            y = $(this).parents().find(".Mytime").find(".dateTitle").find(".year").html()
            m = $(this).parents().find(".Mytime").find(".dateTitle").find(".month").html();
            s = $(this).html();           

            console.log( "起始时间：" + _this.zeroFill(y) + "-" + _this.zeroFill(m) + "-" + _this.zeroFill(s))

            // 设置为起点
            lock = false;

        // 否则为结束位置（第二次点击）
        } else {
        
            // 为当前项添加 class
            $(this).addClass("end");

            // 获取结束的位置（index）
            end = $(this).index("i");
            
            // 修正选取的值（若第二次点击的时候选择的是在第一次点击之前的日期）
            min = start < end ? start : end;
            max = start > end ? start : end;

            // 为中间项添加 class
            i.slice(min + 1 , max).addClass("interval")

            // 清除开头占位符的样式
            $(".placeholderSpan i").removeClass("interval")

            // 得到结束
            y = $(this).parents().find(".Mytime").find(".dateTitle").find(".year").html()
            m = $(this).parents().find(".Mytime").find(".dateTitle").find(".month").html();
            e = $(this).html();

            console.log( " 结束时间：" + _this.zeroFill(y) + "-" + _this.zeroFill(m) + "-" + _this.zeroFill(e))

            // 重置为起点
            lock = true;
        }
        
    })
}

// 禁止点击事件
MyDate.prototype.unClick = function (box, year, month) {
    
    // 获取当前日期
    var today = new Date().getDate();

    // 获取所有的 i 
    var i = $(box).find("i");

    // 为当前日期之前取消点击事件，添加 class
    i.slice(0, today - 1).addClass("unClick").off("click")
}

// 参数补零
MyDate.prototype.zeroFill = function (x) {
    return x = x < 10 ? "0" + x : x;
}

