import React, { useState } from 'react'
import { taskCategories } from '../utils/constant'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { CgSpinner } from 'react-icons/cg'
import { axiosClient } from '../utils/axiosClient.js'
import { useMainContext } from '../context/mainContextCore.js'
// import { useMainContext } from '../context/mainContextCore.js'
// import CustomLoaderButton from './CustomLoaderButton.jsx'



const TaskView = ({data, close}) => {
      const category = (data?.category || 'other').toLowerCase();
      const categoryClass = taskCategories[category]
      const [loading , setLoading] = useState(false)
      const {fetchedAllTasks} = useMainContext()
      
      const deleteHandler = async() => {
                try{
                    setLoading(true)
                    const response = await axiosClient.delete(`/task/${data._id}`, {
                        headers:{
                            'user': localStorage.getItem('token') || ''
                        },
                    })
                    const res = await response.data
                    toast.success(res.message)
                    await fetchedAllTasks();
                    close();
                }
                catch(error){
                    toast.error(error?.response?.data?.error || error.message);
                }finally{
                    setLoading(false)
                }
      }
  return (
    <>
        <h3 className="text-3xl font-bold text-black mb-3">{data.title}</h3>
        <p className="text-xl font-medium text-gray-700 mb-3">{data.description}</p>
        <p>Category:    <span className={`${categoryClass} capitalize mb-3`}>status: {category}</span></p>

        <div className="flex items-center justify-center">
            <button onClick={deleteHandler} disabled={loading} className='flex items-center disabled:bg-red-800 justify-center gap-x-2 bg-red-500 text-white px-4 py-2 cursor-pointer rounded shadow'>Delete {loading? <CgSpinner className='animate-spin'/> : <FaTrash/>} </button>
        </div>
    </>
  )
}

export default TaskView