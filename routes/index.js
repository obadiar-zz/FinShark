var express = require('express');
var router = express.Router();

var path = require('path')
var languageTranslator = require('../Utilities/Watson/Translation');
var async = require('async');
var fileUpload = require('express-fileupload');
var multer = require('multer');
var upload = multer();
var ImagetoText = require('../Utilities/OCR/tesseractOCR')
var PDFtoText = require('../Utilities/Watson/PDFtoText')
var extractor = require('../Utilities/ExtractDataFromText.js')


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

router.get('/form', function(req, res) {
  res.render('form')
});

router.get('/graph/:n', function (req, res, next) {
  res.render('graph', {
    n: req.params.n
  })
})

router.get('/graphdata', function (req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'Utilities/resources/data.json'))
})

router.get('/doc', function(req, res, next) {

  const data = {
    score: 1,
    color: 'black',
    graph: null,
    message: null,
  }

  let parseScore = parseInt(data.score)

  if (parseScore >= 0 && parseScore < 4) {
    data.color = 'green'
    data.message = 'Your doc analysis results raised few warnings. Cheers!'
  }
  else if (parseScore > 4 && parseScore < 7) {
    data.color = 'amber'
    data.message = 'Your doc analysis results raised some warnings. Consider talking to an insurance professional about your loan.'
  }
  else if (parseScore > 7 && parseScore <= 10) {
    data.color = 'red'
    data.message = 'Your doc analysis results raised significant warnings. Recommended next steps are to call our trusted partners A.A.R.P. (1-866-654-5572) and U.S. Bank (1-800-720-2265).'
  }
  else {
    console.log('error in GET /doc. score is not between 0 and 10')
    data.message = 'Error retrieving your results. Please let us know if this error occurred.'
  }
  
  res.render('doc', {data: data});

});


router.post('/upload', upload.single('file'), function (req, res, next) {
  if(req.file.originalname.indexOf('pdf') === -1){
    res.sendStatus(400);
  }else{
      PDFtoText(req.file.originalname, (text) => {
        extractor(text, ["loan", "rate"], (text) =>{
          console.log(text)
        });
      });
  }



  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

  // Use the mv() method to place the file somewhere on your server

})


// parameters for objTranslator()
  // text: an object of strings being passed to hbs view
  // res: res.send/render/json function
  // resType: 'json' or 'render' or 'send'
  // view: name of hbs view
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
