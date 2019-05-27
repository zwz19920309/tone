const ToolUtil = require('../../common/utils/tool-util')
const HttpResult = require('../../common/http/http-result')
const userawardService = require('../../services/admin/useraward-service')
// 获取奖励记录
const getUserAwardListBySceneId = async (ctx) => {
  let { sceneid, uid, page, size } = ctx.request.body
  let { total, rows } = await userawardService.getUserAwardListBySceneId({ scene_id: sceneid, uid: uid, page: parseInt(page) || 1, pageSize: parseInt(size) || 10 })
  ToolUtil.prefixImgUrl(rows)
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: rows, total: total }, 'SUCCESS')
}

// 消费用户奖励
const consumeUserAward = async (ctx) => {
  let { sceneid, uid, consumes } = ctx.request.body
  if (!consumes || !consumes.length) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '参数不合法'))
  }
  consumes.forEach(ele => {
    if (parseInt(ele.number) <= 0) {
      return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '参数number不合法'))
    }
  })
  let result = await userawardService.consumeUserAward({ scene_id: sceneid, uid: uid, consumes: consumes })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, result, 'SUCCESS')
}
module.exports = {
  getUserAwardListBySceneId,
  consumeUserAward
}
