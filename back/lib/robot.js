// yes, this is actual ABB 40k CHF robot
const axios = require('axios')

module.exports = {
  robotDoes: (sayWhat) => axios.get('http://robot-machine.herokuapp.com/robot/' + sayWhat).then(({data}) => data)
}