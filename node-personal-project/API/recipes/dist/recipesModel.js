"use strict";
exports.__esModule = true;
exports.recipes = exports.RecipeModel = exports.RecipeSchema = exports.Recipe = void 0;
var mongoose_1 = require("mongoose");
var Recipe = /** @class */ (function () {
    function Recipe(_a) {
        var title = _a.title, description = _a.description, urlImg = _a.urlImg;
        this.title = title;
        this.description = description;
        this.urlImg = urlImg;
        this.id = Math.random().toString();
    }
    return Recipe;
}());
exports.Recipe = Recipe;
//define schema
exports.RecipeSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    urlImg: String,
    email: {
        type: String,
        required: true
    }
});
//"recipes" will be the name of this collection in the DB
exports.RecipeModel = mongoose_1.model("recipes", exports.RecipeSchema);
exports.recipes = [];
