const db = require('./../../schemas');

// Todo: fix this
module.exports.handler = (bot, guild) => {
    // Update db
    db.guild.findOneAndUpdate({guild_id: guild.id}, {active: false});
};
