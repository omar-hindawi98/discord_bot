// Automatic loading of handlers
const path = require("path").join(__dirname, "../handlers/text.msg");
const handlers = [];
require("fs").readdirSync(path).forEach(function(file) {
    if(file.endsWith(".js"))
        handlers.push(require("./../handlers/text.msg/" + file).handler);
});

module.exports = (bot, msg) => {
    handlers.forEach(func => {
        func(bot, msg);
    });
};
