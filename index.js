require('dotenv').config();
const Discord = require('discord.js');
const Events = require('./events/index');
const db = require("./schemas");
const dbConfig = require("./config/db.config");

// Constants
const TOKEN = process.env.TOKEN;

// Bot init
const bot = new Discord.Client();
bot.login(TOKEN).catch((err) => {
  throw new Error(`Failed to initialize bot: ${err}`);
});

// Connect to db
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch(err => {
    throw new Error(`Failed to connect to database: ${err}`);
  });

/**
 * Event handling redirection
 */
bot.on('ready', () => {Events.ready(bot)});
bot.on('messageReactionAdd', (msg, user) => Events.message_reaction_add(bot, msg, user));
bot.on('message', (msg) => {
  switch(msg.channel.type){
    case "dm": // Direct messages
      Events.direct_message(bot, msg);
      break;
    case "text": // In text channel
      Events.text_message(bot, msg);
      break;
  }
});
bot.on("guildUpdate", (before, after) => Events.guild_update(bot, before, after));

/**
 * Fix for event handling
 */
bot.on('raw', packet => {
  // We don't want this to run on unrelated packets
  if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
  // Grab the channel to check the message from
  const channel = bot.channels.get(packet.d.channel_id);
  // There's no need to emit if the message is cached, because the event will fire anyway for that
  if (channel.messages.has(packet.d.message_id)) return;
  // Since we have confirmed the message is not cached, let's fetch it
  channel.fetchMessage(packet.d.message_id).then(message => {
    // Emojis can have identifiers of name:id format, so we have to account for that case as well
    const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
    // This gives us the reaction we need to emit the event properly, in top of the message object
    const reaction = message.reactions.get(emoji);
    // Adds the currently reacting user to the reaction's users collection.
    if (reaction) reaction.users.set(packet.d.user_id, bot.users.get(packet.d.user_id));
    // Check which type of event it is before emitting
    if (packet.t === 'MESSAGE_REACTION_ADD') {
      bot.emit('messageReactionAdd', reaction, bot.users.get(packet.d.user_id));
    }
    if (packet.t === 'MESSAGE_REACTION_REMOVE') {
      bot.emit('messageReactionRemove', reaction, bot.users.get(packet.d.user_id));
    }
  });
});
