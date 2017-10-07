实现一个解析 `url` 的方法

----

### 将 url 的查询参数解析成字典对象

```js
// 使用 getQueryObject(url).userId
function getQueryObject(url) {

    url = url == null ? window.location.href : url;

    var search = url.substring(url.lastIndexOf("?") + 1);
    var obj = {};
    var reg = /([^?&=]+)=([^?&=]*)/g;

    search.replace(reg, function (rs, $1, $2) {
        var name = decodeURIComponent($1);
        var val = decodeURIComponent($2);
        val = String(val);
        obj[name] = val;
        return rs;
    });

    return obj;

}
```