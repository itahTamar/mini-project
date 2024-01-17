import express from "express"
const router = express.Router()

import {getAllBooks, addOneBook, getOneBook, updateBook, deleteBook, findBookByName} from "./booksCont"

router
.get("", getAllBooks)
.get("/filter", findBookByName)  
.get("/:title", getOneBook) //<-- to get a specific book by its title
.post("/addBook", addOneBook)
.patch("/:bookId", updateBook)
.delete("/:bookId", deleteBook)

export default router