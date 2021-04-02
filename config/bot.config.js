// TODO: Move config to database, continously watch database for changes
module.exports = botConfig = {
    name: "Valheim Ticket Bot 1.0",
    version: 1.0,
    icon_url: 'https://i.imgur.com/wSTFkRM.png',
    ticket_limit: {
        min: 1,
        max: 3
    }, // Allow 3 active tickets by specific user
    command_prefix: "!",
    ticket_channel: {
        name: "ticket",
        msg: "react to this message with :sos: to open a new ticket",
        emoji: "🆘"
    },
    ticket_category: {
        name: "tickets"
    },
    ticket_role: {
        name: "Ticket Master"
    },
    super_users: [478311348581826563],
    interval_check: 1000*60*60, // Check every hour
    bumped_check: 24*60*60*1000*7, // Every week bump
    remove_ticket_time: 24*60*60*1000*7 // Time that the ticket will be removed after the first bump
};
