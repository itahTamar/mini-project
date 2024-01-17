import { useEffect, useState } from 'react'
import { Book } from './BookCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SpecificBookPage = () => {
  const [bookData, setBookData] = useState<Book>();
  let { title } = useParams()

  useEffect(() => {
    const specificBook = async () => {
      if (title == undefined) throw new Error("At specificBookPage at specificBook title is undefined");
      try {
        const response = await axios.get(`/api/books/${title}`);
        const data: Book = response.data;
        console.log("At specificBookPage at specificBook the data is: ", data)
        setBookData(data)
      } catch (error) {
        console.error("Error fetching specific book:", error)
      }
    }

    specificBook()
  }, [title])

  const handleUpdate(bookId) => {

  }

  const handleDelete(bookId) => {

  }

  return (
    <div>
      {bookData != undefined ?
        <div className='book-card'>
          <img className='book-card-img' src={bookData.image} alt={bookData.title} />
          <div className='book-card-info'>
            <h2>{bookData.title}</h2>
            <p>Author: {bookData.author}</p>
            <p>Number of pages: {bookData.pageNum}</p>
            <p>publisher: {bookData.publisher}</p>
            <p>genre: {bookData.genre}</p>
            <p>{bookData.description}</p>
          </div>
        </div>
        :
        <p>book not found</p>
      }
      <button onClick={handleUpdate}>Update information</button>
      <button onClick={handleDelete}>Delete Book</button>
    </div>
  )
}

export default SpecificBookPage
