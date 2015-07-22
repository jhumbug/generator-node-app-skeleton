'use strict';

var config = require('../config/<%= sluggedAppname %>');

var db = false;

if (config.get('<%= camelCasedAppname %>Config:enable_database')) {
    if (config.get('DatabaseConfig:databaseType') === 'mongodb') {
        var mongodb = require('../services/mongodb');
        db = mongodb;
    } else if (config.get('DatabaseConfig:databaseType') === 'couchdb') {
        var couchdb = require('../services/couchdb');
        db = couchdb.database('lower-thirds');
    }
}
exports = module.exports = db;