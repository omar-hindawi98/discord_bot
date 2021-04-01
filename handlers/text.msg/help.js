const botConfig = require('../../config/bot.config');
const user_is_ticket_master = require('./../../modules/roles/user-is-ticket-master');

module.exports.handler = (bot, msg) => {
    // Add region command
    const commands = [
        {
            command: "!help",
            desc: "Shows a list of commands"
        },
        {
            command: "!add_region <region>",
            desc: "Adds a region to the server"
        },
        {
            command: "!remove_region <region>",
            desc: "Adds a region to the server"
        },
        {
            command: "!regions",
            desc: "Shows all regions"
        },
        {
            command: "!biomes",
            desc: "Shows all biomes"
        },
        {
            command: "!stats",
            desc: "Shows all stats of the tickets"
        },
        {
            command: "!resolve",
            desc: "Resolves a ticket"
        },
        {
            command: "!steam",
            desc: "Shows the steam profile of the ticket user"
        }
    ]
    if (msg.content.startsWith(botConfig.command_prefix + "help") && user_is_ticket_master(msg.author)) {
        let show_commands = commands.map(val => val.command + " - " + val.desc).join('\n');

        const embed = {
            color: 0x0099ff,
            title: 'Commands',
            description: show_commands,
            timestamp: new Date(),
            footer: {
                text: 'Valheim Ticket Bot 1.0',
                icon_url: 'https://i.imgur.com/wSTFkRM.png',
            },
        };

        msg.channel.send({embed: embed});
    }
};
