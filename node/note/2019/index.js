/// <reference path="./typings/index.d.ts" />

const ERROR_NO_LOGIN = 3001;

module.exports = function (req, res, next) {
  var path = req.path;

  // 首页或者登录页面不需要拦截
  if (path === '/' || path === '/user/login') {
    return next();
  }

  // 已经登录的话也不用进行操作
  if (req.session && req.session.user) {
    return next();
  }

  // 否则进行拦截判断
  if (req.xhr) {
    return res.send({ code: ERROR_NO_LOGIN, msg: '尚未登陆' });
  }

  // 否则返回首页
  res.redirect('/');
};