const fs = require('fs')
const promisify = require('util.promisify')
const writeFileAsync = promisify(fs.writeFile)
const readFileAsync = promisify(fs.readFile)
const appendFileAsync = promisify(fs.appendFile)
const faker = require('faker')
const {range, random, sample} = require('lodash')
const companies = ['Microsoft', 'Facebook', 'Google', 'Raiffeisen', 'CreditSuisse', 'ABB', 'Siroop', 'Swisscom', 'Viessmann']

// . dot is the same folder that npm start was called
const postAudio = data => writeFileAsync('./data/file.webm', data.blob.toString())
const postPayment = data => appendFileAsync('./data/user.payments.json', '\n' + JSON.stringify(data))
const postConversation = data => appendFileAsync('./data/user.conversations.json', '\n' + JSON.stringify(data))
const postLoan = data => appendFileAsync('./data/user.loan.json', '\n' + JSON.stringify(data))
const getPayments = () => readFileAsync('./data/user.payments.json', 'utf-8').then(str => str.split('\n').map(JSON.parse))
const getCompany = () => sample(companies)
const getCompanies = () => range(random(1, 3)).map(getCompany)
// the bank answers and intents we think user should do
const postRecommendations = data => appendFileAsync('./data/user.recommendations.json', '\n' + JSON.stringify(data))
const getUserFriends = () => range(random(2, 3)).map(() => faker.name.firstName())
const getMostBoughtProducts = () => range(random(2)).map(() => faker.commerce.product())

// TODO use that
const getSummary = () => readFileAsync('./data/user.summary.json', 'utf-8').then(str => str.split('\n').map(JSON.parse))

module.exports = {
  getCompanies,
  getCompany,
  getPayments,
  getSummary,
  getUserFriends,
  getMostBoughtProducts,
  postAudio,
  postConversation,
  postLoan,
  postPayment,
  postRecommendations
}
