<<<<<<< HEAD
 var express = require('express');
 var router = express.Router();
 var async = require('async');
 var axios = require('axios');

 router.get('/getData', function(req, res, next) {
   axios.get(process.env.FLASK_URL)
   .then(function (response) {
     res.send(response.data);
   }).catch(function(err){
     console.log(err);
   })

 });
=======
var express = require('express');
var router = express.Router();
var async = require('async');
var axios = require('axios');

router.get('/getData', function(req, res, next) {
  axios.get(process.env.FLASK_URL)
  .then(function (response) {
    res.send(response.data);
  }).catch(function(err){
    console.log(err);
  })

});
>>>>>>> c611d1086c7eab5e691ba026f1a35b63244c2fae



<<<<<<< HEAD
 module.exports = router;
=======

module.exports = router;
>>>>>>> c611d1086c7eab5e691ba026f1a35b63244c2fae
