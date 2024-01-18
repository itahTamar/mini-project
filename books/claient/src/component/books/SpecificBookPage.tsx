import { useEffect, useState } from 'react'
import { Book } from './BookCard';
import { useParams } from 'react-router-dom';
import { deleteBook, getOneBook } from '../../api/books/booksApi';
import { useNavigate } from 'react-router-dom'

const SpecificBookPage = () => {
  const [bookData, setBookData] = useState<Book>();

  let { title } = useParams()
  let {bookId} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const specificBook = async () => {
      if (title == undefined) throw new Error("At specificBookPage at specificBook title is undefined");
      try {
        const response = await getOneBook(title);
          // console.log("At specificBookPage at specificBook() the response is: ", response) 
        setBookData(response[0])
        
      } catch (error) {
        console.error("Error fetching specific book:", error)
      }
    }

    specificBook()
  }, [title])

  const handleUpdate = async () => {

  }

  const handleDelete = async () => {
    if (bookId == undefined) throw new Error("At specificBookPage at handleDelete, bookId is undefined");
    try {
      const response = await deleteBook(bookId);
      console.log("At specificBookPage at specificBook the data is: ", response)
      navigate("/booksPage")
    } catch (error) {
      console.error("Error fetching specific book:", error)
    }
  }

  return (
    <div>
      {bookData != undefined ?
        <div>
          <img className='book-card-img' src={bookData.image} alt={bookData.title} />
          <div className='book-card-info'>
            <h2>{bookData.title}</h2>
            <p>By {bookData.author}</p>
            <p>Number of pages: {bookData.page_num}</p>
            <p>publisher: {bookData.publisher}</p>
            <p>genre: {bookData.genre}</p>
            <p>{bookData.description}</p>
          </div>
        </div>
        :
        <p>book not found</p>
      }
      <button key={title} onClick={handleUpdate}>Update information</button>
      <button onClick={handleDelete}>Delete Book</button>
    </div>
  )
}

export default SpecificBookPage
