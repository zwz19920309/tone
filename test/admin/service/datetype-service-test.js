
const expect = require('chai').expect
const dateypeService = require('../../../services/admin/datetype-service')
describe('test datetype service', () => { // 奖品服务
  it('test datetype sucess', async () => { // 奖品列表
    let res = await dateypeService.getDateTypeList({})
    console.log('@@##res:' + JSON.stringify(res))
    expect(res.length).to.be.equal(5)
  })
})