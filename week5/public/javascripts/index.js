let recipeName = document.getElementById("recipe-name");
let recipeIngredients = document.getElementById("recipe-ingredients");
let recipeInstructions = document.getElementById("recipe-instructions");

let nameText = document.getElementById("name-text");
let ingredientsText = document.getElementById("ingredients-text");
let instructionsText = document.getElementById("instructions-text");

let imageInput = document.getElementById("image-input");

let pInstructions = document.getElementById("pInstructions");
let pIngredients = document.getElementById("pIngredients");

let searchBar = document.getElementById("search");

let categoriesDiv = document.getElementById("categories");
let imagesDiv = document.getElementById("images");

let instructionStorage = [];
let ingredientsStorage = [];

document.getElementById("submit").addEventListener('click', () =>{
    let formData = new FormData();
    formData.set("recipe", nameText.value)
    for(let i =0; i< imageInput.files.length; i++){
        formData.append("images", imageInput.files[i])
    }

    console.log(formData)
    fetch('/images', {
        method: 'POST',
        body: formData,
    }).catch(errorHandler);

    let recipe = {
        name: nameText.value,
        ingredients: ingredientsStorage,
        instructions: instructionStorage,
        categories:[]
    }

    for (let child of categoriesDiv.children){
        if(child.checked) recipe.categories.push(child.id)
    }

    console.log(recipe);

    fetch('/recipe/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe),
    }).catch(errorHandler)
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

document.getElementById("search").addEventListener('keypress', ev => {
    if(ev.key !== "Enter") return;
    // On enter

    fetch(`/recipe/${searchBar.value}`)
        .then(res =>res.json())
        .then(setShowedRecipe)
        .catch(errorHandler)
})

function setShowedRecipe(json) {
    recipeName.innerHTML = json.name;
    json.ingredients.forEach(value => {
        let li = document.createElement('li');
        li.innerHTML = value;
        recipeIngredients.appendChild(li);
    })
    json.instructions.forEach(value => {
        let li = document.createElement('li');
        li.innerHTML = value;
        recipeInstructions.appendChild(li);
    })
    json.images.forEach(imageId =>{
        fetch(`/images/${imageId}`).then(res => res.json())
            .then(json => {
                let img = new Image();
                img.src =`data:${json.mimetype};base64${json.buffer.toString('base64')}`;
                imagesDiv.appendChild(img);
            }).catch(errorHandler)
    })
}

function errorHandler(err) {
    console.error(err);
}

function init(){
    fetch('/recipe/sustenance')
        .then(res => res.json())
        .then(setShowedRecipe)
        .catch(errorHandler);

    fetch('/categories/').then(res => res.json()).then(json => {
        json.forEach(category => {
            let checkbox = document.createElement("input")
            checkbox.type = "checkbox";
            checkbox.id = category;
            categoriesDiv.appendChild(checkbox);
        })

    }).catch(errorHandler);
}

init();