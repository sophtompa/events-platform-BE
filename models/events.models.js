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
        return rows[0] })
        .catch(err => {
            if(err.code === '23505') {
                return Promise.reject({status: 400, msg: 'Event title already exists'})
            }
            return Promise.reject(err);
        })
};

const removeUser = (username) => {
    return db.query(
        `DELETE FROM users WHERE username = $1 RETURNING username`, [username])
    .then(({rows}) => {
        return rows[0];
    })
};

const removeEventByTitle = (title) => {
    return db.query(
        `DELETE FROM events WHERE title = $1 RETURNING title, description, location, event_date, username`, [title]
    )
    .then(({rows}) => {
        return rows[0];
    })
};


module.exports = { fetchUsers, fetchEvents, fetchEventsByUser, sendUser, sendEvent, removeUser, removeEventByTitle }
