const db = require('../lib/db')
const {onError} = require('../lib')
const ml = require('../lib/ml')
const {random} = require('lodash')
const {robotDoes} = require('../lib/robot')

const defaultData = {
  payment: 400,
  to: 123, // and id
  lat: 47.3769,
  long: 8.5417,
  date: '2017-09-16T09:26:15.020Z'
}

const formatAmount = (data) => {
  let amount = data.entities.find(({type}) =>
    ['builtin.currency', 'builtin.number'].includes(type))

  return amount ? Number(amount.entity.split(' ').shift()) : random(0, 30)
}

// pickRobotAction :: Object(Intent) => String(Action)
const pickRobotAction = ({label}) => {
  console.log('Dance robot, dance! ' + label)
  return {
    sentence1: 'kiss',
    sentence2: 'noclue',
    sentence3: 'hug',
    sentence4: 'shaking',
    sentence5: 'handsup',
    sentence6: 'away',
    sentence7: 'kill',
    sentence8: 'no',
  }[label]
}

// just in case the robot is ofline or srashes.. we don't wanna crash our frontend
const pickRobotResponse = ({label}) => ({
  sentence1: 'sure',
  sentence2: 'sorry, only 100$',
  sentence3: 'raiff estimate',
  sentence4: 'debt has been repaid, maybe even paul notified',
  sentence5: 'here are some funds',
  sentence6: 'they are investing in: a, b, and c',
  sentence7: 'you are broke…again',
  sentence8: 'no can do',
})[label]

// TODO classifier has more intents : load, pay, repayment, summary
const informConnectedClients = (io, intent) => (data) => {
  if (data.intent === 'repayment') {
    data.intent = 'pay'
  }
  if (data.intent === 'pay') {
    console.warn('posting To Client Payment', data.topScoringIntent)
    const amount = formatAmount(data)

    io.emit('payment', {payment: {user: 123, amount}})
  }

  console.warn('======', intent, data.topScoringIntent)

  const robotAction = pickRobotAction(intent)
  return robotDoes(robotAction)
    .then(() => io.emit('talkback', pickRobotResponse(intent)))
}

module.exports = {
  socketHandler(io) {
    io.on('connection', socket => {
      socket.emit('news', {conversations: 'online'})

      socket.on('postConversation', (sentence) => {
        sentence.user = 123 // default user
        sentence.date = new Date()

        console.log('postConversation', sentence)

        const intent = ml.classify(sentence.message)

        db.postConversation(sentence)
          .then(() =>
            ml.getIntent(`${intent.label}  ${sentence.message}`))
          .then(informConnectedClients(io, intent))
          .catch(err => console.error(err.Error || err))
      })

      socket.on('getallpayments', socket => {
        console.log('getallpayments')

        fetch('./data/user.payments.json')
          .then((res) => res.json())
          .then((data) => {
            console.log('data:', data);
            socket.emit('payment', {payment: {to: res.to, payment: res.payment, date: res.date}})
          })

        // socket.emit('talkback', {response: {message: 'Did not understand the command.'}})
        db.postConversation(sentence)
          .then(console.log)
          .catch(console.error)
      })
    })
  },
  httpHandler(express) {
    return express.Router().post('/', (req, res, next) => {
      console.log(req.body, typeof req.body)
      const newPayment = Object.assign({}, defaultData, req.body)

      return db.postPayment(newPayment)
        .then(() => res.status(200).json(newPayment))
        .catch(onError(req, res))
    })
  }
}
