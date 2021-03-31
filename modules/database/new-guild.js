const db = require('./../../schemas');
const botConfig = require('./../../config/bot.config');

module.exports = (guild) => {
    return new db.guild({
        guild_id: guild.id,
        name: guild.name
    }).save();
};
