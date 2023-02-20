mongoose = require('mongoose');

const schema = new mongoose.Schema({
    'name': String,
    'author': String,
    'pages': Number,
});

const Book = mongoose.model('Book', schema);
module.exports = Book;