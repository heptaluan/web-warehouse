/**
 *=======================================================================
 *
 * @created： by VSC
 * @author： shaobo（https://github.com/heptaluan/）
 * @version：  2017-02-22
 * 
 *
 *=======================================================================
 */

$(function () {

    // 三级联动
    // 导入第一项数据
    $.each(province, function (k, p) { 
        var span = "<span value='" + p.ProID + "'>" + p.ProName + "</span>";
        $(".province").append(span);
    });

    // 绑定第一项点击事件
    $(".chooseCity .s").on("click", function () {
        bindClick($(".chooseCity .s"), $(".province"));
    })
        
    // 第一项下面的 span 绑定点击事件
    $(".province span").on("click", function () {

        // 当前项添加提示
        $(this).addClass("active").siblings().removeClass("active");

        // 加载第二项数据之前先情况之前的数据
        $(".chooseCityList .city span").remove();
        $(".chooseCityList .region span").remove();
        $(".chooseCity .q").html("区")

        // 获取当前选中项的 value
        var selValue = $(this).attr("value"); 
 
        // 添加第二项数据
        $.each(city, function (k, p) { 
            if (p.ProID == selValue) {
                var option = "<span value='" + p.CityID + "'>" + p.CityName + "</span>";
                $(".city").append(option);
            }
        });

        // 将当前选中项的值添加当前选择框中
        $(".chooseCity .s").html($(this).html())

        // 然后将第二项的值设置为导入的对应数据的第一项
        $(".chooseCity .c").html($(".chooseCityList .city span:nth-child(1)").html())


        // 隐藏当前列表
        $(this).parent().hide();

        // 清空用于切换的 class
        $(".chooseCity span").removeClass("active")
      
    });

    // 绑定第二项点击事件
    $(".chooseCity .c").on("click", function () {

        // 如果选项内无内容，则取消点击事件
        if ($(".chooseCityList .city").find("span").length == 0) {
            return;
        } else {
            bindClick($(".chooseCity .c"), $(".city"))
        }
        
    })
        
    // 第二项下面的 span 绑定点击事件
    $(".city").on("click", "span", function () {

        // 当前项添加提示
        $(this).addClass("active").siblings().removeClass("active");

        // 清空第三项数据
        $(".chooseCityList .region span").remove();

        // 获取当前选中值
        var selValue = $(this).attr("value"); 

        // 添加第三项数据
        $.each(District, function (k, p) {
            if (p.CityID == selValue) {
                var option = "<span value='" + p.Id + "'>" + p.DisName + "</span>";
                $(".region").append(option);
            }
        }); 

        // 将当前选中项的值添加当前选择框中
        $(".chooseCity .c").html($(this).html())

        // 然后将第三项的值设置为导入的对应数据的第一项
        $(".chooseCity .q").html($(".chooseCityList .region span:nth-child(1)").html())

        // 隐藏当前列表
        $(this).parent().hide();

        // 清空用于切换的 class
        $(".chooseCity span").removeClass("active")

        // 用于防止某些地区没有区级区域
        if ($(".chooseCity .q").find("span").length == 0) {
            $(".chooseCity .q").html($(".chooseCity .c").html())
        }

    }); 

    // 绑定第三项点击事件
    $(".chooseCity .q").on("click", function () {

        // 如果选项内无内容，则取消点击事件
        if ($(".chooseCityList .region").find("span").length == 0) {
            return;
        } else {
            bindClick($(".chooseCity .q"), $(".region"))
        }
        
    })

    // 第三项下面的 span 绑定点击事件
    $(".region").on("click", "span", function () {

        // 当前项添加提示
        $(this).addClass("active").siblings().removeClass("active");

        // 将当前选中项的值添加当前选择框中
        $(".chooseCity .q").html($(this).html())

        // 清空用于切换的 class
        $(".chooseCity span").removeClass("active")

        // 隐藏当前列表
        $(this).parent().hide();
    })

    // 选择框点击事件
    function bindClick (target, el) {
        target.toggleClass("active").siblings().removeClass("active");
        if (target.hasClass("active")) {
            el.show().siblings().hide();
        } else {
            el.hide();
        }
    }
    
})
