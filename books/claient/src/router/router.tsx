import BooksPage from "../component/books/BooksPage";
import SpecificBookPage from "../component/books/SpecificBookPage";
import { createBrowserRouter } from "react-router-dom";
import Register from "../component/users/Register";
import Login from "../component/users/Login";
import AddBook from "../component/books/AddBook";

export const router = createBrowserRouter([
    {path: "", element: <Login/>},
    {path: "/login", element: <Login/>},
    {path: "/register", element: <Register/> },
    {path: "/booksPage", element: <BooksPage/> },
    {path: "/book/:title/:book_id", element: <SpecificBookPage/>},
    {path: "/add-book", element: <AddBook/>}
    
])