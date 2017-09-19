module.exports = server => {
  // le socket connection
  const io = require('socket.io')(server)

  // register all sockets api's
  const {socketHandler: payments} = require('../src/routes/payments')
  const {socketHandler: conversations} = require('../src/routes/conversations')
  payments(io)
  conversations(io)
  console.log('=====', Object.keys(io.nsps))
}
