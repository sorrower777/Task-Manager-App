import React, { useEffect } from 'react'
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
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate('/login');
    setUser(null);
  }
  const fetchProfile = async() => {
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
      // console.log(data);
      setUser(data?.user || null);
    } 
    catch (error) {
      console.error("Error fetching profile:", error);
    }finally {
      setLoading(false);
    }
  }

  useEffect(() =>{
    fetchProfile();
  }, [])
  if(loading) return <div className='min-h-screen flex items-center justify-center'>
    <LoaderComponent />
  </div>
  return (
    <mainContext.Provider value={{user, logoutHandler, refreshProfile: fetchProfile}}>
      {children}
    </mainContext.Provider>
  )
}

export default MainContextProvider