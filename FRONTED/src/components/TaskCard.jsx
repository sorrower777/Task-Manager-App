import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { taskCategories } from '../utils/constant.js'
import TaskViewModel from './TaskViewModel.jsx'

const TaskCard = ({ task }) => {
  const category = (task?.category || 'other').toLowerCase()
  const categoryClass = taskCategories[category] || taskCategories['other']
  return (
    <div className="w-full bg-white rounded shadow py-3 px-3" data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="300"
     data-aos-offset="0">
      <p className="text-2xl font-bold break-words">{task?.title || 'Untitled task'}</p>

      {task?.description && (
        <p className='mt-2 font-semibold text-sm text-zinc-600 bg-gray-100 px-3 py-2 rounded-2xl break-words'>
          {task.description}
        </p>
      )}

      <div className='py-3 flex justify-between items-center'>
        <span className={`${categoryClass} capitalize`}>{category}</span>
        <TaskViewModel id={task._id}/>
      </div>
    </div>
  )
}

export default TaskCard