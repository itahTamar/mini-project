import { useEffect, useState } from 'react'
import BookCard, { Book } from './BookCard'
import { useNavigate } from 'react-router-dom'
import Debouncing from '../debouncing/Debouncing'
import { getAllBooks } from '../../api/books/booksApi';

const BooksPage = () => {
  const [bookState, setBooks] = useState<Book[]>([])
  const [filterBooksState, setFilterBooks] = useState<Book[]>([])
  const navigate = useNavigate()

   const handelGetAllBooks = async () => {
     try {
      //use axios to get the book list from DB
      const response = await getAllBooks()
      if(!response) throw new Error("No respose from axios getAllBooks at BooksPage");
              console.log("At BooksPage/handelGetAllBVooks the response is:", response) //got it
  
      //put the list in bookState and filterBooksState
      const bookList: Book[] = response
      console.log("bookList:", bookList)
      setBooks(bookList)
      setFilterBooks(bookList)

      console.log("bookState:", bookState)
      console.log("filterBooksState:", filterBooksState)
     } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    //!add fun how put all the book from my lost itno DB
    handelGetAllBooks() //start at load page and at reload it
  }, [])

  return (
    <div className='booksPage-container'>
      <Debouncing setFilterBooks={setFilterBooks} BooksState={bookState} />
      <div className='books-container'>
        {bookState && bookState.length > 0 ?
          (filterBooksState.map((book) => {
            return (
              <div className='book-card' key={book.title}>
                <BookCard book={book} />
                <button onClick={() => { navigate(`/book/${book.title}`) }}>More Info</button>
              </div>
            )
          })) : (
            <p>no book found</p>
          )}
      </div>
    </div>
  )
}

export default BooksPage
