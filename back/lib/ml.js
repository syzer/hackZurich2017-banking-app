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
      'mount a deer', // i guess its Mel's
      'hatred for Gears', // mother flower
    ]
  },
  {label: 'loan', keywords: ['loan']},
  {label: 'invest', keywords: ['invest']},
  {
    label: 'summary',
    keywords: ['summary', 'show me what my name is', 'month qqq', 'status', 'where my money went last month']
  },
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
      'Jeff',
      'appear'
    ]
  },
  {
    label: 'sentence2', keywords: [
    'how much money do I have left',
    'how much money do I have',  // over fit him
    'how much money do I have'
  ]
  },
  {
    label: 'sentence3', keywords: [
    'I need to borrow money',
    'I have to borrow money',
    'I need to borrow a mommy',
    'Sbarro online',
    'I want to borrow a money',
    'I want that blow money'
  ]
  },
  {
    label: 'sentence4', keywords: [
    'veterans hundred francs to Paul for the bike',
    'return hundred francs for France for the bike',
    'return hundred Francs',
    'Britain and France to fall from the bike',
    'returning from assistance'
  ]
  },
  {label: 'sentence5', keywords: ['I want to invest my money', 'I want to invest money']},
  {
    label: 'sentence6', keywords: ['Where are my friends investing',
    'where are my Preston besti', // mother of god
    'where are my friends investment']
  },
  {
    label: 'sentence7', keywords: ['Am I poor?', 'am I for', 'mi4']
  },
  {
    label: 'sentence8', keywords: ['I want to buy some Apple stocks', 'I want to buy qqqq of Apple stocks',
    'I want to buy qqqq stocks',
    'qqqq about fun',
    'what about sometimes',
    'what about publications'
  ]
  },
  { label: 'askStockPrice', keywords: ['monster Google stock price', 'what\'s stock price']},
  {
    label: 'cannotUnderstand', keywords: [
    'I don\'t understand', 'lalalalala',
    'blah blah blah blah blah', 'Milano', 'I\'m tired', 'Idora Park',
    'I do not want to talk'
  ]
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
