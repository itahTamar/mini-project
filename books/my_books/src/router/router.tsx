import SpecificBookPage from "@/components/books/SpecificBookPage";
import { createBrowserRouter } from "react-router-dom";
import BooksPage from './../components/books/BooksPage';

export const router = createBrowserRouter([
    {path: "", element: <BooksPage/> },
    {path: "/book/:title", element: <SpecificBookPage/>}
])