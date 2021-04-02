const dbConfig = require('./../../config/bot.config');
const db = require('./../../schemas/index');
const user_is_ticket_master = require('./../../modules/roles/user-is-ticket-master');

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
        (mm>9 ? '' : '0') + mm,
        (dd>9 ? '' : '0') + dd
    ].join('-');
};

module.exports.handler = async (bot, msg) => {
    const command = dbConfig.command_prefix + "user_ticket";

    if (msg.content.startsWith(command) && user_is_ticket_master(msg, msg.author)){
        let user_handle = msg.content.substr(msg.content.indexOf(' ') + 1);

        if(!user_handle || !/.*#[0-9]{4}/.test(user_handle))
            return;

        let user = user_handle.split("#");

        let guild_id = msg.channel.guild.id;
        let user_id = bot.users.find(u => u.username === user[0] && u.discriminator === user[1]);

        if(!user_id)
            return;

        user_id = user_id.id;

        let user_tickets = null;
        await db.guild.findOne({
            guild_id: guild_id
        }).populate('active_tickets').populate('resolved_tickets').exec().then(res => {
            res.resolved_tickets = res.resolved_tickets.filter(ticket => ticket.user_id === user_id);
            res.active_tickets = res.active_tickets.filter(ticket => ticket.user_id === user_id);
            user_tickets = res;
        }).catch();

        if(user_tickets){
            let user = bot.users.find(u => u.id === user_id);

            let active_tickets_ids = (user_tickets.active_tickets.length > 0) ? user_tickets.active_tickets.map(tick => tick.id).join("\n") : "\u200b" ;
            let active_tickets_dates = (user_tickets.active_tickets.length > 0) ? user_tickets.active_tickets.map(tick => tick.registered.yyyymmdd()).join("\n") : "\u200b" ;
            let resolved_tickets_ids = (user_tickets.resolved_tickets.length > 0) ? user_tickets.resolved_tickets.map(tick => tick.id).join("\n") : "\u200b" ;
            let resolved_tickets_dates = (user_tickets.resolved_tickets.length > 0) ? user_tickets.resolved_tickets.map(tick => tick.resolved.yyyymmdd()).join("\n") : "\u200b" ;

            const ticketEmbed = {
                color: 0x0099ff,
                author: {
                    name: user.username + "#" + user.discriminator,
                    icon_url: user.avatarURL,
                    url: 'https://discord.com/user/' + user_id
                },
                fields: [
                    {
                        name: 'Active Tickets(' + user_tickets.active_tickets.length + ')',
                        value: active_tickets_ids,
                        inline: true,
                    },
                    {
                        name: '\u200b',
                        value: '\u200b',
                        inline: true,
                    },
                    {
                        name: 'Date',
                        value: active_tickets_dates,
                        inline: true,
                    },
                    {
                        name: 'Resolved Tickets(' + user_tickets.resolved_tickets.length + ')',
                        value: resolved_tickets_ids,
                        inline: true,
                    },
                    {
                        name: '\u200b',
                        value: '\u200b',
                        inline: true,
                    },
                    {
                        name: 'Date',
                        value: resolved_tickets_dates,
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
                description: 'User does not exist',
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
