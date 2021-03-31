const channel_init = require('./../../modules/init/create-channel');

module.exports.handler = (bot) => {
    bot.guilds.forEach((guild) => {
        channel_init(bot, guild )
    });
};
