const endpoints = require("../endpoints.json")
const {fetchUsers, fetchEvents, fetchEventsByUser} = require("../models/events.models")

const getEndpoints = (req, res) => {
    return res.status(200).send({endpoints});
};

const getUsers = (req, res, next) => {

    fetchUsers().then((users) => {
        res.status(200).send({users})
    })
    .catch((err) => {
        next(err);
    })
};

const getEvents = (req, res, next) => {
    
    fetchEvents().then((events) => {
        res.status(200).send({events})
    })
    .catch((err) => {
        next(err);
    })
};

const getEventsByUser = (req, res, next) => {
    const {username} = req.params;
    
    fetchEventsByUser(username)
    .then((events) => {
        res.status(200).send({events})
    })
    .catch((err) => {
        next(err);
    })
};



module.exports = { getEndpoints, getEvents, getUsers, getEventsByUser }
