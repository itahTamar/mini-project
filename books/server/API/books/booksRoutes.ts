import express from "express"
const router = express.Router()

import {getAllBooks, addOneBook, getOneBook, updateBook, deleteBook, findBookByName} from "./booksCont"

router
.get("/getAllBooks", getAllBooks)
.get("/filter", findBookByName)  
.get("/:bookId", getOneBook) //<-- to get a specific book by its title
.post("/addBook", addOneBook)
.patch("/:bookId", updateBook)
.delete("/:bookId", deleteBook)

export default router