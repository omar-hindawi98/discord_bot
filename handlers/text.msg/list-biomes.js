const botConfig = require('../../config/bot.config');
const db = require('./../../schemas/');

module.exports.handler = async (bot, msg) => {
    // Add region command
    if (msg.content.startsWith(botConfig.command_prefix + "biomes")) {
        let biomes = [];
        await db.biomes.find({}).exec()
            .then(res => {
                biomes = res.map(v => v.name);
            })
            .catch();

        const embed = {
            color: 0x0099ff,
            title: 'Biomes',
            description: biomes.join('\n'),
            timestamp: new Date(),
            footer: {
                text: 'Valheim Ticket Bot 1.0',
                icon_url: 'https://i.imgur.com/wSTFkRM.png',
            },
        };

        msg.channel.send({embed: embed});
    }
};
