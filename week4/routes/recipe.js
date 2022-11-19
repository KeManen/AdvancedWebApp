var express = require('express');
const {Recipe, RecipeStorage} = require("../models/recipe");
var router = express.Router();

/* GET users listing. */
router.get('/:id', (req, res) => {
  res.send({
    "name":req.params.id,
    "ingredients":["stuff", "things"],
    "instructions":["preparing", "cooking"],
  });
});

router.post('/', (req, res) =>{
  let recipe = new Recipe(
      req.body.name,
      req.body.ingredients,
      req.body.instructions,
  )
  RecipeStorage[recipe.name] = recipe;
  res.send({
    "name":recipe.name,
    "ingredients":recipe.ingredients,
    "instructions":recipe.instructions,
  });
})

module.exports = router;
