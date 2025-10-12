const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'dev';

require('dotenv').config({path: `${__dirname}/../.env.${ENV}`})

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error("PGDATABASE or DATABASE_URL not set");
  } else {
    console.log(`Using database: ${process.env.PGDATABASE || process.env.DATABASE_URL}`);
  }

  const config = {};

if (ENV === 'production') {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2; 
  config.ssl = {rejectUnathorized: false}
} else {
  if (process.env.DATABASE_URL) config.connectionString = process.env.DATABASE_URL;
}

const dbexport = new Pool(config);

module.exports = dbexport;