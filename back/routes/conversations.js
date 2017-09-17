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

// just in case the robot is offline or crashes.. we don't wanna crash our frontend
const pickRobotResponse = ({label}) => ({
  sentence1: 'Sure',
  sentence2: 'Sorry, only two hundred swiss francs',
  sentence3: 'According to Raiffeisen, you should borrow money from ABC, because they have lowest intrest rate',
  sentence4: 'The debt has been repaid, and the Paul even was notified',
  sentence5: 'Here are some funds, that you might want to invest in.',
  sentence6: `They are investing in: ${db.getCompanies().join('and ')}`,
  sentence7: 'You are broke... again',
  sentence8: 'No can do',
})[label]

// TODO classifier has more intents : load, pay, repayment, summary => use them
const informConnectedClients = (socket, intent) => (data) => {
  console.warn('>', intent, data.topScoringIntent)

  if (data.intent === 'repayment') {
    data.intent = 'pay'
  }
  if (data.intent === 'pay') {
    const amount = formatAmount(data)
    return socket.emit('payment', {payment: {user: 123, amount}})
  }

  if (data.intent === 'summary') {
    return db.getSummary().then(() =>
      `Last month you spend to much on beer with Mel and Frank. 
      Also I recommend investing in ${db.getCompany()}`)
      .then(summary => socket.emit('getSummary', summary))
  }

  const robotAction = pickRobotAction(intent)
  return robotDoes(robotAction)
    .then(() => socket.emit('talkback', pickRobotResponse(intent)))
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

        return db.postConversation(sentence)
          .then(() =>
            ml.getIntent(`${intent.label}  ${sentence.message}`))
          .then(informConnectedClients(socket, intent))
          .catch(err => console.error(err.Error || err))
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
