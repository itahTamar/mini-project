"use strict";
exports.__esModule = true;
var express_1 = require("express");
var usersCont_1 = require("./usersCont");
var router = express_1["default"].Router();
router.post("/register", usersCont_1.registerUser)
    .post("/login", usersCont_1.loginUser)
    .get("/get-user", usersCont_1.getUser)["delete"]("/delete-user", usersCont_1.deleteUser);
exports["default"] = router;
