import { useEffect, useState } from 'react'
// import { Book } from '../books/BookCard'

 interface Book {
  title: string,
  author: string,
  pageNum: number,
  publisher: string,
  description: string,
  image: string,
  likes: number,
  genre: string
}

const Debouncing = ({setFilterBooks, booksState}: any) => {
    const [textSearch, setTextSearch] = useState('')

    const handleFilter = () => {
        if (!textSearch) {
            setFilterBooks(booksState)  //if no search show all books
        } else { 
            setFilterBooks(booksState.filter((book:Book) => 
            book.title.includes(textSearch) || 
            book.author.includes(textSearch) ||
            book.publisher.includes(textSearch) ||
            book.genre.includes(textSearch)
            ))
        }
    }

    useEffect(() => {
      if (!textSearch) {
        setFilterBooks(booksState)
      } else {
        const request = setTimeout(handleFilter, 2000)
        return () => clearTimeout(request)
      }
    },[textSearch])

  return (
    <div>
      <input type="text" value={textSearch} onInput={(ev) => setTextSearch((ev.target as HTMLInputElement).value)} placeholder='search a book'/>
    </div>
  )
}

export default Debouncing
