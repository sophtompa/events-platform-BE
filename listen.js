const app = require('./app');

const PORT = process.env.PORT || 9000;

//Test
const db = require('./db/connection');

(async () => {
  try {
    const res = await db.query('SELECT 1');
    console.log('Database connection works:', res.rows);
  } catch (err) {
    console.error('Database connection failed:', err);
  }
})();

app.listen(PORT, (err) => {
    if(err) {
        console.log(err);
    }
    else {
    console.log(`Listening on port: ${PORT}`);
    }
})

