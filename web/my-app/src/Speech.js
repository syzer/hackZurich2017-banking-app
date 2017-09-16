function recognizeSpeech (phrases, onresult) {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  var SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
  const grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrases.join(' | ') + ';'
  let recognition = new SpeechRecognition()
  let speechRecognitionList = new SpeechGrammarList()
  speechRecognitionList.addFromString(grammar, 1)
  recognition.grammars = speechRecognitionList
  recognition.lang = 'en-US'
  recognition.interimResults = false
  recognition.continuous = true
  recognition.maxAlternatives = 1

  recognition.start()
  recognition.onspeechend = () => {
    console.log('end', new Date())
  }
  recognition.onerror = (event) => console.error(event)
  recognition.onresult = onresult
}

export default recognizeSpeech
