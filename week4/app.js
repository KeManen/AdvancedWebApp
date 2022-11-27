let express = require('express');
let path = require('path');
let logger = require('morgan');

let indexRouter = require('./routes/index');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
