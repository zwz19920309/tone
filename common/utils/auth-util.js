const HttpResult = require('../../common/http/http-result')
const api = require('../../common/api/api')
// 校验权限 哪里需要加上校验就加上此中间件
const checkAuth = async (ctx, next) => {
  let token = ctx.cookies.get('admin_token')
  if (!token) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, 'token参数缺失'))
  }
  let user = await api.getUserInfoByToken(token)
  if (!user) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_USER, null, '用户不存在,请重新登录'))
  }
  ctx.request.body.user = user
  return next()
}
module.exports = {
  checkAuth
}
