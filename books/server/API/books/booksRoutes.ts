import express from "express"
const router = express.Router()

import {getAllBooks, addOneBook, getOneBook, updateBook, deleteBook, findBookByName} from "./booksCont"

router
.get("", getAllBooks)
.post("/addBook", addOneBook)
.get("/:title", getOneBook) //<-- to get a specific book by its title
.patch("/:bookId", updateBook)
.delete("/:bookId", deleteBook)
.get("/filter", findBookByName)

export default router