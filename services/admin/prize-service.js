const DBHelper = require('../../common/db/db-helper')

// const getPrizeList = async (params, type) => {
//   let prizeList = []
//   if (type && type === 1) {
//     prizeList = await DBHelper.getPrizeListNotInId(params)
//   } else {
//     prizeList = await DBHelper.getPrizeListInId(params)
//   }
//   return prizeList
// }
// /**
//   * 获取奖品列表
//   * @method getprizeList
//   * @param  {object} params - 参数
//   * @param {object} type - 奖品条件
//   * @return {object} 奖品列表
//  */
const getPrizeList = async (params) => {
  let prizeList = await DBHelper.getPrizeList(params)
  return prizeList
}

const getPrizeListInId = async (params) => {
  let prizeList = await DBHelper.getPrizeListInId(params)
  return prizeList
}

const getPrizeListNotInId = async (params) => {
  let prizeList = await DBHelper.getPrizeListNotInId(params)
  return prizeList
}

const getPrizeListAllInId = async (params) => {
  let prizeList = await DBHelper.getPrizeListAllInId(params)
  return prizeList
}
/**
  * 增加奖品
  * @method addPrize
  * @param  {object} params -奖品参数
  * @return {object} 增加结果
 */
const addPrize = async (params) => {
  let result = await DBHelper.savePrize(params)
  return result
}
/**
  * 根据id查找奖品
  * @method addPrize
  * @param  {object} params -奖品参数
  * @return {object} 增加结果
 */
const getPrizeById = async (params) => {
  let result = await DBHelper.getPrizeById(params)
  return result
}
/**
  * 更新奖品数据
  * @method updatePrize
  * @param  {object} params -奖品参数
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const updatePrize = async (params) => {
  let result = await DBHelper.updatePrize(params)
  return result
}

/**
  * 删除奖品数据
  * @method deletePrize
  * @param  {object} params -奖品参数
  * @cons  {object} cons -更新条件
  * @return {object} 更新结果
 */
const bulkDeletePrize = async (params) => {
  let result = await DBHelper.bulckDetelePrize(params)
  return result
}

module.exports = {
  getPrizeList,
  addPrize,
  updatePrize,
  bulkDeletePrize,
  getPrizeById,
  getPrizeListInId,
  getPrizeListAllInId,
  getPrizeListNotInId
}
