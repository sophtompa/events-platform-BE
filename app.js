const cors = require('cors')
const express = require('express');
const app = express();
const db = require("./db/connection.js")
const endpoints = require("./endpoints.json")
const { getEndpoints, getUsers, getEvents, getEventsByUser, postUser, postEvent, deleteUser, deleteEventByTitle } = require('./controllers/events.controllers.js');

app.use(cors());

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/users", getUsers)

app.get("/api/events", getEvents)

app.get("/api/events/:username", getEventsByUser)

app.post("/api/users", postUser)

app.post("/api/events", postEvent)

app.delete("/api/users/:username", deleteUser)

app.delete("/api/events/:title", deleteEventByTitle)

module.exports = app;