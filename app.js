const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// db connection
mongoose.connect(config.database);

// on db connection success
mongoose.connection.on('connected', () => {
    console.log('connected to db ' + config.database);
});

// on db connection error
mongoose.connection.on('error', (err) => {
    console.log('DB error ' + err);
});

const app = express();

const users = require('./routes/users');

// port number 
const port = process.env.PORT || 8080; // for Heroku

// CORS middleware
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser middleware
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// index route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// redirect undeclared routes to index
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// starting server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});