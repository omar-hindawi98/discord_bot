const Config = require('../../config/bot.config');

module.exports = (guild) => {
    return guild.channels.filter( channel => channel.name === Config.ticket_category.name && channel.type === "category").first();
};
