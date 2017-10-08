informationExtraction = (text, keywords, callback) => {
  var filteredDoc = text.toLowerCase()
    .split(" ")
    .join("")
    .split("\n")
    .filter(x => hasKeyWord(x, keywords))
    .map(x => {
      var splitIndex = getSplitIndex(x);
      var splitArr = x.split("")
      splitArr.splice(splitIndex, 0, "SPLIT")
      return splitArr.join("")
        .split("SPLIT")
        .map(x => x.charCodeAt(0) < 65 ? x.split("").filter(x => x.charCodeAt(0) < 65)
          .join("") : x);
    })
  var returnObj = {}
  for (var i in filteredDoc) {
    if (match = filteredDoc[i][1].match(/[$][\d,]*/)) {
      console.log(match)
      returnObj.loanAmount = parseInt(match[0].substring(1).split(',').join(''))
    }
    if (match = filteredDoc[i][1].match(/\d\.*\d*[%]/)) {
      console.log(match)
      returnObj.interestRate = parseFloat(match[0])
    }

  }
  callback(returnObj);
}

hasKeyWord = (text, keywords) => {
  return keywords.reduce((flag, keyword) => text.indexOf(keyword) + 1 ? true : flag, false)
}

getSplitIndex = (text) => {
  return text.split("").reduce((index, x, i) => x.charCodeAt(0) < 65 ? (index === -1 ? i : index) : index, -1)
}

module.exports = informationExtraction;
