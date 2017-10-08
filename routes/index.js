var express = require('express');
var router = express.Router();
var languageTranslator = require('../Utilities/Watson/Translation');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
  const lang = req.query.lang || 'en';
  let text = {
    welcome: "Welcome, Watson",
    upload: "Upload",
  };

  if (lang === 'en') {
    res.render('home', { title: 'FinShark', text: text });
  }
  if (lang) {
    async.forEachOf(text, (val, key, cb) => {
      try {
        languageTranslator(key, 'en', lang, (translation) => {
          text[key] = translation;
          cb();
        });
      }
      catch (e) {
        return cb(e);
      }
    }, (err) => {
      if (err) console.log(err);
      res.json({"text": text});
    })

  }
});

router.post('/', (req, res) => {
  /* var lang = req.body.lang; */
  /* console.log(lang) */
  res.redirect(`/?lang=${req.body.lang}`);
});

router.get('/upload', function(req, res, next) {
  res.render('upload');
});

const str1 = "Lorem ipsum dolor sit amet consectetur adipiscing, elit iaculis quisque ligula dapibus taciti, luctus aliquet maecenas nibh sociis. Iaculis sagittis commodo feugiat porttitor magna praesent eros, ullamcorper ac aenean aptent eget viverra convallis"
const str2 = "Massa tellus bibendum vulputate eros quam aliquet fermentum dapibus leo auctor"
const str3 = "Fames etiam primis curabitur tempor convallis habitasse litora enim, lacus tincidunt ante"

const exampleData = [
  {msgType: 'Good News', msg: str1, color: 'lightgreen'},
  {msgType: 'Bad News', msg: str2, color: 'red'},
  {msgType: 'Next Steps', msg: str3, color: ''}
]

router.get('/doc', function(req, res, next) {
  /* let tmp = null; */
  /* languageTranslator('Hello, my name is Rob.', 'en', 'es', (x) => { */
  /*   console.log('x', x); */
  /*   tmp = x; */
  /*   console.log('tmp', tmp) */
  /* }) */

   // when we get real data, we need to render doc with translated data
  res.render('doc', {data: exampleData});

});

module.exports = router;
