const message_ticket = require('./msg-ticket');
const Config = require('../../config/bot.config');
const everyoneRole = require('./../../modules/roles/everyone-role');

module.exports = (bot, guild) => {
    // Get ticket channel
    let channel = guild.channels.filter( channel => channel.name === Config.ticket_channel.name && channel.type === "text");

    // Get everyone id
    let everyone_role = everyoneRole(guild);

    // Init new channel
    if(channel.size <= 0){
        guild.createChannel(Config.ticket_channel.name, {
            type: "text",
            permissionOverwrites: [
                {
                    id: everyone_role.id,
                    allow: ['VIEW_CHANNEL', 'ADD_REACTIONS', 'READ_MESSAGE_HISTORY'],
                    deny: ['SEND_MESSAGES']
                }]
        }).then(channel => {
            message_ticket(channel);
        });
    }
    // Channel already exists, check for message
    else
        message_ticket(channel.first());
};
