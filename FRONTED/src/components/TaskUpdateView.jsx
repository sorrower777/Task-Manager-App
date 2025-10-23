import React, { useState } from 'react'
import * as yup from 'yup'
import { taskCategories } from '../utils/constant.js'
import { Formik, Form, ErrorMessage } from 'formik'
import { toast } from 'react-toastify'
import { Field } from 'formik'
import CustomLoaderButton from '../components/CustomLoaderButton.jsx'
import { axiosClient } from '../utils/axiosClient.js'
import { useMainContext } from '../context/mainContextCore.js'

const TaskUpdateView = ({data , fetchData, close}) => {
    const categories = Object.keys(taskCategories);
    const { fetchedAllTasks } = useMainContext();
    const [loading, setLoading] = useState(false)
    const initialValues = {
        title:data.title ||'',
        description:data.description || '',
        category:data.category || ''
    }
    const validationSchema = yup.object({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        category: yup.string().required("Category is required").oneOf(categories, "Choose valid category")
    })
    const onSubmitHandler = async(values, helpers) => {
        try{
            setLoading(true)
            const response = await axiosClient.put(`/task/${data._id}`, values,{
                headers:{
                    'user': localStorage.getItem('token') || ''
                },
            })
            const res = await response.data
            toast.success(res.message)
            // Refresh tasks in context so Dashboard reflects the new task
            await fetchedAllTasks();
            await fetchData();
            close()
        }
        catch(error){
            toast.error(error.response.data.error || error.message);
        }finally{
            setLoading(false)
        }
    }
  return (

    <>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}>
            <Form className=" mx-auto my-10 px-3 ">
                
                <div className="mb-3">
                    <label htmlFor = "title">Title</label>
                    <Field name = "title" type="text" className="w-full py-3 px-4 border rounded" placeholder="Enter Task name"/>
                    <ErrorMessage name='title' className='text-red-500' component={'p'}/>
                </div>
                <div className="mb-3">
                    <label htmlFor = "description">Description</label>
                    <Field name = "description" id="description" type="text" className="w-full py-3 px-4 border rounded" placeholder="Enter Task Description"/>
                    <ErrorMessage name='description' className='text-red-500' component={'p'}/>
                </div>
                <div className="mb-3">
                    <label htmlFor = "category">Categories</label>
                    <Field name="category" as="select" id="category" className="w-full py-3 px-4 border rounded">
                        <option value="">-----select-----</option>
                        {
                            categories.map((cur, i)=> {
                                return <option key={i} value={cur} className='capitalize'>{cur}</option>
                            })
                        }
                    </Field>
                    <ErrorMessage name='category' className='text-red-500' component={'p'}/>
                </div>
                <div>
                    <CustomLoaderButton isLoading={loading} text={'Update Task'}/>
                </div>
            </Form>
        </Formik>
    </>
  )
}

export default TaskUpdateView