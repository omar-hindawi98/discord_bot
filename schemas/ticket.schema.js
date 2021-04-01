const mongoose = require('mongoose');
const {ObjectId} = mongoose;

const Ticket = mongoose.model(
    "Ticket",
    new mongoose.Schema({
        guild: {
            type: ObjectId,
            ref: 'Guild'
        },
        channel_id: String,
        description: String,
        stage: {
            type: Number,
            default: 0
        },
        user_id: String,
        username: String,
        steamid: String,
        region: String,
        biome: String,
        registered: {
            type: Date,
            default: Date.now()
        },
        bumped: {
            type: Date,
            default: Date.now()
        },
        resolved: {
            type: Date,
            default: null
        },
        resolved_by: String // Resolved by which admin
    }, {collection: 'tickets'})
);

module.exports = Ticket;
