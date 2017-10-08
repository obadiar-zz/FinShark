var PDFtoText = require('./Utilities/Watson/PDFtoText')
var PDFtoImage = require('./Utilities/PDFtoImage')
var languageTranslator = require('./Utilities/Watson/Translation')
var TexttoSpeech = require('./Utilities/Watson/TextToSpeech')
var ImagetoText = require('./Utilities/OCR/tesseractOCR')

const fileName = 'loan2.pdf'

PDFtoImage(fileName, (response) => {
    ImagetoText(response, console.log)
})