const express = require('express')
const router = express.Router()
const db = require('../lib/db')

const defaultData = {
  payment: 400,
  to: 123, // and id
  lat: 47.3769,
  long: 8.5417,
  date: '2017-09-16T09:26:15.020Z'
}

/* set new payment of user . */
router.post('/', (req, res, next) => {
  console.log(req.body, typeof req.body)
  const newPayment = Object.assign({}, defaultData, req.body)

  return db.postPayment(newPayment).then(() => res.json(newPayment)).catch(err => {
    console.error(err)
    res.status(400).send(err)
  })
})

module.exports = router
