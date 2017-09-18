const db = require('../lib/db')
const {onError} = require('../lib')
const ml = require('../lib/ml')
const {random, sample} = require('lodash')
const {robotDoes} = require('../lib/robot')
const intents = require('./intents/askStockPrice')

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
    cannotUnderstand: 'noclue',
    askStockPrice: 'handsup'
  }[label || 'cannotUnderstand']
}

// just in case the robot is offline or crashes.. we don't wanna crash our frontend
const pickRobotResponse = ({label}) => ({
  sentence1: 'Sure, I did pay Jeff and deducted eight francs from your account',
  sentence2: 'Sorry, only two hundred swiss francs',
  sentence3: `According to Raiffeisen, you should borrow money from ABC, because they have a lowest interest rate`,
  sentence4: 'The debt has been repaid, and the Paul was notified',
  sentence5: 'Here are some funds, that you might want to invest in.',
  sentence6: `They are investing in: ${db.getCompanies().join('and ')}`,
  sentence7: 'You are broke... again',
  sentence8: 'No can do',
  cannotUnderstand: 'Could you repeat? I did not understand...',
  askStockPrice: '900 swiss franks'
})[label || 'cannotUnderstand']

// TODO classifier has more intents : load, pay, repayment, summary => use them
const informConnectedClients = (socket, intent, sentence) => (mlAnswer) => {
  mlAnswer.date = new Date()
  console.warn('>', intent, mlAnswer.topScoringIntent)
  console.log('>>', formatAmount(mlAnswer))

  db.postRecommendations(mlAnswer)

  if (mlAnswer.topScoringIntent.intent === 'repayment') {
    mlAnswer.topScoringIntent.intent = 'pay'
  }

  if (mlAnswer.topScoringIntent.intent === 'pay') {
    const amount = formatAmount(mlAnswer)
    return socket.emit('payment', {payment: {user: 123, amount}})
  }

  // when summary and not and robot talk back to you
  if (mlAnswer.topScoringIntent.intent === 'summary' && !intent.label.includes('sentence')) {
    return db.getSummary().then(() =>
      `Last month you spend to much on ${db.getMostBoughtProducts().join(' and ')} with ${db.getUserFriends().join(' and ')}.  
      Also I recommend investing in ${db.getCompany()}`)
      .then(summary => socket.emit('getSummary', summary))
  }

  if (intent.label === 'askStockPrice') {
    const symbol = ml.classifyCompanySymbol(sentence.message)
    return intents.askStockPrice(symbol)
      .then(price =>
        socket.emit('talkback', `The market stock price for ${symbol} is ${price}`))
  }

  const robotAction = pickRobotAction(intent)
  return robotDoes(robotAction)
    .then(() => socket.emit('talkback', pickRobotResponse(intent)))
}

module.exports = {
  socketHandler: io =>
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
          .then(informConnectedClients(socket, intent, sentence))
          .catch(err => console.error(err.message || err))
      })
    }),
  httpHandler: express =>
    express.Router().post('/', (req, res, next) => {
      const newPayment = Object.assign({}, defaultData, req.body)

      return db.postPayment(newPayment)
        .then(() => res.status(200).json(newPayment))
        .catch(onError(req, res))
    })
}
