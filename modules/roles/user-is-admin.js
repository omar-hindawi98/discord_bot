const botConfig = require('./../../config/bot.config');

module.exports = async (msg, user) => {
    return await msg.member.hasPermission('ADMINISTRATOR')
        || botConfig.super_users.includes(user.id)>= 0;
};
