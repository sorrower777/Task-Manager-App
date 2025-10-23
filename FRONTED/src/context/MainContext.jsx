import React, { useEffect, useCallback } from 'react'
import { useState } from 'react'
import { axiosClient } from '../utils/axiosClient.js'
import LoaderComponent from '../components/LoaderComponent.jsx'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// eslint-disable-next-line no-unused-vars
import { mainContext } from './mainContextCore.js'

export const MainContextProvider = ({children}) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const fetchedAllTasks = useCallback(async() => {
    try {
      const response = await axiosClient.get("/all-task", {
        headers :{
          user: localStorage.getItem('token') || ''
        }
      })
      const data = await response.data;
      // Backend returns an array of tasks directly
      setTasks(Array.isArray(data) ? data : (data?.tasks || []))
    }
    catch(error){
      toast.error(error.response.data.error || error.message);
    }
  }, [])
  const logoutHandler = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate('/login');
    setUser(null);
  }
  const fetchProfile = useCallback(async() => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || '';
      if(!token){
        setUser(null);
        setLoading(false);
        return;
      }
      const response = await axiosClient.get("/profile", {
        headers:{
          user: token
        }
      })
      const data = await response.data;
      // backend returns the user object directly
      setUser(data || null);
      await fetchedAllTasks();
    } 
    catch (error) {
      console.error("Error fetching profile:", error);
    }finally {
      setLoading(false);
    }
  }, [fetchedAllTasks])

  useEffect(() =>{
    fetchProfile();
  }, [fetchProfile])
  if(loading) return <div className='min-h-screen flex items-center justify-center'>
    <LoaderComponent />
  </div>
  return (
    <mainContext.Provider value={{user, logoutHandler, refreshProfile: fetchProfile, fetchedAllTasks, tasks}}>
      {children}
    </mainContext.Provider>
  )
}

export default MainContextProvider