import { useEffect, useState } from 'react'

 interface Book {
  book_id?: number,
  title: string,
  author: string,
  page_num: number,
  publisher: string,
  description: string,
  image: string,
  likes: number,
  genre: string
}

const Debouncing = ({setFilterBooks, booksState}: any) => {
    const [textSearch, setTextSearch] = useState('')

    if (booksState === undefined) throw new Error("At debouncing the bookState is undefined");
    

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
