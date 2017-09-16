var natural = require('natural')
var metaphone = natural.Metaphone
var soundEx = natural.SoundEx

var wordA = 'fifteen'
var wordB = 'shifting'


console.log(metaphone.compare(wordA, wordB))
console.log(soundEx.compare(wordA, wordB))

var dm = natural.DoubleMetaphone
var encodings = dm.process('Matrix')
console.log(encodings[0])
console.log(encodings[1])

metaphone.attach()
console.log(wordA.soundsLike(wordB))
console.log('phonetics rock'.tokenizeAndPhoneticize())

var natural = require('natural');
console.log(natural.JaroWinklerDistance(wordA, wordB))
console.log(natural.JaroWinklerDistance('not', 'same'))