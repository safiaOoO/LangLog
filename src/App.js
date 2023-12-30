import React, { useState, useEffect } from 'react';
import Loading from './components/loading';
import Login from './components/pages/login/login';
import Register from './components/pages/register/register';
import Home from './components/pages/home/home';
import Postspage from './components/pages/postspage/postspage';
import Postcontent from './components/pages/Post content page/postcontent';
import PostsandSaved from './components/pages/myposts-saved/myposts-saved';
import Mypostcontent from './components/pages/mypostcontent/mypostcontent';
import Followingfollowers from './components/pages/following-followers/following-followers';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Postform from './components/pages/createpost/createpost';


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
     {
      path: "/postspage",
      element: <Postspage/>,
     },
     {
      path: "/postcontent",
      element: <Postcontent/>,
     },
     {
      path: "/createpost",
      element: <Postform/>,
     },
     {
      path: "/postsandsaved",
      element: <PostsandSaved/>,
     },
     {
      path: "/mypostcontent",
      element: <Mypostcontent/>,
     },
     {
      path: "/followingfollowers",
      element: <Followingfollowers/>,
     },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Data = async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
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