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
          </Link> : 
          <ul className="flex items-center gap-x-2">
            <li>
              <Link to = {'/add-task'}  className="px-4 py-2 cursor-pointer rounded-sm border border-transparent hover:border-indigo-500 hover:text-indigo-500 transition-all duration-300">Add Task</Link>
            </li>
            <li>
              <button onClick={logoutHandler} className="px-4 py-2 bg-indigo-600 text-white rounded-sm cursor-pointer">
                Logout
              </button>
            </li>

          </ul>
          }
        </div>
      </header>
    </>
  );
};

export default Navbar;
