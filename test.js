var PDFtoText = require('./Utilities/Watson/PDFtoText')
var PDFtoImage = require('./Utilities/PDFtoImage')
var languageTranslator = require('./Utilities/Watson/Translation')
var TexttoSpeech = require('./Utilities/Watson/TextToSpeech')
var ImagetoText = require('./Utilities/OCR/tesseractOCR')
var extractor = require('./Utilities/ExtractDataFromText.js')
var getMortgageRate = require('./Utilities/USBankAPI').getMortgageRate

const fileName = 'loan3.pdf'

getMortgageRate('360', 'VA', (response) => {
    console.log(response)
})