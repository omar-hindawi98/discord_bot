const BOT_USER_ID = process.env.BOT_USER_ID;
const Config = require('./../../config/bot.config');

module.exports.handler = (bot, msg, user) => {
    if(msg.message.author.id === BOT_USER_ID
        && msg.emoji.name === Config.ticket_channel.emoji
        && user.id !== BOT_USER_ID){
        console.log("reacted");
        // Remove reaction from message
        // TODO
        /*
        msg.createReactionCollector((reaction, userReact) =>
            reaction.emoji.name === Config.ticket_channel.emoji
        );
         */

        // Send a message to user
        // TODO
    }
};
