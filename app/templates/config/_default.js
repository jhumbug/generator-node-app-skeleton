var Config = require('nconf');

Config.argv().env();

Config.file('_default', './config/_default.json');

module.exports = Config;