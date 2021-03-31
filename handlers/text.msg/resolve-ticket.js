const dbConfig = require('./../../config/bot.config');
const db = require('./../../schemas/index');

module.exports.handler = (bot, msg) => {
    const command = dbConfig.command_prefix + "resolve";

    if (msg.content.startsWith(command)){
        if(msg.channel.parent.name === "tickets"){
            let guild = msg.channel.guild;
            let channel = msg.channel;

            // Add ticket to database for history
            new db.tickets({
                guild: db.guild.findOne(g => g.guild_id === guild.id),
                user: ,
                resolved: Date.now(),
                resolved_by:
            })

            // Remove channel
            guild.channels.find(c => c.id === channel.id).delete();
        }
    }
};
