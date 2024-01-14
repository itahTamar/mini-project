import { books } from "../../util/books"
import axios from "axios";



const booksList = books

const InsertData =  () => {
try {    
    booksList.forEach( async (book) => {
        await axios.post("/api/books/addBooks", book)
    })
} catch (error) {
    console.error('error insert book', error)
}
}

export default InsertData
