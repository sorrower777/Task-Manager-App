import React from "react";
import { SiTask } from "react-icons/si"; 
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import { useMainContext } from "../context/mainContextCore.js";


const Navbar = () => {
  const { user, logoutHandler } = useMainContext();
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-row md:flex-row items-center justify-between">
          <Logo />

          { !user ? <Link to = {'/login'} className="px-4 py-2 bg-indigo-600 text-white rounded-sm cursor-pointer">
            Login
          </Link> : <button onClick={logoutHandler} className="px-4 py-2 bg-indigo-600 text-white rounded-sm cursor-pointer">
            Logout
          </button>}
        </div>
      </header>
    </>
  );
};

export default Navbar;
