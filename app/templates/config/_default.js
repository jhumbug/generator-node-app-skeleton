var _ = require('lodash');
var Config = require('nconf');

/**
* Filter environment variables with keys starting with 'APP_'
* And parse those keys to override config values
*
* Ex: key 'APP__APP_CONFIG__API_VERSION' becomes 'AppConfig:apiVersion'
* Ex: key 'APP__AUTH_CONFIG__LDAP__HOST' becomes 'AuthConfig:ldap:host'
*
* After slicing the leading 'APP_' off,
* _APP_CONFIG__API_VERSION becomes 'AppConfig:apiVersion',
* but _APP_CONFIG___API_VERSION would become 'AppConfig:ApiVersion'
* (values after '___' will capitalize, after '__' will only camelCase)
*
**/
var appPrefix = 'APP_';
var appEnv = _({})
    .merge(process.env)
    .pick(function (value, key) {
        return _.startsWith(key, appPrefix);
    }).transform(function (result, value, key) {
        var split = _(key.substring(appPrefix.length).split('__'))
            .map(function (str) {
                return _.camelCase(str.toLowerCase());
            }).value();
        result[split.join(':')] = value;
    }).value();

Config.argv().env();
Config.file('<%= sluggedAppname %>', './<%= sluggedAppname %>.json');
Config.file('pkg', './package.json');

// replace config values from parsed environment variables above.
_.forIn(appEnv, function (val, key) {
    var value = val === 'true' ? true : (val === 'false' ? false : val);
    // Don't allow config arrays to be overridden by environment vars
    if (!_.isArray(Config.get(key))) Config.set(key, value);
});



module.exports = Config;
