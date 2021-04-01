const botConfig = require('./../../config/bot.config');

module.exports = (user) => {
    return user.roles.find(role => role.name === botConfig.ticket_role.name)
        || user.hasPermission('ADMINISTRATOR')
        || botConfig.super_users.includes(user.id)>= 0;
};
