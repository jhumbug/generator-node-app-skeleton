'use strict';

var config = require('../config/<%= sluggedAppname %>');
var mongoose = require('mongoose');

var environment = process.env.ENVIRONMENT || 'development';

var uri = config.get('DatabaseConfig:' + environment + ':mongodb:uri');
mongoose.connect(uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function (callback) {
//     console.log('done');
// });

module.exports = mongoose;