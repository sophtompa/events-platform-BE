const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const endpoints = require("../endpoints.json")
const {fetchUsers, fetchUserByUsername, fetchEvents, fetchEventById, fetchEventsByUser, sendUser, sendEvent, removeUser, removeEventByTitle} = require("../models/events.models")

const loginUser = (req, res, next) => {
    const { username, password } = req.body;

    fetchUserByUsername(username)
    .then((user) => {
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        return bcrypt.compare(password, user.password)
        .then((valid) => {
            if (!valid) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
        expiresIn: "24h",
        });
        
        res.json({ token });
        });
    })
    .catch((err) => {
        next(err);
    });
};

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
    const {username, password} = req.body;

    if(!username || !password) {
        return res.status(400).json({error: 'Missing username or password'})
    }

    const saltRounds = 10

    bcrypt.hash(password, saltRounds)
        .then((hashedPassword) => {
            return sendUser(username, hashedPassword)
        })
    .then((user) => {
        return res.status(201).json({user});
    })
    .catch((err) => {
        if (err.code === '23505') {
            return res.status(409).json({error: 'Username already exists'});
        }
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

module.exports = { getEndpoints, loginUser, getUsers, getEvents, getEventById, getEventsByUser, postUser, postEvent, deleteUser, deleteEventByTitle, pathNotFound }
