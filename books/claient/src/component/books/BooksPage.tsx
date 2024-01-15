import { useEffect, useState } from 'react'
import BookCard, { Book } from './BookCard'
import { useNavigate } from 'react-router-dom'
import Debouncing from '../debouncing/Debouncing'
import axios from 'axios';

const BooksPage = () => {
    const [bookState, setBooks] = useState<Book[]>([])
    const [filterBooksState, setFilterBooks] = useState<Book[]>([])
    const navigate = useNavigate()

    const handelGetAllBooks = async () => {
        try {
            //use axios to get the book list from DB
            const response = await axios.get("/api/books/getAllBooks")
            const booksDb = response.data
            if (!booksDb) throw new Error("At handelGetAllBooks: no books in DB");
           
            //put the list in bookState and filterBooksState
            setBooks(booksDb)
            setFilterBooks(booksDb)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        handelGetAllBooks()
    },[])

  return (
    <div className='books-container'>
      <Debouncing setFilterBooks={setFilterBooks} filterBooksState={filterBooksState}/>
      {bookState && bookState.length > 0 ?
      (filterBooksState.map((book) => {
        return (
            <div key={book.title}>
                <BookCard book={book}/>
                <button onClick={() => {navigate(`/book/${book.title}`)}}>More Info</button>
            </div>
        )
      })): (
        <p>no book found</p>
      )}
    </div>
  )
}

export default BooksPage
