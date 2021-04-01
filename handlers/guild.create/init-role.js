const init_role = require('./../../modules/roles/init-ticket-role');

module.exports.handler = (bot, guild) => {
    init_role(bot, guild);
};
