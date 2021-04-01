const mongoose = require('mongoose');
const {ObjectId} = mongoose;
const botConfig = require('./../config/bot.config');

const Guild = mongoose.model(
    "Guild",
    new mongoose.Schema({
        guild_id: String,
        name: String, // Guild name
        ticket_limit: {
            type: Number,
            min: 1,
            max: botConfig.ticket_limit.max,
            default: 2
        },
        regions: [String],
        resolved_tickets: [{
            type: ObjectId,
            ref: 'Ticket'
        }],
        active_tickets: [{
            type: ObjectId,
            ref: 'Ticket'
        }],
        joined: {
            type: Date,
            default: Date.now()
        },
        active: {
            type: Boolean,
            default: true
        }
    }, {collection: 'guilds'})
);

module.exports = Guild;
