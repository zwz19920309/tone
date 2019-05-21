const moment = require('moment')
const HttpResult = require('../../common/http/http-result')
const signrecordService = require('../../services/admin/signrecord-service')

// 用户当日签到
const userSignon = async (ctx) => {
  let { uid, sceneid } = ctx.request.body
  let nowDate = moment().format('YYYY-MM-DD')
  let signRecord = await signrecordService.getUserSignRecord({ uid: uid, scene_id: sceneid, created_at: nowDate })
  if (signRecord) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '今日已签到'))
  }
  let pRes = await signrecordService.getTodaySignonPrizes({ uid: uid, scene_id: sceneid, nowDate: moment().format('YYYY-MM-DD HH:mm:ss') })
  let params = { prizes: [] }
  pRes.prizes.forEach(prize => {
    params.prizes.push([uid, prize.prize_id, parseInt(prize.prize_num), sceneid, nowDate, 1])
  })
  let res = await signrecordService.userSignonAward({ prizes: params.prizes, continues: pRes.continues, record: { uid: uid, scene_id: sceneid, created_at: nowDate } })
  if (!res) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_DB, null, '操作异常'))
  }
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: pRes.prizes }, 'SUCCESS')
}
// 用户补签
const reSignon = async (ctx) => {
  let { uid, date, sceneid } = ctx.request.body
  if (!date) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '参数缺失'))
  }
  if (moment(date).valueOf() >= moment().valueOf()) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '补签日期不合法'))
  }
  let signRecord = await signrecordService.getUserSignRecord({ uid: uid, scene_id: sceneid, created_at: date })
  if (signRecord) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '该日已签到'))
  }
  let pRes = await signrecordService.getTodaySignonPrizes({ uid: uid, scene_id: sceneid, nowDate: date })
  let params = { prizes: [], record: { uid: uid, scene_id: sceneid, created_at: date }, continueDate: pRes.continueSign }
  pRes.prizes.forEach(prize => {
    params.prizes.push([uid, prize.prize_id, prize.prize_num, sceneid, moment().format('YYYY-MM-DD'), 1])
  })
  let res = await signrecordService.userSignonAward(params)
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: res }, 'SUCCESS')
}

// 用户签到累计信息
const getSelfSignon = async (ctx) => {
  let { uid, sceneid } = ctx.request.body
  let signRecord = await signrecordService.getUserSignRecord({ uid: uid, scene_id: sceneid, created_at: moment().format('YYYY-MM-DD') })
  let signons = await signrecordService.getSelfSignon({ uid: uid, scene_id: sceneid })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: signons, is_signon: (signRecord ? 1 : 0) }, 'SUCCESS')
}
module.exports = {
  userSignon,
  reSignon,
  getSelfSignon
}
