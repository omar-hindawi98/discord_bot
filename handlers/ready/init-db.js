const db = require('./../../schemas');
const guild_db_init = require('./../../modules/database/new-guild');

module.exports.handler = (bot, guild) => {
    bot.guilds.forEach(async (guild) => {
        const guildExists = await db.guild.exists({guild_id: guild.id});

        if (!guildExists) {
            guild_db_init(guild).then(() => {
                console.log("success");
            }).catch(() => {
                console.log("failed");
            })
        };
    });
};
