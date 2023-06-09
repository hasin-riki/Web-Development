import React, {useState} from 'react'
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const initialValues = {
    email: "",
    password: ""
}

const onSubmit = values => {
    console.log(values);
}

// const validate = values => {
//     //values.email values.password
//     let errors={};
//     //errors.email errors.password

//     if(!values.email){
//         errors.email="Email is required.";
//     }
//     else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)){
//         errors.email="Invalid email format";
//     }

//     if(!values.password){
//         errors.password="Password is required.";
//     }

//     return errors;
// }

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required.'),
    password: Yup.string().required('Password is required')
})

export default function Login({setLoginUser}){

    // const formik=useFormik({
    //     initialValues,
    //     onSubmit,
    //     validationSchema
    // });

    const navigate=useNavigate();
    
    // console.log(formik.touched);

    // const login = () => {
    //     axios.post("http://localhost:3000/users/login", user)
    //     .then(res => {
    //         alert(res.data)
    //         setLoginUser(res.data.user)
    //         navigate("/")
    //     })
    // }

    return(
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className="login">
            <h1>Login</h1>
            <Field type="text" name="email" placeholder="Enter your Email" />
            <ErrorMessage name='email' component='div' className='error'/>
            <Field type="password" name="password" placeholder="Enter your Password" />
            <ErrorMessage name='password' className='error'/>
            <button type='submit' className="button">Login</button>
            <div>or</div>
            <div type="button" className="button2" onClick={() => navigate("/signup")}>Signup</div>
        </Form>
        </Formik>
    );
}