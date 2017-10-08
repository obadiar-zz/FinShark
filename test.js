var PDFtoText = require('./Utilities/Watson/PDFtoText')
var PDFtoImage = require('./Utilities/PDFtoImage')
var languageTranslator = require('./Utilities/Watson/Translation')
var TexttoSpeech = require('./Utilities/Watson/TextToSpeech')
var ImagetoText = require('./Utilities/OCR/tesseractOCR')
var extractor = require('./Utilities/ExtractDataFromText.js')

const fileName = 'loan2.pdf'

ImagetoText('sample1.png', (text) => {
    extractor(text, ['loan', 'rate'], (response) => {
        console.log(response)
    })
})