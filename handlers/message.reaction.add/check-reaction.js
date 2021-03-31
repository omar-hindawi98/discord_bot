const BOT_USER_ID = process.env.BOT_USER_ID;
const Config = require('./../../config/bot.config');

const create_ticket = require('./../../modules/ticket/create-ticket');

module.exports.handler = (bot, msg, user) => {
    if(msg.message.author.id === BOT_USER_ID
        && msg.emoji.name === Config.ticket_channel.emoji
        && user.id !== BOT_USER_ID){
        console.log("reacted");
        // TODO: remove reaction from message
        /*
        msg.createReactionCollector((reaction, userReact) =>
            reaction.emoji.name === Config.ticket_channel.emoji
        );
         */

        // Send a message to user
        create_ticket(bot, msg.message.channel.guild, user);
    }
};
