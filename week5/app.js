const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require("mongoose");

const indexRouter = require('./routes');

const app = express();

const mongoDB = "mongodb://localhost:27017/testdb"
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
