var express = require('express');
var router = express.Router();
var JSONData = require('../Utilities/resources/data')
var path = require('path')
var languageTranslator = require('../Utilities/Watson/Translation');
var async = require('async');
var fileUpload = require('express-fileupload');
var multer = require('multer');
var upload = multer();
var ImagetoText = require('../Utilities/OCR/tesseractOCR')

/* GET home page. */
router.get('/', function(req, res, next) {
  const lang = req.query.lang || 'en';

  let text = {
    welcome: "Welcome, Watson",
    upload: "Upload",
  };


  lang === 'en' 
    ? res.render('home', { text: text })
    : objTranslator(text, lang, res, 'render', 'home');

});

router.post('/', (req, res) => {

  let text = {
    welcome: "Welcome, Watson",
    upload: "Upload",
  };

  objTranslator(text, req.body.lang, res, 'json');
});

router.get('/upload', function(req, res, next) {
  const lang = req.query.lang || 'en';
  let text = {
    h1: "Upload Document",
    label: "Choose a file or drag it here.",
    submit: "Submit",
  };

  lang === 'en'
    ? res.render('upload', {text: text})
    : objTranslator(text, lang, res, 'render', 'upload');

});

const exampleData = [
  { msgType: 'Good News', msg: 'str1', color: 'lightgreen' },
  { msgType: 'Bad News', msg: 'str2', color: 'red' },
  { msgType: 'Next Steps', msg: 'str3', color: '' }
]

router.get('/doc', function (req, res, next) {
  res.render('doc', { data: exampleData });
});

router.get('/graph/:n', function (req, res, next) {
  res.render('graph', {
    n: req.params.n
  })
})

router.get('/graphdata', function (req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'Utilities/resources/data.json'))
})
  
router.get('/form', function(req, res) {
  res.render('form')
});

router.get('/doc', function(req, res, next) {

  const str1 = "Lorem ipsum dolor sit amet consectetur adipiscing, elit iaculis quisque ligula dapibus taciti, luctus aliquet maecenas nibh sociis. Iaculis sagittis commodo feugiat porttitor magna praesent eros, ullamcorper ac aenean aptent eget viverra convallis"
  const str2 = "Massa tellus bibendum vulputate eros quam aliquet fermentum dapibus leo auctor"
  const str3 = "Fames etiam primis curabitur tempor convallis habitasse litora enim, lacus tincidunt ante"
  const exampleData = [
    {msgType: 'Good News', msg: str1, color: 'lightgreen'},
    {msgType: 'Bad News', msg: str2, color: 'red'},
    {msgType: 'Next Steps', msg: str3, color: ''}
  ]

  res.render('doc', {data: exampleData});

});


router.post('/upload', upload.single('file'), function (req, res, next) {
  var buffer = req.file["buffer"];
  ImagetoText(buffer, (text) => res.send(text))
  // if (!req.file)
  //   return res.status(400).send('No files were uploaded.');
  //   else{
  //
  //
  //   }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

  // Use the mv() method to place the file somewhere on your server

})

function objTranslator(text, lang, res, resType, view) {
  async.forEachOf(text, (val, key, cb) => {
    try {
      languageTranslator(val, 'en', lang, (translation) => {
        console.log('\nval', val, '\nkey', key, '\ntranslation', translation)
        text[key] = translation;
        cb();
      });
    }
    catch (e) {
      return cb(e);
    }
  }, (err) => {
    if (err) console.log(err);
    if (resType === 'json') res.json({"text": text});
    console.log('translated',text)
    if (resType === 'render') res.render(view, {"text": text});
  })
}

module.exports = router;
