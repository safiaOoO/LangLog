import React, { useState, useEffect } from 'react';
import Loading from './components/loading';
import Login from './components/pages/login/login';
import Register from './components/pages/register/register';
import Home from './components/pages/home/home';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";


function App(){

  const router = createBrowserRouter([
    {
      path:"/home",
      element:<Home/>
    },
    {
      path: "/login",
      element: <Login/>,
    },
     {
      path: "/register",
      element: <Register/>,
     },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Data = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setLoading(false);
    };

    Data();
  }, []);


  
  return(
    <div>
      {loading ? (
        <Loading/>
      ) : (
        <div>
          <RouterProvider router={router} />
        </div>
      )}
    </div>
  );
}
export default App;