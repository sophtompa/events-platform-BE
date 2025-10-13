const db = require("../connection")
const format = require("pg-format")

const seed = (eventsData, usersData) =>{
    return db.query("DROP TABLE IF EXISTS events;")
    .then(() =>{
        return db.query("DROP TABLE IF EXISTS users;");
    })
    .then (() => {   
        return createTables({eventsData, usersData});
    });
};

function createTables ({eventsData, usersData}) {
    return db.query(
        `CREATE TABLE users (
        username VARCHAR(300) PRIMARY KEY);`
    )
    .then(() => {
        const formattedUsers = usersData.map(({username}) => {
            return [username]
    });
    const usersInsert = format(
        `INSERT INTO users(username) VALUES %L RETURNING *`, formattedUsers
    );
    return db.query(usersInsert);
    })
    .then(() => {

    return db.query(
        `CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(300) UNIQUE NOT NULL,
        description VARCHAR(300) NOT NULL,
        location VARCHAR(300) NOT NULL,
        event_date DATE NOT NULL,
        username VARCHAR(300) NOT NULL REFERENCES users(username) ON DELETE CASCADE);`
    );
    })
    .then(()=>{
        const formattedEvents = eventsData.map(({id, title, description, location, event_date, username}) => {
            return [id, title, description, location, event_date, username]
        });
        const eventsInsert = format(
            `INSERT INTO events(id, title, description, location, event_date, username) VALUES %L RETURNING *`, formattedEvents
        );
        return db.query(eventsInsert)
    .then(({rows}) => rows)
    });
};

module.exports = seed;