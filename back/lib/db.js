const promisify = require('util.promisify')
const fs = require('fs')
const writeFileAsync = promisify(fs.writeFile)
const appendFileAsync = promisify(fs.appendFile)

// . dot is the same folder that npm start was called
const postAudio = data => writeFileAsync('./data/file.webm', data.blob.toString())
const postPayment = data => appendFileAsync('./data/user.payments.json', '\n' + JSON.stringify(data))
const postConversation = data => appendFileAsync('./data/user.conversations.json', '\n' + JSON.stringify(data))

// TODO
const getMonth = data => appendFileAsync('./data/user.conversations.json', '\n' + JSON.stringify(data))

module.exports = {
  postAudio,
  postPayment,
  postConversation,
  getMonth
}
