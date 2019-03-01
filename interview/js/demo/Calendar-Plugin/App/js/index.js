function MyDate(options) { 
    this.init(options);    
}

MyDate.prototype.init = function (options) {

    var defaults = {
        box: document.querySelector("#myDate"),  // 容器
        year: new Date().getFullYear(),  // 默认今年
        month: new Date().getMonth() + 1 // 默认当前月
    }
    
    var opts = Object.assign({}, defaults, options);
    
    // 渲染
    this.createCal(opts.box, opts.year, opts.month, opts.calendars);

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

// 生成日历
MyDate.prototype.createCal = function (box, year, month) {

    var allDays = this.monthDay(year, month);
    var firstDay = this.weekDay(year, month);
    
    if (firstDay == 7) {
        firstDay = 0;
    }

    var placeholderSpan = "";
    for (var i = 0; i < Number(firstDay) - 1; i++) {
        placeholderSpan += `<span class="placeholderSpan"></span>`;
    }

    // 生成日历
    var day = "";
    for (var i = 1; i <= allDays; i++) { 
        day += `<span class="myDay" data-day=${year}-${month}-${i}><i> ${i} </i></span>`
    }

    var myCalendar = 
        `
        <div>
            <div class="title">
                <div class="calYear">
                    <span class="prevYear">《</span>
                    <span id="calYear">${year}</span>
                    <span class="nextYear">》</span>
                </div>
                <div class="calMonth">
                    <span class="prevMonth">《</span>
                    <span id="calMonth">${month}</span>
                    <span class="nextMonth">》</span>
                </div>
            </div>
            
            <div class="Mytime">
                <div class="dateList">
                    <div class="week">
                        <span>一</span>
                        <span>二</span>
                        <span>三</span>
                        <span>四</span>
                        <span>五</span>
                        <span>六</span>
                        <span>日</span>
                    </div>
                    <div class="day"> ${placeholderSpan} ${day} </div>
                </div>
            </div>
            <div class="btns">
                <div class="close">取消</div>
                <div class="sure">确定</div>
            </div>
        </div>
        `
            
    document.getElementById("myDate").innerHTML = myCalendar;

    // 绑定月切换事件
    this.prevMonth(box, year, month)
    this.nextMonth(box, year, month)

    // 绑定年切换事件
    this.prevYear(box, year, month)
    this.nextYear(box, year, month)

    // 绑定点击事件
    this.intervalClick(box, year, month)

    // 获取当前月份的今天，添加高亮
    var d = new Date(); 
    var thisYear = d.getFullYear()
    var thisMonth = d.getMonth() + 1
    var today = d.getDate()

    if (document.getElementById("calMonth").innerHTML == thisMonth && document.getElementById("calYear").innerHTML == thisYear) {
        document.querySelectorAll(".myDay")[today - 1].classList.add("chooseDay")
    }

    // 绑定确定事件
    this.onSure()
    
}


// 上一个月点击事件
MyDate.prototype.prevMonth = function (box, year, month) {

    var prev = document.querySelector(".prevMonth");
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

// 下一个月点击事件
MyDate.prototype.nextMonth = function (box, year, month) {

    var next = document.querySelector(".nextMonth");
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

// 上一年的点击事件
MyDate.prototype.prevYear = function (box, year, month) {

    var prev = document.querySelector(".prevYear");
    var _this = this;

    prev.addEventListener("click", function () {

        var y = year;
        var m = month;

        y--;

        _this.createCal(box, y, m);

    }, false)
}

// 下一年的点击事件
MyDate.prototype.nextYear = function (box, year, month) {
    
    var next = document.querySelector(".nextYear");
    var _this = this;

    next.addEventListener("click", function () {

        var y = year;
        var m = month;

        y++;

        _this.createCal(box, y, m);

    }, false)
}

// 日历月份点击事件
MyDate.prototype.intervalClick  = function (box, year, month) {
    var span = document.querySelectorAll(".myDay")
    for (var i = 0; i < span.length; i++) {
        span[i].addEventListener("click", function() {
            for (var j = 0; j < span.length; j++){
                span[j].classList.remove("chooseDay")
            }
            this.classList.add("chooseDay")
        })
    }
}

// 确定点击事件
MyDate.prototype.onSure = function (box, year, month) {
    var sure = document.querySelector(".sure");

    sure.addEventListener("click", function () {
        var chooseDay = document.querySelector(".chooseDay").getAttribute("data-day")
        alert(`当前选中的是：${chooseDay}`)
    })
}