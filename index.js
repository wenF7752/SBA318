const express = require('express');
const { connectDB } = require('./db/db');
const path = require('path');
const bodyParser = require("body-parser");
const error = require('./utilities/error');
require('dotenv').config();

//middleware
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

//routers
const roomsRouter = require('./routes/rooms');


// Create an Express application
const app = express();
const PORT = 3000;


// Parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Logging middleware
app.use(logger);


// Template Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Mount routers before index
app.use('/rooms', roomsRouter);


app.use('/', (req, res) => {
    res.render('index');
});




connectDB()
    .then(db => {
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Failed to connect to MongoDB", err);
    });



// 404 Middleware should be after all routes
app.use((req, res, next) => {
    next(error(404, "Resource Not Found"));
});

// Error-handling middleware
app.use(errorHandler);