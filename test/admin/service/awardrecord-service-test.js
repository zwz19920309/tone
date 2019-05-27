
const expect = require('chai').expect
const awardrecordService = require('../../../services/admin/awardrecord-service')

describe('test awardrecordService service', () => { // 奖品服务
  it('test getUserAwardListBySceneId sucess', async () => { // 奖品列表
    let res = await awardrecordService.getAwardRecordList({ platform_id: 1, page: 1, pageSize: 10 })
    console.log('@@##res:' + JSON.stringify(res))
    expect(res.total).to.be.equal(6)
  })
})
