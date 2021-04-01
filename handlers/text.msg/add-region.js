const botConfig = require('../../config/bot.config');
const db = require('./../../schemas/');
const user_is_admin = require('./../../modules/roles/user-is-admin');

module.exports.handler = async (bot, msg) => {
    // Add region command
    if (msg.content.startsWith(botConfig.command_prefix + "add_region") && user_is_admin(msg.author)) {
        let newRegion = msg.content.substr(msg.content.indexOf(' ')+1).trim();
        let guild = msg.channel.guild;

        db.guild.findOneAndUpdate({
            guild_id: guild.id
        }, {
            $addToSet: {regions: newRegion}
        }).exec().then(() => {
            msg.channel.send("Added new region: " + newRegion);
        }).catch(() => {
            msg.channel.send("Failed to add region: " + newRegion);
        });
    }
};
