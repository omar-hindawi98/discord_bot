const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
db.mongoose = mongoose;

db.guild = require("./guild.schema");
db.tickets = require("./ticket.schema");

module.exports = db;
