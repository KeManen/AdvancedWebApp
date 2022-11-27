let recipeName = document.getElementById("recipe-name");
let recipeIngredients = document.getElementById("recipe-ingredients");
let recipeInstructions = document.getElementById("recipe-instructions");

let nameText = document.getElementById("name-text");
let ingredientsText = document.getElementById("ingredients-text");
let instructionsText = document.getElementById("instructions-text");

let imageInput = document.getElementById("image-input");

let pInstructions = document.getElementById("pInstructions");
let pIngredients = document.getElementById("pIngredients");

let instructionStorage = [];
let ingredientsStorage = [];


fetch('/recipe/sustenance')
    .then(res => res.json())
    .then(json => {
        recipeName.innerHTML = json.name;
        json.ingredients.forEach(value =>{
            let li = document.createElement('li');
            li.innerHTML = value;
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
    for(let i =0; i< imageInput.files.length; i++){
        formData.append("images", imageInput.files[i])
    }

    console.log(formData)
    fetch('/images', {
        method: 'POST',
        body: formData,
    }).catch(err => console.error(err));

    console.log({
        name: nameText.value,
        ingredients: ingredientsStorage,
        instructions: instructionStorage
    })
    fetch('/recipe/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
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
    pIngredients.innerText = ingredientsStorage.toString();

})

document.getElementById("add-instruction").addEventListener('click', () => {
    instructionStorage.push(instructionsText.value);
    instructionsText.value ="";
    pInstructions.innerText = instructionStorage.toString();
})