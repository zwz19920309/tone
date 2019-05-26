
const expect = require('chai').expect
const sceneService = require('../../../services/admin/scene-service')
describe('test sceneService service', () => { // 奖品服务
  it('test getSceneList sucess', async () => { // 奖品列表
    let res = await sceneService.getSceneList({ platform_id: 1, page: 1, pageSize: 10 })
    console.log('@@##res:' + JSON.stringify(res))
    expect(res.total).to.be.equal(5)
  })
  it('test findOneScene sucess', async () => { // 奖品列表
    let res = await sceneService.findOneScene({ id: 44 })
    console.log('@@##res:' + JSON.stringify(res))
    expect(res.id).to.be.equal(44)
  })
  it('test findOneSceneByAppId sucess', async () => { // 奖品列表
    let res = await sceneService.findOneSceneByAppId({ app_id: '9ce0ca7c59355cd800f5', app_secret: '545b5590898e191c718ec7376dbcfdb1' })
    console.log('@@##res:' + JSON.stringify(res))
    expect(res.app_id).to.be.equal('9ce0ca7c59355cd800f5')
  })
  it('test addScene sucess', async () => { // 奖品列表
    let res = await sceneService.addScene({ name: '测试', note: '测试', platform_id: 10 })
    console.log('@@##res:' + JSON.stringify(res))
    expect(res.affectedRows).to.be.equal(1)
  })
  it('test updateScene sucess', async () => { // 奖品列表
    let res = await sceneService.updateScene({ id: 55, name: '嘻嘻', note: '哈哈12345' })
    console.log('@@##res:' + JSON.stringify(res))
    expect(res.affectedRows).to.be.equal(1)
  })
  it('test bulkDeleteScene sucess', async () => { // 奖品列表
    let res = await sceneService.bulkDeleteScene({ ids: [58, 59] })
    console.log('@@##res:' + JSON.stringify(res))
    expect(res.affectedRows).to.be.equal(2)
  })
})