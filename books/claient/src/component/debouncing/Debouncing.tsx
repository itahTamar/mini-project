import React, { useEffect, useState } from 'react'

const Debouncing = ({setFilterBooks, filterBooksState}) => {
    const [textSearch, setTextSearch] = useState('')

    const handleFilter = () => {
        if (!textSearch) {
            setFilterBooks(booksState)
        } else {
            setFilterBooks(booksState.filter((book) => book.includes(textSearch)))
        }
    }

    useEffect(() => {
        const request = setTimeout(handleFilter, 2000)
        return () => clearTimeout(request)
    },[textSearch])

  return (
    <div>
      <input type="text" value={textSearch} onInput={(ev) => setTextSearch((ev.target as HTMLInputElement).value)} placeholder='search a book'/>
    </div>
  )
}

export default Debouncing
