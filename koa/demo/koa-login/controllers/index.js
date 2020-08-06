// 处理首页 GET
module.exports = {
  'GET /': async (ctx, next) => {
    ctx.render('index.html', {
      title: 'Welcome'
    });
  }
};
