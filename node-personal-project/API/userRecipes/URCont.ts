import { RecipeModel } from "../recipes/recipesModel";

export async function getUserRecipes(req:any, res:any) {
    try {
        //get email from query
        const { email } = req.query; //speshel identefayer
        if (!email) {
            throw new Error("email is required");
        }
        console.log(email)
        const recipeDB = await RecipeModel.find({ email });
        console.log(recipeDB)
        res.send({ recipes: recipeDB });

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
}