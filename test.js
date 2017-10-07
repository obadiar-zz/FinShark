var PDFtoText = require('./Watson/PDFtoText')
var languageTranslator = require('./Watson/Translation')
var TexttoSpeech = require('./Watson/TextToSpeech')

PDFtoText('pdf-sample', (response)=>{
    languageTranslator(response, 'en', 'es', (response) => {
        TexttoSpeech(response, 'es', () => {
            console.log('Done!')
        })
    })
})

