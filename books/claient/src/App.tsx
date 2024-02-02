import {RouterProvider} from 'react-router-dom'
import {router} from './router/router'
import './App.css'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import 'react-dotenv';

let environment = "PROD"

environment === "DEV" ? process.env.SERVER_URL_DEV : process.env.SERVER_URL_PROD
disableReactDevTools()

function App() {

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
