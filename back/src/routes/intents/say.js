// @flow

module.exports =
  (sentence: Sentence): Promise<string> => {
    const say = sentence.message.replace(/say/g, ' ')
    return Promise.resolve(
      say === ' '
        ? 'Yes?'
        : say)
  }
