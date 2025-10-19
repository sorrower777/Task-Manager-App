import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { useState } from 'react'
import CustomLoaderButton from '../components/CustomLoaderButton.jsx'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import { toast } from 'react-toastify'
import { axiosClient } from '../utils/axiosClient.js'


const RegisterPage = () => {
  const [isHide , setIsHide] = useState(true);
  const [Loading , setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmitHandler = async(values, helpers) =>{
    try{
      setLoading(true);
      // console.log(values);
      const response = await axiosClient.post("/register", values);
      const data = await response.data;
      toast.success(data.message);
      helpers.resetForm();
      navigate("/");
      // Your register logic here
    }catch(error){
      setLoading(false);
      // console.log("Register Error:", error);
      toast.error(error?.response?.data?.error || error.message);
    }
  }
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Enter valid email").required("Email is Required"),
    password: yup.string().required("Password is Required")
  })
  const initialValues = {
    name: '',
    email: '',
    password: ''
  }
  return (
    <>
      <div className='min-h-screen flex items-center justify-center flex-col'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmitHandler}
        >
          {() => (
            <Form className='w-[96] md:w-1/2 lg:w-1/3 bg-white shadow p-10 rounded'>
              <div className='mb-3 flex items-center justify-center'><Logo /></div>
              <div className='mb-3'>
                <label htmlFor="name">Name</label>
                <Field name='name' id='name' type='text' className='w-full py-2 px-3 rounded border outline-none' placeholder='Enter your Name' />
                <ErrorMessage name='name' component='p' className='text-red-500' />
              </div>

              <div className='mb-3'>
                <label htmlFor="email">Email</label>
                <Field name='email' id='email' type='email' className='w-full py-2 px-3 rounded border outline-none' placeholder='Enter your email' />
                <ErrorMessage name='email' component='p' className='text-red-500' />
              </div>

              <div className='mb-3'>
                <label htmlFor="password">Password</label>
                <div className='w-full py-2 px-3 rounded border flex'>
                  <Field name='password' id='password' type={isHide ? 'password' : 'text'} className='w-full rounded outline-none' placeholder='Enter your password' />
                  <button className='text-zinc-500 cursor-pointer text-sm font-bold' type='button' onClick={() => setIsHide(!isHide)}>
                    {isHide ? 'SHOW' : 'HIDE'}
                  </button>
                </div>
                <ErrorMessage name='password' component='p' className='text-red-500' />
              </div>

              <div type='button' className='mt-4  text-white py-2 px-4 rounded cursor-pointer'>
                <CustomLoaderButton isLoading = {Loading} text='Register'/>
              </div>
              <div className='mb-3'>
                <p className='text-end'>
                  Already have an account? <Link to={'/login'} className = 'font-bold text-blue-700'>Login</Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
        
      </div>
    
    </>
    
  )
}

export default RegisterPage