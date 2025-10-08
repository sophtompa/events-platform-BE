const db = require('../db/connection.js');

const fetchUsers = () => {
    return db.query(`SELECT * FROM users`)
    .then(({rows}) => {
        return rows;
    })
};

const fetchEvents = () => {
    return db.query(`SELECT * FROM events`)
    .then(({rows}) => {
        return rows;
    })
};

const fetchEventsByUser = (username) => {
    return db.query(
        `SELECT * FROM events WHERE username = $1`,
        [username])
    .then(({rows}) => {
        return rows
    })
}

module.exports = { fetchUsers, fetchEvents, fetchEventsByUser }
