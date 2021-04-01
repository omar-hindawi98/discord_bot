const db = require('./../../schemas/index');

module.exports.handler = async (bot, msg) => {
    if(msg.channel.parent.name === "tickets"){
        db.tickets.find({user_id: msg.author.id, resolved: null}).sort({registered: -1}).limit(1).exec().then(ticket => {
            ticket = ticket[0];
            let answer = msg.content;
            if(ticket === undefined || ticket === null)
                return;

            if(msg.author.id === ticket.user_id){
                switch(ticket.stage){
                    case 0:
                        ticket.updateOne({
                            steamid: answer,
                            stage: 1
                        }).exec();

                        msg.channel.send("Enter region");
                        break;
                    case 1:
                        ticket.updateOne({
                            region: answer,
                            stage: 2
                        }).exec();

                        msg.channel.send("Enter biome");
                        break;
                    case 2:
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
