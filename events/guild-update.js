// Automatic loading of handlers
const path = require("path").join(__dirname, "../handlers/guild.update");
const handlers = [];
require("fs").readdirSync(path).forEach(function(file) {
    handlers.push(require("./../handlers/guild.update/" + file).handler);
});

module.exports = (bot, before, after) => {
    handlers.forEach(func => {
        func(bot, before, after);
    });
};
