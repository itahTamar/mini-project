import { useEffect, useState } from 'react'
import { Book } from './BookCard';
import { useParams } from 'react-router-dom';
import { deleteBook, getOneBook } from '../../api/books/booksApi';
import { useNavigate } from 'react-router-dom'
import Popup from './Popup';
import '../../style/specificBookPage.css'

const SpecificBookPage = () => {
  const [bookData, setBookData] = useState<Book>();
  const [isOpen, setIsOpen] = useState(false)
  const [field, setField] = useState<string>();

  let { book_id } = useParams()
  const navigate = useNavigate()

  const handleBtnClick = (fieldName: string) => {
    setField(fieldName)
    setIsOpen(true)
  }

  useEffect(() => {
    const specificBook = async () => {
      if (book_id === undefined) throw new Error("At specificBookPage at specificBook title is undefined");
      try {
        const response = await getOneBook(book_id);
        // console.log("At specificBookPage at specificBook() the response is: ", response) 
        setBookData(response[0])

      } catch (error) {
        console.error("Error fetching specific book:", error)
      }
    }

    specificBook()
  }, [book_id])

  const handleDelete = async () => {
    if (book_id === undefined) throw new Error("At specificBookPage at handleDelete, book_id is undefined");
    try {
      const response = await deleteBook(book_id);
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
          <div className='box'>
            <img className='book-card-img-sp' src={bookData.image} alt={bookData.title} />
            <button className='btn-pencil-img' onClick={() => handleBtnClick("image")}>✏️</button>
          </div>

          <div className='book-card-info'>
            <div className='box'>
              <h2>{bookData.title}</h2>
              <button className='btn-pencil' onClick={() => handleBtnClick("title")}>✏️</button>
            </div>

            <div className='box'>
              <p>By {bookData.author}</p>
              <button className='btn-pencil' onClick={() => handleBtnClick("author")}>✏️</button>
            </div>

            <div className='box'>
              <p>Number of pages: {bookData.page_num}</p>
              <button className='btn-pencil' onClick={() => handleBtnClick("page_num")}>✏️</button>
            </div>

            <div className='box'>
              <p>publisher: {bookData.publisher}</p>
              <button className='btn-pencil' onClick={() => handleBtnClick("publisher")}>✏️</button>
            </div>

            <div className='box'>

              <p>genre: {bookData.genre}</p>
              <button className='btn-pencil' onClick={() => handleBtnClick("genre")}>✏️</button>
            </div>

            <div className='box'>
              <p>{bookData.description}</p>
              <button className='btn-pencil' onClick={() => handleBtnClick("description")}>✏️</button>
            </div>
          </div>
        </div>
        :
        <p>book not found</p>
      }
      <button key={book_id} onClick={handleDelete}>Delete Book</button>
      <button onClick={() => navigate('/booksPage')}>Back</button>
      {isOpen ? <Popup field={field} /> : ""}

    </div >
  )
}

export default SpecificBookPage
