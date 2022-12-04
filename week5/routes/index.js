const express = require('express');

const Recipe = require("../models/recipe");
const Category = require("../models/category")
const Image = require("../models/images")

const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage:storage});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/recipe/:id',(req, res, next) =>
  Recipe.findOne({name:req.params.id}, null, null, (err, recipe) => {
    if(err) {
      if(err.name === "CastError") return res.status(404).send(`Recipe ${req.params.id} not found!`)
      else return next(err)
    }
    if(!recipe) return res.status(404).send(`Recipe ${req.params.id} not found!`);

    res.send(recipe);

  })
)


router.post('/recipe/', (req, res, next) =>
  Recipe.findOne({name: req.body.name }, null, null, (err, recipe) => {
      if (err) return next(err);
      if (recipe) return res.status(404).send("Already has that recipe!");


      Category.find({name: {$in: req.body.categories}}, null, null, (err, category) => {
          if (err) return res.next(err)
          if (!category) return res.next(err);
          let ids = []
          category.forEach(categoryObject => ids.push(categoryObject._id));

          new Recipe({
              name: req.body.name,
              ingredients: req.body.ingredients,
              instructions: req.body.instructions,
              categories: ids,
          }).save(err => {
              if (err) return next(err);
              return res.send(req.body);
          });
      });
  })
);

router.get('/categories/', (req, res, next) => {
    Category.find({}, null, null, (err, categories) => {
        if(err) return next(err);
        if(!categories) return next(err);
        if(categories.length === 0) return res.status(404).send("There are no categories");

        res.send(categories);
    });
});

router.post('/images/', upload.array('images', 12), (req, res, next) =>{

    Recipe.findOne({name:req.body.recipe}, null, null, (err, recipe) =>{
        if(err) return next(err);
        if(!recipe) return res.status(404).send("Couldn't find a recipe with name "+ req.body.recipe);

        req.files.forEach(image => {
            let dbImage = new Image({
                name: image.originalname,
                encoding: image.encoding,
                mimetype: image.mimetype,
                buffer: image.buffer,
            });
            dbImage.save(err => {
                if (err) return next(err);
            })

            recipe.images.push(dbImage._id);
        });

        recipe.save();
    });

    res.send("Hi :]");
})

router.get('/images/:imageId', (req, res, next) => {
    Image.findById(req.params.imageId, null, null, (err, image) => {
        if(err) return next(err);
        if(image.length === 0) return res.status(404).send("There are no images");
        res.set({
            'Content-Type':image.mimetype,
            'Content-Disposition':'inline',
        });
        res.send(image);
    });
});

function errorHandler(err){
    console.log(err);
}

module.exports = router;
