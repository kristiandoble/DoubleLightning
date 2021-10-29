var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lightning' , message: "Welcome to Lightning Payment"});
});

router.get('/bitcoin', function(req, res, next) {
  res.render('bitcoin', { title: 'Lightning' , message: "Welcome to Lightning Payment"});
});

module.exports = router;