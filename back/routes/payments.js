const express = require('express')
const router = express.Router()

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
  const newResponse = Object.assign({}, defaultData, req.body)


  return res.json(newResponse)
})

module.exports = router
