
// const assert = require('assert')
// const expect = require('chai').expect
// const signrecordService = require('../../../services/admin/signrecord-service')
// describe('test signrecord service', () => { // 奖品服务
//   it('test getPrizeList sucess', async () => { // 奖品列表
//     let res = await signrecordService.get({ platform_id: 1, page: 1, pageSize: 10 })
//     console.log('@@##res:' + JSON.stringify(res))
//     expect(res.total).to.be.equal(3)
//   })
//   it('test getPrizeById sucess', async () => { // 根据id获取奖品陈功
//     let res = await prizeService.getPrizeById({ id: 57 })
//     console.log('@@##res:' + JSON.stringify(res))
//     expect(res.id).to.be.equal(57)
//   })
//   it('test getPrizeById fail', async () => { // 根据id获取奖品 失败
//     let res = await prizeService.getPrizeById({ id: 57 })
//     console.log('@@##res:' + JSON.stringify(res))
//     expect(res.id).to.not.be.equal(57)
//   })
//   it('test addPrize sucess', async () => { // 添加奖品
//     let res = await prizeService.addPrize({ plaform_id: 1, name: '奖品100', note: '奖品描述100', icon: '/public/prize/1.jpg' })
//     console.log('@@##res:' + JSON.stringify(res))
//     expect(res.affectedRows).to.be.equal(1)
//   })
//   it('test updatePrize sucess', async () => { // 更新奖品
//     let res = await prizeService.updatePrize({ id: 61, name: '奖品1001', note: '奖品描述100', icon: '/public/prize/1.jpg' })
//     console.log('@@##res:' + JSON.stringify(res))
//     expect(res.affectedRows).to.be.equal(1)
//   })
//   it('test updatePrize fail', async () => { // 更新奖品
//     let res = await prizeService.updatePrize({ id: 1, name: '奖品100', note: '奖品描述100', icon: '/public/prize/1.jpg' })
//     console.log('@@##res:' + JSON.stringify(res))
//     expect(res.affectedRows).to.be.equal(0)
//   })
//   it('test bulkDeletePrize sucess', async () => { // 删除奖品
//     let res = await prizeService.bulkDeletePrize({ ids: [64, 63] })
//     console.log('@@##res:' + JSON.stringify(res))
//     expect(res.affectedRows).to.not.be.equal(0)
//   })
//   it('test bulkDeletePrize fail', async () => { // 删除奖品
//     let res = await prizeService.bulkDeletePrize({ ids: [99] })
//     console.log('@@##res:' + JSON.stringify(res))
//     expect(res.affectedRows).to.be.equal(0)
//   })
// })