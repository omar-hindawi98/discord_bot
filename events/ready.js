// Automatic loading of handlers
const path = require("path").join(__dirname, "../handlers/ready");
const handlers = [];
require("fs").readdirSync(path).forEach(function(file) {
    handlers.push(require("./../handlers/ready/" + file).handler);
});

module.exports = (bot) => {
    handlers.forEach(func => {
        func(bot);
    });
};
