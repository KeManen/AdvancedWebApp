const express = require('express');
const {RecipeStorage, Recipe} = require("../models/recipe");
const router = express.Router();
const multer = require('multer');
const upload = multer();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/images', upload.array('images'), (req, res) =>{
  let images = req.files.images;
  console.log(req.files)
  res.send("Hi :]");
})

router.get('/recipe/:id', (req, res) => {
  let name = req.params.id;
  let recipe = RecipeStorage[name];
  console.log(recipe)
  if(recipe == null) return res.json({
    name:name,
    ingredients:["undefined"],
    instructions:["undefined"],
  })

  let ingredients = RecipeStorage[name].ingredients;
  let instructions = RecipeStorage[name].instructions;
  if(ingredients == null) ingredients = ["undefined"];
  if(instructions == null) instructions = ["undefined"];

  res.json({
    name:name,
    ingredients:ingredients,
    instructions:instructions,
  });
});

router.post('/recipe/', (req, res) =>{
  console.log("recipe")
  console.log(req.body)
  let recipe = new Recipe(
      req.body.name,
      req.body.ingredients,
      req.body.instructions,
  )
  console.log(recipe)
  console.log(RecipeStorage)
  RecipeStorage[recipe.name] = recipe;
  console.log(RecipeStorage)
  res.json({
    name:recipe.name,
    ingredients:recipe.ingredients,
    instructions:recipe.instructions,
  });
})

module.exports = router;
