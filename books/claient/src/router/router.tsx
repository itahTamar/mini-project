import BooksPage from "../component/books/BooksPage";
import SpecificBookPage from "../component/books/SpecificBookPage";
import { createBrowserRouter } from "react-router-dom";
import Register from "../component/users/Register";
import Login from "../component/users/Login";

export const router = createBrowserRouter([
    {path: "/register", element: <Register/> },
    {path: "/booksPage", element: <BooksPage/> },
    {path: "/book/:title", element: <SpecificBookPage/>},
    {path: "", element: <Login/>}
])