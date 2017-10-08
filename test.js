var PDFtoText = require('./Utilities/Watson/PDFtoText')
var languageTranslator = require('./Utilities/Watson/Translation')
var TexttoSpeech = require('./Utilities/Watson/TextToSpeech')
var ImagetoText = require('./Utilities/OCR/tesseractOCR')
var extractor = require('./Utilities/ExtractDataFromText.js')
var getMortgageRate = require('./Utilities/USBankAPI').getMortgageRate
var getFraudData = require('./Utilities/FraudDataExtraction.js')

const fileName = 'loan4.pdf'

PDFtoText(fileName, (response) => {
    // console.log(response)
    extractor(response, ['loan', 'rate'], (response) => {
        console.log(response)
    })
})

// ImagetoText('sample2.png', (response) => {
//     extractor(response, ['loan', 'rate'], (response) => {
//         console.log(response)
//     })
// })