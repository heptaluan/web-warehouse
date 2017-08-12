var http  = require("http");
var url = require("url");

function open (route, handle) {
    http.createServer(function (req, res) {

        var postData = "";
        var pathname = url.parse(req.url).pathname;
        
        console.log("Res for " + pathname + " received" )

        req.setEncoding("utf-8");

        req.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
            console.log(postDataChunk)
        });

        req.addListener("end", function () {
            route(handle, pathname, res, postData)
        })

    }).listen(3000)
}

exports.open = open;

