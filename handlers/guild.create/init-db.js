const db = require('./../../schemas');
const guild_db_init = require('./../../modules/database/new-guild');

module.exports.handler = async (bot, guild) => {
    const guildExists = await db.guild.exists({guild_id: guild.id});

    if(guildExists){
        db.guild.findOneAndUpdate({guild_id: guild.id}, {active: true});
    }
    else{
        guild_db_init(guild).then(() => {
            console.log("success");
        }).catch(() => {
            console.log("failed");
        })
    }
};
