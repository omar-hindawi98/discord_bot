const botConfig = require('./../../config/bot.config');

module.exports = (bot, guild) => {
    // Get ticket channel
    if(guild.roles.find(role => role.name === botConfig.ticket_role.name))
        return;

    guild.createRole({
        name: botConfig.ticket_role.name,
        color: '#56e4ff',
        permissions: 0
    }).then().catch();
};
