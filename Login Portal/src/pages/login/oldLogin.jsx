import React, {useState} from 'react'
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const initialValues = {
    email: "",
    password: ""
}

const onSubmit = values => {
    console.log(values);
}

const validate = values => {
    //values.email values.password
    let errors={};
    //errors.email errors.password

    if(!values.email){
        errors.email="Email is required.";
    }
    else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)){
        errors.email="Invalid email format";
    }

    if(!values.password){
        errors.password="Password is required.";
    }

    return errors;
}

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required.'),
    password: Yup.string().required('Password is required')
})

export default function oldLogin({setLoginUser}){

    // const formik=useFormik({
    //     initialValues,
    //     onSubmit,
    //     validationSchema
    // });

    const navigate=useNavigate();
    
    console.log(formik.touched);

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
        <form className="login" onSubmit={formik.handleSubmit}>
            <h1>Login</h1>
            <input type="text" name="email" placeholder="Enter your Email" {...formik.getFieldProps('email')}></input>
            {formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}
            <input type="password" name="password" value={formik.values.password} placeholder="Enter your Password" onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
            {formik.touched.password && formik.errors.password ? <div className='error'>{formik.errors.password}</div> : null}
            <button type='submit' className="button">Login</button>
            <div>or</div>
            <div type="button" className="button2" onClick={() => navigate("/signup")}>Signup</div>
        </form>
        </Formik>
    );
}