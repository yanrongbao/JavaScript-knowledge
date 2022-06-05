const wordDictionary = function () {
  this.words = {}
}

wordDictionary.prototype.addWord = function (word) {
  if (this.words[word.length]) {
    this.words[word.length].push(word)
  } else {
    this.words[word.length] = [word]
  }
}

wordDictionary.prototype.search = function (word) {
  if (!this.words[word.length]) {
    return false
  }

  if (!word.includes(".")) {
    return this.words[word.length].includes(word)
  }

  const reg = new RegExp(word)

  return this.words[word.length].some((item) => {
    return reg.test(item)
  })
}