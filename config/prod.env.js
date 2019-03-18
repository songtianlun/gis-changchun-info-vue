'use strict'
var version = require('./version')
module.exports = {
  NODE_ENV: '"production"',
  APP_INFO: JSON.stringify(version),
  // API_HOST:'"http://restapi.amap.com"'
}
// module.exports = {
//   NODE_ENV: '"production"',//生产环境
//   API_HOST:'"http://restapi.amap.com"'
// }
