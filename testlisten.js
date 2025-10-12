const app = require('./app');
const db = require('./db/connection.js');

const { PORT = 9000 } = process.env;

async function startServer() {
  try {
    const res = await db.query('SELECT 1');
    console.log('Database connection working:', res.rows);

    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Listening on port: ${PORT}`);
      }
    });

  } catch (err) {
    console.error('Database connection failed:', err);
  }
}

startServer();
