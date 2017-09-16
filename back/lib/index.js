// 1 arg
const print = (i) => {
  const util = require('util')
  console.log(util.inspect(i, { showHidden: false, depths: 4, colors: true, customInspect: true }))
}

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = val => {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

// onError :: (req, res) => err
const onError = (req, res) => err => {
  console.error(err)
  return res.status(500).send(err)
}

module.exports = {
  print,
  normalizePort,
  onError
}
