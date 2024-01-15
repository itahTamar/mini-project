import express from "express"
const router = express.Router()

import {getAllBooks, addOneBook, getOneBook} from "./booksCont"

router
.get("", getAllBooks)
.post("/addBooks", addOneBook)
.get("/:title", getOneBook) //<-- to get a specific book by its title

export default router