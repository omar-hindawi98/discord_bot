const db = require('./../../schemas');

module.exports = (guild) => {
    return new db.guild({
        guild_id: guild.id,
        name: guild.name
    }).save();
};
