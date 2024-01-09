import DogsPage from "../component/DogsPage"
import DogPge from "../component/DogPge"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
    { path: "/", element: <DogsPage /> },
    { path: "/dog/:breed", element: <DogPge /> }
]); 
