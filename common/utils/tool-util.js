const config = require('../../config/config')
const moment = require('moment')
const removeDuplication = (arr1, arr2) => {
  let c = []
  arr1.forEach((item) => {
    if (arr2.indexOf(item) === -1) c.push(item)
  })
  return c
}

const attributeCount = (obj) => {
  var count = 0
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      count++
    }
  }
  return count
}

const prefixImgUrl = (imgs) => {
  if (imgs instanceof Array) {
    imgs.forEach(img => {
      img.icon = config.base + '/' + img.icon
    })
  } else {
    imgs.icon = config.base + '/' + imgs.icon
  }
}

const getPrizeIndex = (dateType, startDate, number) => {
  let startAt
  let endAt
  let days
  let less
  switch (dateType) {
    case 2: // 周
      startAt = moment().startOf('week')
      startAt = moment(startAt).add(1, 'days').format('YYYY-MM-DD')
      endAt = moment().endOf('week')
      endAt = moment(endAt).add(1, 'days').format('YYYY-MM-DD')
      break
    case 3: // 月
      startAt = moment().startOf('month')
      endAt = moment().endOf('month')
      break
    case 4: // 年
      startAt = moment().startOf('year')
      endAt = moment().endOf('year')
      break
    case 5: // 自定义
      days = moment().diff(startDate, 'days')
      less = days % number
      startAt = moment().subtract(less, 'day').format('YYYY-MM-DD')
      endAt = moment().format('YYYY-MM-DD')
      break
  }
  return {
    startAt: startAt,
    endAt: endAt
  }
}
module.exports = {
  removeDuplication,
  attributeCount,
  prefixImgUrl,
  getPrizeIndex
}
