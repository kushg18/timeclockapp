const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');

const users = require("./routes/users");
const config = require("./config/database");

const app = express();

// Connect to database
mongoose.connect(config.database); 
// On successful connection
mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo Database: '+config.database);
});
// On unsuccessful connection
mongoose.connection.on('error', (err) => {
    console.log('Mongo Database Error: '+err);
});


// Set Static Folder for BackEnd Deployment
app.use(express.static(path.join(__dirname, 'public')));

// Port Number
const port = process.env.PORT || 8080;
// const port = 3000;

// CORS Middleware
app.use(cors());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Body-Parser Middleware
app.use(bodyparser.json());

app.use('/users', users);

// Index Route
app.get('/', (req, res)=>{
    res.send('Invalid Endpoint.');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
    console.log("Server started on port: "+port);
});