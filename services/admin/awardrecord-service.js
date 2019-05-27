const DBHelper = require('../../common/db/db-helper')

/**
  * 获取奖励记录
  * @method  getAwardRecordList
  * @param  {object} params - 参数
  * @return {object} 奖励记录
 */
const getAwardRecordList = async (params) => {
  let res = await DBHelper.getAwardRecordList(params)
  return res
}
module.exports = {
  getAwardRecordList
}
