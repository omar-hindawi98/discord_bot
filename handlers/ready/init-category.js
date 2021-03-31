const Config = require('../../config/bot.config');

module.exports.handler = (bot) => {
    bot.guilds.forEach((guild) => {
        let channel = guild.channels.filter( channel => channel.name === Config.ticket_category.name && channel.type === "category");

        if(channel.size <= 0){
            guild.createChannel(Config.ticket_category.name, {
                type: "category"
            }).then();
        }
    });
};
