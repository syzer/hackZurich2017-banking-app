const natural = require('natural')
let classifier = new natural.BayesClassifier()
const axios = require('axios')

// classifier = yield natural.BayesClassifier.load('./api/classifier.json', null)

const intents = [
  {
    label: 'pay',
    keywords: ['pay', 'find', 'hey', 'but', 'why', 'bite mark of year', 'find me a two beers I need two beers', 'find me a to pierce',
      'pay  hey hey hey I want to pay five bucks to Martin and Mel',
      'play 500 France tool metal',
      'a package from school now'
    ]
  },
  {label: 'loan', keywords: ['loan']},
  {label: 'invest', keywords: ['invest']},
  {label: 'summary', keywords: ['summary', 'month qqq', 'status']}
]

intents
  .map(intent =>
    intent.keywords.map(text => classifier.addDocument(text, intent.label)))

classifier.train()
classifier.save('./data/classifier.json')

module.exports = {
  classify: (sentence) => {
    const result = classifier.getClassifications(sentence).shift()
    return {
      label: result.label,
      confidence: result.value,
    }
  },
  // gets remote intent
  getIntent: (sentence) =>
    axios.get(`http://robot-machine.herokuapp.com/intent?statement=${sentence}`)
      .then(({data}) => data)
}
