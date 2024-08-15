import { Link, NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import { FaShopify } from "react-icons/fa";
import { useContext } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContex } from "../../../Provider/Auth Provider/AuthProvider";
import profilePic from "../../../assets/images/defaultProfilePic.png"
import Swal from "sweetalert2";

const Navbar = () => {
  let Navlinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/shop">Shop</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/Cart">Cart</NavLink>
      </li>
    </>
  );
  let { user, logOut } = useContext(AuthContex);

  let handleLogout = () => {
    Swal.fire({
      title: "Are you want to log out?",
      
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!"
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              title: "Logged out!",
              icon: "success",
              position: "center",
              showConfirmButton: false,
              timer: 1500
            });
            
          })
          .catch((error) => {
            // Handle any errors during the logout process
            Swal.fire({
              title: "Error!",
              text: "There was an error logging out.",
              icon: "error"
            });
            console.error("Logout error:", error);
          });
      }
    });
  };
  
  return (
    <>
      <div className="container mx-auto">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <FaBars />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {Navlinks}
              </ul>
            </div>
            <Link
              className="btn btn-ghost text-xl font-worksans hidden md:flex lg:flex"
              to="/"
            >
              {" "}
              <FaShopify className="text-green-500" />
              Buy Nest
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 font-playfair">
              {Navlinks}
            </ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="">
                <button className="btn btn-outline btn-error">
                    <Link onClick={handleLogout}>Log Out</Link>
                </button>
                <ToastContainer></ToastContainer>
                </div>
              </div>
            ) : (
              <>
                <Link className="btn bg-primaryColor" to="/login">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
