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
};

const sendUser = (username) => {
    return db.query(`INSERT INTO users(username) VALUES ($1) RETURNING *`, [username])
    .then(({rows}) => {
        return rows[0];
    });
};

const sendEvent = (title, description, location, event_date, username) => {
    return db.query(`INSERT INTO events(title, description, location, event_date, username) VALUES ($1, $2, $3, $4, $5) RETURNING title, description, location, event_date, username`, [title, description, location, event_date, username])
    .then(({rows}) => {
        const row = rows[0];
        return {
            title: row.title,
            description: row.description,
            location: row.location,
            event_date: row.event_date,
            username: row.username
          };
    });
};

module.exports = { fetchUsers, fetchEvents, fetchEventsByUser, sendUser, sendEvent }
