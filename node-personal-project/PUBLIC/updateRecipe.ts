
async function getRecipe(id: string){
try {
    const response = await fetch(`/API/recipes/get-recipe?id=${id}`);
    console.log("response of get recipe:", response)
    const recipe = await response.json(); //Parse the JSON content of the response into a JavaScript object.
    console.log("recipe:", recipe)
    renderUpdateRecipeForm(recipe, document.querySelector("#recipe_update_form")) 
} catch (error) {
    console.error(error)
}
}
//hendel
function hendelGetRecipe(){
    const recipeId = new URLSearchParams(window.location.search).get('recipeId');
    console.log("recipeId:", recipeId)
    getRecipe(recipeId);
}

async function hendlUpdateRecipe(ev: any, id: string) {
    try { 
        ev.preventDefault();
        const bodyID = { id };
        if (!id) throw new Error("no recipe id");
        console.log(bodyID)
        //get the updated data
        const title = ev.target.title.value
        const description = ev.target.description.value
        const urlImg = ev.target.urlImg.value;
        const updatRecipe = { title, description, urlImg }
        console.log(updatRecipe);
        //send the updated recipe to the server/DB
        const response = await fetch('/API/recipes/update-recipe', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatRecipe)
        });
        const { recipes } = await response.json(); //and get the new recipes array from the server
        console.log(recipes)

        window.location.href = '/main.html';
        document.querySelector("form").reset();
    } catch (error) {
        console.error(error)
    }
}

//render update form
function renderUpdateRecipeForm(recipe: Recipe, root: HTMLDivElement) {
    try {
        if (!recipe) throw new Error("error geting recipe");
        if (!root) throw new Error("no root");
        
        const html =  `<form onsubmit="hendlUpdateRecipe(event,'${recipe._id} )">
                            <input type="text" name="title" placeholder="${recipe.title}">
                            <textarea  type="text" rows="20" cols="30" name="description" placeholder="${recipe.description}"></textarea>
                            <input type="url" name="imgUrl" placeholder="${recipe.urlImg}">
                            <button type="submit">Update Recipe now</button>
                        </form>`
                     
        root.innerHTML = html;
    } catch (error) {
        console.error(error);
        return "";
    }
}