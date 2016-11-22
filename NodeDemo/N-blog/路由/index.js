var express = require("express");
var app = express();
var indexRouter = require("./routes/index")
var userRouter = require("./routes/users")

app.use("/", indexRouter);

app.use("/users", userRouter);

app.listen("3000", function (req, res) {
    console.log("app is running at port 3000");
})

