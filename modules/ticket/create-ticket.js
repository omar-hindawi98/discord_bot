const get_category = require('./../channels/find-tickets-category');
const everyoneRole = require('./../roles/everyone-role');

module.exports = (bot, guild, user) => {
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
        channel.send("Enter your SteamID:");
    });
};
