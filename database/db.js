var mongoose = require('mongoose');
var configDb = require('../config/database');

// configuration ===============================================================
mongoose.connect(configDb.url); // connect to our database
// mongoose.Promise = global.Promise;
module.exports = mongoose.connection;