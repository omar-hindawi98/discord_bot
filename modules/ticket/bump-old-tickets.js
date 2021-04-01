const db = require('./../../schemas/index');
const botConfig = require('./../../config/bot.config');

module.exports = (bot) => {
    db.guild.find({}).populate('active_tickets').exec().then(allGuilds => {
        allGuilds.forEach(guild => {
            guild.active_tickets.forEach(ticket => {
                if((Date.now() - ticket.bumped) >= botConfig.bumped_check){
                    db.tickets.findOneAndUpdate({
                        _id: ticket._id
                    }, {
                        bumped: Date.now()
                    }).exec().then().catch();

                    bot.channels.get(ticket.channel_id).send("Bump, this ticket seems to be old.");
                }
            });
        });
    }).catch();
};
