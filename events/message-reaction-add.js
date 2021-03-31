// Automatic loading of handlers
const path = require("path").join(__dirname, "../handlers/message.reaction.add");
const handlers = [];
require("fs").readdirSync(path).forEach(function(file) {
    handlers.push(require("./../handlers/message.reaction.add/" + file).handler);
});

module.exports = (bot, msg, user) => {
    handlers.forEach(func => {
        func(bot, msg, user);
    });
};
