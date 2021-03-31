const dbConfig = require('./../../config/bot.config');
const db = require('./../../schemas');

module.exports.handler = (bot, msg) => {
    const command = dbConfig.command_prefix + "set_limit";

    if (msg.content.startsWith(command)){
        const args = msg.content.slice(command.length).trim().split(' ');
        if(args.length === 1 && args[0]){
            const val = Number(args[0]);

            if(val > dbConfig.ticket_limit.max)
                msg.channel.send(`Can't set limit to ${val}, maximum is ${dbConfig.ticket_limit.max}`);
            else if(val < dbConfig.ticket_limit.min)
                msg.channel.send(`Can't set limit to ${val}, minimum is ${dbConfig.ticket_limit.min}`);
            else{
                db.guild.findOneAndUpdate({guild_id: msg.guild.id}, {ticket_limit: val})
                    .then(() => {
                        msg.channel.send(`Setting ticket limit to: ${val}`);
                    })
                    .catch(() => {
                        msg.channel.send("Failed to set limit, try again soon");
                    });
            }
        }
        else {
            msg.channel.send(`Must specify arguments in form: ${command} <limit>`);
        }
    }
};
