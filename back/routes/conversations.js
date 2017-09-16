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
      socket.emit('news', {conversations: 'online'});

      socket.on('talk', (data) => {
        console.log('Talk Data received: ', data);
        var sentence = data['message'];
        console.log('Sentence is: ', sentence);
        var verb = sentence.split(' ')[0];
        switch(verb.toLowerCase()){
            case 'pay':
              var userInput = data[1];
              var amountInput  = data[2];
              socket.emit('talkback', {payment: {user: userInput, amount: amountinput}});

            default:
                socket.emit('talkback', {response: {message: 'Did not understand the command.'}});
              // Do nothing for now. TODO: do something meaningful here
        }

        data.user = 123 // default user
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
