var _ = require('lodash');
var moment = require('moment');
var couchdb = require('../services/couchdb');

var db = couchdb.database('<%= sluggedAppname %>');

var controller = {};

controller.all = function (req, res, next) {
    db.view('<%= sluggedAppname %>/all', { descending: true }, function (err, doc) {
        if (err) return next(err);
       
        var allTheThings = [];

        _.forEach(doc, function(thing) { 
            allTheThings.push(thing.value); 
        });

        req.all = allTheThings;
        
        next();
    });
}

exports = module.exports = controller;
