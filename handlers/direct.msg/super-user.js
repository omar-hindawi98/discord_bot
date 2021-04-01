const botConfig = require('../../config/bot.config');
const db = require('../../schemas/');

module.exports.handler = async (bot, msg) => {
    if(botConfig.super_users.includes(msg.author.id)>= 0){

        // Add biome command
        if (msg.content.startsWith(botConfig.command_prefix + "add_biome")) {
            let newBiome = msg.content;

            if(newBiome.substr(newBiome.indexOf(' ')+1).trim()){
                new db.biomes({
                    name: newBiome.substr(newBiome.indexOf(' ')+1).trim()
                }).save();

                msg.author.send("Added new biome " + newBiome.substr(newBiome.indexOf(' ')+1).trim()).catch();
            }
        }
    }
};
