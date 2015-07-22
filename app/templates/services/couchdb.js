'use strict';

var Config = require('../config/<%= sluggedAppname %>');
var cradle = require('cradle');

var environment = process.env.ENVIRONMENT || 'development';

var configHost = 'DatabaseConfig:' + environment + ':couchdb:host';
var configPort = 'DatabaseConfig:' + environment + ':couchdb:port';
var configAuth = {};

if (Config.get('DatabaseConfig:' + environment + ':couchdb:secure')) {
    var username = Config.get('DatabaseConfig:' + environment + ':couchdb:auth:username');
    var password = Config.get('DatabaseConfig:' + environment + ':couchdb:auth:password');

    configAuth = { secure: true, auth: { username: username, password: password } };
}

var connection = new(cradle.Connection)( (Config.get(configHost)), Config.get(configPort), configAuth );

module.exports = connection;