
const expect = require('chai').expect
const platformService = require('../../../services/admin/platform-service')
describe('test platform service', () => { // 奖品服务
  it('test platform sucess', async () => { // 奖品列表
    let res = await platformService.getPlatFormList({})
    console.log('@@##res:' + JSON.stringify(res))
    expect(res.length).to.be.equal(2)
  })
})