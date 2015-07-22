'use strict';

var _ = require('lodash');
var db = require('./database');

var controller = {};

controller.all = function (req, res, next) {
	if (db) {
        db.view('<%= sluggedAppname %>/all', { descending: true }, function (err, doc) {
            if (err) return next(err);

            var allTheThings = [];

            _.forEach(doc, function(thing) {
                allTheThings.push(thing.value);
            });

            req.all = allTheThings;

            next();
        });
    }  else {
    	req.all = [{ 'id': 1, 'title': 'Shut the front door' }];
    	next();
    }
};

controller.one = function (req, res, next) {
    if (db) {
        var id = req.params.id;
        db.get(id, function (err, doc) {
            if (err) return next(err);

            req.one = _({})
                .assign(doc)
                .omit(['_rev', '_deleted_conflicts'])
                .value();

            next();
        });
    } else {
    	req.one = { 'id': 1, 'title': 'Shut the front door' };
    	next();
    }
};

exports = module.exports = controller;
