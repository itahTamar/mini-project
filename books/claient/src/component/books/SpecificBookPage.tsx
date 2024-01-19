import { useEffect, useState } from 'react'
import { Book } from './BookCard';
import { useParams } from 'react-router-dom';
import { deleteBook, getOneBook} from '../../api/books/booksApi';
import { useNavigate } from 'react-router-dom'
import Popup from './Popup';

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
          <img className='book-card-img' src={bookData.image} alt={bookData.title} />
          <div className='book-card-info'>
            <h2>{bookData.title}</h2><button onClick={() => handleBtnClick("title")}>✏️</button>
            <p>By {bookData.author}</p><button onClick={() => handleBtnClick("author")}>✏️</button>
            <p>Number of pages: {bookData.page_num}</p><button onClick={() => handleBtnClick("page_num")}>✏️</button>
            <p>publisher: {bookData.publisher}</p><button onClick={() => handleBtnClick("publisher")}>✏️</button>
            <p>genre: {bookData.genre}</p><button onClick={() => handleBtnClick("genre")}>✏️</button>
            <p>{bookData.description}</p><button onClick={() => handleBtnClick("description")}>✏️</button>
          </div>
        </div>
        :
        <p>book not found</p>
      }
      <button key={book_id} onClick={handleDelete}>Delete Book</button>
      {isOpen ? <Popup field={field}/> : ""}
      
    </div>
  )
}

export default SpecificBookPage
