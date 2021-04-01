const db = require('./../../schemas/index');

module.exports = async (user) => {
    await db.tickets.findOne({
        user_id: user.id
    }, (err, ticket) => {
        return ticket;
    });
};
