var PDFtoText = require('./Utilities/Watson/PDFtoText')
var PDFtoImage = require('./Utilities/PDFtoImage')
var languageTranslator = require('./Utilities/Watson/Translation')
var TexttoSpeech = require('./Utilities/Watson/TextToSpeech')
var ImagetoText = require('./Utilities/OCR/tesseractOCR')
var extractor = require('./Utilities/ExtractDataFromText.js')
var getMortgages = require('./Utilities/USBankAPI')

const fileName = 'loan3.pdf'

getMortgages('360', 'VA', (response) => {
    console.log(response)
})