const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

mongoose.set('useCreateIndex', true);

db.mongoose = mongoose;

db.guild = require("./guild.schema");
db.tickets = require("./ticket.schema");

module.exports = db;
