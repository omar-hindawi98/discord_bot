const mongoose = require('mongoose');
const {ObjectId} = mongoose;
const botConfig = require('./../config/db.config');

const Guild = mongoose.model(
    "Guild",
    new mongoose.Schema({
        id: String, // Id for guild
        name: String, // Guild name
        ticket_limit: {
            type: Number,
            min: 1,
            max: botConfig.ticket_limit
        },
        resolved_tickets: [{
            type: ObjectId,
            ref: 'Ticket'
        }],
        active_tickets: [{
            type: ObjectId,
            ref: 'Ticket'
        }]
    }, {collection: 'guilds'})
);

module.exports = Guild;
