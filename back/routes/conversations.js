const db = require('../lib/db')
const {onError} = require('../lib')
const ml = require('../lib/ml')

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

      socket.on('postConversation', (sentence) => {
        sentence.user = 123 // default user
        sentence.date = new Date()
        console.log('postConversation', sentence)

        const intent = ml.classify(sentence.message)
        console.log(intent)

        ml.getIntent(`${intent.label}  ${sentence.message}`)
          .then(data => {
            const resp = { intent: data.topScoringIntent.intent, entities: data.entities}
            return resp
          })
          .then(console.log)

        socket.emit('payment', {payment: {user: 123, amount: 300}})
        // socket.emit('talkback', {response: {message: 'Did not understand the command.'}})
        db.postConversation(sentence)
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
