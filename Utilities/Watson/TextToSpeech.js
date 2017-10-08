var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');
var path = require('path')
// Setup for the text to speech
// MAKE SURE TO INCLUDE your Bluemix credentials in source.env
var text_to_speech = new TextToSpeechV1({
  "url": "https://stream.watsonplatform.net/text-to-speech/api",
  "username": "cac55a89-c37d-4000-893b-318d7f7f89c7",
  "password": "UlkdXZuXWnen"
});

// Object storing all the different language options
var voice = {
  'en': 'en-US_MichaelVoice',
  'es': 'es-US_SofiaVoice'
}

//.
var textToSpeech = (text, language, callback) => {
  // Setup params for text to speech
  var params = {
    text: text,
    voice: voice[language],
    accept: 'audio/mp3'
  };
  var fileName = 'temp.mp3';
  var filePath = path.join(__dirname, 'converted', fileName)
  // Pipe the synthesized text to a file
  var writeStream = fs.createWriteStream(filePath);
  text_to_speech.synthesize(params).pipe(writeStream);
  writeStream.on('close', () => {
    console.log('Text is now in voice format:', filePath)
    callback(filePath);
  });
}

// Example
// Inputs text to be spoken, voice, and a callback
// Output is a mp3 file named textToSpeech in the root directory
//textToSpeech("Hello from IBM Watson", voice.en, console.log)

module.exports = textToSpeech;
