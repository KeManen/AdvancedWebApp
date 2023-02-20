var express = require('express');
var router = express.Router();
const Book = require("../models/book");

/* GET users listing. */
router.get('/:name', async function(req, res, next){
  console.log("get books " + req.params.name)
  Book.findOne({'name' : req.params.name}).then(book =>{
    return res.status(200).send({
      name:book.name,
      author:book.author,
      pages:book.pages
    });
  }).catch(err => {
    console.error(err);
    return res.status(404).send("Not Found");
  });
})

router.post('/', async function(req, res, next) {
  console.info("Post /api/book");
  try{
    const{ name, author, pages } = req.body;
    console.log(name, author, pages);
    let bookExists = await Book.findOne({name: name});
    if(bookExists){
      return res.status(409).json({message: "Book already exists"});
    }
    const book = new Book({name: name, author: author, pages: pages});
    book.save().then(() => {
      console.log(`Book saved: ${book}`);
      return res.status(200).send("Book added"); 
    });
  }
  catch(err){console.error(err); return res.status(404)}
});



module.exports = router;
