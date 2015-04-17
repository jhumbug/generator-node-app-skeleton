var express = require('express');
var router = express.Router();

var <%= camelCasedAppname %>Controller = require('../controllers/<%= sluggedAppname %>');

/* get them all */
router.get('/', <%= camelCasedAppname %>Controller.all);
router.get('/', function (req, res) {
    res.send({ <%= camelCasedAppname %>: req.<%= camelCasedAppname %> });
});

module.exports = router;