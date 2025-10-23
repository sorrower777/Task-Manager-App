import { FaArrowRight, FaEdit } from 'react-icons/fa'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState, useCallback } from 'react'
import { MdClose } from 'react-icons/md'
import { FaEye } from 'react-icons/fa'
import TaskView from './TaskView.jsx'
import TaskUpdateView from './TaskUpdateView'
import { toast } from 'react-toastify'
import LoaderComponent from './LoaderComponent.jsx'
import { useMainContext } from '../context/mainContextCore.js'

const TaskViewModel = ({id}) => {

  const { tasks, fetchedAllTasks } = useMainContext()

  let [isOpen, setIsOpen] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [isLoading , setIsLoading] = useState(false)
  const [task, setTask] = useState({})

  const fetchData = useCallback(async() => {
    try {
        if(!id){
          toast.error('Invalid task id')
          return
        }
        setIsLoading(true)
        // Prefer using already-fetched tasks from context
        let found = Array.isArray(tasks) ? tasks.find(t => t?._id === id) : null
        if(!found){
          // Fallback: refresh tasks and try again
          await fetchedAllTasks?.()
          found = Array.isArray(tasks) ? tasks.find(t => t?._id === id) : null
        }
        if(found){
          setTask(found)
        }else{
          toast.error('Task not found')
        }
    }
    catch(error){
        const msg = error?.response?.data?.error || error.message || 'Something went wrong'
        toast.error(msg)
    }finally {
        setIsLoading(false)
    }
  }, [id, tasks, fetchedAllTasks])

  async function open() {
    setIsOpen(true)
    await fetchData()
  }

  function close() {
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={open}
        className="px-5 py-2 text-white rounded-full flex items-center justify-center bg-indigo-500 cursor-pointer gap-x-2"
      >
        <span>View</span>
        <FaArrowRight />
      </button>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-2xl rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="div" className="text-base/7 font-medium flex items-center justify-between text-black">
                <h3 className='flex items-center justify-center gap-x-3'><span>Task {isUpdate ? 'Edit' : 'Details'}</span> <button className='text-2xl' onClick={() =>setIsUpdate(!isUpdate)} title='updata'>
                    {
                        isUpdate ? <FaEye/> : <FaEdit/>
                    }
                    
                </button></h3>
                <button onClick={close} className='text-xl p-2 bg-black rounded-full text-white cursor-pointer'><MdClose /></button>
              </DialogTitle>
              {isLoading ? <>
              
                <div className='w-full min-h-[40vh] flex items-center justify-center'>
                    <LoaderComponent />
                </div>
              </>:
              <section className="w-full min-h-[40vh] bg-gray-200 rounded-2xl p-2 py-4 mt-3">
              {
                isUpdate ? <TaskUpdateView data = {task} fetchData={fetchData} close={close}/> : <TaskView data = {task} close = {close}/>
              }
              </section>
              }
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
    )
}
export default TaskViewModel