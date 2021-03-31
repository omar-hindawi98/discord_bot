module.exports = botConfig = {
    ticket_limit: {
        min: 1,
        max: 3
    }, // Allow 3 active tickets by specific user
    command_prefix: "!",
    ticket_channel: {
        name: "ticket",
        msg: "react to this message with :sos: to open a new ticket",
        emoji: "🆘"
    }
};
