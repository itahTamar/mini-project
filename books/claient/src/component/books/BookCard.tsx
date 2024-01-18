import { FC , useState} from 'react'
import '../../style/bookCard.css'

export interface Book {
    title: string,
    author: string,
    pageNum: number,
    publisher: string,
    description: string,
    image: string,
    likes: number,
    genre: string
}

interface BookCardProp {
    book: Book | undefined
}

const BookCard: FC<BookCardProp> = ({ book }) => {
if(book === undefined) throw new Error("At BookCard book is undefined");

    return (
        <>
            {book != undefined ?
                <div className='book-card'>
                    <img className='book-card-img' src={book.image} alt={book.title}/>
                    <div className='book-card-info'>
                        <h2>{book.title}</h2>
                        <p className='mini-description'>{book.description}</p>                      
                    </div>               
                </div>  
                :
                <p>book undefine</p>  
            }

        </>
    )
}

export default BookCard
