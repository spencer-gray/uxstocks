const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
var http = require('http');
const sslRedirect = require('heroku-ssl-redirect');

// Load env
dotenv.config({ path: './config.env'});

const app = express();

// enable ssl redirect
app.use(sslRedirect());

// Dev logging
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

if(process.env.NODE_ENV === 'production') {
    setInterval(() => {
        http.get('http://uxstocks.herokuapp.com');
    }, 600000); // ping every 10 minutes
}

// Profile routes
app.use('/api/v1/stock', require('./routes/profile'))

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});