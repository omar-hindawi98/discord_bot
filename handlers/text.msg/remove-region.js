const botConfig = require('../../config/bot.config');
const db = require('./../../schemas/');

module.exports.handler = async (bot, msg) => {
    // Add region command
    if (msg.content.startsWith(botConfig.command_prefix + "remove_region")) {
        let newRegion = msg.content.substr(msg.content.indexOf(' ')+1).trim();
        let guild = msg.channel.guild;

        db.guild.findOneAndUpdate({
            guild_id: guild.id
        }, {
            $pull: {regions: newRegion}
        }).exec().then(() => {
            msg.channel.send("Removed region: " + newRegion);
        }).catch(() => {
            msg.channel.send("Failed to remove region: " + newRegion);
        });
    }
};
