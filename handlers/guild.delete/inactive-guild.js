const db = require('./../../schemas');

module.exports.handler = (bot, guild) => {
    // Update db
    db.guild.findOneAndUpdate({guild_id: guild.id}, {active: false});
};
