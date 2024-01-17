import express from "express"
import { login, registerUser } from "./userCont"

const router = express.Router()

router
    .post("/register", registerUser)
    .get("/login", login) 

//good routing example :/api/users

//get("/get-user-by-cookie", getUserByCookie)
// .get("") <-- to get ALL users 
//.get("/:id") <-- to get a specific user by its id
// .post("") <-- create a user
// .patch("/:id") <-- update a specific field ot information in a user 
// .put("/:id") <-- update entire user
// .delete(/:id) <-- delete by id

export default router