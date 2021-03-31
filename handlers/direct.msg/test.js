module.exports.handler = (bot, msg) => {
    msg.author.send("stop typing").catch(ignore => {});
};
