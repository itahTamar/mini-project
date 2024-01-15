import express from "express"
import { registerUser } from "./userCont"

const router = express.Router()

router
//get(/get-user-by-cookie, getUserByCookie)
    .post("/register", registerUser) 



export default router