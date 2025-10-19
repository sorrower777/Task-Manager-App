import React from 'react'
import { CgSpinner } from 'react-icons/cg'
import { FaArrowRight } from 'react-icons/fa'

const CustomLoaderButton = ({ isLoading, text, type = 'submit' }) => {
  return (
    <button type={type} className='w-full py-2 px-3 bg-indigo-700 disabled:bg-indigo-400 text-white rounded flex items-center justify-center gap-x-2 duration-100 cursor-pointer'><span>{text}</span>{
        isLoading ? <CgSpinner className='text-xl animate-spin duration-75'/> : <FaArrowRight/>
    }
    </button>
  )
}

export default CustomLoaderButton