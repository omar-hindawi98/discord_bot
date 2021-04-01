const db = require('./../../schemas/index');
const botConfig = require('./../../config/bot.config');

const steamid = require('./../../modules/steam/steam-profile');

module.exports.handler = async (bot, msg) => {
    // Is command, return
    if(msg.content.startsWith(botConfig.command_prefix))
        return;

    if(msg.channel.parent.name === "tickets"){
        db.tickets.find({user_id: msg.author.id, resolved: null}).sort({registered: -1}).limit(1).exec().then(async ticket =>  {
            ticket = ticket[0];
            let answer = msg.content;
            if(ticket === undefined || ticket === null)
                return;

            if(msg.author.id === ticket.user_id){
                switch(ticket.stage){
                    case 0:
                        // check if valid steamid
                        if(!steamid.valid_steamid(answer)){
                            msg.channel.send("Not valid STEAMID, must be in form of: STEAM_X:Y:Z");
                            return;
                        }

                        ticket.updateOne({
                            steamid: answer,
                            stage: 1
                        }).exec();

                        msg.channel.send("Enter region(!regions for all regions)");
                        break;
                    case 1:
                        // check if valid region
                        let found_region = false;
                        await db.guild.findOne({
                            guild_id: msg.guild.id
                        }).exec().then(res => {
                            found_region = res.regions.includes(answer) > 0;
                        }).catch();

                        if(!found_region){
                            msg.channel.send("Not valid region, type !regions to view all valid ones.");
                            return;
                        }

                        ticket.updateOne({
                            region: answer,
                            stage: 2
                        }).exec();

                        msg.channel.send("Enter biome(!biomes for all biomes)");
                        break;
                    case 2:
                        // todo: check if valid biome
                        // check if valid region
                        let found_biome = false;
                        await db.biomes.find({}).exec().then(res => {
                            found_biome = res.find(biome => biome.name === answer);
                        }).catch();

                        if(!found_biome){
                            msg.channel.send("Not valid biome, type !biomes to view all valid ones.");
                            return;
                        }

                        ticket.updateOne({
                            biome: answer,
                            stage: 3
                        }).exec();

                        msg.channel.send("Describe your problem");
                        break;
                    case 3:
                        ticket.updateOne({
                            description: answer,
                            stage: 4
                        }).exec();

                        // Remove all messages
                        msg.channel.bulkDelete(100).then(() => {
                            // Embedded shiet
                            const ticketEmbed = {
                                color: 0x0099ff,
                                title: 'Ticket #' + ticket._id,
                                author: {
                                    name: msg.author.username + "#" + msg.author.discriminator,
                                    icon_url: msg.author.avatarURL,
                                    url: 'https://discord.com/user/' + ticket.user_id
                                },
                                fields: [
                                    {
                                        name: 'Description',
                                        value: answer,
                                    },
                                    {
                                        name: '\u200b',
                                        value: '\u200b',
                                        inline: false,
                                    },
                                    {
                                        name: 'SteamID',
                                        value: ticket.steamid,
                                        icon_url: msg.author.avatarURL,
                                        url: 'https://google.com/',
                                        inline: true,
                                    },
                                    {
                                        name: 'Region',
                                        value: ticket.region,
                                        inline: true,
                                    },
                                    {
                                        name: 'Biome',
                                        value: ticket.biome,
                                        inline: true,
                                    },
                                ],
                                timestamp: new Date(),
                                footer: {
                                    text: 'Valheim Ticket Bot 1.0',
                                    icon_url: 'https://i.imgur.com/wSTFkRM.png',
                                },
                            };

                            msg.channel.send({embed: ticketEmbed});

                            // Send message
                            msg.channel.send("A ticket master will soon help you");
                        }).catch();

                        break;
                }
            }
        }).catch();
    }
};
