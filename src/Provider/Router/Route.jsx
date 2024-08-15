import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login Register/Login";
import Register from "../../Pages/Login Register/Register";
import Root from "../../Root/Root";
import PrivateRoute from "../Private Router/PrivateRouter";
import Shop from "../../Pages/Navbar/NavItems/Shop/Shop";
import Cart from "../../Pages/Navbar/NavItems/Cart/Cart";
import About from "../../Pages/Navbar/NavItems/About/About";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children:[
        {
          path:"/",
          element:
            <Home/>
          
        },
        {
          path:"/login",
          element: <Login/>
        },
        {
          path:"/register",
          element: <Register/>
        },
        {
          path:"/shop",
          element: <Shop/>
        },
        {
          path:"/cart",
          element: <Cart/>
        },
        {
          path:"/about",
          element: <About/>
        },
      ]
    },
    
  ]);

  export default router;