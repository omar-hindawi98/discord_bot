const botConfig = require('./../../config/bot.config');

module.exports = (user) => {
    return user.hasPermission('ADMINISTRATOR')
        || botConfig.super_users.includes(user.id)>= 0;
};
