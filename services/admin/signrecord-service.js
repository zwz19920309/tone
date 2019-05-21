const moment = require('moment')
const DBHelper = require('../../common/db/db-helper')
const continuesignService = require('../../services/admin/continuesign-service')
const ToolUtil = require('../../common/utils/tool-util')
/**
  * 获取签到类型列表
  * @method  getCheckInTypeList
  * @param  {object} params - 参数
  * @return {object} 签到类型列表
 */
const addSignRecord = async (params) => {
  let res = await DBHelper.bulkSaveSignRcord(params)
  return res
}

/**
  * 获取签到类型列表
  * @method  getCheckInTypeList
  * @param  {object} params - 参数
  * @return {object} 签到类型列表
 */
const getUserSignRecord = async (params) => {
  let res = await DBHelper.getUserSignRecord(params)
  return res
}

/**
  * 获取签到类型列表
  * @method  getCheckInTypeList
  * @param  {object} params - 参数
  * @return {object} 签到类型列表
 */
const getSumUserSignRcord = async (params) => {
  let res = await DBHelper.getSumUserSignRcord(params)
  return res
}

/**
  * 今天签到得到奖励
  * @method getTodaySignonPrizes
  * @param  {object} params -参数
  * @return {object} 更新结果
 */
const getTodaySignonPrizes = async (params) => {
  let signonList = await DBHelper.getSignonListInId({ sceneId: params.scene_id })
  // let result = { prizes: [], continueSign: { uid: params.uid, first_sign_date: '', last_award_date: '' } }
  let res = []
  for (let m = 0; m < signonList.rows.length; m++) {
    let signon = signonList.rows[m]
    let startAt = moment(signon.start_at).valueOf()
    let endAt = moment(signon.end_at).valueOf()
    let nowAt = moment(params.nowDate).valueOf()
    if ((nowAt < endAt) && (nowAt >= startAt)) { // 签到活动时间内
      switch (signon.checkintype_id) {
        case 1:
          let p = signon.prizes_text ? (signon.prizes_text.prizes[0] ? (signon.prizes_text.prizes[0][1] ? signon.prizes_text.prizes[0][1] : 0) : 0) : 0
          if (p) {
            res.push({ prizes: p, type: 1 })
          }
          break
        case 2:
          let index = 1
          let yearsToday = moment(params.nowDate).subtract(1, 'days').format('YYYY-MM-DD')
          let yearsToadyRecord = await DBHelper.getUserSignRecord({ uid: params.uid, scene_id: params.scene_id, created_at: yearsToday })
          if (yearsToadyRecord) { // 未断签
            // 签到新周期初始日期以及上一周期奖励日期
            let signRecord = await continuesignService.getContinueSignRcord({ uid: params.uid, scene_sign_id: signon.scene_sign_id })
            if (signRecord) {
              if (signRecord.last_award_date) {
                if (!(moment(signRecord.last_award_date).format('YYYY-MM-DD') === moment(params.nowDate).subtract(1, 'days').format('YYYY-MM-DD'))) {
                  index = moment(params.nowDate).diff(moment(signRecord.first_sign_date), 'days') + 1
                }
              } else {
                index = moment(params.nowDate).diff(moment(signRecord.first_sign_date), 'days') + 1
              }
            }
          }
          let ps = signon.prizes_text ? (signon.prizes_text.prizes[0] ? signon.prizes_text.prizes[0][index] ? signon.prizes_text.prizes[0][index] : [] : []) : []
          let pdata = { prizes: ps, type: 2, continue: { uid: params.uid, first_sign_date: '', last_award_date: '', scene_sign_id: signon.scene_sign_id } }
          if ((index === 1) || (index === signon.cycle_text.number)) { // 新周期第一次签到日期 以及 上一期介素结束日
            index === 1 ? pdata.continue.first_sign_date = moment(params.nowDate).format('YYYY-MM-DD') : pdata.continue.last_award_date = moment(params.nowDate).format('YYYY-MM-DD')
          }
          res.push(pdata)
          break
        case 3:
          let dates = ToolUtil.getPrizeIndex(signon.cycle_text.type, signon.start_at, signon.cycle_text.number) // 最新签到周期到今日时间段
          let nIndex = await DBHelper.getSumUserSignRcord({ uid: params.uid, scene_id: params.scene_id, start_at: dates.startAt, end_at: dates.endAt })
          nIndex = nIndex + 1
          let lps = signon.prizes_text ? (signon.prizes_text.prizes[0] ? signon.prizes_text.prizes[0][nIndex] ? signon.prizes_text.prizes[0][nIndex] : [] : []) : []
          res.push({ prizes: lps, type: 3 })
      }
    }
  }
  let result = { prizes: [], continues: [] }
  res.forEach(ele => {
    if (ele.prizes.length) {
      result.prizes = result.prizes.concat(ele.prizes)
    }
    if (ele.continue) {
      if ((ele.continue.first_sign_date || ele.continue.last_award_date)) {
        result.continues.push(ele.continue)
      }
    }
  })
  return result
}
/**
  * 获取签到类型列表
  * @method  getCheckInTypeList
  * @param  {object} params - 参数
  * @return {object} 签到类型列表
 */
