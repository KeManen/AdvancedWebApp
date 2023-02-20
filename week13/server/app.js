var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var booksRouter = require('./routes/books');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/book', booksRouter);

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
console.log(`Running environment ${process.env.NODE_ENV}`)
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.resolve("..", "client", "build")));
    app.get("*", (req, res) => res.sendFile(path.resolve("..", "client", "build", "index.html")));
} else if(process.env.NODE_ENV === 'development'){
    var corsOptions = {
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200,
    };
    app.use(cors(corsOptions));
}

module.exports = app;
