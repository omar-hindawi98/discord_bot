const mongoose = require('mongoose');

const Biomes = mongoose.model(
    "Biomes",
    new mongoose.Schema({
        name: String,
        added: {
            type: Date,
            default: Date.now()
        }
    }, {collection: 'biomes'})
);

module.exports = Biomes;
