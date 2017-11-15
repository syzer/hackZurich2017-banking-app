// @flow
const yahoo = require('yahoo-finance')
const {path, tap, pipe} = require('ramda')
const db = require('../../lib/db')

module.exports =
  (symbol: string): Promise<number | void> =>
    yahoo.quote({
      symbol,
      modules: ['price', 'summaryDetail']
    })
      .then(
        pipe(
          path(['price', 'regularMarketPrice']),
          tap(price =>
            db.postMarketPrice({price, symbol, date: new Date()}))))
      .catch(console.error)