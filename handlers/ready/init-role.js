const init_role = require('./../../modules/roles/init-ticket-role');

module.exports.handler = (bot) => {
    bot.guilds.forEach((guild) => {
        init_role(bot, guild);
    });
};
