const cors = require('cors')
const express = require('express');
const app = express();
const db = require("./db/connection.js")
const endpoints = require("./endpoints.json")
const { getEndpoints, getUsers, getEvents, getEventsByUser, postUser, postEvent, deleteUser, deleteEventByTitle, pathNotFound } = require('./controllers/events.controllers.js');
const { handlePsqlError, handleCustomError, handleServerError } = require('./controllers/errors.controllers.js')

console.log("App loaded, ready to accept requests");

app.use(cors());

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/users", getUsers)

app.get("/api/events", async (req, res) => {
    console.log("Hit /api/events");
  
    try {
      const { data, error } = await getEvents();
      if (error) throw error;
  
      console.log("Supabase data:", data);
      res.json(data);
    } catch (err) {
      console.error("Error in getEvents:", err);
      res.status(500).send("Internal Server Error");
    }
  });
  

app.get("/api/events/:username", getEventsByUser)

app.post("/api/users", postUser)

app.post("/api/events", postEvent)

app.delete("/api/users/:username", deleteUser)

app.delete("/api/events/:title", deleteEventByTitle)

app.use(pathNotFound);

app.use(handlePsqlError);

app.use(handleCustomError);

app.use(handleServerError);

module.exports = app;