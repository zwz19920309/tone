
const expect = require('chai').expect
const userawardService = require('../../../services/admin/useraward-service')

describe('test userawardService service', () => { // 奖品服务
  it('test getUserAwardListBySceneId sucess', async () => { // 奖品列表
    let res = await userawardService.getUserAwardListBySceneId({ uid: '111', scene_id: 63, page: 1, pageSize: 10 })
    console.log('@@##res:' + JSON.stringify(res))
    expect(res.total).to.be.equal(3)
  })
})
