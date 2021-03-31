const mongoose = require('mongoose');
const {ObjectId} = mongoose;

const Ticket = mongoose.model(
    "Ticket",
    new mongoose.Schema({
        id:  {
            ObjectId,
            auto: true
        },
        guild: {
            type: ObjectId,
            ref: 'Guild'
        },
        description: String,
        user: String, // User id
        registered: {
            type: Date,
            default: Date.now()
        },
        resolved: {
            type: Date,
            default: null
        },
        closed_user: Boolean, // If ticket has been revoked by user
        resolved_by: String // Resolved by which admin
    }, {collection: 'tickets'})
);

module.exports = Ticket;
