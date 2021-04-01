const botConfig = require('../../config/bot.config');
const db = require('./../../schemas/');

module.exports.handler = async (bot, msg) => {
    // Add region command
    if (msg.content.startsWith(botConfig.command_prefix + "regions")) {
        let guild = msg.channel.guild;

        db.guild.findOne({
            guild_id: guild.id
        }).exec().then(res => {
            const embed = {
                color: 0x0099ff,
                title: 'Regions',
                description: res.regions.join('\n'),
                timestamp: new Date(),
                footer: {
                    text: 'Valheim Ticket Bot 1.0',
                    icon_url: 'https://i.imgur.com/wSTFkRM.png',
                },
            };

            msg.channel.send({embed: embed});
        });
    }
};
