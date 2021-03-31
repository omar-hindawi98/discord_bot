const channel_init = require('./../../modules/init/create-channel');

module.exports.handler = (bot, guild) => {
    channel_init(bot, guild);
};
