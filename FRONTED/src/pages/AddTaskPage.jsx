import React from 'react'
import * as yup from 'yup'
import { taskCategories } from '../utils/constant.js'
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'
import { Field } from 'formik'

const AddTaskPage = () => {
    const categories = Object.keys(taskCategories);
    const initialValues = {
        title:'',
        description:'',
        category:''
    }
    const validationSchema = yup.object({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        category: yup.string().required("Category is required").oneOf(categories, "Choose valid category")
    })
    const onSubmitHandler = async() => {
        try{

        }
        catch(error){
            toast.error(error.response.data.error || error.message);
        }
    }
  return (

    <>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}>
            <Form className="bg-white rounded shadow lg:w-[70%] mx-auto my-10 lg:px-10 px-3 py-10">
                <h1 className='text-start text-4xl font-bold'>Add Task</h1>
                <div className="mb-3">
                    <label htmlFor = "title">Title</label>
                    <Field name = "title" type="text" className="w-full py-3 px-4 border rounded" placeholder="Enter Task name"/>
                </div>
            </Form>
        </Formik>
    </>
  )
}

export default AddTaskPage