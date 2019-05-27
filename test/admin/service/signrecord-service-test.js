
const assert = require('assert')
const expect = require('chai').expect
const signrecordService = require('../../../services/admin/signrecord-service')
describe('test signrecord service', () => { // 签到记录服务
  it('test getUserSignRecord sucess', async () => { // 获取用户某次签到
    let res = await signrecordService.getUserSignRecord({ uid: 10, scene_id: 63, created_at: '2019-05-21' })
    console.log('@@##res:' + JSON.stringify(res))
    expect(res.uid).to.be.equal('10')
  })
  it('test getSumUserSignRcord sucess', async () => { // 获取用户时间内签到次数
    let res = await signrecordService.getSumUserSignRcord({ uid: 13, scene_id: 63, start_at: '2019-05-18', end_at: '2019-06-18' })
    console.log('@@##res:' + JSON.stringify(res))
    expect(res).to.be.equal(4)
  })
  it('test getTodaySignonPrizes sucess', async () => { // 获取应用某天的签到奖励
    let res = await signrecordService.getTodaySignonPrizes({ scene_id: 63, nowDate: '2019-05-27' })
    console.log('@@##res:' + JSON.stringify(res))
    expect(res).to.be.equal(4)
  })
  it('test getTodaySignonConsums sucess', async () => { // 获取应用某天的签到消耗
    let res = await signrecordService.getTodaySignonConsums({ scene_id: 63, date: '2019-05-05' })
    console.log('@@##res:' + JSON.stringify(res))
    expect(res.length).to.be.equal(2)
  })
  it('test getTodaySignonConsums sucess', async () => { // 获取应用某天的签到消耗
    let res = await signrecordService.getTodaySignonConsums({ scene_id: 63, date: '2019-05-05' })
    console.log('@@##res:' + JSON.stringify(res))
    expect(res.length).to.be.equal(2)
  })
  it('test userSignonAward sucess', async () => { // 记录签到记录，获取签到奖励，更新签到周期
    // { prizes: [], record: { uid: params.uid, scene_id: params.sceneid, created_at: params.date }, continues: params.continues }
    let award = {
      prizes: [['111', 57, 2, 63, '2018-09-02', 1], ['111', 58, 4, 63, '2018-09-02', 1]],
      record: { uid: '111', scene_id: 63, created_at: '2018-09-09' },
      continues: [{ uid: '111', first_sign_date: '2019-09-09', last_award_date: '', scene_sign_id: 105 }]
    }
    let res
    try {
      res = await signrecordService.userSignonAward(award)
      console.log('@@##res:' + JSON.stringify(res))
    } catch (e) {
      console.log('@@error: -------------------')
      console.log(e)
    }
    expect(res).to.be.equal(true)
  })
  it('test getSelfSignon sucess', async () => { // 获取应用某天的签到消耗
    let res = await signrecordService.getSelfSignon({ scene_id: 63, uid: 10 })
    console.log('@@##res:' + JSON.stringify(res))
    expect(res.length).to.be.equal(1)
  })
})
