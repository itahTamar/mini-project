import { FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { updateBookById } from '../../api/books/booksApi';

interface FieldProp {
    field: string | undefined;
}

const Popup: FC<FieldProp> = ({ field }) => {
    const [update, setUpdate] = useState<string | number>();
    let { book_id } = useParams()
    const navigate = useNavigate()
    if (field === undefined) throw new Error("field is undefined");
    

    const handleUpdateAndClose = async () => {
        if (book_id === undefined) throw new Error("At specificBookPage at handleDelete, book_id is undefined");
        if (update === undefined) throw new Error("update undefined");

        try {
            const response = await updateBookById(book_id, field, update);
            console.log("At specificBookPage at specificBook the data is: ", response)
            navigate("/booksPage")
        } catch (error) {
            console.error("Error fetching specific book:", error)
        }
    }
    return (
        <div>
            <form onSubmit={handleUpdateAndClose}>
                <input type="text | number" name="update" value={update} onInput={(ev) => setUpdate((ev.target as HTMLInputElement).value)}/>
                <button type="submit">Update and close</button>
            </form>
        </div>
    )
}

export default Popup
