// Automatic loading of handlers
const path = require("path").join(__dirname, "../handlers/guild.delete");
const handlers = [];
require("fs").readdirSync(path).forEach(function(file) {
    if(file.endsWith(".js"))
        handlers.push(require("./../handlers/guild.delete/" + file).handler);
});

module.exports = (bot, guild) => {
    handlers.forEach(func => {
        func(bot, guild);
    });
};
