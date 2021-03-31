// Place all event handlers here
const ready = require("./ready");
const message_reaction_add = require("./message-reaction-add");
const text_message = require("./textMsg");
const direct_message = require("./direct-msg");
const guild_update = require("./guild-update");

module.exports = {
    ready,
    message_reaction_add,
    text_message,
    direct_message,
    guild_update
};
