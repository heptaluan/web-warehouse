function ajax(json) {
    var type = json.type || 'GET';
    var url = json.url;
    var success = json.success;
    var error = json.error || false;
    var data = json.data || '';
    var oAjax;
    //创建ajax对象
    if(window.XMLHttpRequest){
        oAjax = new XMLHttpRequest();
    }else{
        oAjax = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //连接服务器
    oAjax.open(type,url,true);
    //发送请求
    oAjax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    oAjax.send(data);
    oAjax.onreadystatechange = function(){
        if(oAjax.readyState == 4){
            if(oAjax.status == 200){
                var data = oAjax.responseText;
                success(data);
            }else{
                if(error){
                    error();
                }
            }
        }
    }
}