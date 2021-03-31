// Automatic loading of handlers
const path = require("path").join(__dirname, "../handlers/guild.create");
const handlers = [];
require("fs").readdirSync(path).forEach(function(file) {
    handlers.push(require("./../handlers/guild.create/" + file).handler);
});

module.exports = (bot, guild) => {
    handlers.forEach(func => {
        func(bot, guild);
    });
};
