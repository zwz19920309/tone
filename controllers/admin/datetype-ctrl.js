const HttpResult = require('../../common/http/http-result')
const datetypeService = require('../../services/admin/datetype-service')

// 获取日期类型类表
const getDateTypeList = async (ctx) => {
  let { type } = ctx.request.body
  let dateTypeList
  (!type) && (type = 0)
  type = parseInt(type)
  if (type === 0) {
    dateTypeList = await datetypeService.getDateTypeList()
  } else {
    dateTypeList = await datetypeService.getDateTypeListByType(type)
  }
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: dateTypeList }, 'SUCCESS')
}

module.exports = {
  getDateTypeList
}
