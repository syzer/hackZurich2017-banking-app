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

const data = [
  {
    entity: '50 francs',
    type: 'builtin.currency',
    startIndex: 9,
    endIndex: 17,
    resolution: [Object]
  },
  {
    entity: '50',
    type: 'builtin.number',
    startIndex: 9
  }
]

// TODO load, pay, repayment
const informConnectedClients = (io) => (data) => {
  // {intent: data.topScoringIntent.intent, entities: data.entities}
  // let dispatchEndpoint = null
  // if (data.topScoringIntent.intent === 'Pay') {
  //   dispatchEndpoint = '/payments'
  // } else if (data.topScoringIntent.intent === 'Summary') {
  //   dispatchEndpoint = '/summary'
  // }
  if (data.intent === 'repayment') {
    data.intent = 'pay'
  }
  data.entities.filter(({type}) => ['builtin.currency', 'builtin.number'].includes(type))

  console.warn('postPayment', data.topScoringIntent)

  io.emit('payment', {payment: {user: 123, amount: 400}})

  return data
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

        db.postConversation(sentence)
          .then(() =>
            ml.getIntent(`${intent.label}  ${sentence.message}`))
          .then(informConnectedClients(io))
          .then(console.log)
          .catch(err => console.error(err.Error || err))

        // socket.emit('talkback', {response: {message: 'Did not understand the command.'}})

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
