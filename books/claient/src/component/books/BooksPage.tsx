import { useEffect, useState } from 'react'
import BookCard, { Book } from './BookCard'
import { useNavigate } from 'react-router-dom'
import Debouncing from '../debouncing/Debouncing'
import { getAllBooks } from '../../api/books/booksApi';
import '../../style/booksPage.css'

const BooksPage = () => {
  const [bookState, setBooks] = useState<Book[]>([])
  const [filterBooksState, setFilterBooks] = useState<Book[]>([])
  const navigate = useNavigate()

   const handelGetAllBooks = async () => {
     try {
      //use axios to get the book list from DB
      const response = await getAllBooks()
      if(!response) throw new Error("No response from axios getAllBooks at BooksPage");
              console.log("At BooksPage/handelGetAllBooks the response is:", response) //got it
  
      //put the list in bookState and filterBooksState
      const bookList = response;
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
    handelGetAllBooks() 
  }, []) //only run this effect on the initial render


  return (
    <div className='booksPage-container'>
      <button className='add-book' onClick={() => navigate('/add-book')}>Add another book to your collection</button>
      {/* <Debouncing setFilterBooks={setFilterBooks} BooksState={bookState} /> */}
      <div className='books-container'>
        {filterBooksState && bookState.length > 0 ?
          (filterBooksState.map((book) => {
            return (
              <div className='book-card-cover' key={book.title}>
                <BookCard book={book} />
                <button onClick={() => { navigate(`/book/${book.title}/${book.book_id}`) }}>More Info</button>
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
