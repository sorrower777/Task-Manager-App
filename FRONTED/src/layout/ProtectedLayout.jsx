import React, { useEffect, useState } from 'react'
import LoaderComponent from '../components/LoaderComponent'
import { useNavigate, Outlet } from 'react-router-dom'
import { useMainContext } from '../context/mainContextCore.js'

const ProtectedLayout = () => {
    const { user } = useMainContext();
    const [loading , setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() =>{
        if(!user){
            navigate('/login');
        }
        else{
            setLoading(false);
        }
    }, [user, navigate] )
    if(loading){
        return <LoaderComponent/>
    }
  return (
    <>
        <Outlet />
    </>
  )
}

export default ProtectedLayout