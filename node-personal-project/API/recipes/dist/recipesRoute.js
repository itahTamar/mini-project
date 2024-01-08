"use strict";
exports.__esModule = true;
var express_1 = require("express");
var recipesCont_1 = require("./recipesCont");
var router = express_1["default"].Router();
router.get('/get-recipes', recipesCont_1.getRecipes)
    .get('/get-one-recipe', recipesCont_1.getOneRecipe)
    .post('/add-recipe', recipesCont_1.addRecipe)["delete"]('/delete-recipe', recipesCont_1.deleteRecipe)
    .patch('/update-recipe', recipesCont_1.updateRecipe);
exports["default"] = router;
