var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');

// Setup for the translation
// MAKE SURE TO INCLUDE your Bluemix credentials in source.env
var language_translator = new LanguageTranslatorV2({
  "url": "https://gateway.watsonplatform.net/language-translator/api",
  "username": process.env.IBM_TRANSLATION_USR,
  "password": process.env.IBM_TRANSLATION_PWD
});

/*
  Translation has four parameters:
  1) text: the text to translate
  2) sourceLang: the language of the input text
  3) targetLang: the language of the out put text (what langauge to translate to)
  4) callback: callback is called on the translation text
*/

var languageTranslator = (text, sourceLang, targetLang, callback) => {
  language_translator.translate({ text: text, source : sourceLang, target: targetLang},
    (err, translation) => {
      if (err){
        console.log('this error is brought to you by Rob:', err);
      }else{
        // Get back only the text from the translation
        var translatedText = JSON.parse(JSON.stringify(translation.translations[0].translation, null, 2));
        console.log('File translated successfully!')
        callback(translatedText);
      }
    });
}

// An example call that will print out the result of translating
// 'Hello, my name is Rob.' from English to Spanish.
// translateText("Hello, my name is Rob.", 'en', 'es', console.log) --> "Hola, mi nombre es Rob."

module.exports = languageTranslator
