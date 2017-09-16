const natural = require('natural')
let classifier = new natural.BayesClassifier()

// classifier = yield natural.BayesClassifier.load('./api/classifier.json', null)

const intents = [
  'pay',
  'loan',
  'summary' // aka accounts summary
]

const intents = [
  { module: 'pay', keywords: ['pay', 'hey']},
  { module: 'summary', keywords: ['loan', 'hey']},
]

intents
  .map(intent =>
    intent.keywords.map(keyword => classifier))
