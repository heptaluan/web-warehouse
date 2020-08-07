var path = require("path");

module.exports = {
  entry: {
    a: "./src/script/a.js",
    b: "./src/script/b.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist/js"),
    // filename: "[name]-[hash].js"
    filename: "[chunkhash].js"
  }
}