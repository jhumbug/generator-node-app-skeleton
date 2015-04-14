var app = require('../app');
var Config = require('../config/_default');
var cradle = require('cradle');

var environment = process.env.ENVIRONMENT || 'development';

var configHost = 'DatabaseConfig:' + environment + ':host';
var configPort = 'DatabaseConfig:' + environment + ':port';
var configAuth = {}; 

if (Config.get('DatabaseConfig:' + environment + ':secure')) {
	configAuth = { secure: true, auth: { username: Config.get('DatabaseConfig:' + environment + ':auth:username'), password: Config.get('DatabaseConfig:' + environment + ':auth:password') } };
}

var connection = new(cradle.Connection)( (Config.get(configHost)), Config.get(configPort), configAuth  );

module.exports = connection;