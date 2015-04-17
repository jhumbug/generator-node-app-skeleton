var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('api', { title: 'Welcome to the <%= humanAppname %> API' });
});

module.exports = router;
