const app = require('./app');

const PORT = process.env.PORT || 9000;

app.listen(PORT, (err) => {
    if(err) {
        console.log(err);
    }
    else {
    console.log(`Listening on port: ${PORT}`);
    }
})

