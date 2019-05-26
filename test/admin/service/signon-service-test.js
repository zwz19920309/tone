
const expect = require('chai').expect
const signonService = require('../../../services/admin/signon-service')
describe('test signonService service', () => { // 签到服务
  it('test getSignonList sucess', async () => { // 签到列表
    let res = await signonService.getSignonList({ platform_id: 1, page: 1, pageSize: 10 })
    console.log('@@##res:' + JSON.stringify(res))
    expect(res.total).to.be.equal(1)
  })
  it('test addSignon sucess', async () => { // 添加签到
    let res = await signonService.addSignon({ platform_id: 55, name: '嘻嘻111', rule_desc: '嘻嘻111', checkintype_id: 1 })
    console.log('@@##res:' + JSON.stringify(res))
    expect(res.affectedRows).to.be.equal(1)
  })
  it('test upDateSignonInfo sucess', async () => { // 更新签到
    let res = await signonService.upDateSignonInfo({ name: '签到123', checkintype_id: 5, rule_desc: '签到123', cycle_text: JSON.stringify({ type: 1, name: '月', number: 0 }), extra_text: JSON.stringify({}) }, { id: 86 })
    console.log('@@##res:' + JSON.stringify(res))
    expect(res.affectedRows).to.be.equal(1)
  })
  it('test getSignonNotInList sucess', async () => { // 获取某应用未配置的模板列表
    let res = await signonService.getSignonNotInList({ sceneId: 45, platform_id: 1 })
    console.log('@@##res:' + JSON.stringify(res))
    expect(res.total).to.be.equal(2)
  })
  it('test getSignonById sucess', async () => { // 签到列表
    let res = await signonService.getSignonById({ id: 86 })
    console.log('@@##res:' + JSON.stringify(res))
    expect(res.id).to.be.equal(86)
  })

  it('test upDateSignon sucess', async () => { // 更新签到奖品
    let res = await signonService.upDateSignon({
      prizes_text: JSON.stringify({
        prizes: [{
          '1': [
            {
              'prize_id': 6,
              'prize_num': 1
            }
          ]
        }
        ]
      })
    }, { id: 86 })
    console.log('@@##res:' + JSON.stringify(res))
    expect(res.affectedRows).to.be.equal(1)
  })
  it('test upDateSignonConsums sucess', async () => { // 更新签到列表
    let res = await signonService.upDateSignonConsums({
      'extra_text': JSON.stringify({
        'consumes': [
          {
            '2019-05-05': [
              {
                'prize_id': 6,
                'prize_num': 1
              }
            ]
          }
        ]
      })
    }, { id: 86 })
    console.log('@@##res:' + JSON.stringify(res))
    expect(res.affectedRows).to.be.equal(1)
  })
  it('test deleteSignon sucess', async () => { // 签到列表
    let res = await signonService.deleteSignon({ ids: [86, 89] })
    console.log('@@##res:' + JSON.stringify(res))
    expect(res.affectedRows).to.be.equal(2)
  })
})