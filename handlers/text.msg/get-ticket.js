const dbConfig = require('./../../config/bot.config');
const db = require('./../../schemas/index');
const user_is_ticket_master = require('./../../modules/roles/user-is-ticket-master');

module.exports.handler = async (bot, msg) => {
    const command = dbConfig.command_prefix + "ticket";

    if (msg.content.startsWith(command) && user_is_ticket_master(msg, msg.author)){
        let ticket_id = msg.content.split(" ").length > 0 ? msg.content.split(" ")[1] : null;

        if(!ticket_id)
            return;

        let guild_id = msg.channel.guild.id;

        let ticket = null;
        await db.tickets.findOne({
            _id: ticket_id
        }).populate('guild').exec().then(res => {
            if(res.guild.guild_id === guild_id)
                ticket = res;
        });

        if(ticket){
            let user = bot.users.find(u => u.id === ticket.user_id);

            const ticketEmbed = {
                color: 0x0099ff,
                title: 'Ticket #' + ticket._id,
                author: {
                    name: user.username + "#" + user.discriminator,
                    icon_url: user.avatarURL,
                    url: 'https://discord.com/user/' + ticket.user_id
                },
                fields: [
                    {
                        name: 'Description',
                        value: ticket.description,
                    },
                    {
                        name: '\u200b',
                        value: '\u200b',
                        inline: false,
                    },
                    {
                        name: 'SteamID',
                        value: ticket.steamid,
                        inline: true,
                    },
                    {
                        name: 'Region',
                        value: ticket.region,
                        inline: true,
                    },
                    {
                        name: 'Biome',
                        value: ticket.biome,
                        inline: true,
                    },
                ],
                timestamp: new Date(),
                footer: {
                    text: 'Valheim Ticket Bot 1.0',
                    icon_url: 'https://i.imgur.com/wSTFkRM.png',
                },
            };

            msg.channel.send({embed: ticketEmbed});
        }
        else{
            const embed = {
                color: 0xff3A3A,
                title: 'Failed',
                description: 'Ticket does not exist',
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
