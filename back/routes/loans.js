const db = require('../lib/db')
const {onError} = require('../lib')

const defaultData = {
  payment: 400,
  to: 123, // and id
  lat: 47.3769,
  long: 8.5417,
  date: '2017-09-16T09:26:15.020Z'
}

module.exports = {
  socketHandler (io) {
    io.on('connection', socket => {
      console.log(`a user connected ${socket.id}`)

      socket.emit('news', {payments: 'online'})

      socket.emit('payments', {payment: {user: 123, amount: 400}})

      socket.on('disconnect', () =>
        console.log(`user disconnected ${socket.id}`)
      )
    })
  },
  httpHandler (express) {
    return express.Router().post('/', (req, res, next) => {
      console.log(req.body, typeof req.body)
      const newPayment = Object.assign({}, defaultData, req.body)

      return db.postPayment(newPayment)
        .then(() => res.status(200).json(newPayment))
        .catch(onError(req, res))
    })
  }
}
