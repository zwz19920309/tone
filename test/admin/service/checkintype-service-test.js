
const expect = require('chai').expect
const checkintypeService = require('../../../services/admin/checkintype-service')
describe('test checkintype service', () => { // 奖品服务
  it('test checkintype sucess', async () => { // 奖品列表
    let res = await checkintypeService.getCheckInTypeList({})
    console.log('@@##res:' + JSON.stringify(res))
    expect(res.length).to.be.equal(3)
  })
})