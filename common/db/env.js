const path = require('path')
const fs = require('fs')

if (process.env['ENVIRONMENT'] !== 'TEST' && process.env['ENVIRONMENT'] !== 'PROD') {
  let file = fs.readFileSync(path.resolve(__dirname, 'env.txt')).toString()
  file.split('\r\n').map(d => d.split('=')).forEach(([variable, ...val]) => {
    process.env[variable] = val.join('=')
    exports[variable] = val
  })
}
