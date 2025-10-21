import React from 'react'
import TaskCard from '../components/TaskCard.jsx'
import { CiSearch } from 'react-icons/ci'

const Dashboard = () => {
  return (
    <>
      <div className="mb-3 flex items-center justify-center bg-white outline-none px-10 hover:shadow">
         <CiSearch className="text-2xl"/><input type="text" className="w-full py-3 px-4 bg-white" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3  w-[97%] lg:w-[80%] mx-auto  py-10">
        {
            Array(20).fill(null).map((cur,i)=> {
                return <TaskCard key = {i} />
            })
        }
      </div>
    </>
  )
}

export default Dashboard