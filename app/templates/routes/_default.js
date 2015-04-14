var express = require('express');
var router = express.Router();

var _defaultController = require('../controllers/_default');

/* GET all callers. */
router.get('/', _defaultController._default);
router.get('/', function (req, res) {
    res.send({ _default: req._default });
});

module.exports = router;