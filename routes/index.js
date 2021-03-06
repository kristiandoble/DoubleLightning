var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lightning' });
});

router.get('/index.html', function(req, res, next) {
  res.render('index', { title: 'Lightning' });
});

router.get('/bitcoin.html', function(req, res, next) {
  res.render('bitcoin', { title: 'Lightning'});
});

router.get('/lightning.html', function(req, res, next) {
  res.render('lightning', { title: 'Lightning' });
});

router.get('/redeem.html', function(req, res, next) {
  res.render('redeem', { title: 'Lightning' });
});

router.get('/opennode.html', function(req, res, next) {
  res.render('opennode', { title: 'Lightning' });
});


router.get('/.html', function(req, res, next) {
  res.render('bitcoin', { title: 'Lightning'});
});

router.get('/quiz.html', function(req, res, next) {
  res.render('quiz', { title: 'Lightning'});
});

router.get('/signup.html', function(req, res, next) {
  res.render('signup', { title: 'Lightning' , message: "Welcome to Lightning Payment"});
});

module.exports = router;
