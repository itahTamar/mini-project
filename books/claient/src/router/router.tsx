import BooksPage from "../component/books/BooksPage";
import SpecificBookPage from "../component/books/SpecificBookPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {path: "", element: <BooksPage/> },
    {path: "/book/:title", element: <SpecificBookPage/>}
])