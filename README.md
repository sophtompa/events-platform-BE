# Events-Platform Backend

## Project Summary:

#### This project showcases the backend of a Node.js events app, which uses PostgreSQL to send/retrieve data from the database.

#### Features include the ability to view all existing events and users; the ability to create a staff account and post new events, and delete any events posted from your account. It is also possible to sign up to an event, and add it to your google calendar.

#### Link to the hosted version: https://events-platform-be-cxuw.onrender.com

## Setup Instructions

### Clone the repo

Firstly, clone the repo to your device, using the command `git clone`.

### Setup the database

To set up and seed the database, run the command `npm run setup-dbs`, followed by `npm run seed`. This will seed the database with two default users and two default events.

### Setup .env files

Create a file named '.env.production'.
Populate this with the ENV variable 'PGDATABASE=events_db'.

Include this .env file in .gitignore

#### Installations:

The project also requires the installation of 'dotenv', 'express', 'pg', 'pgformat', and 'cors', using `npm i (installation-name)`
