let recipeName = document.getElementById("recipe-name");
let recipeIngredients = document.getElementById("recipe-ingredients");
let recipeInstructions = document.getElementById("recipe-instructions");

let nameText = document.getElementById("name-text");
let ingredientsText = document.getElementById("ingredients-text");
let instructionsText = document.getElementById("instructions-text");

let imageInput = document.getElementById("image-input");

let instructionStorage = [];
let ingredientsStorage = [];


fetch('/recipe/sustenance')
    .then(res => res.json())
    .then(json => {
        recipeName.innerHTML = json.name;
        json.ingredients.forEach(value =>{
            let li = document.createElement('li');
            li.innerHTML =value;
            recipeIngredients.appendChild(li);
        })
        json.instructions.forEach(value =>{
            let li = document.createElement('li');
            li.innerHTML = value;
            recipeInstructions.appendChild(li);
        })
    })
    .catch(err => console.error(err))

document.getElementById("submit").addEventListener('click', () =>{
    let formData = new FormData();
    formData["images"] = imageInput.files;
    fetch('/images', {
        method: 'post',
        body: formData,
    }).catch(err => console.error(err));

    fetch('/recipe', {
        method: 'post',
        body: JSON.stringify({
            name: nameText.value,
            ingredients: ingredientsStorage,
            instructions: instructionStorage
        }),
    }).catch(err => console.error(err))
})

document.getElementById("add-ingredient").addEventListener('click', () => {
    ingredientsStorage.push(ingredientsText.value);
    ingredientsText.value = "";
})

document.getElementById("add-instruction").addEventListener('click', () => {
    instructionStorage.push(instructionsText.value);
    instructionsText.value ="";
})