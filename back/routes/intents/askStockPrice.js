const yahoo = require('yahoo-finance')
const db = require('../../lib/db')
const {classifyCompanySymbol} = require('../../lib/ml')

module.exports = {
  askStockPrice: (symbol) => yahoo.quote({
    symbol,
    modules: [ 'price', 'summaryDetail' ] // see the docs for the full list
  })
    .then(({price}) => price.regularMarketPrice)
    .then(price => {
      db.postMarketPrice({price, symbol, date: new Date()})
      return price
    })
    .catch(console.error)
}

// console.log(classifyCompanySymbol('whats stock Google price '))
console.log(classifyCompanySymbol('what\\\'s the stock price for Apple'))