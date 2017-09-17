const fs = require('fs')
const promisify = require('util.promisify')
const writeFileAsync = promisify(fs.writeFile)
const readFileAsync = promisify(fs.readFile)
const appendFileAsync = promisify(fs.appendFile)
const faker = require('faker')
const {range} = require('lodash')

// . dot is the same folder that npm start was called
const postAudio = data => writeFileAsync('./data/file.webm', data.blob.toString())
const postPayment = data => appendFileAsync('./data/user.payments.json', '\n' + JSON.stringify(data))
const postConversation = data => appendFileAsync('./data/user.conversations.json', '\n' + JSON.stringify(data))
const postLoan = data => appendFileAsync('./data/user.loan.json', '\n' + JSON.stringify(data))
const getPayments = () => readFileAsync('./data/user.payments.json', 'utf-8').then(str => str.split('\n').map(JSON.parse))
const getCompany = () => `${faker.company.companyName()}`
const getCompanies = () => range(3).map(getCompany)

// TODO use that
const getSummary = data => appendFileAsync('./data/user.conversations.json', '\n' + JSON.stringify(data))

module.exports = {
  postAudio,
  postPayment,
  postLoan,
  postConversation,
  getSummary,
  getPayments,
  getCompanies,
  getCompany
}
