const BOT_USER_ID = process.env.BOT_USER_ID;

const Config = require('../../config/bot.config');

module.exports = (channel) => {
    // check if message already exists
    channel.fetchMessages().then(r => {
        // Get messages only sent by bot
        let channel_filter = r.filter(msg => msg.author.id === BOT_USER_ID);

        // Send new message
        if(channel_filter.size === 0){
            channel.send(Config.ticket_channel.msg).then(msg => {
                msg.react(Config.ticket_channel.emoji);
            });
        }
    });
};
