const HttpResult = require('../../common/http/http-result')
const platformService = require('../../services/admin/platform-service')

// 获取平台列表
const getPlatFormList = async (ctx) => {
  let { user } = ctx.request.body
  let platformList = await platformService.getPlatFormList()
  platformList.forEach((platform, index) => {
    platform.index = '1-' + (index + 1)
    platform.submenus = [
      { index: (platform.index + '-1'), path: 'sceneList?platformId=' + platform.id, name: '应用' },
      { index: (platform.index + '-2'), path: 'signonList?platformId=' + platform.id, name: '模板' },
      { index: (platform.index + '-3'), path: 'awardList?platformId=' + platform.id, name: '奖品' },
      { index: (platform.index + '-4'), path: 'awardRecordList?platformId=' + platform.id, name: '奖励记录' }
    ]
  })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: platformList, user: user }, 'SUCCESS')
}

// 获取平台列表
const addPlatForm = async (ctx) => {
  let { name } = ctx.request.body
  if (!name) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '参数缺失'))
  }
  let result = await platformService.addPlatForm({ name: name })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, result, 'SUCCESS')
}
// 修改场景
const updatePlatForm = async (ctx) => {
  let { name, id } = ctx.request.body
  if (!id) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '参数id缺失'))
  }
  let platForm = await platformService.findOnePlatForm({ id: id })
  let result = await platformService.updatePlatForm({ name: name || platForm.name, id: id })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, result, 'SUCCESS')
}

// 删除场景
const bulkDeletePlatForm = async (ctx) => {
  let { ids } = ctx.request.body
  if (!ids) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '参数ids缺失'))
  }
  let plateForm = await platformService.bulkDeletePlatForm({ ids: ids })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, plateForm, 'SUCCESS')
}

module.exports = {
  getPlatFormList,
  addPlatForm,
  updatePlatForm,
  bulkDeletePlatForm
}
