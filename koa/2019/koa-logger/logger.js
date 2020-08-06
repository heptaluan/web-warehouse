// generator 版本
// function log(ctx) {
//   console.log(ctx)
// }

// module.exports = function() {
//   return function* (next) {
//     log(this)
//     if (next) {
//       yield next
//     }
//   }
// }

// async 版本
function log(ctx) {
  console.log(ctx)
}

module.exports = function () {
  return async function (ctx, next) {
    log(ctx)
    await next()
  }
}