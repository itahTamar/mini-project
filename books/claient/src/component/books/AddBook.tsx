import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addBook } from '../../api/books/booksApi'
import '../../style/addBook.css'
const AddBook = () => {
    const [title, setTitle] = useState<string>('')
    const [author, setAuthor] = useState<string>("")
    const [page_num, setPage_num] = useState<number>(0)
    const [publisher, setPublisher] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [image, setImage] = useState<string>('')
    const [genre, setGenre] = useState<string>('')
    const navigate = useNavigate()


const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    try {
        ev.preventDefault()
        const data = await addBook(title, author, page_num, publisher, description, image, genre)
        console.log(data)
        
        if (!data) throw new Error("failed to add your book");
        
        navigate("/booksPage")
        
    } catch (error) {
        console.error(error)
    }
}

  return (
    <form className="addBookForm" onSubmit={handleSubmit}>
        <input type='text'  placeholder='*title' value={title} onInput={(ev) => setTitle((ev.target as HTMLInputElement).value)}></input>
        <input type='text'  placeholder='*author' value={author} onInput={(ev) => setAuthor((ev.target as HTMLInputElement).value)}></input>
        <input type='number'  placeholder='page_num' value={page_num} onInput={(ev) => setPage_num(Number((ev.target as HTMLInputElement).value))}></input>
        <input type='text'  placeholder='publisher' value={publisher} onInput={(ev) => setPublisher((ev.target as HTMLInputElement).value)}></input>
        <input type='text'  placeholder='*description' value={description} onInput={(ev) => setDescription((ev.target as HTMLInputElement).value)}></input>
        <input type='text'  placeholder='*image URL' value={image} onInput={(ev) => setImage((ev.target as HTMLInputElement).value)}></input>
        <input type='text'  placeholder='genre' value={genre} onInput={(ev) => setGenre((ev.target as HTMLInputElement).value)}></input>
        <p>The filed with * are mandatory</p>
        <button type='submit'>Add your book</button>
        <button onClick={() => navigate("/booksPage")}>Back</button>
    </form>
  )
}

export default AddBook
