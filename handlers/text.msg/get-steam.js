const botConfig = require('../../config/bot.config');
const db = require('./../../schemas/');
const steam = require('./../../modules/steam/steam-profile');
const user_is_ticket_master = require('./../../modules/roles/user-is-ticket-master');

module.exports.handler = async (bot, msg) => {
    // Add region command
    if (msg.content.startsWith(botConfig.command_prefix + "steam") && user_is_ticket_master(msg, msg.author)) {
        let steamid = null;
        await db.tickets.findOne({
            channel_id: msg.channel.id
        }).exec().then(res => {
            if(res)
                steamid = res.steamid;
        }).catch();

        if(!steamid)
            return;

        let test = await steam.grap_profile(steamid);

        if(test && test.response.players.length > 0) {
            let player = test.response.players[0];
            const embed = {
                color: 0x0099ff,
                title: 'Steam profile',
                url: player.profileurl,
                thumbnail: {
                    url: player.avatarmedium,
                },
                fields: [
                    {
                        name: 'Steam name',
                        value: player.personaname,
                        inline: true
                    },
                    {
                        name: 'Discord name',
                        value: msg.author.username + "#" + msg.author.discriminator,
                        inline: true
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: 'Valheim Ticket Bot 1.0',
                    icon_url: 'https://i.imgur.com/wSTFkRM.png',
                },
            };

            msg.channel.send({embed: embed});
        }
        else{
            const embed = {
                color: 0xff3A3A,
                title: 'Failed',
                description: 'Failed to get steam profile',
                timestamp: new Date(),
                footer: {
                    text: 'Valheim Ticket Bot 1.0',
                    icon_url: 'https://i.imgur.com/wSTFkRM.png',
                },
            };

            msg.channel.send({embed: embed});
        }
    }
};
