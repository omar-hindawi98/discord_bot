const botConfig = require('./../../config/bot.config');

module.exports = async (msg, user) => {
    return await (msg.member.roles.find(r => r.name === botConfig.ticket_role.name))
        ? msg.member.roles.find(r => r.name === botConfig.ticket_role.name).members.get(user.id).size > 0
        : msg.member.hasPermission('ADMINISTRATOR')
        || botConfig.super_users.includes(user.id)>= 0;
};
