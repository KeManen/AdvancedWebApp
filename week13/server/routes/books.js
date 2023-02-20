var express = require('express');
var router = express.Router();
Book = require('../models/book');

/* GET users listing. */
router.put('/', async function(req, res, next) {
  console.info("PUT /api/book");
  try{
    const{ name, author, pages } = req.body;
    console.log(name, author, pages);
    let bookExists = await Book.findOne({name: name});
    if(bookExists){
      return res.status(409).json({message: "Book already exists"});
    }
    const book = new Book({name: name, author: author, pages: pages});
    book.save().then(() => console.log(`Book saved: ${book}`));
  }
  catch(err){console.error(err); return res.status(404)}
});

module.exports = router;
