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
      'a package from school now',
      'face shifting',
      'hi jeff',
      'mount a deer' // i guess its Mel's
    ]
  },
  {label: 'loan', keywords: ['loan']},
  {label: 'invest', keywords: ['invest']},
  {label: 'summary', keywords: ['summary', 'month qqq', 'status']},
  // those are hardcoded for the demo
  {
    label: 'sentence1',
    keywords: [
      'hey Jeff the Killer',
      'stage of beer',
      'play Jeff beer',
      'qqqq Jeff I beer',
      'Justin Bieber',
      'Asia beer',
      'a German qqq',
      'Jeff'
    ]
  },
  {
    label: 'sentence2', keywords: [
    'how much money do I have left',
    'how much money do I have'
  ]
  },
  {
    label: 'sentence3', keywords: [
    'I need to borrow money',
    'I need to borrow a mommy'
  ]
  },
  {
    label: 'sentence4', keywords: [
    'veterans hundred francs to Paul for the bike',
    'return hundred francs for France for the bike',
    'return hundred Francs'
  ]
  },
  {label: 'sentence5', keywords: ['I want to invest my money', 'I want to invest money']},
  {
    label: 'sentence6', keywords: ['Where are my friends investing',
    'where are my Preston besti',
    'where are my friends investment']
  },
  {
    label: 'sentence7', keywords: ['Am I poor?']
  },
  {
    label: 'sentence8', keywords: ['I want to buy some Apple stocks', 'I want to buy qqqq of Apple stocks']
  }
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
