import { RouterProvider } from 'react-router-dom';
import './App.css'
// import Debouncing from './component/Debouncing';
import { router } from './router/router';

function App() {
  return (
    <>
      {/* <Debouncing /> */}
      <RouterProvider router={router} />
    </>
  )
}

export default App;

