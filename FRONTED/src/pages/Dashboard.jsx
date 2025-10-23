import React, { useState } from 'react'
import TaskCard from '../components/TaskCard.jsx'
import { CiSearch } from 'react-icons/ci'
import { useMainContext } from '../context/mainContextCore.js'

const Dashboard = () => {
  const tasks = useMainContext().tasks;
  const [search , setSearch] = useState('')
  const filterResults = tasks.length > 0 ? tasks.filter(task => task.title.toLowerCase().includes(search.toLowerCase())) : []
  return (
    <>
      <div className="mb-3 flex items-center justify-center bg-white outline-none px-10 hover:shadow">
         <CiSearch className="text-2xl"/><input onChange={(e) => setSearch(e.target.value)} value={search} type="text" className="w-full py-3 px-4 bg-white" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3  w-[97%] lg:w-[80%] mx-auto  py-10">
    {
      filterResults.length > 0 ? filterResults.map((cur,i)=> {
        return <TaskCard key={cur?._id || i} task={cur} />
      }):
            <div className="col-span-3 text-center">
                <h1 className="text-center text-3xl font-black">No Tasks Found</h1>
            </div>
        }
      </div>
    </>
  )
}

export default Dashboard