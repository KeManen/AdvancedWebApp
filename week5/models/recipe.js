class Recipe {
    constructor(name = "sustenance", ingredients = ["stuff", "things"], instructions = ["preparing", "cooking"]) {
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
    }
}
const RecipeStorage = {
    sustenance: new Recipe(),
};

module.exports = {Recipe, RecipeStorage};