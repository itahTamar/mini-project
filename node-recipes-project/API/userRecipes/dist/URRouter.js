"use strict";
exports.__esModule = true;
var express_1 = require("express");
var URCont_1 = require("./URCont");
var router = express_1["default"].Router();
router.get('/get-user-recipes', URCont_1.getUserRecipes);
exports["default"] = router;
