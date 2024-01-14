"use strict";
exports.__esModule = true;
exports.users = exports.UserModel = exports.UserSchema = exports.User = void 0;
var mongoose_1 = require("mongoose");
var User = /** @class */ (function () {
    function User(_a) {
        var userName = _a.userName, email = _a.email, password = _a.password;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.id = Math.random().toString();
    }
    return User;
}());
exports.User = User;
//define schema
exports.UserSchema = new mongoose_1.Schema({
    userName: String,
    email: String,
    password: String
});
//"users" will be the name of this collection in the DB
exports.UserModel = mongoose_1.model("users", exports.UserSchema);
exports.users = [];
