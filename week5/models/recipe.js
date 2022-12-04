const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let recipeSchema = new Schema ({
    name: String,
    ingredients:String,
    instructions: String,
    categories:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }],
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Images',
    }]
})

module.exports = mongoose.model("Recipe", recipeSchema)
