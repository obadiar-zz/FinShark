var PDFtoText = require('./Watson/PDFtoText')
var languageTranslator = require('./Watson/Translation')
var TexttoSpeech = require('./Watson/TextToSpeech')
var OCR = require('./OCR/tessaractOCR')

var testImage = "./OCR/testocr.png"
OCR(testImage, (docText) =>{
  console.log(docText.split(" ").split("\n"))
});
