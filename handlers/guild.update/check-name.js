const db = require('./../../schemas');

module.exports.handler = (bot, before, after) => {
    // Update db
    if(before.name !== after.name){
        let guild_id = after.id;
        let new_name = after.name;

        db.guild.findOneAndUpdate({guild_id: guild_id}, {name: new_name});
    }
};
