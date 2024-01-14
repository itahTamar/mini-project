//import { Recipe, recipes } from "../API/recipes/recipesModel";

interface Recipe {
    title: string;
    description: string;
    urlImg?: string
    _id: string;
}

const recipes: Recipe[] = [];

// a function which get the email from the url query
function getEmailFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('email');
}

//handle
function handelGetUserRecipes() {
    const email = getEmailFromQuery();
    console.log(email)
    GetUserRecipe(email)
}

async function hendelDeleteUser(){
    try {
        const email = getEmailFromQuery();
        if (!email) throw new Error("no email");
        console.log(email)
        const response = await fetch('/API/users/delete-user'
            , {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
        //convert response to join data
        const { users } = await response.json();
        console.log(users);
        window.location.href = "/index.html"
    } catch (error) {
        console.error(error)
    }
}

async function hendelAddRecipe(ev: any) {
    try {
        ev.preventDefault();
        console.dir(ev)
        //identify the user by email 
        const email = getEmailFromQuery();
        if (!email) throw new Error("no email");
        console.log(email)
        //create the new recipe of the user
        const title = ev.target.title.value
        console.log(title)
        const description = ev.target.description.value
        console.log(description)
        const urlImg = ev.target.querySelector('[name="imgUrl"]').value;
        console.log(urlImg)
        const newRecipe = { title, description, urlImg, email }
        console.log(newRecipe);
        //send the new recipe to the server/DB
        const response = await fetch('/API/recipes/add-recipe', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newRecipe)  //the data that send to the DB server in json-formatted string
        });
        const { recipes } = await response.json(); //and get the new recipes array from the server
        renderRecipes(recipes, document.querySelector("#userRecipes"))
        document.querySelector("form").reset();

    } catch (error) {
        console.error(error)
    }

}


async function handleUpdateRecpie(ev: any) {
    try {
        ev.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        const email=urlParams.get('email');
        const recipeId = ev.target.id
        if (!recipeId)throw new Error("no recipe id");
        
        //get the updated data
        const title = ev.target.titleUpdate.value
        const description = ev.target.descriptionUpdate.value
        
        const urlImg = ev.target.imgUrlUpdate.value;
        const updateRecipe = {id: recipeId, title, description, urlImg, email}
        console.log(updateRecipe);
        //send the updated recipe to the server/DB
        const response = await fetch('/API/recipes/update-recipe', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateRecipe)
        });
        const updateForm = document.querySelector(".recipe_update") as HTMLFormElement
        //console.log("updateForm:", updateForm)
        if(!updateForm) //error handle
        updateForm.style.display = "none"
        //reset inputs
        const { recipes } = await response.json(); //and get the new recipes array from the server
        console.log(recipes)

        renderRecipes(recipes, document.querySelector("#userRecipes"))
        document.querySelector("form").reset();
    } catch (error) {
        console.error(error)
    }
}

async function hendelDeleteRecipe(id: string) {
    try {
        console.log(id)
        const email = getEmailFromQuery();
        if (!email) throw new Error("no email");
        console.log(email)
        const response = await fetch('/API/recipes/delete-recipe'
            , {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, email })
            });
        //convert response to join data
        const { recipes } = await response.json();
        console.log(recipes);
        renderRecipes(recipes, document.querySelector('#userRecipes'))
    } catch (error) {

    }
}

//render
function renderRecipe(recipe: Recipe) {
    try {        
        const html = `<div class="recipe">
                        <h3>${recipe.title}</h3>
                        <br>
                        <p class="recipe_description">${recipe.description}</p>
                        <img src='${recipe.urlImg}'>
                        <br>
                        <button onclick="hendelDeleteRecipe('${recipe._id}')">Delet Recipe</button>
                        <button onclick="renderUpdateForm('${recipe._id}')">Update Recipe</button>
                      </div>`
        return html;
    } catch (error) {
        console.error(error);
        return "";
    }
}

function renderRecipes(recipes: Recipe[], root: HTMLDivElement) {
    try {
        if (!root) throw new Error("no div element");

        // Debugging: Check the type and content of 'recipes'
        console.log("Type of recipes:", typeof recipes);
        console.log("Content of recipes:", recipes);

        let html = "<ul>";
        html += recipes.map(recipe => renderRecipe(recipe)).join("");
        html += "<ul>";

        root.innerHTML = html;

    } catch (error) {
        console.error(error);
        return "";
    }
}

//controllers
async function GetUserRecipe(email: string) {
    try {
        const response = await fetch(`/API/userRecipes/get-user-recipes?email=${email}`);
        const data = await response.json();
        console.log("data:", data)
        renderRecipes(data.recipes, document.querySelector("#userRecipes"))
    } catch (error) {
        console.error(error)
    }

}
// TODO:

async function renderUpdateForm(recpieId: string) {
    try {
        const response = await fetch(`/API/Recipes/get-one-recipe?id=${recpieId}`); // get recpie by id
        console.log(response)
        
        const data = await response.json(); //recpies
        console.log(data)

        const updateForm = document.querySelector(".recipe_update") as HTMLFormElement
        console.log("updateForm1:", updateForm)
        if(!updateForm)throw new Error("no html element");    
        
        updateForm.style.display = "flex"
        updateForm.setAttribute("id", data.recipes._id)
        //see the form with the data
        const inputName = document.querySelector("#titleUpdate") as HTMLInputElement;
        const inputDescriptiom = document.querySelector("#descriptionUpdate") as HTMLInputElement;
        const inputImgUrl = document.querySelector("#imgUrlUpdate") as HTMLInputElement;        
        inputName.value = data.recipes.title 
        inputDescriptiom.value = data.recipes.description 
        inputImgUrl.value = data.recipes.urlImg

    } catch (error) {
        console.error(error)
    }
}