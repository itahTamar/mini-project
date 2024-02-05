import {RouterProvider} from 'react-router-dom'
import {router} from './router/router'
import './App.css'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
// import 'react-dotenv';

let environment = "PROD"
// const serverUrlDev: string = import.meta.env.SERVER_URL_DEV
// const serverUrlProb: string = import.meta.env.SERVER_URL_PROD

environment === "DEV" ? "http://localhost:8000" : "https://book-list-server-2ab5.onrender.com"

// environment === "DEV" ? serverUrlDev : serverUrlProb
disableReactDevTools()

function App() {

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
