var couchdb = require('../services/couchdb');
var _defaultData = {};

<%= camelCasedAppname %>Data.db = couchdb.database('<%= sluggedAppname %>');

module.exports = <%= camelCasedAppname %>Data;