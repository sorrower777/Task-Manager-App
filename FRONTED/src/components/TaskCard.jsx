import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { taskCategories } from '../utils/constant.js'

const TaskCard = () => {
    const category = 'study';
    const categoryClass = taskCategories[category]
  return (
    <>
        <div>
            <input type="text" className="w-full py-3 px-4" />
        </div>

      <div className="w-full bg-white rounded shadow py-3 px-3">
        <p className="text-3xl font-bold">Task Name</p>

        <p className='font-semibold text-sm text-zinc-400 bg-gray-100 px-3 rounded-2xl '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
            Tempora eveniet praesentium eaque repudiandae! Fuga distinctio, explicabo culpa ipsa modi consequatur provident error quis accusamus ipsum placeat fugit! Quae, numquam doloribus.</p>

        <div className='py-3 flex justify-between items-center'>
            <span className= {`${categoryClass} capitalize` }>{category}</span>
            <button className="px-5 py-2 text-white rounded-full flex items-center justify-center gap-x-2 bg-indigo-500 cursor-pointer"><span>View</span><FaArrowRight/></button>
        </div>
      </div>
    </>
  )
}

export default TaskCard