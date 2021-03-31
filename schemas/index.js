const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.guild = require("./guild.schema");
db.tickets = require("./ticket.schema");

module.exports = db;
