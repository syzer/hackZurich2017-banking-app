const yahoo = require('yahoo-finance')

module.exports = {
  askStockPrice: (symbol) => yahoo.quote({
    symbol,
    modules: [ 'price', 'summaryDetail' ] // see the docs for the full list
  }).then(({price}) => price.regularMarketPrice)
}
