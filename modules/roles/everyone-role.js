module.exports = (guild) => {
    return guild.roles.find(role => role.name === "@everyone");
};
