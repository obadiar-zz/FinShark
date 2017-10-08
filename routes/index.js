var express = require('express');
var router = express.Router();
var JSONData = require('../Utilities/resources/data')
var path = require('path')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/upload', function (req, res, next) {
  res.render('upload');
});

const str1 = "Lorem ipsum dolor sit amet consectetur adipiscing, elit iaculis quisque ligula dapibus taciti, luctus aliquet maecenas nibh sociis. Iaculis sagittis commodo feugiat porttitor magna praesent eros, ullamcorper ac aenean aptent eget viverra convallis"
const str2 = "Massa tellus bibendum vulputate eros quam aliquet fermentum dapibus leo auctor"
const str3 = "Fames etiam primis curabitur tempor convallis habitasse litora enim, lacus tincidunt ante"

const exampleData = [
  { msgType: 'Good News', msg: str1, color: 'lightgreen' },
  { msgType: 'Bad News', msg: str2, color: 'red' },
  { msgType: 'Next Steps', msg: str3, color: '' }
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

module.exports = router;
