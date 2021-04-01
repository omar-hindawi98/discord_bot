const get_category = require('./../channels/find-tickets-category');
const everyoneRole = require('./../roles/everyone-role');
const db = require('./../../schemas/index');

module.exports = async (bot, guild, user) => {
    let ticket_found = false;
    let guildObj = null;
    await db.guild.findOne({guild_id: guild.id}).populate('active_tickets').exec().then((res) => {
        ticket_found = res.active_tickets.filter(ticket => ticket.user_id === user.id).length > 0;
        guildObj = res;
    });

    if(!ticket_found){
        let category = get_category(guild);
        let everyone_role = everyoneRole(guild);

        guild.createChannel("ticket-" + user.username, {
            type: "text",
            parent: category,
            permissionOverwrites: [
                {
                    id: everyone_role.id,
                    deny: ['VIEW_CHANNEL']
                },
                {
                    id: user.id,
                    allow: ['VIEW_CHANNEL']
                }]
        }).then((channel) => {
            new db.tickets({
                guild: guildObj._id,
                user_id: user.id,
                channel_id: channel.id,
                userinfo: {
                    username: user.username + "#" + user.discriminator
                },
                ticket_id: channel.id,
                registered: Date.now()
            }).save().then(ticket => {
                db.guild.findOneAndUpdate({guild_id: guild.id}, {
                    $push: {active_tickets: ticket}
                }).exec();
            });

            channel.send("Enter your SteamID:");
        });
    }
};
