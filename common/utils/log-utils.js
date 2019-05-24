const log4js = require('log4js')
const logConfig = require('../../config/log-config')

// 加载配置文件
log4js.configure(logConfig)

let logUtil = {}
let errorLogger = log4js.getLogger('error')
let infoLogger = log4js.getLogger('info')
let consoleLogger = log4js.getLogger('console')

logUtil.error = function (error) {
  if (error) {
    errorLogger.error(error)
  }
}

logUtil.console = function (info) {
  if (info) {
    consoleLogger.info(info)
  }
}

logUtil.info = function (info) {
  if (info) {
    infoLogger.info(info)
    consoleLogger.info(info)
  }
}
// 错误写入error文件
console.error = errorLogger.error.bind(errorLogger)
// 封装错误日志
logUtil.logError = function (ctx, error, resTime) {
  if (ctx && error) {
    errorLogger.error(formatError(ctx, error, resTime))
    return formatError(ctx, error, resTime)
  }
}

// 封装响应日志
logUtil.logResponse = function (ctx, resTime) {
  if (ctx) {
    infoLogger.info(formatRes(ctx, resTime))
    // consoleLogger.info(formatRes(ctx, resTime))
    return formatError(ctx, resTime)
  }
}

// 格式化响应日志
let formatRes = function (ctx, resTime) {
  let logText = ''
  // 响应日志开始
  logText += '\n' + '*************** response log start ***************' + '\n'
  // 添加请求日志
  logText += formatReqLog(ctx.request, resTime)
  // 响应状态码
  logText += 'response status: ' + ctx.status + '\n'
  // 响应内容
  logText += 'response body: ' + '\n' + JSON.stringify(ctx.body) + '\n'
  // 响应日志结束
  logText += '*************** response log end ***************' + '\n'
  return logText
}

// 格式化错误日志
let formatError = function (ctx, err, resTime) {
  let logText = ''
  // 错误信息开始
  logText += '\n' + '*************** error log start ***************' + '\n'
  // 添加请求日志
  logText += formatReqLog(ctx.request, resTime)
  // 错误名称
  logText += 'err name: ' + err.name + '\n'
  // 错误信息
  logText += 'err message: ' + err.message + '\n'
  // 错误详情
  logText += 'err stack: ' + err.stack + '\n'
  // 错误信息结束
  logText += '*************** error log end ***************' + '\n'
  return logText
}

// 格式化请求日志
let formatReqLog = function (req, resTime) {
  let logText = ''
  let method = req.method
  // 访问方法
  logText += 'request method: ' + method + '\n'
  // 请求原始地址
  logText += 'request originalUrl:  ' + req.originalUrl + '\n'
  // 客户端ip
  logText += 'request client ip:  ' + req.ip + '\n'
  // 请求参数
  if (method === 'GET') {
    logText += 'request query:  ' + JSON.stringify(req.query) + '\n'
  } else {
    logText += 'request body: ' + '\n' + JSON.stringify(req.body) + '\n'
  }
  // 服务器响应时间
  logText += 'response time: ' + resTime + '\n'
  return logText
}

module.exports = logUtil
