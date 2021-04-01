const dbConfig = require('./../../config/bot.config');
const db = require('./../../schemas');
const AsciiTable = require('ascii-table')

module.exports.handler = async (bot, msg) => {
    const command = dbConfig.command_prefix + "stats";

    if (msg.content.startsWith(command)){
        let resolved,
            active;

        await db.guild.findOne({
            guild_id: msg.channel.guild.id
        }).populate('resolved_tickets', 'active_tickets').exec().then(res => {
            resolved = res.resolved_tickets.length;
            active = res.active_tickets.length;

            /*
            res.resolved_tickets.forEach(tick => {
                resolved_biomes[tick.biome] = (resolved_biomes[tick.biome]) ? resolved_biomes[tick.biome] + 1 : 1;
                resolved_regions[tick.region] = (resolved_regions[tick.region]) ? resolved_regions[tick.region] + 1 : 1;
            });

            res.active_tickets.forEach(tick => {
                active_biomes[tick.biome] = (active_biomes[tick.biome]) ? active_biomes[tick.biome] + 1 : 1;
                active_regions[tick.region] = (active_regions[tick.region]) ? active_regions[tick.region] + 1 : 1;
            });
            */
        });
        /*
                var active_regions_string = "";

                , resolved_regions_string = "",
                    active_biomes_string = "", resolved_biomes_string = "";

                for (const [k, v] of Object.entries(active_regions)) {
                    active_regions_string += k.toString() + " : " + v.toString() + "\n";
                }


                for (const [k, v] of Object.entries(active_biomes)) {
                    active_biomes_string += k.toString() + " : " + v.toString() + "\n";
                };

                for (const [k, v] of Object.entries(resolved_biomes)) {
                    resolved_biomes_string += k.toString() + " : " + v.toString() + "\n";
                };

                for (const [k, v] of Object.entries(resolved_regions)) {
                    resolved_regions_string += k.toString() + " : " + v.toString() + "\n";
                };
                */
        const ticketEmbed = {
            color: 0x0099ff,
            title: 'Stats',
            fields: [
                {
                    name: 'Resolved',
                    value: resolved,
                    inline: true,
                },
                {
                    name: 'Active',
                    value: active,
                    inline: true,
                },
                {
                    name: 'Total',
                    value: resolved + active,
                    inline: true,
                },
                /*
                {
                    name: 'Region',
                    value: active_regions_string,
                    inline: true,
                }
                ,
                {
                    name: 'Biomes',
                    value: active_biomes_string,
                    inline: true,
                },
                {
                    name: 'Region',
                    value: resolved_regions_string,
                    inline: true,
                },
                {
                    name: 'Biomes',
                    value: resolved_biomes_string,
                    inline: true,
                }

                 */
            ],
            timestamp: new Date(),
            footer: {
                text: 'Valheim Ticket Bot 1.0',
                icon_url: 'https://i.imgur.com/wSTFkRM.png',
            },
        };

        msg.channel.send({embed: ticketEmbed});
    }
};
