const eventsData= require('../data/eventsData/events.js')
const usersData = require('../data/eventsData/users.js')
const seed = require('./seed.js')
const db = require('../connection.js')

const runSeed = () => {
    return seed(eventsData, usersData).then((rows) => {
        console.log("Seeding complete:", rows);
    })
    .catch((err) => {
        console.error("Seeding failed:", err);
    })
    .then(() => db.end());
};

runSeed();
