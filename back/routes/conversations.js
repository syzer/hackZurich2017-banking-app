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

const data = {
  query: 'pay  hey hey hey I want to pay five bucks to Martin and Mel',
  topScoringIntent: {intent: 'Pay', score: 0.3995473},
  intents:
    [{intent: 'Pay', score: 0.3995473},
      {intent: 'Invest', score: 0.0981917158},
      {intent: 'Account Status', score: 0.01999865},
      {intent: 'Utilities.Cancel', score: 0.0157209579},
      {intent: 'Utilities.StartOver', score: 0.0152131077},
      {intent: 'None', score: 0.00287997769},
      {intent: 'Utilities.Help', score: 0.00173048093},
      {intent: 'Utilities.Stop', score: 0.00149937556},
      {intent: 'Utilities.ShowNext', score: 0.00142727722},
      {intent: 'Utilities.ShowPrevious', score: 2.33717742e-7},
      {intent: 'Utilities.FinishTask', score: 2.46743461e-8},
      {intent: 'Utilities.Goback', score: 1.148771e-8},
      {intent: 'Utilities.Repeat', score: 4.043233e-9},
      {intent: 'Utilities.Confirm', score: 3.65418936e-12}],
  entities:
    [{
      entity: 'pay',
      type: 'pay',
      startIndex: 27,
      endIndex: 29,
      score: 0.7977278
    },
    {
      entity: 'five',
      type: 'builtin.number',
      startIndex: 31,
      endIndex: 34,
      resolution: [Object]
    }]
}

// TODO load, pay, repayment
const informConnectedClients = (io) => (data) => {
  // {intent: data.topScoringIntent.intent, entities: data.entities}
  // let dispatchEndpoint = null
  // if (data.topScoringIntent.intent === 'Pay') {
  //   dispatchEndpoint = '/payments'
  // } else if (data.topScoringIntent.intent === 'Summary') {
  //   dispatchEndpoint = '/summary'
  // }

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
          // .then(console.log)
          .catch(err => console.error(err.Error || err))

        // socket.emit('ayment', {payment: {user: 123, amount: 300}})

        // socket.emit('talkback', {response: {message: 'Did not understand the command.'}})

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
