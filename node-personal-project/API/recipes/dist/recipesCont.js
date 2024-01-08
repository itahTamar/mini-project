"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.updateRecipe = exports.deleteRecipe = exports.addRecipe = exports.getOneRecipe = exports.getRecipes = void 0;
var recipesModel_1 = require("./recipesModel");
function getRecipes(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var recipesDB, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, recipesModel_1.RecipeModel.find({})];
                case 1:
                    recipesDB = _a.sent();
                    res.send({ recipes: recipesDB });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getRecipes = getRecipes;
function getOneRecipe(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, recipesDB, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.query.id;
                    if (!id) {
                        throw new Error("id is required");
                    }
                    return [4 /*yield*/, recipesModel_1.RecipeModel.findById(id)];
                case 1:
                    recipesDB = _a.sent();
                    console.log("one recipe in db:", recipesDB);
                    res.send({ recipes: recipesDB });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getOneRecipe = getOneRecipe;
function addRecipe(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, title, description, urlImg, email, recipe, recipeDB, userRecipes, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, title = _a.title, description = _a.description, urlImg = _a.urlImg, email = _a.email;
                    console.log({ title: title, description: description, urlImg: urlImg, email: email });
                    if (!title || !description)
                        throw new Error("Please complete title and/or description fields");
                    recipe = new recipesModel_1.RecipeModel({ title: title, description: description, urlImg: urlImg, email: email });
                    return [4 /*yield*/, recipe.save()];
                case 1:
                    recipeDB = _b.sent();
                    console.log(recipeDB);
                    return [4 /*yield*/, recipesModel_1.RecipeModel.find({ email: email })];
                case 2:
                    userRecipes = _b.sent();
                    // Send the array of user's recipes as the response
                    res.send({ recipes: userRecipes });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    console.error(error_3);
                    res.status(500).send({ error: error_3.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.addRecipe = addRecipe;
//delete from DB by ID
function deleteRecipe(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, id, email, userRecipes, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, id = _a.id, email = _a.email;
                    console.log(id);
                    console.log(email);
                    return [4 /*yield*/, recipesModel_1.RecipeModel.findByIdAndDelete(id)];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, recipesModel_1.RecipeModel.find({ email: email })];
                case 2:
                    userRecipes = _b.sent();
                    // Send the array of user's recipes as the response
                    res.send({ recipes: userRecipes });
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _b.sent();
                    console.error(error_4);
                    res.status(500).send({ error: error_4.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteRecipe = deleteRecipe;
//update DB by ID
function updateRecipe(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, id, title, description, urlImg, email, currentRecipe, updatedRecipe, userRecipes, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    _a = req.body, id = _a.id, title = _a.title, description = _a.description, urlImg = _a.urlImg, email = _a.email;
                    return [4 /*yield*/, recipesModel_1.RecipeModel.findById(id)];
                case 1:
                    currentRecipe = _b.sent();
                    if (!currentRecipe)
                        throw new Error("recipe not found");
                    // Update the recipe properties
                    if (title) {
                        currentRecipe.title = title;
                    }
                    if (description) {
                        currentRecipe.description = description;
                    }
                    if (urlImg) {
                        currentRecipe.urlImg = urlImg;
                    }
                    return [4 /*yield*/, currentRecipe.save()];
                case 2:
                    updatedRecipe = _b.sent();
                    return [4 /*yield*/, recipesModel_1.RecipeModel.find({ email: email })];
                case 3:
                    userRecipes = _b.sent();
                    // Send the array of user's recipes as the response
                    res.send({ recipes: userRecipes });
                    return [3 /*break*/, 5];
                case 4:
                    error_5 = _b.sent();
                    console.error(error_5);
                    res.status(500).send({ error: error_5.message });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateRecipe = updateRecipe;
