var couchdb = require('../services/couchdb');
var _defaultData = {};

_defaultData.db = couchdb.database('_default');

module.exports = _defaultData;