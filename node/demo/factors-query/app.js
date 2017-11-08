var express = require("express");
var app = express();
var constroller = require("./controllers/constroller.js")

app.set("view engine", "ejs");

app.get("/", constroller.showIndex);
app.get("/:number", constroller.showResult);

app.use(express.static("public"))

app.listen(3000);