const HttpResult = require('../../common/http/http-result')
const scenesignService = require('../../services/admin/scenesign-service')

// 批量增加场景签到
const bulkAddScenesign = async (ctx) => {
  let { scenesignons } = ctx.request.body
  if (!(scenesignons && scenesignons.length)) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '参数scenesignons缺失'))
  }
  let paramsArr = []
  scenesignons.forEach(ele => {
    paramsArr.push([ele.sceneid, ele.signonid, ele.start, ele.end])
  })
  let scenesign = await scenesignService.bulkCreateScenesign(paramsArr)
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, scenesign, 'SUCCESS')
}

// 批量删除场景签到
const bulkDeleteScenesign = async (ctx) => {
  let { scenesignons } = ctx.request.body
  if (!scenesignons) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '参数scenesignons缺失'))
  }
  let signonIds = []
  let sceneId
  scenesignons.forEach(ele => {
    signonIds.push(ele.signonid)
    sceneId = ele.sceneid
  })
  let result = await scenesignService.bulkDeleteScenesign({ signonIds: signonIds, sceneId: sceneId })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { res: result }, 'SUCCESS')
}

module.exports = {
  bulkAddScenesign,
  bulkDeleteScenesign
}