const userSignonAward = async (params) => {
  let res = await DBHelper.userSignonAward(params)
  return res
}

/**
  * 签到情况
  * @method getTodaySignonPrizes
  * @param  {object} params -参数
  * @return {object} 更新结果
 */
const getSelfSignon = async (params) => {
  let signonList = await DBHelper.getSignonListInId({ sceneId: params.scene_id })
  let validSignons = []
  for (let m = 0; m < signonList.rows.length; m++) {
    let signon = signonList.rows[m]
    let signonStartAt = moment(signon.start_at).valueOf()
    let signondAt = moment(signon.end_at).valueOf()
    let nowAt = moment().valueOf()
    if ((nowAt < signondAt) && (nowAt > signonStartAt)) { // 签到活动时间内, 有效签到
      switch (signon.checkintype_id) {
        case 1: // 每日签到
          break
        case 2: // 连续签到
          signon.complete_count = 0
          let signRecord = await continuesignService.getContinueSignRcord({ uid: params.uid, scene_sign_id: signon.scene_sign_id })
          if (!signRecord) { // 无第一次签到时间，默认为新周期第一次访问
            break
          }
          let toadyRecord = await DBHelper.getUserSignRecord({ uid: params.uid, scene_id: params.scene_id, created_at: moment().format('YYYY-MM-DD') })
          if (toadyRecord) { // 今天已经签到
            let totalCount = await DBHelper.getSumUserSignRcord({ uid: params.uid, scene_id: params.scene_id, start_at: signRecord.first_sign_date, end_at: moment().format('YYYY-MM-DD') }) // 新周期开始到今天结束统计的签到次数
            signon.complete_count = totalCount
            break
          }
          let yearsToday = moment().subtract(1, 'days').format('YYYY-MM-DD')
          // 昨天签到情况
          let yearsToadyRecord = await DBHelper.getUserSignRecord({ uid: params.uid, scene_id: params.scene_id, created_at: yearsToday })
          // 查出新周期第一次签到日期
          // 可补签条件下的断签判断
          // (1) 昨天没签到而且昨天不是可补签日期
          // (2) 昨天没签到但是可补签日期 首先查出（a: 从昨天起的连续可补签日期天数) ( b: 昨天到最新签到周期第一天的间隔天数) (c:  昨天到最新签到周期第一天的实际签到天数) （c < b-a）为断签
          if (signon.extra_text && signon.extra_text.resign && signon.extra_text.resign.resign) { // 支持补签
            signon.need_resign = 0 // 是否需要补签
            if ((!yearsToadyRecord && !(signon.extra_text.resign.resign_dates.indexOf(yearsToday) >= 0))) { // (昨天没签到而且昨天不是可补签日期)
              // console.log('@断签')
              signon.complete_count = 0
            } else if (!yearsToadyRecord && (signon.extra_text.resign.resign_dates.indexOf(yearsToday) >= 0)) { // (昨天没签到而且昨天是可补签日期)
              if (signRecord) { // 存在新周期第一次签到
                let b = moment().subtract(1, 'days').diff(moment(signRecord.first_sign_date), 'days') + 1 // 昨天与新周期第一天的天数差
                let dates = [] // 昨天开始的可连续补签日期
                for (let m = 1; m <= b; m++) {
                  let dateStr = moment().subtract(m, 'days').format('YYYY-MM-DD')
                  if (!(signon.extra_text.resign.resign_dates.indexOf(dateStr) >= 0)) {
                    break
                  }
                  dates.push(moment().subtract(m, 'days').format('YYYY-MM-DD'))
                }
                let a = dates.length
                let c = await DBHelper.getSumUserSignRcord({ uid: params.uid, scene_id: params.scene_id, start_at: signRecord.first_sign_date, end_at: yearsToday }) // 新周期开始到昨天结束统计的签到次数
                if ((b - a) > c) { // 排除可补签日期后， 新周期到昨天实签次数少于排除后的日期，判断为断签
                  // console.log('断签')
                  signon.complete_count = 0
                } else { // 未断签-可补签
                  signon.complete_count = c
                  signon.need_resign = 1 // 需要补签
                  signon.need_resign_dates = []
                  for (let n = 0; n < dates.length; n++) {
                    let res = await DBHelper.getUserSignRecord({ uid: params.uid, scene_id: params.scene_id, created_at: dates[n] })
                    if (!res) {
                      signon.need_resign_dates.push(dates[n])
                    }
                  }
                }
              }
            } else if (yearsToadyRecord) {
              // 签到新周期初始日期以及上一周期奖励日期
              if (signRecord.last_award_date) { // 存在上一周期奖励日期
                if (!(moment(signRecord.last_award_date).format('YYYY-MM-DD') === moment().subtract(1, 'days').format('YYYY-MM-DD'))) { // 昨天不是上一周期奖励日期
                  signon.complete_count = moment().diff(moment(signRecord.first_sign_date), 'days')
                }
              } else {
                signon.complete_count = moment().diff(moment(signRecord.first_sign_date), 'days')
              }
            }
          } else { // 非补签条件下的断签判断
            if (yearsToadyRecord) { // 未断签
              // 签到新周期初始日期以及上一周期奖励日期
              if (signRecord.last_award_date) {
                if (!(moment(signRecord.last_award_date).format('YYYY-MM-DD') === moment().subtract(1, 'days').format('YYYY-MM-DD'))) { // 昨天不是上一周期奖励日期
                  signon.complete_count = moment().diff(moment(signRecord.first_sign_date), 'days')
                }
              } else {
                signon.complete_count = moment().diff(moment(signRecord.first_sign_date), 'days')
              }
            } else {
              let todayRecord = await DBHelper.getUserSignRecord({ uid: params.uid, scene_id: params.scene_id, created_at: moment().format('YYYY-MM-DD') })
              if (todayRecord) {
                signon.complete_count = 1
              }
            }
          }
          break
        case 3: // 累计签到
          let dates = ToolUtil.getPrizeIndex(signon.cycle_text.type, signon.start_at, signon.cycle_text.number) // 最新签到周期到今日时间段
          let signSum = await DBHelper.getSumUserSignRcord({ uid: params.uid, scene_id: params.scene_id, start_at: dates.startAt, end_at: dates.endAt })
          signon.complete_count = signSum
      }
      validSignons.push(signon)
    }
  }
  return validSignons
}

module.exports = {
  addSignRecord,
  getSumUserSignRcord,
  getTodaySignonPrizes,
  userSignonAward,
  getUserSignRecord,
  getSelfSignon
}
