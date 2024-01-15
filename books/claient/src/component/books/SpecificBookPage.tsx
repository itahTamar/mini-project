import { useEffect, useState } from 'react'
import BookCard, { Book } from './BookCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Review from './Review';

const SpecificBookPage = () => {
  const [bookData, setBookData] = useState<Book>();
  let { title } = useParams()

  useEffect(() => {
    const specificBook = async () => {
      if (title == undefined) throw new Error("At specificBookPage at specificBook title is undefined");
      try {
        const response = await axios.get(`/api/books/${title}`);
        const data: Book = response.data;
        console.log("At specificBookPage at specificBook the data is: ",data)
        setBookData(data)
      } catch (error) {
        console.error("Error fetching specific book:", error)
      }
    }

    specificBook()
  }, [title])

  return (
    <div>
      <BookCard key={title} book={bookData}/>
      <Review/>
    </div>
  )
}

export default SpecificBookPage
