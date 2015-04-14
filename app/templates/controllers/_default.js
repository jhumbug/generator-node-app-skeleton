var _ = require('lodash');
var moment = require('moment');

var Config = require('../config/_default');
var _defaultData = require('../data/_default');

var controller = {};

/* Middlewares */

controller._default = function (req, res, next) {
    _defaultData.db.view('_default/all', { descending: true }, function (err, doc) {
        if (err) return next(err);
       
        var _defaults = [];

        _.forEach(doc, function(_default) { 
            _defaults.push(_default.value); 
        });

        req._defaults = _defaults;
        
        next();
    });
}

exports = module.exports = controller;
