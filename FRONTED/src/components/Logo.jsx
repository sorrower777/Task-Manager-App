import React from 'react'
import { FaKickstarter } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const Logo = () => {
  return (
    <>
        <Link to={'/'} className="flex items-center gap-x-1">
          <FaKickstarter className='text-4xl text-indigo-500' />
          <span className="font-bold text-2xl">Task App</span><span className='w-3 h-3 rounded bg-orange-500 animate-spin'></span>
        </Link>
    </>
  )
}

export default Logo