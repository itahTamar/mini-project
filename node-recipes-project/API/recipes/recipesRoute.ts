import express from 'express'
import {getRecipes, addRecipe, deleteRecipe, updateRecipe, getOneRecipe} from "./recipesCont"
const router = express.Router();

router.get('/get-recipes', getRecipes)
      .get('/get-one-recipe', getOneRecipe)
      .post('/add-recipe', addRecipe)
      .delete('/delete-recipe', deleteRecipe)
      .patch('/update-recipe', updateRecipe );

export default router;
