const cors = require('cors')
const express = require('express');
const app = express();
const db = require("./db/connection.js")

app.use(cors());

app.use(express.json());

module.exports = app;