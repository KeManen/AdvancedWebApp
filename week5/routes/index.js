const express = require('express');
const {Recipe} = require("../models/recipe");
const {Category} = require("../models/category")
const {Image} = require("../models/images")
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:'uploads/'});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/recipe/:id',(req, res, next) =>
  Recipe.findById(req.params.id, (err, recipe) => {
    if(err) {
      if(err.name === "CastError") return res.status(404).send(`Recipe ${req.params.id} not found!`)
      return next(err)
    }
    if(!recipe) return res.status(404).send(`Recipe ${req.params.id} not found!`)
    else {
      res.send(recipe);
    }
  }))


router.post('/recipe/', (req, res, next) =>
  Recipe.findOne({name: req.body.name }, (err, recipe) => {
    if(err) return next(err);
    if(!recipe){
      new Recipe({
        name:req.body.name,
        ingredients:req.body.ingredients,
        instructions:req.body.instructions,
        categories:req.body.categories,
      }).save(err => {
        if(err) return next(err);
        return res.send(req.body);
      });
    } else return res.status(403).send("Already has that recipe!");
  }));

router.get('/categories/', async (req, res, next) => {
    Category.find({}, (err, categories) => {
        if(err) return next(err)
        if(categories.any()) res.send(categories);
        else return res.status(404).send("There are no categories");
    });
});

router.post('/images', upload.array('images', 12), (req, res, next) =>{
    Recipe.findOne({name:req.body.recipe}, (err, recipe) =>{
        if(err) return next(err);
        if(!recipe) return res.status(404).send("Couldn't find a recipe with name "+ req.body.recipe);

        req.files.forEach(image => {
            let dbImage = new Image({
                name: image.filename,
                encoding: image.encoding,
                mimetype: image.type,
                buffer: image.buffer,
            }).save(err => {
                if (err) return next(err);
            })

            recipe.images.push(dbImage._id);
        });

        recipe.save();
    });


    console.log(req.files)
    res.send("Hi :]");
})

router.get('images/:imageId', (req, res, next) => {
    Image.findById(req.params.imageId, (err, image) => {
        if(err) return next(err);
        if(image.any()){
            res.set({
                'Content-Type':image.mimetype,
                'Content-Disposition':'inline',
            });
           res.send(image);
        }
        else return res.status(404).send("There are no images");
    });
})

module.exports = router;
