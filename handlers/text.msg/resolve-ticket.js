const dbConfig = require('./../../config/bot.config');
const db = require('./../../schemas/index');

module.exports.handler = async (bot, msg) => {
    const command = dbConfig.command_prefix + "resolve";

    if (msg.content.startsWith(command)){
        if(msg.channel.parent.name === "tickets"){
            let guild = msg.channel.guild;
            let channel = msg.channel;

            // Move from active to resolved
            await db.guild.findOne({guild_id: guild.id}).populate('active_tickets').exec().then( async (res) => {
                // Update
                await db.tickets.findOneAndUpdate({
                    channel_id: channel.id
                }, {
                    resolved: Date.now(),
                    resolved_by: msg.author.id
                }).exec();

                let ticket = res.active_tickets.filter(ticket => ticket.channel_id === channel.id);

                db.guild.updateOne({
                    guild_id: guild.id
                }, {
                    $push: {resolved_tickets: ticket},
                    $pullAll: {active_tickets: ticket}
                },{multi:true}).exec();
            });

            // Remove channel
            guild.channels.find(c => c.id === channel.id).delete();
        }
    }
};
