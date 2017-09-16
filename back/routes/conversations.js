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
      socket.emit('news', {conversations: 'online'})

      socket.emit('payment', {payment: {user: 123, amount: 300}})

      socket.on('postConversation', (data) => {
        data.user = 123 // default user
        console.log('postConversation', data)
        const sentence = data['message']
        console.log('Sentence is: ', sentence)
        const verb = sentence.split(' ')[0].toLowerCase()

        switch (verb) {
          case 'pay':
            const userInput = data[1]
            const amountInput = data[2]
            // TODO payments api
            socket.emit('payment', {payment: {user: userInput, amount: amountInput}})
            break
          default:
            socket.emit('talkback', {response: {message: 'Did not understand the command.'}})
            // Do nothing for now. TODO: do something meaningful here
            break
        }
        db.postConversation(data)
          .then(console.log)
          .catch(console.error)
      })
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
