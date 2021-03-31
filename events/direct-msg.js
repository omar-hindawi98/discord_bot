// Automatic loading of handlers
const path = require("path").join(__dirname, "../handlers/direct.msg");
const handlers = [];
require("fs").readdirSync(path).forEach(function(file) {
    handlers.push(require("./../handlers/direct.msg/" + file).handler);
});

module.exports = (bot, msg) => {
    handlers.forEach(func => {
        func(bot, msg);
    });
};
