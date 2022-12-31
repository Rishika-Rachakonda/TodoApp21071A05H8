
import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import RouteLayout from './RouteLayout';
import Today from './components/Today'
import  Analytics from'./components/analytics/Analytics'
import MainPage from './components/mainpage/MainPage'

function App() {
  {/*create browser router Object */}
  const Router=createBrowserRouter([
    {
      path:'/',
      element : <RouteLayout></RouteLayout>,
      children:[
        {
          path:'/',
          element:<MainPage></MainPage>
        },
        {
          path:'/analytics',
          element:<Analytics></Analytics>
        },
        {
          path:'/today',
          element:<Today></Today>

        }
      ]
    }
  ])
  return (
    <div className='cat' >
      <RouterProvider router={Router}></RouterProvider>
      
    </div>
  );
}

export default App;
