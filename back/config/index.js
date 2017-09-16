const {normalizePort} = require('../lib')

module.exports = {
  port: normalizePort(process.env.PORT || 4000),
  ip: process.env.IP || '0.0.0.0'
}
