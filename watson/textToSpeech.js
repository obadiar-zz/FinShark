var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');

// Setup for the text to speech
// MAKE SURE TO INCLUDE your Bluemix credentials in source.env
var language_translator = new LanguageTranslatorV2({
  "url": "https://gateway.watsonplatform.net/language-translator/api",
  "username": process.env.IBM_TRANSLATION_USR,
  "password": process.env.IBM_TRANSLATION_PWD
});
