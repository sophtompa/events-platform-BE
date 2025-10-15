const endpoints = require("../endpoints.json")
const {fetchUsers, fetchEvents, fetchEventById, fetchEventsByUser, sendUser, sendEvent, removeUser, removeEventByTitle} = require("../models/events.models")

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

const getEventById = (req, res, next) => {
    const {id} = req.params;
    
    fetchEventById(id)
    .then((events) => {
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

const postUser = (req,res, next) => {
    console.log("attemp controller post")
    const {username, password} = req.body;

    if(!username || !password) {
        return res.status(400).json({error: 'Missing username or password'})
    }

    sendUser(username, password)
    .then((user) => {
        return res.status(201).json({user});
    })
    .catch((err) => {
        next(err);
    })
};

const postEvent = (req,res, next) => {
    const {title, description, location, event_date, username} = req.body;
    
    if(!title || !description || !location || !event_date || !username) {
        return res.status(400).json({error: 'Missing required fields'})
    }

    sendEvent(title, description, location, event_date, username)
    .then((event) => {
        return res.status(201).json({event});
    })
    .catch((err) => {
        next(err);
    })
}

const deleteUser = (req, res, next) => {
    const {username} = req.params;
    removeUser(username).then((rows) => {
        return res.status(204).send(rows)
    })
    .catch((err) => {
        next(err);
    })
}

const deleteEventByTitle = (req, res, next) => {
    const {title} = req.params;
    removeEventByTitle(title).then((rows) => {
        return res.status(204).send(rows)
    })
    .catch((err) => {
        next(err);
    })
}

const pathNotFound = (req, res, next) => {
    res.status(404).send({ msg: 'path not found' });
};

module.exports = { getEndpoints, getEvents, getUsers, getEventById, getEventsByUser, postUser, postEvent, deleteUser, deleteEventByTitle, pathNotFound }
