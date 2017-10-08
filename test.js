var PDFtoText = require('./Utilities/Watson/PDFtoText')
var languageTranslator = require('./Utilities/Watson/Translation')
var TexttoSpeech = require('./Utilities/Watson/TextToSpeech')
var ImagetoText = require('./Utilities/OCR/tesseractOCR')
var extractor = require('./Utilities/ExtractDataFromText.js')
var getMortgageRate = require('./Utilities/USBankAPI').getMortgageRate
var getFraudData = require('./Utilities/FraudDataExtraction.js')

const fileName = 'loan4.pdf'

const text = "Hello, how does this work?"

PDFtoText(fileName, (response) => {
    languageTranslator(response, 'en', 'es', (response) => {
        console.log(response)
        TexttoSpeech(response, 'es', (response) => {
            console.log(response)
        })
    })
})